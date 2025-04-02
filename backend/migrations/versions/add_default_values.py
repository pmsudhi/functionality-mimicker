"""Add default values table

Revision ID: 002
Revises: 001
Create Date: 2023-04-03 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '002'
down_revision = '001'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create default_values table
    op.create_table(
        'default_values',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('category', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('value', postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.text('now()'), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_default_values_id'), 'default_values', ['id'], unique=False)
    op.create_index(op.f('ix_default_values_category'), 'default_values', ['category'], unique=False)
    op.create_index(op.f('ix_default_values_name'), 'default_values', ['name'], unique=False)
    
    # Insert initial default values
    op.execute("""
    INSERT INTO default_values (id, category, name, value, description, created_at, updated_at, is_active)
    VALUES
    -- Staffing defaults
    ('staffing_efficiency', 'staffing', 'efficiency', '0.7', 'Default staff efficiency factor', NOW(), NOW(), true),
    ('staffing_foh_ratio', 'staffing', 'foh_ratio', '0.6', 'Default front-of-house staff ratio', NOW(), NOW(), true),
    ('staffing_boh_ratio', 'staffing', 'boh_ratio', '0.4', 'Default back-of-house staff ratio', NOW(), NOW(), true),
    ('staffing_covers_per_waiter', 'staffing', 'covers_per_waiter', '20', 'Default covers per waiter', NOW(), NOW(), true),
    ('staffing_runner_ratio', 'staffing', 'runner_ratio', '0.5', 'Default runner to waiter ratio', NOW(), NOW(), true),
    
    -- Financial defaults
    ('financial_labor_cost_percentage', 'financial', 'labor_cost_percentage', '30', 'Default labor cost as percentage of revenue', NOW(), NOW(), true),
    ('financial_food_cost_percentage', 'financial', 'food_cost_percentage', '35', 'Default food cost as percentage of revenue', NOW(), NOW(), true),
    ('financial_overhead_percentage', 'financial', 'overhead_percentage', '20', 'Default overhead as percentage of revenue', NOW(), NOW(), true),
    ('financial_growth_rate', 'financial', 'growth_rate', '0.05', 'Default revenue growth rate', NOW(), NOW(), true),
    ('financial_revenue_to_labor_ratio', 'financial', 'revenue_to_labor_ratio', '3', 'Default revenue to labor cost ratio', NOW(), NOW(), true),
    
    -- Operational defaults
    ('operational_peak_factor', 'operational', 'peak_factor', '1.5', 'Default peak hour factor', NOW(), NOW(), true),
    ('operational_dwelling_time', 'operational', 'dwelling_time', '75', 'Default customer dwelling time in minutes', NOW(), NOW(), true),
    ('operational_table_turn_time', 'operational', 'table_turn_time', '120', 'Default table turn time in minutes', NOW(), NOW(), true),
    ('operational_operating_days', 'operational', 'operating_days', '30', 'Default operating days per month', NOW(), NOW(), true),
    ('operational_daily_hours', 'operational', 'daily_hours', '14', 'Default operating hours per day', NOW(), NOW(), true),
    
    -- Efficiency defaults
    ('efficiency_staff_utilization', 'efficiency', 'staff_utilization', '0.85', 'Default staff utilization rate', NOW(), NOW(), true),
    ('efficiency_tech_impact', 'efficiency', 'tech_impact', '0.1', 'Default technology impact factor', NOW(), NOW(), true),
    ('efficiency_cross_training', 'efficiency', 'cross_training', '0.15', 'Default cross-training impact factor', NOW(), NOW(), true),
    ('efficiency_seasonality', 'efficiency', 'seasonality', '1.0', 'Default seasonality factor', NOW(), NOW(), true),
    
    -- Space defaults
    ('space_area_per_cover', 'space', 'area_per_cover', '1.67', 'Default area per cover in square meters', NOW(), NOW(), true),
    ('space_foh_percentage', 'space', 'foh_percentage', '0.7', 'Default front-of-house area percentage', NOW(), NOW(), true),
    ('space_external_seating', 'space', 'external_seating', '0', 'Default external seating capacity', NOW(), NOW(), true)
    """)


def downgrade() -> None:
    op.drop_index(op.f('ix_default_values_name'), table_name='default_values')
    op.drop_index(op.f('ix_default_values_category'), table_name='default_values')
    op.drop_index(op.f('ix_default_values_id'), table_name='default_values')
    op.drop_table('default_values') 