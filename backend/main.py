from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import os
import uvicorn

from models import (
    Scenario, 
    StaffingParams, 
    RevenueParams, 
    PLParams, 
    PeakHourParams,
    OptimizationParams,
    WhatIfParams,
    StaffingResult,
    RevenueResult,
    PLResult,
    PeakHourResult,
    ComparisonResult,
    OptimizationResult,
    WhatIfResult,
    Brand, BrandCreate, BrandUpdate, BrandResponse,
    Outlet, OutletCreate, OutletUpdate, OutletResponse
)

from calculations import (
    calculate_staffing_requirements,
    generate_revenue_projections,
    calculate_profit_loss,
    analyze_peak_hours,
    optimize_staffing,
    run_what_if_analysis,
    compare_scenarios
)

from database import (
    get_db,
    init_db,
    get_scenarios,
    get_scenario_by_id,
    save_scenario,
    update_scenario,
    delete_scenario,
    create_tables
)

from auth import (
    User,
    UserCreate,
    Token,
    get_current_active_user,
    is_superuser,
    authenticate_user,
    create_access_token,
    create_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

from ml_models import (
    get_demand_forecaster,
    get_staffing_optimizer
)

from routers import (
    calculations,
    default_values,
    operational_constants,
    staffing,
    financial,
    peak_hour,
    efficiency,
    revenue,
    pi,
    common
)

from middleware.auth import AuthMiddleware
from utils.response import create_success_response, create_error_response
from utils.validation import DataValidator, ScenarioValidator, FinancialValidator
from utils.cache import cached
from utils.pagination import get_pagination_params, paginate

app = FastAPI(
    title="Manpower Planning API",
    description="API for restaurant manpower planning and optimization",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add authentication middleware
app.add_middleware(AuthMiddleware)

# Include routers
app.include_router(calculations.router)
app.include_router(default_values.router)
app.include_router(operational_constants.router)
app.include_router(staffing.router)
app.include_router(financial.router)
app.include_router(peak_hour.router)
app.include_router(efficiency.router)
app.include_router(revenue.router)
app.include_router(pi.router)
app.include_router(common.router)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()
    create_tables()

# Root endpoint
@app.get("/")
async def root():
    return create_success_response(
        data={"message": "Welcome to the Manpower Planning API"},
        message="API is running"
    )

@app.get("/health")
async def health_check():
    return create_success_response(
        data={"status": "healthy"},
        message="Health check passed"
    )

# Authentication endpoints
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=User)
async def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db=db, user=user)

@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

# Scenario endpoints
@app.get("/scenarios/", response_model=List[Scenario])
@cached(ttl=300, key_prefix="scenarios")
async def read_scenarios(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    pagination: PaginationParams = Depends(get_pagination_params)
):
    try:
        scenarios = await get_scenarios(db, current_user.id)
        paginated_scenarios, total = apply_pagination(scenarios, pagination)
        
        return create_success_response(
            data=paginate(paginated_scenarios, total, pagination.page, pagination.size),
            message="Scenarios retrieved successfully"
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error retrieving scenarios"
        )

