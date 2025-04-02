from typing import Any, Dict, List, Optional, TypeVar, Generic
from pydantic import BaseModel
from fastapi import HTTPException
from datetime import datetime

T = TypeVar('T')

class PaginationInfo(BaseModel):
    total: int
    page: int
    size: int
    total_pages: int

class Metadata(BaseModel):
    timestamp: datetime
    version: str
    environment: str

class APIResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None
    message: Optional[str] = None
    pagination: Optional[PaginationInfo] = None
    metadata: Optional[Metadata] = None

def create_success_response(
    data: Any,
    message: Optional[str] = None,
    pagination: Optional[Dict[str, int]] = None,
    metadata: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    response = {
        "success": True,
        "data": data,
        "message": message,
        "metadata": {
            "timestamp": datetime.utcnow(),
            "version": "1.0.0",
            "environment": "production"
        }
    }
    
    if pagination:
        response["pagination"] = PaginationInfo(
            total=pagination.get("total", 0),
            page=pagination.get("page", 1),
            size=pagination.get("size", 10),
            total_pages=pagination.get("total_pages", 1)
        )
    
    if metadata:
        response["metadata"].update(metadata)
    
    return response

def create_error_response(
    error: str,
    status_code: int = 400,
    message: Optional[str] = None
) -> HTTPException:
    return HTTPException(
        status_code=status_code,
        detail={
            "success": False,
            "error": error,
            "message": message,
            "metadata": {
                "timestamp": datetime.utcnow(),
                "version": "1.0.0",
                "environment": "production"
            }
        }
    ) 