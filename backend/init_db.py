import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base, DBUser, create_tables, engine, SessionLocal
from auth import get_password_hash
from models import Brand, Outlet, ServiceStyle, Currency, OutletStatus
import uuid

# Get database URL from environment variable or use default
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/fb_manpower")

def init_db():
    """Initialize the database with tables and default admin user"""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if we already have data
        if db.query(Brand).first() is None:
            # Create sample brand
            brand = Brand(
                id=str(uuid.uuid4()),
                name="Sample Restaurant Chain",
                service_style=ServiceStyle.CASUAL_DINING,
                default_parameters={
                    "peak_hours": ["12:00", "13:00", "19:00", "20:00"],
                    "default_currency": Currency.USD.value,
                    "default_service_parameters": {
                        "covers_per_waiter": 16,
                        "runner_ratio": 0.5,
                        "kitchen_stations": 4
                    }
                }
            )
            db.add(brand)
            db.commit()
            db.refresh(brand)
            
            # Create sample outlet
            outlet = Outlet(
                id=str(uuid.uuid4()),
                brand_id=brand.id,
                name="Downtown Branch",
                location="City Center",
                currency=Currency.USD,
                status=OutletStatus.ACTIVE,
                space_parameters={
                    "total_area": 200.0,
                    "foh_percentage": 70.0,
                    "area_per_cover": 1.5,
                    "external_seating": 20
                },
                service_parameters={
                    "covers_per_waiter": 16,
                    "runner_ratio": 0.5,
                    "kitchen_stations": 4
                },
                operational_parameters={
                    "operating_days": 365,
                    "ramadan_adjustment": True,
                    "peak_hour_distribution": {
                        "12:00": 0.2,
                        "13:00": 0.3,
                        "19:00": 0.3,
                        "20:00": 0.2
                    },
                    "average_spend": 50.0,
                    "guest_dwelling_time": 60,
                    "table_turn_time": 90
                }
            )
            db.add(outlet)
            db.commit()
            
            print("Database initialized with sample data")
        else:
            print("Database already contains data")
        
        # Check if admin user exists
        admin_user = db.query(DBUser).filter(DBUser.username == "admin").first()
        
        if not admin_user:
            # Create admin user
            admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
            hashed_password = get_password_hash(admin_password)
            
            admin_user = DBUser(
                username="admin",
                email="admin@example.com",
                hashed_password=hashed_password,
                is_active=True,
                is_superuser=True
            )
            
            db.add(admin_user)
            db.commit()
            print("Admin user created successfully")
        else:
            print("Admin user already exists")
        
        print("Database initialized successfully")
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Initializing database...")
    init_db()

