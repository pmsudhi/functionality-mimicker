"""Add operational constants

Revision ID: add_operational_constants
Revises: add_default_values
Create Date: 2024-04-02 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'add_operational_constants'
down_revision = 'add_default_values'
branch_labels = None
depends_on = None

def upgrade():
    # Create operational_constants table
    op.create_table(
        'operational_constants',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('category', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('value', postgresql.JSONB(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('category', 'name')
    )

    # Insert default values
    op.execute("""
        INSERT INTO operational_constants (category, name, value, description) VALUES
        ('shifts', 'standard_shifts', '{"morning": {"start": "06:00", "end": "15:00"}, "afternoon": {"start": "15:00", "end": "23:00"}, "night": {"start": "23:00", "end": "06:00"}}', 'Standard shift times for different periods'),
        ('service', 'service_style_factors', '{"quick_service": 0.8, "casual_dining": 1.0, "fine_dining": 1.2}', 'Service style multipliers for staffing calculations'),
        ('kitchen', 'complexity_factors', '{"simple": 0.8, "moderate": 1.0, "complex": 1.2}', 'Kitchen complexity multipliers for staffing calculations'),
        ('costs', 'high_cost_threshold', '0.4', 'Threshold for identifying high cost percentages'),
        ('traffic', 'peak_traffic_threshold', '100', 'Threshold for identifying high peak traffic'),
        ('staffing', 'significant_reduction_threshold', '0.1', 'Threshold for identifying significant staff reductions')
    """)

def downgrade():
    op.drop_table('operational_constants') 