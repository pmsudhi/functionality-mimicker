from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, List
from functools import wraps
import os

from ..models.auth import User, UserRole
from ..utils.response import create_error_response

# Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

class AuthMiddleware:
    def __init__(self):
        self.public_paths = [
            "/docs",
            "/redoc",
            "/openapi.json",
            "/auth/login",
            "/auth/refresh"
        ]

    async def __call__(self, request: Request, call_next):
        if request.url.path in self.public_paths:
            return await call_next(request)

        try:
            token = await self.get_token(request)
            if not token:
                raise create_error_response(
                    "No authentication token provided",
                    status_code=401,
                    message="Please login to access this resource"
                )

            payload = self.verify_token(token)
            request.state.user = await self.get_user(payload)
            
            return await call_next(request)
        except Exception as e:
            raise create_error_response(
                str(e),
                status_code=401,
                message="Authentication failed"
            )

    async def get_token(self, request: Request) -> Optional[str]:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None
        
        try:
            scheme, token = auth_header.split()
            if scheme.lower() != "bearer":
                return None
            return token
        except ValueError:
            return None

    def verify_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except JWTError:
            raise create_error_response(
                "Invalid token",
                status_code=401,
                message="The authentication token is invalid"
            )

    async def get_user(self, payload: dict) -> User:
        user_id = payload.get("sub")
        if not user_id:
            raise create_error_response(
                "Invalid token payload",
                status_code=401,
                message="The authentication token is malformed"
            )
        
        # Here you would typically fetch the user from your database
        # For now, we'll return a mock user
        return User(
            id=user_id,
            email=payload.get("email"),
            roles=payload.get("roles", [])
        )

def require_roles(roles: List[UserRole]):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            request = kwargs.get("request")
            if not request or not hasattr(request.state, "user"):
                raise create_error_response(
                    "Authentication required",
                    status_code=401,
                    message="Please login to access this resource"
                )

            user = request.state.user
            if not any(role in user.roles for role in roles):
                raise create_error_response(
                    "Insufficient permissions",
                    status_code=403,
                    message="You don't have permission to access this resource"
                )

            return await func(*args, **kwargs)
        return wrapper
    return decorator

# Create token utility functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt 