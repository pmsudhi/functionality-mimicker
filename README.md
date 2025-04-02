# Manpower Planning System

A comprehensive solution for restaurant manpower planning and optimization. This system helps businesses optimize their staffing structure, analyze peak hours, and make data-driven decisions for efficient resource allocation.

## Project Structure

The project is organized as a full-stack application with separate frontend and backend directories:

### Frontend (React + TypeScript + Vite)

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and helpers
│   ├── pages/         # Page components
│   ├── services/      # API and external service integrations
│   ├── styles/        # Global styles and CSS
│   ├── types/         # TypeScript type definitions
│   ├── constants/     # Application constants
│   └── App.tsx        # Root application component
```

### Backend (Python + FastAPI)

```
backend/
├── main.py           # Main application entry point
├── models.py         # Database models
├── database.py       # Database operations
├── calculations.py   # Business logic calculations
├── ml_models.py      # Machine learning models
├── auth.py          # Authentication logic
├── init_db.py       # Database initialization
├── requirements.txt  # Python dependencies
└── Dockerfile       # Container configuration
```

## Features

### Frontend Components
- Interactive Dashboard
- Control Panel for parameter configuration
- Staffing Structure management
- Scenario planning and analysis
- Financial impact assessment
- Peak hour analysis
- Brand and outlet management

### Backend Services
- RESTful API endpoints
- Database operations and management
- Complex staffing calculations
- Machine learning predictions
- Authentication and authorization
- Business logic implementation

## Technology Stack

### Frontend
- React 18.x
- TypeScript
- Vite build tool
- React Router for navigation
- Context API for state management
- Modern UI components
- Data visualization libraries

### Backend
- Python
- FastAPI framework
- SQLAlchemy ORM
- Machine Learning capabilities
- JWT Authentication
- Docker containerization

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- Python 3.8 or higher
- Docker and Docker Compose
- Git

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database:
   ```bash
   python init_db.py
   ```

5. Start the server:
   ```bash
   python main.py
   ```

### Docker Deployment
1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

## Deployment

The application is configured to be deployed under the `/solutions/manpower/` path. The frontend uses:
- Vite base configuration: `base: '/solutions/manpower/'`
- React Router basename: `basename="/solutions/manpower"`

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use functional components with hooks
   - Implement proper error handling
   - Write clean, documented code

2. **State Management**
   - Use Context API for global state
   - Implement proper data caching
   - Handle loading and error states

3. **Testing**
   - Write unit tests for components
   - Test API integrations
   - Perform end-to-end testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For support, please contact the development team or raise an issue in the repository. 