import pytest
import json
from fastapi import status
from database import DBUser, DBScenario, DBSpaceParameters, DBServiceParameters, DBRevenueDrivers, DBOperationalHours, DBEfficiencyDrivers

# Test data
test_user_data = {
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpassword",
    "is_active": True,
    "is_superuser": False
}

test_scenario_data = {
    "id": "test-scenario-id",
    "name": "Test Scenario",
    "brand": "Test Brand",
    "outlet": "Test Outlet",
    "fohPositions": [
        {
            "id": "pos1",
            "title": "Waiter",
            "salary": 2000.0,
            "department": "FOH",
            "level": 1,
            "count": 5
        }
    ],
    "bohPositions": [
        {
            "id": "pos2",
            "title": "Chef",
            "salary": 3000.0,
            "department": "BOH",
            "level": 2,
            "count": 2
        }
    ],
    "spaceParameters": {
        "totalArea": 100.0,
        "fohPercentage": 70.0,
        "areaPerCover": "2.5",
        "externalSeating": 20,
        "fohArea": 70.0,
        "fohCapacity": 28,
        "totalCapacity": 40
    },
    "serviceParameters": {
        "coversPerWaiter": "20",
        "runnerRatio": "3:1",
        "kitchenStations": 5,
        "serviceStyle": "FULL_SERVICE",
        "waitersRequired": 2,
        "runnersRequired": 1
    },
    "revenueDrivers": {
        "avgSpending": 50.0,
        "dwellingTime": 90,
        "tableTurnTime": 120,
        "peakFactor": 1.5,
        "tableTurns": 8.0,
        "dailyCovers": 320,
        "monthlyRevenue": 480000.0
    },
    "operationalHours": {
        "operatingDays": 30,
        "dailyHours": 12,
        "ramadanAdjustment": False
    },
    "efficiencyDrivers": {
        "staffUtilization": 0.85,
        "techImpact": 0.1,
        "crossTraining": 0.2,
        "seasonalityFactor": 1.2
    }
}

