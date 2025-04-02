import pytest
from fastapi.testclient import TestClient
from models import ServiceStyle, Currency, OutletStatus

def test_create_brand(client):
    response = client.post(
        "/brands/",
        json={
            "name": "Test Brand",
            "service_style": ServiceStyle.CASUAL_DINING.value,
            "default_parameters": {
                "peak_hours": ["12:00", "13:00", "19:00", "20:00"],
                "default_currency": Currency.USD.value
            }
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Brand"
    assert data["service_style"] == ServiceStyle.CASUAL_DINING.value
    assert "id" in data
    return data

def test_list_brands(client):
    # Create a brand first
    created_brand = test_create_brand(client)
    
    response = client.get("/brands/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(brand["id"] == created_brand["id"] for brand in data)

def test_get_brand(client):
    # Create a brand first
    created_brand = test_create_brand(client)
    
    response = client.get(f"/brands/{created_brand['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == created_brand["id"]
    assert data["name"] == created_brand["name"]

def test_update_brand(client):
    # Create a brand first
    created_brand = test_create_brand(client)
    
    update_data = {
        "name": "Updated Brand Name",
        "service_style": ServiceStyle.PREMIUM_DINING.value
    }
    
    response = client.put(f"/brands/{created_brand['id']}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == update_data["name"]
    assert data["service_style"] == update_data["service_style"]

def test_delete_brand(client):
    # Create a brand first
    created_brand = test_create_brand(client)
    
    response = client.delete(f"/brands/{created_brand['id']}")
    assert response.status_code == 204
    
    # Verify brand is deleted
    response = client.get(f"/brands/{created_brand['id']}")
    assert response.status_code == 404

def test_create_outlet(client):
    # Create a brand first
    created_brand = test_create_brand(client)
    
    outlet_data = {
        "brand_id": created_brand["id"],
        "name": "Test Outlet",
        "location": "Test Location",
        "currency": Currency.USD.value,
        "status": OutletStatus.PLANNED.value,
        "space_parameters": {
            "total_area": 200.0,
            "foh_percentage": 70.0,
            "area_per_cover": 1.5,
            "external_seating": 20
        },
        "service_parameters": {
            "covers_per_waiter": 16,
            "runner_ratio": 0.5,
            "kitchen_stations": 4
        },
        "operational_parameters": {
            "operating_days": 365,
            "ramadan_adjustment": True,
            "peak_hour_distribution": {"12:00": 0.2, "13:00": 0.3, "19:00": 0.3, "20:00": 0.2},
            "average_spend": 50.0,
            "guest_dwelling_time": 60,
            "table_turn_time": 90
        }
    }
    
    response = client.post("/outlets/", json=outlet_data)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == outlet_data["name"]
    assert data["brand_id"] == created_brand["id"]
    assert "id" in data
    return data

def test_list_outlets(client):
    # Create an outlet first
    created_outlet = test_create_outlet(client)
    
    response = client.get("/outlets/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(outlet["id"] == created_outlet["id"] for outlet in data)
    
    # Test filtering by brand_id
    response = client.get(f"/outlets/?brand_id={created_outlet['brand_id']}")
    assert response.status_code == 200
    data = response.json()
    assert all(outlet["brand_id"] == created_outlet["brand_id"] for outlet in data)

def test_get_outlet(client):
    # Create an outlet first
    created_outlet = test_create_outlet(client)
    
    response = client.get(f"/outlets/{created_outlet['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == created_outlet["id"]
    assert data["name"] == created_outlet["name"]

def test_update_outlet(client):
    # Create an outlet first
    created_outlet = test_create_outlet(client)
    
    update_data = {
        "name": "Updated Outlet Name",
        "location": "Updated Location",
        "status": OutletStatus.ACTIVE.value,
        "space_parameters": {
            "total_area": 250.0,
            "foh_percentage": 75.0,
            "area_per_cover": 1.67,
            "external_seating": 30
        }
    }
    
    response = client.put(f"/outlets/{created_outlet['id']}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == update_data["name"]
    assert data["location"] == update_data["location"]
    assert data["status"] == update_data["status"]

def test_delete_outlet(client):
    # Create an outlet first
    created_outlet = test_create_outlet(client)
    
    response = client.delete(f"/outlets/{created_outlet['id']}")
    assert response.status_code == 204
    
    # Verify outlet is deleted
    response = client.get(f"/outlets/{created_outlet['id']}")
    assert response.status_code == 404

def test_brand_not_found(client):
    response = client.get("/brands/nonexistent-id")
    assert response.status_code == 404
    
    response = client.put("/brands/nonexistent-id", json={"name": "Test"})
    assert response.status_code == 404
    
    response = client.delete("/brands/nonexistent-id")
    assert response.status_code == 404

def test_outlet_not_found(client):
    response = client.get("/outlets/nonexistent-id")
    assert response.status_code == 404
    
    response = client.put("/outlets/nonexistent-id", json={"name": "Test"})
    assert response.status_code == 404
    
    response = client.delete("/outlets/nonexistent-id")
    assert response.status_code == 404

def test_create_outlet_invalid_brand(client):
    outlet_data = {
        "brand_id": "nonexistent-id",
        "name": "Test Outlet",
        "location": "Test Location",
        "currency": Currency.USD.value,
        "status": OutletStatus.PLANNED.value,
        "space_parameters": {
            "total_area": 200.0,
            "foh_percentage": 70.0,
            "area_per_cover": 1.5,
            "external_seating": 20
        },
        "service_parameters": {
            "covers_per_waiter": 16,
            "runner_ratio": 0.5,
            "kitchen_stations": 4
        },
        "operational_parameters": {
            "operating_days": 365,
            "ramadan_adjustment": True,
            "peak_hour_distribution": {"12:00": 0.2, "13:00": 0.3, "19:00": 0.3, "20:00": 0.2},
            "average_spend": 50.0,
            "guest_dwelling_time": 60,
            "table_turn_time": 90
        }
    }
    
    response = client.post("/outlets/", json=outlet_data)
    assert response.status_code == 404
    assert response.json()["detail"] == "Brand not found" 