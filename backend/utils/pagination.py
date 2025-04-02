from typing import TypeVar, Generic, List, Optional
from pydantic import BaseModel
from fastapi import Query

T = TypeVar('T')

class PaginationParams(BaseModel):
    page: int = Query(1, ge=1, description="Page number")
    size: int = Query(10, ge=1, le=100, description="Items per page")
    sort_by: Optional[str] = Query(None, description="Field to sort by")
    sort_order: Optional[str] = Query(None, description="Sort order (asc/desc)")

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    size: int
    total_pages: int
    has_next: bool
    has_prev: bool

def paginate(
    items: List[T],
    total: int,
    page: int,
    size: int
) -> PaginatedResponse[T]:
    total_pages = (total + size - 1) // size
    return PaginatedResponse(
        items=items,
        total=total,
        page=page,
        size=size,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_prev=page > 1
    )

def get_pagination_params(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    sort_by: Optional[str] = None,
    sort_order: Optional[str] = None
) -> PaginationParams:
    return PaginationParams(
        page=page,
        size=size,
        sort_by=sort_by,
        sort_order=sort_order
    )

def apply_pagination(
    items: List[T],
    params: PaginationParams
) -> tuple[List[T], int]:
    # Apply sorting if specified
    if params.sort_by:
        reverse = params.sort_order and params.sort_order.lower() == "desc"
        items = sorted(
            items,
            key=lambda x: getattr(x, params.sort_by, 0),
            reverse=reverse
        )
    
    # Calculate pagination
    start = (params.page - 1) * params.size
    end = start + params.size
    paginated_items = items[start:end]
    
    return paginated_items, len(items) 