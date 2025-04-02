import pytest
import json
from datetime import datetime
from database import (
    DBUser, DBDefaultValues, DBScenario, DBStaffPosition, 
    DBSpaceParameters, DBServiceParameters, DBRevenueDrivers,
    DBOperationalHours, DBEfficiencyDrivers, Brand, Outlet,
    prepare_json_for_db, parse_json_from_db,
    DBPosition, DBStaffingPlan, DBStaffingPlanPosition
)
from models import ServiceStyle, Currency, OutletStatus
from sqlalchemy.exc import IntegrityError

# Test data
test_user_data = {
    "username": "testuser",
    "email": "test@example.com",
    "hashed_password": "hashed_testpassword",
    "is_active": True,
    "is_superuser": False
}

test_scenario_data = {
    "name": "Test Scenario",
    "brand": "Test Brand",
    "outlet": "Test Outlet"
}

test_space_parameters = {
    "total_area": 100.0,
    "foh_percentage": 70.0,
    "area_per_cover": "2.5",
    "external_seating": 20,
    "foh_area": 70.0,
    "foh_capacity": 28,
    "total_capacity": 40
}

test_service_parameters = {
    "covers_per_waiter": "20",
    "runner_ratio": "3:1",
    "kitchen_stations": 5,
    "service_style": "FULL_SERVICE",
    "waiters_required": 2,
    "runners_required": 1
}

test_revenue_drivers = {
    "avg_spending": 50.0,
    "dwelling_time": 90,
    "table_turn_time": 120,
    "peak_factor": 1.5,
    "table_turns": 8.0,
    "daily_covers": 320,
    "monthly_revenue": 480000.0
}

test_operational_hours = {
    "operating_days": 30,
    "daily_hours": 12,
    "ramadan_adjustment": False
}

test_efficiency_drivers = {
    "staff_utilization": 0.85,
    "tech_impact": 0.1,
    "cross_training": 0.2,
    "seasonality_factor": 1.2
}

test_position_data = {
    "title": "Test Position",
    "salary": 2000.0,
    "department": "FOH",
    "level": 1,
    "count": 5
}

def test_user_model_postgres(postgres_db_session):
    """Test user model with PostgreSQL"""
    # Create a user
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    postgres_db_session.refresh(user)
    
    # Verify user data
    assert user.username == test_user_data["username"]
    assert user.email == test_user_data["email"]
    assert user.is_active == test_user_data["is_active"]
    assert user.is_superuser == test_user_data["is_superuser"]
    
    # Test unique constraint
    duplicate_user = DBUser(**test_user_data)
    postgres_db_session.add(duplicate_user)
    with pytest.raises(IntegrityError):
        postgres_db_session.commit()
    
    # Clean up
    postgres_db_session.rollback()
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_user_model_mysql(mysql_db_session):
    """Test user model with MySQL"""
    # Create a user
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    mysql_db_session.refresh(user)
    
    # Verify user data
    assert user.username == test_user_data["username"]
    assert user.email == test_user_data["email"]
    assert user.is_active == test_user_data["is_active"]
    assert user.is_superuser == test_user_data["is_superuser"]
    
    # Test unique constraint
    duplicate_user = DBUser(**test_user_data)
    mysql_db_session.add(duplicate_user)
    with pytest.raises(IntegrityError):
        mysql_db_session.commit()
    
    # Clean up
    mysql_db_session.rollback()
    mysql_db_session.delete(user)
    mysql_db_session.commit()

def test_json_handling_postgres(postgres_db_session):
    """Test JSON handling with PostgreSQL"""
    # Create a default value with JSON
    json_data = {"key": "value", "number": 42, "list": [1, 2, 3]}
    default_value = DBDefaultValues(
        id="test-id",
        category="test",
        name="test_json",
        value=json_data,
        description="Test JSON handling"
    )
    
    # Add to database
    postgres_db_session.add(default_value)
    postgres_db_session.commit()
    postgres_db_session.refresh(default_value)
    
    # Verify JSON was stored correctly
    assert default_value.value == json_data
    
    # Clean up
    postgres_db_session.delete(default_value)
    postgres_db_session.commit()

