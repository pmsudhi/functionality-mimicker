import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient
import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import Base, get_db
from main import app
from core.config import settings

# Test database URLs
POSTGRES_TEST_URL = "postgresql://postgres:postgres@localhost:5432/manpower_planning_test"
MYSQL_TEST_URL = "mysql://root:root@localhost:3306/manpower_planning_test"

# Override the database URL for testing
@pytest.fixture(scope="session")
def postgres_engine():
    """Create a PostgreSQL test database engine"""
    # Set environment variable for PostgreSQL
    os.environ["DATABASE_TYPE"] = "postgresql"
    os.environ["POSTGRES_DB"] = "manpower_planning_test"
    
    # Create engine
    engine = create_engine(
        POSTGRES_TEST_URL,
        poolclass=StaticPool,
    )
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    yield engine
    
    # Drop tables after tests
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="session")
def mysql_engine():
    """Create a MySQL test database engine"""
    # Set environment variable for MySQL
    os.environ["DATABASE_TYPE"] = "mysql"
    os.environ["MYSQL_DB"] = "manpower_planning_test"
    
    # Create engine
    engine = create_engine(
        MYSQL_TEST_URL,
        poolclass=StaticPool,
        connect_args={"charset": "utf8mb4"}
    )
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    yield engine
    
    # Drop tables after tests
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def postgres_db_session(postgres_engine):
    """Create a PostgreSQL test database session"""
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=postgres_engine)
    
    # Override the get_db dependency
    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()
    
    app.dependency_overrides[get_db] = override_get_db
    
    yield TestingSessionLocal()
    
    # Reset dependency override
    app.dependency_overrides = {}

@pytest.fixture
def mysql_db_session(mysql_engine):
    """Create a MySQL test database session"""
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=mysql_engine)
    
    # Override the get_db dependency
    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()
    
    app.dependency_overrides[get_db] = override_get_db
    
    yield TestingSessionLocal()
    
    # Reset dependency override
    app.dependency_overrides = {}

@pytest.fixture
def postgres_client(postgres_db_session):
    """Create a test client with PostgreSQL database"""
    with TestClient(app) as client:
        yield client

@pytest.fixture
def mysql_client(mysql_db_session):
    """Create a test client with MySQL database"""
    with TestClient(app) as client:
        yield client 