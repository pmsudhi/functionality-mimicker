from functools import wraps
from typing import Any, Callable, Optional, Dict
import time
from datetime import datetime, timedelta
import json
import hashlib
from fastapi import Request

class Cache:
    """
    A simple thread-safe in-memory cache implementation.
    """
    def __init__(self):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._default_ttl = 300  # 5 minutes

    def _generate_key(self, func: Callable, args: tuple, kwargs: dict) -> str:
        # Create a unique key based on function name and arguments
        key_parts = [
            func.__name__,
            str(args),
            str(sorted(kwargs.items()))
        ]
        key_string = json.dumps(key_parts, sort_keys=True)
        return hashlib.md5(key_string.encode()).hexdigest()

    def _is_valid(self, cache_entry: Dict[str, Any]) -> bool:
        return cache_entry["expires_at"] > datetime.utcnow()

    def get(self, key: str) -> Optional[Any]:
        """
        Get a value from the cache.
        
        Args:
            key: The cache key
            
        Returns:
            The cached value if it exists and hasn't expired, None otherwise
        """
        if key not in self._cache:
            return None
        
        cache_entry = self._cache[key]
        if not self._is_valid(cache_entry):
            del self._cache[key]
            return None
        
        return cache_entry["value"]

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        """
        Set a value in the cache.
        
        Args:
            key: The cache key
            value: The value to cache
            ttl: The time-to-live for the cache entry
        """
        expires_at = datetime.utcnow() + timedelta(seconds=ttl or self._default_ttl)
        self._cache[key] = {
            "value": value,
            "expires_at": expires_at
        }

    def delete(self, key: str) -> None:
        """
        Delete a value from the cache.
        
        Args:
            key: The cache key
        """
        if key in self._cache:
            del self._cache[key]

    def clear(self) -> None:
        """Clear all values from the cache."""
        self._cache.clear()

# Global cache instance
cache = Cache()

def cached(
    ttl: Optional[int] = None,
    key_prefix: Optional[str] = None,
    include_request: bool = False
):
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate cache key
            cache_key_parts = []
            
            if key_prefix:
                cache_key_parts.append(key_prefix)
            
            # Include request data if specified
            if include_request:
                for arg in args:
                    if isinstance(arg, Request):
                        cache_key_parts.extend([
                            str(arg.url),
                            str(arg.query_params),
                            str(arg.headers)
                        ])
            
            # Generate the cache key
            cache_key = cache._generate_key(func, args, kwargs)
            if cache_key_parts:
                cache_key = f"{'_'.join(cache_key_parts)}_{cache_key}"
            
            # Try to get from cache
            cached_value = cache.get(cache_key)
            if cached_value is not None:
                return cached_value
            
            # Execute function and cache result
            result = await func(*args, **kwargs)
            cache.set(cache_key, result, ttl)
            return result
        
        return wrapper
    return decorator

# Example usage:
# @cached(ttl=300)  # Cache for 5 minutes
# @cached(key_prefix="scenarios")  # Add prefix to cache key
# @cached(include_request=True)  # Include request data in cache key 