# Helper function to create a test user
def create_test_user(db_session):
    user = DBUser(
        username=test_user_data["username"],
        email=test_user_data["email"],
        hashed_password="hashed_" + test_user_data["password"],
        is_active=test_user_data["is_active"],
        is_superuser=test_user_data["is_superuser"]
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

# Helper function to create a test scenario
def create_test_scenario(db_session, user_id):
    scenario = DBScenario(
        id=test_scenario_data["id"],
        name=test_scenario_data["name"],
        brand=test_scenario_data["brand"],
        outlet=test_scenario_data["outlet"],
        owner_id=user_id
    )
    db_session.add(scenario)
    db_session.commit()
    db_session.refresh(scenario)
    
    # Create space parameters
    space_params = DBSpaceParameters(
        scenario_id=scenario.id,
        total_area=test_scenario_data["spaceParameters"]["totalArea"],
        foh_percentage=test_scenario_data["spaceParameters"]["fohPercentage"],
        area_per_cover=test_scenario_data["spaceParameters"]["areaPerCover"],
        external_seating=test_scenario_data["spaceParameters"]["externalSeating"],
        foh_area=test_scenario_data["spaceParameters"]["fohArea"],
        foh_capacity=test_scenario_data["spaceParameters"]["fohCapacity"],
        total_capacity=test_scenario_data["spaceParameters"]["totalCapacity"]
    )
    db_session.add(space_params)
    
    # Create service parameters
    service_params = DBServiceParameters(
        scenario_id=scenario.id,
        covers_per_waiter=test_scenario_data["serviceParameters"]["coversPerWaiter"],
        runner_ratio=test_scenario_data["serviceParameters"]["runnerRatio"],
        kitchen_stations=test_scenario_data["serviceParameters"]["kitchenStations"],
        service_style=test_scenario_data["serviceParameters"]["serviceStyle"],
        waiters_required=test_scenario_data["serviceParameters"]["waitersRequired"],
        runners_required=test_scenario_data["serviceParameters"]["runnersRequired"]
    )
    db_session.add(service_params)
    
    # Create revenue drivers
    revenue_drivers = DBRevenueDrivers(
        scenario_id=scenario.id,
        avg_spending=test_scenario_data["revenueDrivers"]["avgSpending"],
        dwelling_time=test_scenario_data["revenueDrivers"]["dwellingTime"],
        table_turn_time=test_scenario_data["revenueDrivers"]["tableTurnTime"],
        peak_factor=test_scenario_data["revenueDrivers"]["peakFactor"],
        table_turns=test_scenario_data["revenueDrivers"]["tableTurns"],
        daily_covers=test_scenario_data["revenueDrivers"]["dailyCovers"],
        monthly_revenue=test_scenario_data["revenueDrivers"]["monthlyRevenue"]
    )
    db_session.add(revenue_drivers)
    
    # Create operational hours
    operational_hours = DBOperationalHours(
        scenario_id=scenario.id,
        operating_days=test_scenario_data["operationalHours"]["operatingDays"],
        daily_hours=test_scenario_data["operationalHours"]["dailyHours"],
        ramadan_adjustment=test_scenario_data["operationalHours"]["ramadanAdjustment"]
    )
    db_session.add(operational_hours)
    
    # Create efficiency drivers
    efficiency_drivers = DBEfficiencyDrivers(
        scenario_id=scenario.id,
        staff_utilization=test_scenario_data["efficiencyDrivers"]["staffUtilization"],
        tech_impact=test_scenario_data["efficiencyDrivers"]["techImpact"],
        cross_training=test_scenario_data["efficiencyDrivers"]["crossTraining"],
        seasonality_factor=test_scenario_data["efficiencyDrivers"]["seasonalityFactor"]
    )
    db_session.add(efficiency_drivers)
    
    db_session.commit()
    return scenario

# Test user endpoints with PostgreSQL
def test_create_user_postgres(postgres_client, postgres_db_session):
    """Test creating a user with PostgreSQL"""
    response = postgres_client.post(
        "/users/",
        json=test_user_data
    )
    
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["username"] == test_user_data["username"]
    assert data["email"] == test_user_data["email"]
    assert "id" in data
    
    # Clean up
    user = postgres_db_session.query(DBUser).filter(DBUser.username == test_user_data["username"]).first()
    if user:
        postgres_db_session.delete(user)
        postgres_db_session.commit()

# Test user endpoints with MySQL
def test_create_user_mysql(mysql_client, mysql_db_session):
    """Test creating a user with MySQL"""
    response = mysql_client.post(
        "/users/",
        json=test_user_data
    )
    
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["username"] == test_user_data["username"]
    assert data["email"] == test_user_data["email"]
    assert "id" in data
    
    # Clean up
    user = mysql_db_session.query(DBUser).filter(DBUser.username == test_user_data["username"]).first()
    if user:
        mysql_db_session.delete(user)
        mysql_db_session.commit()

# Test scenario endpoints with PostgreSQL
def test_create_scenario_postgres(postgres_client, postgres_db_session):
    """Test creating a scenario with PostgreSQL"""
    # Create a user first
    user = create_test_user(postgres_db_session)
    
    # Create a scenario
    response = postgres_client.post(
        "/scenarios/",
        json=test_scenario_data
    )
    
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["id"] == test_scenario_data["id"]
    assert data["name"] == test_scenario_data["name"]
    assert data["brand"] == test_scenario_data["brand"]
    assert data["outlet"] == test_scenario_data["outlet"]
    
    # Clean up
    scenario = postgres_db_session.query(DBScenario).filter(DBScenario.id == test_scenario_data["id"]).first()
    if scenario:
        postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

# Test scenario endpoints with MySQL
def test_create_scenario_mysql(mysql_client, mysql_db_session):
    """Test creating a scenario with MySQL"""
    # Create a user first
    user = create_test_user(mysql_db_session)
    
    # Create a scenario
    response = mysql_client.post(
        "/scenarios/",
        json=test_scenario_data
    )
    
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["id"] == test_scenario_data["id"]
    assert data["name"] == test_scenario_data["name"]
    assert data["brand"] == test_scenario_data["brand"]
    assert data["outlet"] == test_scenario_data["outlet"]
    
    # Clean up
    scenario = mysql_db_session.query(DBScenario).filter(DBScenario.id == test_scenario_data["id"]).first()
    if scenario:
        mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

# Test scenario retrieval with PostgreSQL
def test_get_scenario_postgres(postgres_client, postgres_db_session):
    """Test retrieving a scenario with PostgreSQL"""
    # Create a user and scenario
    user = create_test_user(postgres_db_session)
    scenario = create_test_scenario(postgres_db_session, user.id)
    
    # Get the scenario
    response = postgres_client.get(f"/scenarios/{scenario.id}")
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == scenario.id
    assert data["name"] == scenario.name
    assert data["brand"] == scenario.brand
    assert data["outlet"] == scenario.outlet
    
    # Clean up
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

# Test scenario retrieval with MySQL
def test_get_scenario_mysql(mysql_client, mysql_db_session):
    """Test retrieving a scenario with MySQL"""
    # Create a user and scenario
    user = create_test_user(mysql_db_session)
    scenario = create_test_scenario(mysql_db_session, user.id)
    
    # Get the scenario
    response = mysql_client.get(f"/scenarios/{scenario.id}")
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == scenario.id
    assert data["name"] == scenario.name
    assert data["brand"] == scenario.brand
    assert data["outlet"] == scenario.outlet
    
    # Clean up
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

# Test scenario update with PostgreSQL
def test_update_scenario_postgres(postgres_client, postgres_db_session):
    """Test updating a scenario with PostgreSQL"""
    # Create a user and scenario
    user = create_test_user(postgres_db_session)
    scenario = create_test_scenario(postgres_db_session, user.id)
    
    # Update data
    update_data = test_scenario_data.copy()
    update_data["name"] = "Updated Scenario"
    
    # Update the scenario
    response = postgres_client.put(
        f"/scenarios/{scenario.id}",
        json=update_data
    )
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == scenario.id
    assert data["name"] == "Updated Scenario"
    
    # Clean up
    postgres_db_session.delete(scenario)
    postgres_db_session.delete(user)
    postgres_db_session.commit()

# Test scenario update with MySQL
def test_update_scenario_mysql(mysql_client, mysql_db_session):
    """Test updating a scenario with MySQL"""
    # Create a user and scenario
    user = create_test_user(mysql_db_session)
    scenario = create_test_scenario(mysql_db_session, user.id)
    
    # Update data
    update_data = test_scenario_data.copy()
    update_data["name"] = "Updated Scenario"
    
    # Update the scenario
    response = mysql_client.put(
        f"/scenarios/{scenario.id}",
        json=update_data
    )
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == scenario.id
    assert data["name"] == "Updated Scenario"
    
    # Clean up
    mysql_db_session.delete(scenario)
    mysql_db_session.delete(user)
    mysql_db_session.commit()

# Test scenario deletion with PostgreSQL
def test_delete_scenario_postgres(postgres_client, postgres_db_session):
    """Test deleting a scenario with PostgreSQL"""
    # Create a user and scenario
    user = create_test_user(postgres_db_session)
    scenario = create_test_scenario(postgres_db_session, user.id)
    
    # Delete the scenario
    response = postgres_client.delete(f"/scenarios/{scenario.id}")
    
    assert response.status_code == status.HTTP_204_NO_CONTENT
    
    # Verify scenario was deleted
    deleted_scenario = postgres_db_session.query(DBScenario).filter(DBScenario.id == scenario.id).first()
    assert deleted_scenario is None
    
    # Clean up
    postgres_db_session.delete(user)
    postgres_db_session.commit()

# Test scenario deletion with MySQL
def test_delete_scenario_mysql(mysql_client, mysql_db_session):
    """Test deleting a scenario with MySQL"""
    # Create a user and scenario
    user = create_test_user(mysql_db_session)
    scenario = create_test_scenario(mysql_db_session, user.id)
    
    # Delete the scenario
    response = mysql_client.delete(f"/scenarios/{scenario.id}")
    
    assert response.status_code == status.HTTP_204_NO_CONTENT
    
    # Verify scenario was deleted
    deleted_scenario = mysql_db_session.query(DBScenario).filter(DBScenario.id == scenario.id).first()
    assert deleted_scenario is None
    
    # Clean up
    mysql_db_session.delete(user)
    mysql_db_session.commit() 