"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2023-04-02 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create enum types
    op.execute("CREATE TYPE service_style AS ENUM ('Fast Casual', 'Casual Dining', 'Premium Dining')")
    op.execute("CREATE TYPE currency AS ENUM ('SAR', 'AED', 'KWD', 'BHD', 'OMR', 'QAR', 'GBP', 'USD')")
    op.execute("CREATE TYPE outlet_status AS ENUM ('Active', 'Inactive', 'Planned')")
    
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
        sa.Column('is_superuser', sa.Boolean(), nullable=False, default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('username'),
        sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    
    # Create staff_positions table
    op.create_table(
        'staff_positions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('position_id', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('salary', sa.Float(), nullable=False),
        sa.Column('department', sa.String(), nullable=False),
        sa.Column('level', sa.Integer(), nullable=False),
        sa.Column('count', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_staff_positions_id'), 'staff_positions', ['id'], unique=False)
    op.create_index(op.f('ix_staff_positions_position_id'), 'staff_positions', ['position_id'], unique=False)
    
    # Create scenarios table
    op.create_table(
        'scenarios',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('brand', sa.String(), nullable=True),
        sa.Column('outlet', sa.String(), nullable=True),
        sa.Column('owner_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.text('now()'), nullable=True),
        sa.Column('totals', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_scenarios_id'), 'scenarios', ['id'], unique=False)
    op.create_index(op.f('ix_scenarios_name'), 'scenarios', ['name'], unique=False)
    
    # Create scenario_foh_positions association table
    op.create_table(
        'scenario_foh_positions',
        sa.Column('scenario_id', sa.String(), nullable=False),
        sa.Column('position_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['position_id'], ['staff_positions.id'], ),
        sa.ForeignKeyConstraint(['scenario_id'], ['scenarios.id'], ),
        sa.PrimaryKeyConstraint('scenario_id', 'position_id')
    )
    
    # Create scenario_boh_positions association table
    op.create_table(
        'scenario_boh_positions',
        sa.Column('scenario_id', sa.String(), nullable=False),
        sa.Column('position_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['position_id'], ['staff_positions.id'], ),
        sa.ForeignKeyConstraint(['scenario_id'], ['scenarios.id'], ),
        sa.PrimaryKeyConstraint('scenario_id', 'position_id')
    )
    
    # Create space_parameters table
    op.create_table(
        'space_parameters',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('scenario_id', sa.String(), nullable=False),
        sa.Column('total_area', sa.Float(), nullable=False),
        sa.Column('foh_percentage', sa.Float(), nullable=False),
        sa.Column('area_per_cover', sa.String(), nullable=False),
        sa.Column('external_seating', sa.Integer(), nullable=False),
        sa.Column('foh_area', sa.Float(), nullable=True),
        sa.Column('foh_capacity', sa.Integer(), nullable=True),
        sa.Column('total_capacity', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['scenario_id'], ['scenarios.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_space_parameters_id'), 'space_parameters', ['id'], unique=False)
    op.create_index(op.f('ix_space_parameters_scenario_id'), 'space_parameters', ['scenario_id'], unique=True)
    
    # Create service_parameters table
    op.create_table(
        'service_parameters',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('scenario_id', sa.String(), nullable=False),
        sa.Column('covers_per_waiter', sa.String(), nullable=False),
        sa.Column('runner_ratio', sa.String(), nullable=False),
        sa.Column('kitchen_stations', sa.Integer(), nullable=False),
        sa.Column('service_style', sa.String(), nullable=False),
        sa.Column('waiters_required', sa.Integer(), nullable=True),
        sa.Column('runners_required', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['scenario_id'], ['scenarios.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_service_parameters_id'), 'service_parameters', ['id'], unique=False)
    op.create_index(op.f('ix_service_parameters_scenario_id'), 'service_parameters', ['scenario_id'], unique=True)
    
    # Create revenue_drivers table
    op.create_table(
        'revenue_drivers',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('scenario_id', sa.String(), nullable=False),
        sa.Column('avg_spending', sa.Float(), nullable=False),
        sa.Column('dwelling_time', sa.Integer(), nullable=False),
        sa.Column('table_turn_time', sa.Integer(), nullable=False),
        sa.Column('peak_factor', sa.Float(), nullable=False),
        sa.Column('table_turns', sa.Float(), nullable=True),
        sa.Column('daily_covers', sa.Integer(), nullable=True),
        sa.Column('monthly_revenue', sa.Float(), nullable=True),
        sa.ForeignKeyConstraint(['scenario_id'], ['scenarios.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_revenue_drivers_id'), 'revenue_drivers', ['id'], unique=False)
    op.create_index(op.f('ix_revenue_drivers_scenario_id'), 'revenue_drivers', ['scenario_id'], unique=True)
    
    # Create operational_hours table
    op.create_table(
        'operational_hours',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('scenario_id', sa.String(), nullable=False),
        sa.Column('operating_days', sa.Integer(), nullable=False),
        sa.Column('daily_hours', sa.Integer(), nullable=False),
        sa.Column('ramadan_adjustment', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['scenario_id'], ['scenarios.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_operational_hours_id'), 'operational_hours', ['id'], unique=False)
    op.create_index(op.f('ix_operational_hours_scenario_id'), 'operational_hours', ['scenario_id'], unique=True)
    
    # Create efficiency_drivers table
    op.create_table(
        'efficiency_drivers',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('scenario_id', sa.String(), nullable=False),
        sa.Column('staff_utilization', sa.Float(), nullable=False),
        sa.Column('tech_impact', sa.Float(), nullable=False),
        sa.Column('cross_training', sa.Float(), nullable=False),
        sa.Column('seasonality_factor', sa.Float(), nullable=False),
        sa.ForeignKeyConstraint(['scenario_id'], ['scenarios.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_efficiency_drivers_id'), 'efficiency_drivers', ['id'], unique=False)
    op.create_index(op.f('ix_efficiency_drivers_scenario_id'), 'efficiency_drivers', ['scenario_id'], unique=True)
    
    # Create brands table
    op.create_table(
        'brands',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('service_style', postgresql.ENUM('Fast Casual', 'Casual Dining', 'Premium Dining', name='service_style'), nullable=False),
        sa.Column('default_parameters', postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()'), onupdate=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_brands_id'), 'brands', ['id'], unique=False)
    op.create_index(op.f('ix_brands_name'), 'brands', ['name'], unique=True)
    
    # Create outlets table
    op.create_table(
        'outlets',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('brand_id', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('location', sa.String(), nullable=False),
        sa.Column('currency', postgresql.ENUM('SAR', 'AED', 'KWD', 'BHD', 'OMR', 'QAR', 'GBP', 'USD', name='currency'), nullable=False),
        sa.Column('status', postgresql.ENUM('Active', 'Inactive', 'Planned', name='outlet_status'), nullable=False, server_default='Planned'),
        sa.Column('space_parameters', postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column('service_parameters', postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column('operational_parameters', postgresql.JSON(astext_type=sa.Text()), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()'), onupdate=sa.text('now()')),
        sa.ForeignKeyConstraint(['brand_id'], ['brands.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_outlets_id'), 'outlets', ['id'], unique=False)
    op.create_index(op.f('ix_outlets_brand_id'), 'outlets', ['brand_id'], unique=False)


def downgrade() -> None:
    # Drop tables in reverse order
    op.drop_index(op.f('ix_outlets_brand_id'), table_name='outlets')
    op.drop_index(op.f('ix_outlets_id'), table_name='outlets')
    op.drop_table('outlets')
    
    op.drop_index(op.f('ix_brands_name'), table_name='brands')
    op.drop_index(op.f('ix_brands_id'), table_name='brands')
    op.drop_table('brands')
    
    op.drop_index(op.f('ix_efficiency_drivers_scenario_id'), table_name='efficiency_drivers')
    op.drop_index(op.f('ix_efficiency_drivers_id'), table_name='efficiency_drivers')
    op.drop_table('efficiency_drivers')
    
    op.drop_index(op.f('ix_operational_hours_scenario_id'), table_name='operational_hours')
    op.drop_index(op.f('ix_operational_hours_id'), table_name='operational_hours')
    op.drop_table('operational_hours')
    
    op.drop_index(op.f('ix_revenue_drivers_scenario_id'), table_name='revenue_drivers')
    op.drop_index(op.f('ix_revenue_drivers_id'), table_name='revenue_drivers')
    op.drop_table('revenue_drivers')
    
    op.drop_index(op.f('ix_service_parameters_scenario_id'), table_name='service_parameters')
    op.drop_index(op.f('ix_service_parameters_id'), table_name='service_parameters')
    op.drop_table('service_parameters')
    
    op.drop_index(op.f('ix_space_parameters_scenario_id'), table_name='space_parameters')
    op.drop_index(op.f('ix_space_parameters_id'), table_name='space_parameters')
    op.drop_table('space_parameters')
    
    op.drop_table('scenario_boh_positions')
    op.drop_table('scenario_foh_positions')
    
    op.drop_index(op.f('ix_scenarios_name'), table_name='scenarios')
    op.drop_index(op.f('ix_scenarios_id'), table_name='scenarios')
    op.drop_table('scenarios')
    
    op.drop_index(op.f('ix_staff_positions_position_id'), table_name='staff_positions')
    op.drop_index(op.f('ix_staff_positions_id'), table_name='staff_positions')
    op.drop_table('staff_positions')
    
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
    
    # Drop enum types
    op.execute('DROP TYPE outlet_status')
    op.execute('DROP TYPE currency')
    op.execute('DROP TYPE service_style') 