@app.get("/scenarios/{scenario_id}", response_model=Scenario)
async def read_scenario(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    scenario = await get_scenario_by_id(db, scenario_id)
    if scenario is None:
        raise HTTPException(status_code=404, detail="Scenario not found")
    
    # Check if user has access to this scenario
    if scenario.owner_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to access this scenario")
    
    return scenario

@app.post("/scenarios/", response_model=Scenario)
async def create_scenario(
    scenario: Scenario,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Generate ID if not provided
    if not scenario.id:
        scenario.id = str(uuid.uuid4())
    
    # Set timestamps
    scenario.createdAt = datetime.now()
    scenario.updatedAt = datetime.now()
    
    return await save_scenario(db, scenario, current_user.id)

@app.put("/scenarios/{scenario_id}", response_model=Scenario)
async def update_scenario_endpoint(
    scenario_id: str,
    scenario: Scenario,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    existing_scenario = await get_scenario_by_id(db, scenario_id)
    if existing_scenario is None:
        raise HTTPException(status_code=404, detail="Scenario not found")
    
    # Check if user has access to this scenario
    if existing_scenario.owner_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to update this scenario")
    
    scenario.id = scenario_id
    scenario.updatedAt = datetime.now()
    
    return await update_scenario(db, scenario)

@app.delete("/scenarios/{scenario_id}")
async def delete_scenario_endpoint(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    existing_scenario = await get_scenario_by_id(db, scenario_id)
    if existing_scenario is None:
        raise HTTPException(status_code=404, detail="Scenario not found")
    
    # Check if user has access to this scenario
    if existing_scenario.owner_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to delete this scenario")
    
    success = await delete_scenario(db, scenario_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete scenario")
    
    return {"message": "Scenario deleted successfully"}

# Calculation endpoints
@app.post("/calculations/staffing", response_model=StaffingResult)
async def calculate_staffing_endpoint(
    params: StaffingParams,
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Validate parameters
        ScenarioValidator.validate_scenario_parameters(params.dict())
        
        # Calculate staffing requirements
        result = calculate_staffing_requirements(params)
        
        return create_success_response(
            data=result,
            message="Staffing requirements calculated successfully"
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error calculating staffing requirements"
        )

@app.post("/calculations/revenue", response_model=RevenueResult)
async def generate_revenue_endpoint(
    params: RevenueParams,
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Validate parameters
        FinancialValidator.validate_revenue_parameters(params.dict())
        
        # Generate revenue projections
        result = generate_revenue_projections(params)
        
        return create_success_response(
            data=result,
            message="Revenue projections generated successfully"
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error generating revenue projections"
        )

@app.post("/calculations/pl", response_model=PLResult)
async def calculate_pl_endpoint(
    params: PLParams,
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Validate parameters
        FinancialValidator.validate_revenue_parameters(params.dict())
        
        # Calculate profit/loss
        result = calculate_profit_loss(params)
        
        return create_success_response(
            data=result,
            message="Profit/loss calculated successfully"
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error calculating profit/loss"
        )

@app.post("/calculations/peak-hours", response_model=PeakHourResult)
async def analyze_peak_hours_endpoint(
    params: PeakHourParams,
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Validate parameters
        ScenarioValidator.validate_scenario_parameters(params.dict())
        
        # Analyze peak hours
        result = analyze_peak_hours(params)
        
        return create_success_response(
            data=result,
            message="Peak hours analyzed successfully"
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error analyzing peak hours"
        )

@app.post("/calculations/optimize", response_model=OptimizationResult)
async def optimize_staffing_endpoint(
    params: OptimizationParams,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if scenario exists and user has access
    scenario = await get_scenario_by_id(db, params.scenario_id)
    if scenario is None:
        raise HTTPException(status_code=404, detail="Scenario not found")
    
    if scenario.owner_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to access this scenario")
    
    # Use advanced optimization if available
    try:
        optimizer = get_staffing_optimizer()
        
        # Extract features from scenario
        features = {
            'covers': scenario.revenueDrivers.dailyCovers if scenario.revenueDrivers else 250,
            'service_style': scenario.serviceParameters.serviceStyle if scenario.serviceParameters else 'casual',
            'area_per_cover': float(scenario.spaceParameters.areaPerCover) if scenario.spaceParameters else 1.67,
            'avg_check': scenario.revenueDrivers.avgSpending if scenario.revenueDrivers else 120,
            'dwelling_time': scenario.revenueDrivers.dwellingTime if scenario.revenueDrivers else 75,
            'peak_factor': scenario.revenueDrivers.peakFactor if scenario.revenueDrivers else 1.5,
            'staff_utilization': scenario.efficiencyDrivers.staffUtilization if scenario.efficiencyDrivers else 85,
            'tech_impact': scenario.efficiencyDrivers.techImpact if scenario.efficiencyDrivers else 10,
            'cross_training': scenario.efficiencyDrivers.crossTraining if scenario.efficiencyDrivers else 15
        }
        
        # Run optimization
        optimization_result = optimizer.optimize(features, params.constraints)
        
        # Map to our result format
        return optimize_staffing(params)
    except Exception as e:
        # Fall back to basic optimization
        return optimize_staffing(params)

@app.post("/calculations/what-if", response_model=WhatIfResult)
async def what_if_analysis_endpoint(
    params: WhatIfParams,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Check if scenario exists and user has access
        scenario = await get_scenario_by_id(db, params.baseScenarioId)
        if scenario is None:
            raise create_error_response(
                "Scenario not found",
                status_code=404,
                message="The specified scenario does not exist"
            )
        
        if scenario.owner_id != current_user.id and not current_user.is_superuser:
            raise create_error_response(
                "Not authorized",
                status_code=403,
                message="You don't have permission to access this scenario"
            )
        
        # Run what-if analysis
        result = run_what_if_analysis(params)
        
        return create_success_response(
            data=result,
            message="What-if analysis completed successfully"
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error running what-if analysis"
        )

@app.post("/calculations/compare", response_model=ComparisonResult)
async def compare_scenarios_endpoint(
    data: Dict[str, List[str]],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    try:
        scenario_ids = data.get("scenario_ids", [])
        if not scenario_ids:
            raise create_error_response(
                "No scenario IDs provided",
                status_code=400,
                message="Please provide at least one scenario ID to compare"
            )
        
        scenarios = []
        for scenario_id in scenario_ids:
            scenario = await get_scenario_by_id(db, scenario_id)
            if scenario is None:
                raise create_error_response(
                    f"Scenario {scenario_id} not found",
                    status_code=404,
                    message="One or more scenarios do not exist"
                )
            
            # Check if user has access to this scenario
            if scenario.owner_id != current_user.id and not current_user.is_superuser:
                raise create_error_response(
                    f"Not authorized to access scenario {scenario_id}",
                    status_code=403,
                    message="You don't have permission to access one or more scenarios"
                )
            
            scenarios.append(scenario)
        
        # Compare scenarios
        result = compare_scenarios(scenarios)
        
        return create_success_response(
            data=result,
            message="Scenarios compared successfully"
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error comparing scenarios"
        )

# Machine learning endpoints
@app.post("/ml/demand-forecast")
@cached(ttl=3600)  # Cache for 1 hour
async def forecast_demand(
    features: Dict[str, Any],
    model_type: str = "random_forest",
    current_user: User = Depends(get_current_active_user)
):
    try:
        forecaster = get_demand_forecaster(model_type)
        result = forecaster.predict(features)
        
        return create_success_response(
            data=result,
            message="Demand forecast generated successfully"
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error generating demand forecast"
        )

@app.post("/ml/train-demand-model")
async def train_demand_model(
    data: List[Dict[str, Any]],
    model_type: str = "random_forest",
    current_user: User = Depends(is_superuser)  # Only superusers can train models
):
    try:
        # Convert data to DataFrame
        df = pd.DataFrame(data)
        
        # Train model
        forecaster = get_demand_forecaster(model_type)
        result = forecaster.train(df)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ml/train-staffing-model")
async def train_staffing_model(
    data: List[Dict[str, Any]],
    model_type: str = "gradient_boosting",
    current_user: User = Depends(is_superuser)  # Only superusers can train models
):
    try:
        # Convert data to DataFrame
        df = pd.DataFrame(data)
        
        # Train model
        optimizer = get_staffing_optimizer(model_type)
        result = optimizer.train(df)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Brand endpoints
@app.post("/brands/", response_model=BrandResponse, status_code=status.HTTP_201_CREATED)
async def create_brand(
    brand: BrandCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Validate brand data
        DataValidator.validate_model(brand.dict(), BrandCreate)
        
        # Create brand
        db_brand = Brand(
            id=str(uuid.uuid4()),
            name=brand.name,
            service_style=brand.service_style,
            default_parameters=brand.default_parameters
        )
        db.add(db_brand)
        db.commit()
        db.refresh(db_brand)
        
        return create_success_response(
            data=db_brand,
            message="Brand created successfully",
            status_code=status.HTTP_201_CREATED
        )
    except Exception as e:
        raise create_error_response(
            str(e),
            status_code=500,
            message="Error creating brand"
        )

@app.get("/brands/", response_model=List[BrandResponse])
def list_brands(db: Session = Depends(get_db)):
    return db.query(Brand).all()

@app.get("/brands/{brand_id}", response_model=BrandResponse)
def get_brand(brand_id: str, db: Session = Depends(get_db)):
    brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return brand

@app.put("/brands/{brand_id}", response_model=BrandResponse)
def update_brand(brand_id: str, brand: BrandUpdate, db: Session = Depends(get_db)):
    db_brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if not db_brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    
    update_data = brand.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_brand, field, value)
    
    db.commit()
    db.refresh(db_brand)
    return db_brand

@app.delete("/brands/{brand_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_brand(brand_id: str, db: Session = Depends(get_db)):
    brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    db.delete(brand)
    db.commit()
    return None

# Outlet endpoints
@app.post("/outlets/", response_model=OutletResponse, status_code=status.HTTP_201_CREATED)
def create_outlet(outlet: OutletCreate, db: Session = Depends(get_db)):
    # Verify brand exists
    brand = db.query(Brand).filter(Brand.id == outlet.brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    
    db_outlet = Outlet(
        id=str(uuid.uuid4()),
        brand_id=outlet.brand_id,
        name=outlet.name,
        location=outlet.location,
        currency=outlet.currency,
        status=outlet.status,
        space_parameters=outlet.space_parameters.dict(),
        service_parameters=outlet.service_parameters.dict(),
        operational_parameters=outlet.operational_parameters.dict()
    )
    db.add(db_outlet)
    db.commit()
    db.refresh(db_outlet)
    return db_outlet

@app.get("/outlets/", response_model=List[OutletResponse])
def list_outlets(brand_id: str = None, db: Session = Depends(get_db)):
    query = db.query(Outlet)
    if brand_id:
        query = query.filter(Outlet.brand_id == brand_id)
    return query.all()

@app.get("/outlets/{outlet_id}", response_model=OutletResponse)
def get_outlet(outlet_id: str, db: Session = Depends(get_db)):
    outlet = db.query(Outlet).filter(Outlet.id == outlet_id).first()
    if not outlet:
        raise HTTPException(status_code=404, detail="Outlet not found")
    return outlet

@app.put("/outlets/{outlet_id}", response_model=OutletResponse)
def update_outlet(outlet_id: str, outlet: OutletUpdate, db: Session = Depends(get_db)):
    db_outlet = db.query(Outlet).filter(Outlet.id == outlet_id).first()
    if not db_outlet:
        raise HTTPException(status_code=404, detail="Outlet not found")
    
    update_data = outlet.dict(exclude_unset=True)
    for field, value in update_data.items():
        if value is not None:
            if field in ["space_parameters", "service_parameters", "operational_parameters"]:
                current_value = getattr(db_outlet, field)
                if isinstance(current_value, dict):
                    current_value.update(value.dict())
                    value = current_value
            setattr(db_outlet, field, value)
    
    db.commit()
    db.refresh(db_outlet)
    return db_outlet

@app.delete("/outlets/{outlet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_outlet(outlet_id: str, db: Session = Depends(get_db)):
    outlet = db.query(Outlet).filter(Outlet.id == outlet_id).first()
    if not outlet:
        raise HTTPException(status_code=404, detail="Outlet not found")
    db.delete(outlet)
    db.commit()
    return None

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