def test_json_handling_mysql(mysql_db_session):
    """Test JSON handling with MySQL"""
    # Create a default value with JSON
    json_data = {"key": "value", "number": 42, "list": [1, 2, 3]}
    default_value = DBDefaultValues(
        id="test-id",
        category="test",
        name="test_json",
        value=json_data,
        description="Test JSON handling"
    )
    
    # Add to database
    mysql_db_session.add(default_value)
    mysql_db_session.commit()
    mysql_db_session.refresh(default_value)
    
    # Verify JSON was stored correctly
    # For MySQL, we need to parse the JSON string
    stored_value = parse_json_from_db(default_value.value)
    assert stored_value == json_data
    
    # Clean up
    mysql_db_session.delete(default_value)
    mysql_db_session.commit()

def test_scenario_model_postgres(postgres_db_session):
    """Test scenario model with PostgreSQL"""
    # Create a user first
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    
    # Create a scenario
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    postgres_db_session.add(scenario)
    postgres_db_session.commit()
    postgres_db_session.refresh(scenario)
    
    # Verify scenario data
    assert scenario.name == test_scenario_data["name"]
    assert scenario.brand == test_scenario_data["brand"]
    assert scenario.outlet == test_scenario_data["outlet"]
    assert scenario.owner_id == user.id
    
    # Clean up
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_scenario_model_mysql(mysql_db_session):
    """Test scenario model with MySQL"""
    # Create a user first
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    
    # Create a scenario
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    mysql_db_session.add(scenario)
    mysql_db_session.commit()
    mysql_db_session.refresh(scenario)
    
    # Verify scenario data
    assert scenario.name == test_scenario_data["name"]
    assert scenario.brand == test_scenario_data["brand"]
    assert scenario.outlet == test_scenario_data["outlet"]
    assert scenario.owner_id == user.id
    
    # Clean up
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

def test_enum_handling_postgres(postgres_db_session):
    """Test enum handling with PostgreSQL"""
    # Create a brand with enum
    brand = Brand(
        id="test-brand-id",
        name="Test Brand",
        service_style=ServiceStyle.FULL_SERVICE,
        default_parameters={"param": "value"}
    )
    
    # Add to database
    postgres_db_session.add(brand)
    postgres_db_session.commit()
    postgres_db_session.refresh(brand)
    
    # Verify enum was stored correctly
    assert brand.service_style == ServiceStyle.FULL_SERVICE
    
    # Create an outlet with enums
    outlet = Outlet(
        id="test-outlet-id",
        brand_id=brand.id,
        name="Test Outlet",
        location="Test Location",
        currency=Currency.USD,
        status=OutletStatus.ACTIVE,
        space_parameters={"area": 100},
        service_parameters={"style": "full"},
        operational_parameters={"hours": 24}
    )
    
    # Add to database
    postgres_db_session.add(outlet)
    postgres_db_session.commit()
    postgres_db_session.refresh(outlet)
    
    # Verify enums were stored correctly
    assert outlet.currency == Currency.USD
    assert outlet.status == OutletStatus.ACTIVE
    
    # Clean up
    postgres_db_session.delete(outlet)
    postgres_db_session.delete(brand)
    postgres_db_session.commit()

def test_enum_handling_mysql(mysql_db_session):
    """Test enum handling with MySQL"""
    # Create a brand with enum
    brand = Brand(
        id="test-brand-id",
        name="Test Brand",
        service_style=ServiceStyle.FULL_SERVICE,
        default_parameters={"param": "value"}
    )
    
    # Add to database
    mysql_db_session.add(brand)
    mysql_db_session.commit()
    mysql_db_session.refresh(brand)
    
    # Verify enum was stored correctly
    assert brand.service_style == ServiceStyle.FULL_SERVICE
    
    # Create an outlet with enums
    outlet = Outlet(
        id="test-outlet-id",
        brand_id=brand.id,
        name="Test Outlet",
        location="Test Location",
        currency=Currency.USD,
        status=OutletStatus.ACTIVE,
        space_parameters={"area": 100},
        service_parameters={"style": "full"},
        operational_parameters={"hours": 24}
    )
    
    # Add to database
    mysql_db_session.add(outlet)
    mysql_db_session.commit()
    mysql_db_session.refresh(outlet)
    
    # Verify enums were stored correctly
    assert outlet.currency == Currency.USD
    assert outlet.status == OutletStatus.ACTIVE
    
    # Clean up
    mysql_db_session.delete(outlet)
    mysql_db_session.delete(brand)
    mysql_db_session.commit()

