import pytest
from alembic import command
from alembic.config import Config
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os

# Test database URLs
POSTGRES_TEST_URL = "postgresql://postgres:postgres@localhost:5432/test_db"
MYSQL_TEST_URL = "mysql+pymysql://root:root@localhost:3306/test_db"

def get_alembic_config():
    """Get Alembic configuration"""
    config = Config()
    config.set_main_option("script_location", "alembic")
    return config

def test_migrations_postgres():
    """Test migrations with PostgreSQL"""
    # Create test database
    engine = create_engine(POSTGRES_TEST_URL)
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))
        conn.execute(text("CREATE DATABASE test_db"))
    
    # Run migrations
    config = get_alembic_config()
    config.set_main_option("sqlalchemy.url", POSTGRES_TEST_URL)
    
    # Run upgrade
    command.upgrade(config, "head")
    
    # Verify tables exist
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """))
        tables = [row[0] for row in result]
        
        expected_tables = [
            "alembic_version",
            "users",
            "scenarios",
            "space_parameters",
            "service_parameters",
            "revenue_drivers",
            "operational_hours",
            "efficiency_drivers",
            "positions",
            "staffing_plans",
            "staffing_plan_positions"
        ]
        
        for table in expected_tables:
            assert table in tables, f"Table {table} not found in PostgreSQL database"
    
    # Run downgrade
    command.downgrade(config, "base")
    
    # Verify tables are removed
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """))
        tables = [row[0] for row in result]
        
        for table in expected_tables:
            assert table not in tables, f"Table {table} still exists in PostgreSQL database"
    
    # Clean up
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))

def test_migrations_mysql():
    """Test migrations with MySQL"""
    # Create test database
    engine = create_engine(MYSQL_TEST_URL)
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))
        conn.execute(text("CREATE DATABASE test_db"))
    
    # Run migrations
    config = get_alembic_config()
    config.set_main_option("sqlalchemy.url", MYSQL_TEST_URL)
    
    # Run upgrade
    command.upgrade(config, "head")
    
    # Verify tables exist
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'test_db'
        """))
        tables = [row[0] for row in result]
        
        expected_tables = [
            "alembic_version",
            "users",
            "scenarios",
            "space_parameters",
            "service_parameters",
            "revenue_drivers",
            "operational_hours",
            "efficiency_drivers",
            "positions",
            "staffing_plans",
            "staffing_plan_positions"
        ]
        
        for table in expected_tables:
            assert table in tables, f"Table {table} not found in MySQL database"
    
    # Run downgrade
    command.downgrade(config, "base")
    
    # Verify tables are removed
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'test_db'
        """))
        tables = [row[0] for row in result]
        
        for table in expected_tables:
            assert table not in tables, f"Table {table} still exists in MySQL database"
    
    # Clean up
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))

def test_migration_data_types_postgres():
    """Test migration data types with PostgreSQL"""
    # Create test database
    engine = create_engine(POSTGRES_TEST_URL)
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))
        conn.execute(text("CREATE DATABASE test_db"))
    
    # Run migrations
    config = get_alembic_config()
    config.set_main_option("sqlalchemy.url", POSTGRES_TEST_URL)
    command.upgrade(config, "head")
    
    # Verify data types
    with engine.connect() as conn:
        # Check users table
        result = conn.execute(text("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users'
        """))
        columns = {row[0]: row[1] for row in result}
        assert columns["id"] == "integer"
        assert columns["username"] == "character varying"
        assert columns["email"] == "character varying"
        assert columns["hashed_password"] == "character varying"
        assert columns["is_active"] == "boolean"
        assert columns["is_superuser"] == "boolean"
        
        # Check scenarios table
        result = conn.execute(text("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'scenarios'
        """))
        columns = {row[0]: row[1] for row in result}
        assert columns["id"] == "integer"
        assert columns["name"] == "character varying"
        assert columns["brand"] == "character varying"
        assert columns["outlet"] == "character varying"
        assert columns["owner_id"] == "integer"
        
        # Check space_parameters table
        result = conn.execute(text("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'space_parameters'
        """))
        columns = {row[0]: row[1] for row in result}
        assert columns["id"] == "integer"
        assert columns["scenario_id"] == "integer"
        assert columns["total_area"] == "numeric"
        assert columns["foh_percentage"] == "numeric"
        assert columns["area_per_cover"] == "character varying"
        assert columns["external_seating"] == "integer"
        assert columns["foh_area"] == "numeric"
        assert columns["foh_capacity"] == "integer"
        assert columns["total_capacity"] == "integer"
    
    # Clean up
    command.downgrade(config, "base")
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))

def test_migration_data_types_mysql():
    """Test migration data types with MySQL"""
    # Create test database
    engine = create_engine(MYSQL_TEST_URL)
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))
        conn.execute(text("CREATE DATABASE test_db"))
    
    # Run migrations
    config = get_alembic_config()
    config.set_main_option("sqlalchemy.url", MYSQL_TEST_URL)
    command.upgrade(config, "head")
    
    # Verify data types
    with engine.connect() as conn:
        # Check users table
        result = conn.execute(text("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'test_db' AND table_name = 'users'
        """))
        columns = {row[0]: row[1] for row in result}
        assert columns["id"] == "int"
        assert columns["username"] == "varchar"
        assert columns["email"] == "varchar"
        assert columns["hashed_password"] == "varchar"
        assert columns["is_active"] == "tinyint"
        assert columns["is_superuser"] == "tinyint"
        
        # Check scenarios table
        result = conn.execute(text("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'test_db' AND table_name = 'scenarios'
        """))
        columns = {row[0]: row[1] for row in result}
        assert columns["id"] == "int"
        assert columns["name"] == "varchar"
        assert columns["brand"] == "varchar"
        assert columns["outlet"] == "varchar"
        assert columns["owner_id"] == "int"
        
        # Check space_parameters table
        result = conn.execute(text("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'test_db' AND table_name = 'space_parameters'
        """))
        columns = {row[0]: row[1] for row in result}
        assert columns["id"] == "int"
        assert columns["scenario_id"] == "int"
        assert columns["total_area"] == "decimal"
        assert columns["foh_percentage"] == "decimal"
        assert columns["area_per_cover"] == "varchar"
        assert columns["external_seating"] == "int"
        assert columns["foh_area"] == "decimal"
        assert columns["foh_capacity"] == "int"
        assert columns["total_capacity"] == "int"
    
    # Clean up
    command.downgrade(config, "base")
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))

