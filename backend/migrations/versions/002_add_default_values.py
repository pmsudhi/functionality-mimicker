"""Add default values table and initial values

Revision ID: 002
Revises: 001
Create Date: 2024-03-19 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import uuid
from datetime import datetime

# revision identifiers, used by Alembic.
revision = '002'
down_revision = '001'
branch_labels = None
depends_on = None

def upgrade():
    # Create default_values table
    op.create_table(
        'default_values',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('category', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('value', postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True, default=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name')
    )
    
    # Create index on category
    op.create_index(op.f('ix_default_values_category'), 'default_values', ['category'], unique=False)
    
    # Insert initial default values
    op.execute("""
        INSERT INTO default_values (id, category, name, value, description, created_at, updated_at, is_active)
        VALUES
        -- Staffing defaults
        ('{}', 'staffing', 'min_staff_per_shift', '2', 'Minimum number of staff required per shift', NOW(), NOW(), true),
        ('{}', 'staffing', 'max_staff_per_shift', '20', 'Maximum number of staff allowed per shift', NOW(), NOW(), true),
        ('{}', 'staffing', 'staff_buffer_percentage', '0.15', 'Buffer percentage for staff scheduling', NOW(), NOW(), true),
        
        -- Financial defaults
        ('{}', 'financial', 'min_wage', '15.00', 'Minimum hourly wage', NOW(), NOW(), true),
        ('{}', 'financial', 'overtime_multiplier', '1.5', 'Overtime pay multiplier', NOW(), NOW(), true),
        ('{}', 'financial', 'benefits_percentage', '0.25', 'Benefits cost as percentage of salary', NOW(), NOW(), true),
        
        -- Operational defaults
        ('{}', 'operational', 'peak_hour_buffer', '0.3', 'Buffer for peak hour staffing', NOW(), NOW(), true),
        ('{}', 'operational', 'min_shift_length', '4', 'Minimum shift length in hours', NOW(), NOW(), true),
        ('{}', 'operational', 'max_shift_length', '8', 'Maximum shift length in hours', NOW(), NOW(), true),
        
        -- Efficiency defaults
        ('{}', 'efficiency', 'target_utilization', '0.85', 'Target staff utilization rate', NOW(), NOW(), true),
        ('{}', 'efficiency', 'min_cover_per_staff', '20', 'Minimum covers per staff member', NOW(), NOW(), true),
        ('{}', 'efficiency', 'max_cover_per_staff', '40', 'Maximum covers per staff member', NOW(), NOW(), true),
        
        -- Space defaults
        ('{}', 'space', 'min_area_per_cover', '1.5', 'Minimum area per cover in square meters', NOW(), NOW(), true),
        ('{}', 'space', 'max_area_per_cover', '3.0', 'Maximum area per cover in square meters', NOW(), NOW(), true),
        ('{}', 'space', 'kitchen_area_percentage', '0.3', 'Kitchen area as percentage of total area', NOW(), NOW(), true)
    """.format(
        str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4()),
        str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4()),
        str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4()),
        str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4()),
        str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4())
    ))

def downgrade():
    # Drop index
    op.drop_index(op.f('ix_default_values_category'), table_name='default_values')
    
    # Drop table
    op.drop_table('default_values') 