def test_json_helper_functions():
    """Test JSON helper functions for MySQL"""
    # Test data
    json_data = {"key": "value", "number": 42, "list": [1, 2, 3]}
    json_string = json.dumps(json_data)
    
    # Test prepare_json_for_db
    assert prepare_json_for_db(json_data) == json_data  # For PostgreSQL
    assert prepare_json_for_db(json_string) == json_string  # Already a string
    
    # Test parse_json_from_db
    assert parse_json_from_db(json_data) == json_data  # Already a dict
    assert parse_json_from_db(json_string) == json_data  # Parse string to dict

def test_space_parameters_postgres(postgres_db_session):
    """Test space parameters with PostgreSQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    postgres_db_session.add(scenario)
    postgres_db_session.commit()
    
    # Create space parameters
    space_params_data = test_space_parameters.copy()
    space_params_data["scenario_id"] = scenario.id
    space_params = DBSpaceParameters(**space_params_data)
    postgres_db_session.add(space_params)
    postgres_db_session.commit()
    postgres_db_session.refresh(space_params)
    
    # Verify space parameters
    assert space_params.total_area == test_space_parameters["total_area"]
    assert space_params.foh_percentage == test_space_parameters["foh_percentage"]
    assert space_params.area_per_cover == test_space_parameters["area_per_cover"]
    assert space_params.external_seating == test_space_parameters["external_seating"]
    assert space_params.foh_area == test_space_parameters["foh_area"]
    assert space_params.foh_capacity == test_space_parameters["foh_capacity"]
    assert space_params.total_capacity == test_space_parameters["total_capacity"]
    
    # Clean up
    postgres_db_session.delete(space_params)
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_space_parameters_mysql(mysql_db_session):
    """Test space parameters with MySQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    mysql_db_session.add(scenario)
    mysql_db_session.commit()
    
    # Create space parameters
    space_params_data = test_space_parameters.copy()
    space_params_data["scenario_id"] = scenario.id
    space_params = DBSpaceParameters(**space_params_data)
    mysql_db_session.add(space_params)
    mysql_db_session.commit()
    mysql_db_session.refresh(space_params)
    
    # Verify space parameters
    assert space_params.total_area == test_space_parameters["total_area"]
    assert space_params.foh_percentage == test_space_parameters["foh_percentage"]
    assert space_params.area_per_cover == test_space_parameters["area_per_cover"]
    assert space_params.external_seating == test_space_parameters["external_seating"]
    assert space_params.foh_area == test_space_parameters["foh_area"]
    assert space_params.foh_capacity == test_space_parameters["foh_capacity"]
    assert space_params.total_capacity == test_space_parameters["total_capacity"]
    
    # Clean up
    mysql_db_session.delete(space_params)
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