def test_migration_constraints_postgres():
    """Test migration constraints with PostgreSQL"""
    # Create test database
    engine = create_engine(POSTGRES_TEST_URL)
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))
        conn.execute(text("CREATE DATABASE test_db"))
    
    # Run migrations
    config = get_alembic_config()
    config.set_main_option("sqlalchemy.url", POSTGRES_TEST_URL)
    command.upgrade(config, "head")
    
    # Verify constraints
    with engine.connect() as conn:
        # Check primary keys
        result = conn.execute(text("""
            SELECT tc.table_name, kc.column_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kc
            ON kc.constraint_name = tc.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
        """))
        primary_keys = {(row[0], row[1]) for row in result}
        assert ("users", "id") in primary_keys
        assert ("scenarios", "id") in primary_keys
        assert ("space_parameters", "id") in primary_keys
        
        # Check foreign keys
        result = conn.execute(text("""
            SELECT tc.table_name, kc.column_name, ccu.table_name AS foreign_table_name,
                   ccu.column_name AS foreign_column_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kc
            ON kc.constraint_name = tc.constraint_name
            JOIN information_schema.constraint_column_usage ccu
            ON ccu.constraint_name = tc.constraint_name
            WHERE tc.constraint_type = 'FOREIGN KEY'
        """))
        foreign_keys = {(row[0], row[1], row[2], row[3]) for row in result}
        assert ("scenarios", "owner_id", "users", "id") in foreign_keys
        assert ("space_parameters", "scenario_id", "scenarios", "id") in foreign_keys
        
        # Check unique constraints
        result = conn.execute(text("""
            SELECT tc.table_name, kc.column_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kc
            ON kc.constraint_name = tc.constraint_name
            WHERE tc.constraint_type = 'UNIQUE'
        """))
        unique_constraints = {(row[0], row[1]) for row in result}
        assert ("users", "username") in unique_constraints
        assert ("users", "email") in unique_constraints
    
    # Clean up
    command.downgrade(config, "base")
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))

def test_migration_constraints_mysql():
    """Test migration constraints with MySQL"""
    # Create test database
    engine = create_engine(MYSQL_TEST_URL)
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db"))
        conn.execute(text("CREATE DATABASE test_db"))
    
    # Run migrations
    config = get_alembic_config()
    config.set_main_option("sqlalchemy.url", MYSQL_TEST_URL)
    command.upgrade(config, "head")
    
    # Verify constraints
    with engine.connect() as conn:
        # Check primary keys
        result = conn.execute(text("""
            SELECT table_name, column_name
            FROM information_schema.key_column_usage
            WHERE table_schema = 'test_db'
            AND constraint_name = 'PRIMARY'
        """))
        primary_keys = {(row[0], row[1]) for row in result}
        assert ("users", "id") in primary_keys
        assert ("scenarios", "id") in primary_keys
        assert ("space_parameters", "id") in primary_keys
        
        # Check foreign keys
        result = conn.execute(text("""
            SELECT table_name, column_name, referenced_table_name,
                   referenced_column_name
            FROM information_schema.key_column_usage
            WHERE table_schema = 'test_db'
            AND referenced_table_name IS NOT NULL
        """))
        foreign_keys = {(row[0], row[1], row[2], row[3]) for row in result}
        assert ("scenarios", "owner_id", "users", "id") in foreign_keys
        assert ("space_parameters", "scenario_id", "scenarios", "id") in foreign_keys
        
        # Check unique constraints
        result = conn.execute(text("""
            SELECT table_name, column_name
            FROM information_schema.statistics
            WHERE table_schema = 'test_db'
            AND non_unique = 0
            AND index_name != 'PRIMARY'
        """))
        unique_constraints = {(row[0], row[1]) for row in result}
        assert ("users", "username") in unique_constraints
        assert ("users", "email") in unique_constraints
    
    # Clean up
    command.downgrade(config, "base")
    with engine.connect() as conn:
        conn.execute(text("DROP DATABASE IF EXISTS test_db")) 