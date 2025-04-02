# Manpower Planning System - Backend

A FastAPI-based backend service for restaurant manpower planning and optimization. Built with Python, featuring machine learning capabilities and robust data processing. This is the backend service for the Manpower Planning application. It supports both PostgreSQL and MySQL databases.

## Project Structure

```
backend/
├── main.py              # FastAPI application entry point and route definitions
├── models.py            # Data models and schema definitions
├── database.py          # Database configuration and operations
├── calculations.py      # Business logic and calculations
├── ml_models.py         # Machine learning model implementations
├── auth.py             # Authentication and authorization logic
├── init_db.py          # Database initialization script
├── requirements.txt    # Python dependencies
├── Dockerfile         # Container configuration
└── docker-compose.yml # Container orchestration
```

## Core Components

### 1. API Routes (`main.py`)
- Authentication endpoints
- Scenario management
- Calculation endpoints
- ML model endpoints

### 2. Data Models (`models.py`)
- Scenario models
- Parameter models
- Result models
- User models

### 3. Database Operations (`database.py`)
- Database connection management
- CRUD operations
- Query utilities
- Migration handling

### 4. Business Logic (`calculations.py`)
- Staffing requirement calculations
- Revenue projections
- Profit & Loss calculations
- Peak hour analysis
- Optimization algorithms

### 5. Machine Learning (`ml_models.py`)
- Demand forecasting models
- Staffing optimization models
- Model training utilities
- Prediction endpoints

### 6. Authentication (`auth.py`)
- User management
- JWT token handling
- Permission management
- Security utilities

## API Endpoints

### Authentication
- POST `/token` - Get access token
- POST `/users/` - Create new user
- GET `/users/me/` - Get current user info

### Scenarios
- GET `/scenarios/` - List scenarios
- GET `/scenarios/{id}` - Get specific scenario
- POST `/scenarios/` - Create scenario
- PUT `/scenarios/{id}` - Update scenario
- DELETE `/scenarios/{id}` - Delete scenario

### Calculations
- POST `/calculations/staffing` - Calculate staffing requirements
- POST `/calculations/revenue` - Generate revenue projections
- POST `/calculations/pl` - Calculate profit & loss
- POST `/calculations/peak-hours` - Analyze peak hours
- POST `/calculations/optimize` - Optimize staffing
- POST `/calculations/what-if` - Run what-if analysis
- POST `/calculations/compare` - Compare scenarios

### Machine Learning
- POST `/ml/demand-forecast` - Get demand predictions
- POST `/ml/train-demand-model` - Train demand forecasting model
- POST `/ml/train-staffing-model` - Train staffing optimization model

## Technology Stack

### Core
- Python 3.8+
- FastAPI
- SQLAlchemy
- Pydantic

### Machine Learning
- NumPy
- Pandas
- Scikit-learn
- TensorFlow (optional)

### Database
- PostgreSQL
- Alembic (migrations)

### Authentication
- JWT tokens
- OAuth2 with Password flow
- Bcrypt for password hashing

## Development Setup

1. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize Database**
   ```bash
   python init_db.py
   ```

4. **Run Development Server**
   ```bash
   uvicorn main:app --reload
   ```

## Docker Deployment

1. **Build Image**
   ```bash
   docker build -t manpower-planning-backend .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up
   ```

## Environment Variables

Create a `.env` file:
```env
DATABASE_URL=postgresql://user:password@localhost/dbname
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=["http://localhost:3000"]
```

## Database Management

1. **Initialize Database**
   ```bash
   python init_db.py
   ```

2. **Run Migrations**
   ```bash
   alembic upgrade head
   ```

3. **Create New Migration**
   ```bash
   alembic revision -m "description"
   ```

## Machine Learning Models

### Demand Forecasting
- Random Forest Regressor
- Gradient Boosting
- Neural Networks (optional)

### Staffing Optimization
- Linear Programming
- Genetic Algorithms
- Reinforcement Learning (experimental)

## Error Handling

The API implements comprehensive error handling:
- HTTP status codes
- Detailed error messages
- Input validation
- Authentication errors
- Database errors

## Security Features

1. **Authentication**
   - JWT token-based
   - Password hashing
   - Token expiration

2. **Authorization**
   - Role-based access
   - Resource ownership
   - Superuser privileges

3. **Data Protection**
   - Input validation
   - SQL injection prevention
   - CORS configuration

## Testing

1. **Run Tests**
   ```bash
   pytest
   ```

2. **Coverage Report**
   ```bash
   pytest --cov=app tests/
   ```

## Performance Optimization

1. **Database**
   - Connection pooling
   - Query optimization
   - Caching strategies

2. **API**
   - Response pagination
   - Async operations
   - Background tasks

3. **ML Models**
   - Model caching
   - Batch predictions
   - Periodic retraining

## Contributing

1. Follow PEP 8 style guide
2. Write unit tests for new features
3. Update documentation
4. Use type hints
5. Handle errors appropriately

## Support

For support, please contact the development team or refer to the internal documentation.

## Prerequisites

- Python 3.8+
- PostgreSQL 12+ or MySQL 8.0+
- Docker (optional)

## Installation

1. Clone the repository
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy the environment file and configure it:
```bash
cp .env.example .env
```

5. Edit the `.env` file with your database configuration:
```env
# Choose your database type
DATABASE_TYPE=postgresql  # or mysql

# Configure your database connection
# For PostgreSQL:
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=manpower_planning

# For MySQL:
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=manpower_planning
```

## Database Setup

### PostgreSQL
1. Create a database:
```sql
CREATE DATABASE manpower_planning;
```

### MySQL
1. Create a database:
```sql
CREATE DATABASE manpower_planning CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Running Migrations

The application uses Alembic for database migrations. To run migrations:

```bash
# Initialize migrations (first time only)
alembic init migrations

# Create a new migration
alembic revision --autogenerate -m "description"

# Run migrations
alembic upgrade head
```

## Running the Application

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the application is running, you can access:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

### Adding New Models

1. Create your model in `models.py`
2. Add database model in `database.py`
3. Create a new migration:
```bash
alembic revision --autogenerate -m "add new model"
```
4. Apply the migration:
```bash
alembic upgrade head
```

### Database-Specific Considerations

#### PostgreSQL
- Native JSON support
- Better handling of concurrent operations
- More flexible with schema changes

#### MySQL
- JSON stored as TEXT (automatically handled by the application)
- Better performance for read-heavy operations
- More strict with data types

## Testing

```bash
pytest
```

## Docker Support

Build and run with Docker:

```bash
docker-compose up --build
```

## License

MIT