def test_service_parameters_postgres(postgres_db_session):
    """Test service parameters with PostgreSQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    postgres_db_session.add(scenario)
    postgres_db_session.commit()
    
    # Create service parameters
    service_params_data = test_service_parameters.copy()
    service_params_data["scenario_id"] = scenario.id
    service_params = DBServiceParameters(**service_params_data)
    postgres_db_session.add(service_params)
    postgres_db_session.commit()
    postgres_db_session.refresh(service_params)
    
    # Verify service parameters
    assert service_params.covers_per_waiter == test_service_parameters["covers_per_waiter"]
    assert service_params.runner_ratio == test_service_parameters["runner_ratio"]
    assert service_params.kitchen_stations == test_service_parameters["kitchen_stations"]
    assert service_params.service_style == test_service_parameters["service_style"]
    assert service_params.waiters_required == test_service_parameters["waiters_required"]
    assert service_params.runners_required == test_service_parameters["runners_required"]
    
    # Clean up
    postgres_db_session.delete(service_params)
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_service_parameters_mysql(mysql_db_session):
    """Test service parameters with MySQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    mysql_db_session.add(scenario)
    mysql_db_session.commit()
    
    # Create service parameters
    service_params_data = test_service_parameters.copy()
    service_params_data["scenario_id"] = scenario.id
    service_params = DBServiceParameters(**service_params_data)
    mysql_db_session.add(service_params)
    mysql_db_session.commit()
    mysql_db_session.refresh(service_params)
    
    # Verify service parameters
    assert service_params.covers_per_waiter == test_service_parameters["covers_per_waiter"]
    assert service_params.runner_ratio == test_service_parameters["runner_ratio"]
    assert service_params.kitchen_stations == test_service_parameters["kitchen_stations"]
    assert service_params.service_style == test_service_parameters["service_style"]
    assert service_params.waiters_required == test_service_parameters["waiters_required"]
    assert service_params.runners_required == test_service_parameters["runners_required"]
    
    # Clean up
    mysql_db_session.delete(service_params)
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

def test_revenue_drivers_postgres(postgres_db_session):
    """Test revenue drivers with PostgreSQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    postgres_db_session.add(scenario)
    postgres_db_session.commit()
    
    # Create revenue drivers
    revenue_drivers_data = test_revenue_drivers.copy()
    revenue_drivers_data["scenario_id"] = scenario.id
    revenue_drivers = DBRevenueDrivers(**revenue_drivers_data)
    postgres_db_session.add(revenue_drivers)
    postgres_db_session.commit()
    postgres_db_session.refresh(revenue_drivers)
    
    # Verify revenue drivers
    assert revenue_drivers.avg_spending == test_revenue_drivers["avg_spending"]
    assert revenue_drivers.dwelling_time == test_revenue_drivers["dwelling_time"]
    assert revenue_drivers.table_turn_time == test_revenue_drivers["table_turn_time"]
    assert revenue_drivers.peak_factor == test_revenue_drivers["peak_factor"]
    assert revenue_drivers.table_turns == test_revenue_drivers["table_turns"]
    assert revenue_drivers.daily_covers == test_revenue_drivers["daily_covers"]
    assert revenue_drivers.monthly_revenue == test_revenue_drivers["monthly_revenue"]
    
    # Clean up
    postgres_db_session.delete(revenue_drivers)
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_revenue_drivers_mysql(mysql_db_session):
    """Test revenue drivers with MySQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    mysql_db_session.add(scenario)
    mysql_db_session.commit()
    
    # Create revenue drivers
    revenue_drivers_data = test_revenue_drivers.copy()
    revenue_drivers_data["scenario_id"] = scenario.id
    revenue_drivers = DBRevenueDrivers(**revenue_drivers_data)
    mysql_db_session.add(revenue_drivers)
    mysql_db_session.commit()
    mysql_db_session.refresh(revenue_drivers)
    
    # Verify revenue drivers
    assert revenue_drivers.avg_spending == test_revenue_drivers["avg_spending"]
    assert revenue_drivers.dwelling_time == test_revenue_drivers["dwelling_time"]
    assert revenue_drivers.table_turn_time == test_revenue_drivers["table_turn_time"]
    assert revenue_drivers.peak_factor == test_revenue_drivers["peak_factor"]
    assert revenue_drivers.table_turns == test_revenue_drivers["table_turns"]
    assert revenue_drivers.daily_covers == test_revenue_drivers["daily_covers"]
    assert revenue_drivers.monthly_revenue == test_revenue_drivers["monthly_revenue"]
    
    # Clean up
    mysql_db_session.delete(revenue_drivers)
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

