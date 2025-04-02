from typing import Any, Dict, List, Optional, Type, TypeVar
from pydantic import BaseModel, ValidationError
from fastapi import HTTPException
from datetime import datetime, time

from .response import create_error_response

T = TypeVar('T', bound=BaseModel)

class BusinessRuleValidator:
    @staticmethod
    def validate_operating_hours(weekday_hours: List[int], weekend_hours: List[int]) -> None:
        if len(weekday_hours) != 5:
            raise create_error_response(
                "Invalid weekday hours",
                message="Weekday hours must contain exactly 5 values"
            )
        if len(weekend_hours) != 2:
            raise create_error_response(
                "Invalid weekend hours",
                message="Weekend hours must contain exactly 2 values"
            )
        
        for hours in weekday_hours + weekend_hours:
            if not 0 <= hours <= 24:
                raise create_error_response(
                    "Invalid hours value",
                    message="Hours must be between 0 and 24"
                )

    @staticmethod
    def validate_percentage(value: float, field_name: str) -> None:
        if not 0 <= value <= 100:
            raise create_error_response(
                f"Invalid {field_name}",
                message=f"{field_name} must be between 0 and 100"
            )

    @staticmethod
    def validate_positive_number(value: float, field_name: str) -> None:
        if value <= 0:
            raise create_error_response(
                f"Invalid {field_name}",
                message=f"{field_name} must be greater than 0"
            )

class DataValidator:
    @staticmethod
    def validate_model(data: Dict[str, Any], model_class: Type[T]) -> T:
        try:
            return model_class(**data)
        except ValidationError as e:
            raise create_error_response(
                "Validation error",
                message=str(e)
            )

    @staticmethod
    def validate_list(data: List[Dict[str, Any]], model_class: Type[T]) -> List[T]:
        try:
            return [model_class(**item) for item in data]
        except ValidationError as e:
            raise create_error_response(
                "Validation error",
                message=str(e)
            )

class ScenarioValidator:
    @staticmethod
    def validate_scenario_parameters(params: Dict[str, Any]) -> None:
        # Validate space parameters
        if "space" in params:
            space = params["space"]
            BusinessRuleValidator.validate_positive_number(space.get("totalArea", 0), "Total area")
            BusinessRuleValidator.validate_percentage(space.get("fohPercentage", 0), "FOH percentage")
            BusinessRuleValidator.validate_positive_number(space.get("areaPerCover", 0), "Area per cover")

        # Validate service parameters
        if "service" in params:
            service = params["service"]
            BusinessRuleValidator.validate_positive_number(service.get("coversPerWaiter", 0), "Covers per waiter")
            BusinessRuleValidator.validate_percentage(service.get("runnerToWaiterRatio", 0), "Runner to waiter ratio")
            BusinessRuleValidator.validate_positive_number(service.get("kitchenStations", 0), "Kitchen stations")

        # Validate operational parameters
        if "operational" in params:
            operational = params["operational"]
            BusinessRuleValidator.validate_operating_hours(
                operational.get("weekdayHours", []),
                operational.get("weekendHours", [])
            )
            BusinessRuleValidator.validate_percentage(
                operational.get("ramadanCapacityReduction", 0),
                "Ramadan capacity reduction"
            )

class FinancialValidator:
    @staticmethod
    def validate_revenue_parameters(params: Dict[str, Any]) -> None:
        BusinessRuleValidator.validate_positive_number(
            params.get("averageSpendPerGuest", 0),
            "Average spend per guest"
        )
        BusinessRuleValidator.validate_positive_number(
            params.get("guestDwellingTime", 0),
            "Guest dwelling time"
        )
        BusinessRuleValidator.validate_positive_number(
            params.get("tableTurnTime", 0),
            "Table turn time"
        )
        BusinessRuleValidator.validate_positive_number(
            params.get("peakHourFactor", 0),
            "Peak hour factor"
        ) 