def test_operational_hours_postgres(postgres_db_session):
    """Test operational hours with PostgreSQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    postgres_db_session.add(scenario)
    postgres_db_session.commit()
    
    # Create operational hours
    operational_hours_data = test_operational_hours.copy()
    operational_hours_data["scenario_id"] = scenario.id
    operational_hours = DBOperationalHours(**operational_hours_data)
    postgres_db_session.add(operational_hours)
    postgres_db_session.commit()
    postgres_db_session.refresh(operational_hours)
    
    # Verify operational hours
    assert operational_hours.operating_days == test_operational_hours["operating_days"]
    assert operational_hours.daily_hours == test_operational_hours["daily_hours"]
    assert operational_hours.ramadan_adjustment == test_operational_hours["ramadan_adjustment"]
    
    # Clean up
    postgres_db_session.delete(operational_hours)
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_operational_hours_mysql(mysql_db_session):
    """Test operational hours with MySQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    mysql_db_session.add(scenario)
    mysql_db_session.commit()
    
    # Create operational hours
    operational_hours_data = test_operational_hours.copy()
    operational_hours_data["scenario_id"] = scenario.id
    operational_hours = DBOperationalHours(**operational_hours_data)
    mysql_db_session.add(operational_hours)
    mysql_db_session.commit()
    mysql_db_session.refresh(operational_hours)
    
    # Verify operational hours
    assert operational_hours.operating_days == test_operational_hours["operating_days"]
    assert operational_hours.daily_hours == test_operational_hours["daily_hours"]
    assert operational_hours.ramadan_adjustment == test_operational_hours["ramadan_adjustment"]
    
    # Clean up
    mysql_db_session.delete(operational_hours)
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

def test_efficiency_drivers_postgres(postgres_db_session):
    """Test efficiency drivers with PostgreSQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    postgres_db_session.add(scenario)
    postgres_db_session.commit()
    
    # Create efficiency drivers
    efficiency_drivers_data = test_efficiency_drivers.copy()
    efficiency_drivers_data["scenario_id"] = scenario.id
    efficiency_drivers = DBEfficiencyDrivers(**efficiency_drivers_data)
    postgres_db_session.add(efficiency_drivers)
    postgres_db_session.commit()
    postgres_db_session.refresh(efficiency_drivers)
    
    # Verify efficiency drivers
    assert efficiency_drivers.staff_utilization == test_efficiency_drivers["staff_utilization"]
    assert efficiency_drivers.tech_impact == test_efficiency_drivers["tech_impact"]
    assert efficiency_drivers.cross_training == test_efficiency_drivers["cross_training"]
    assert efficiency_drivers.seasonality_factor == test_efficiency_drivers["seasonality_factor"]
    
    # Clean up
    postgres_db_session.delete(efficiency_drivers)
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_efficiency_drivers_mysql(mysql_db_session):
    """Test efficiency drivers with MySQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    mysql_db_session.add(scenario)
    mysql_db_session.commit()
    
    # Create efficiency drivers
    efficiency_drivers_data = test_efficiency_drivers.copy()
    efficiency_drivers_data["scenario_id"] = scenario.id
    efficiency_drivers = DBEfficiencyDrivers(**efficiency_drivers_data)
    mysql_db_session.add(efficiency_drivers)
    mysql_db_session.commit()
    mysql_db_session.refresh(efficiency_drivers)
    
    # Verify efficiency drivers
    assert efficiency_drivers.staff_utilization == test_efficiency_drivers["staff_utilization"]
    assert efficiency_drivers.tech_impact == test_efficiency_drivers["tech_impact"]
    assert efficiency_drivers.cross_training == test_efficiency_drivers["cross_training"]
    assert efficiency_drivers.seasonality_factor == test_efficiency_drivers["seasonality_factor"]
    
    # Clean up
    mysql_db_session.delete(efficiency_drivers)
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

def test_position_model_postgres(postgres_db_session):
    """Test position model with PostgreSQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    postgres_db_session.add(scenario)
    postgres_db_session.commit()
    
    # Create a position
    position_data = test_position_data.copy()
    position_data["scenario_id"] = scenario.id
    position = DBPosition(**position_data)
    postgres_db_session.add(position)
    postgres_db_session.commit()
    postgres_db_session.refresh(position)
    
    # Verify position data
    assert position.title == test_position_data["title"]
    assert position.salary == test_position_data["salary"]
    assert position.department == test_position_data["department"]
    assert position.level == test_position_data["level"]
    assert position.count == test_position_data["count"]
    assert position.scenario_id == scenario.id
    
    # Clean up
    postgres_db_session.delete(position)
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_position_model_mysql(mysql_db_session):
    """Test position model with MySQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    mysql_db_session.add(scenario)
    mysql_db_session.commit()
    
    # Create a position
    position_data = test_position_data.copy()
    position_data["scenario_id"] = scenario.id
    position = DBPosition(**position_data)
    mysql_db_session.add(position)
    mysql_db_session.commit()
    mysql_db_session.refresh(position)
    
    # Verify position data
    assert position.title == test_position_data["title"]
    assert position.salary == test_position_data["salary"]
    assert position.department == test_position_data["department"]
    assert position.level == test_position_data["level"]
    assert position.count == test_position_data["count"]
    assert position.scenario_id == scenario.id
    
    # Clean up
    mysql_db_session.delete(position)
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

def test_staffing_plan_postgres(postgres_db_session):
    """Test staffing plan with PostgreSQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    postgres_db_session.add(user)
    postgres_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    postgres_db_session.add(scenario)
    postgres_db_session.commit()
    
    # Create a staffing plan
    staffing_plan = DBStaffingPlan(
        scenario_id=scenario.id,
        name="Test Staffing Plan",
        description="Test Description"
    )
    postgres_db_session.add(staffing_plan)
    postgres_db_session.commit()
    postgres_db_session.refresh(staffing_plan)
    
    # Create a position
    position_data = test_position_data.copy()
    position_data["scenario_id"] = scenario.id
    position = DBPosition(**position_data)
    postgres_db_session.add(position)
    postgres_db_session.commit()
    
    # Create a staffing plan position
    staffing_plan_position = DBStaffingPlanPosition(
        staffing_plan_id=staffing_plan.id,
        position_id=position.id,
        count=5
    )
    postgres_db_session.add(staffing_plan_position)
    postgres_db_session.commit()
    postgres_db_session.refresh(staffing_plan_position)
    
    # Verify staffing plan data
    assert staffing_plan.name == "Test Staffing Plan"
    assert staffing_plan.description == "Test Description"
    assert staffing_plan.scenario_id == scenario.id
    assert staffing_plan_position.count == 5
    assert staffing_plan_position.position_id == position.id
    
    # Clean up
    postgres_db_session.delete(staffing_plan_position)
    postgres_db_session.delete(staffing_plan)
    postgres_db_session.delete(position)
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

def test_staffing_plan_mysql(mysql_db_session):
    """Test staffing plan with MySQL"""
    # Create a user and scenario
    user = DBUser(**test_user_data)
    mysql_db_session.add(user)
    mysql_db_session.commit()
    
    scenario_data = test_scenario_data.copy()
    scenario_data["owner_id"] = user.id
    scenario = DBScenario(**scenario_data)
    mysql_db_session.add(scenario)
    mysql_db_session.commit()
    
    # Create a staffing plan
    staffing_plan = DBStaffingPlan(
        scenario_id=scenario.id,
        name="Test Staffing Plan",
        description="Test Description"
    )
    mysql_db_session.add(staffing_plan)
    mysql_db_session.commit()
    mysql_db_session.refresh(staffing_plan)
    
    # Create a position
    position_data = test_position_data.copy()
    position_data["scenario_id"] = scenario.id
    position = DBPosition(**position_data)
    mysql_db_session.add(position)
    mysql_db_session.commit()
    
    # Create a staffing plan position
    staffing_plan_position = DBStaffingPlanPosition(
        staffing_plan_id=staffing_plan.id,
        position_id=position.id,
        count=5
    )
    mysql_db_session.add(staffing_plan_position)
    mysql_db_session.commit()
    mysql_db_session.refresh(staffing_plan_position)
    
    # Verify staffing plan data
    assert staffing_plan.name == "Test Staffing Plan"
    assert staffing_plan.description == "Test Description"
    assert staffing_plan.scenario_id == scenario.id
    assert staffing_plan_position.count == 5
    assert staffing_plan_position.position_id == position.id
    
    # Clean up
    mysql_db_session.delete(staffing_plan_position)
    mysql_db_session.delete(staffing_plan)
    mysql_db_session.delete(position)
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit() 