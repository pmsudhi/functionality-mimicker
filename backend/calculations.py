import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import math
import random
from sqlalchemy.orm import Session
from models import (
    Scenario,
    StaffingParams,
    RevenueParams,
    PLParams,
    PeakHourParams,
    OptimizationParams,
    WhatIfParams,
    StaffingResult,
    RevenueResult,
    PLResult,
    PeakHourResult,
    ComparisonResult,
    OptimizationResult,
    WhatIfResult,
    SpaceParameters,
    ServiceParameters,
    OperationalParameters
)
from utils.default_values import (
    get_staffing_defaults,
    get_financial_defaults,
    get_operational_defaults,
    get_efficiency_defaults,
    get_space_defaults,
    get_operational_constant
)

class StaffingCalculator:
    def __init__(self, db: Session):
        self.db = db
        self.staffing_defaults = get_staffing_defaults(db)
        self.financial_defaults = get_financial_defaults(db)
        self.operational_defaults = get_operational_defaults(db)
        self.efficiency_defaults = get_efficiency_defaults(db)
        self.space_defaults = get_space_defaults(db)
        
        # Get standard shifts from operational constants
        self.standard_shifts = get_operational_constant(db, 'shifts', 'standard_shifts')
        
        # Position ratios from default values
        self.position_ratios = {
            "manager": float(self.staffing_defaults.get("manager_ratio", 0.1)),
            "supervisor": float(self.staffing_defaults.get("supervisor_ratio", 0.2)),
            "cashier": float(self.staffing_defaults.get("cashier_ratio", 0.15)),
            "kitchen": float(self.staffing_defaults.get("kitchen_ratio", 0.4)),
            "service": float(self.staffing_defaults.get("service_ratio", 0.6))
        }

    def calculate_capacity(self, space_params: SpaceParameters) -> Dict[str, float]:
        """Calculate restaurant capacity based on space parameters"""
        total_area = space_params.total_area
        foh_area = total_area * (space_params.foh_percentage / 100)
        area_per_cover = float(self.space_defaults.get("min_area_per_cover", 1.5))
        
        # Calculate internal capacity
        internal_capacity = int(foh_area / area_per_cover)
        
        # Add external seating capacity
        total_capacity = internal_capacity + space_params.external_seating
        
        return {
            "total_capacity": total_capacity,
            "internal_capacity": internal_capacity,
            "external_capacity": space_params.external_seating,
            "foh_area": foh_area
        }

    def calculate_staffing_requirements(
        self,
        space_params: SpaceParameters,
        service_params: ServiceParameters,
        operational_params: OperationalParameters
    ) -> StaffingResult:
        """Calculate staffing requirements based on parameters"""
        # Calculate base capacity
        capacity = self.calculate_capacity(space_params)
        
        # Calculate daily covers based on capacity and operational parameters
        daily_covers = self._estimate_daily_covers(
            capacity["total_capacity"],
            operational_params
        )
        
        # Calculate FOH staff requirements
        foh_staff = self._calculate_foh_staff(
            daily_covers,
            service_params,
            operational_params
        )
        
        # Calculate BOH staff requirements
        boh_staff = self._calculate_boh_staff(
            daily_covers,
            service_params,
            operational_params
        )
        
        # Calculate total staff and labor cost
        total_staff = sum(pos["count"] for pos in foh_staff + boh_staff)
        labor_cost = self._calculate_labor_cost(foh_staff + boh_staff)
        
        # Generate recommendations
        recommendations = self._generate_staffing_recommendations(
            foh_staff, boh_staff, daily_covers, capacity
        )
        
        return StaffingResult(
            total_staff=total_staff,
            foh_staff=foh_staff,
            boh_staff=boh_staff,
            labor_cost=labor_cost,
            staffing_structure={
                "foh_ratio": len(foh_staff) / total_staff if total_staff > 0 else 0,
                "boh_ratio": len(boh_staff) / total_staff if total_staff > 0 else 0
            },
            recommendations=recommendations
        )

    def _estimate_daily_covers(
        self,
        capacity: int,
        operational_params: OperationalParameters
    ) -> int:
        """Estimate daily covers based on capacity and operational parameters"""
        # Get default utilization rate
        target_utilization = float(self.efficiency_defaults.get("target_utilization", 0.85))
        
        # Calculate base covers
        base_covers = int(capacity * target_utilization)
        
        # Apply operational factors
        peak_factor = float(self.operational_defaults.get("peak_hour_buffer", 0.3))
        peak_covers = int(base_covers * (1 + peak_factor))
        
        return peak_covers

    def _calculate_foh_staff(
        self,
        daily_covers: int,
        service_params: ServiceParameters,
        operational_params: OperationalParameters
    ) -> List[Dict[str, Any]]:
        """Calculate FOH staff requirements"""
        # Get default values
        min_covers_per_staff = float(self.efficiency_defaults.get("min_cover_per_staff", 20))
        max_covers_per_staff = float(self.efficiency_defaults.get("max_cover_per_staff", 40))
        
        # Calculate base FOH staff
        base_foh_staff = math.ceil(daily_covers / min_covers_per_staff)
        
        # Get service style factors from operational constants
        service_factors = get_operational_constant(self.db, 'service', 'service_style_factors')
        service_factor = service_factors.get(service_params.service_style, 1.0)
        
        adjusted_foh_staff = math.ceil(base_foh_staff * service_factor)
        
        # Ensure staff count is within limits
        min_staff = int(self.staffing_defaults.get("min_staff_per_shift", 2))
        max_staff = int(self.staffing_defaults.get("max_staff_per_shift", 20))
        
        foh_staff_count = max(min_staff, min(adjusted_foh_staff, max_staff))
        
        # Calculate position breakdown
        foh_staff = []
        for position, ratio in self.position_ratios.items():
            if position in ["kitchen"]:  # Skip BOH positions
                continue
            count = math.ceil(foh_staff_count * ratio)
            if count > 0:
                foh_staff.append({
                    "position": position,
                    "count": count,
                    "ratio": ratio
                })
        
        return foh_staff

    def _calculate_boh_staff(
        self,
        daily_covers: int,
        service_params: ServiceParameters,
        operational_params: OperationalParameters
    ) -> List[Dict[str, Any]]:
        """Calculate BOH staff requirements"""
        # Get default values
        min_covers_per_staff = float(self.efficiency_defaults.get("min_cover_per_staff", 20))
        
        # Calculate base BOH staff
        base_boh_staff = math.ceil(daily_covers / min_covers_per_staff)
        
        # Get kitchen complexity factors from operational constants
        complexity_factors = get_operational_constant(self.db, 'kitchen', 'complexity_factors')
        kitchen_factor = complexity_factors.get(service_params.kitchen_complexity, 1.0)
        
        adjusted_boh_staff = math.ceil(base_boh_staff * kitchen_factor)
        
        # Ensure staff count is within limits
        min_staff = int(self.staffing_defaults.get("min_staff_per_shift", 2))
        max_staff = int(self.staffing_defaults.get("max_staff_per_shift", 20))
        
        boh_staff_count = max(min_staff, min(adjusted_boh_staff, max_staff))
        
        # Calculate position breakdown
        boh_staff = []
        for position, ratio in self.position_ratios.items():
            if position in ["kitchen"]:  # Only include kitchen positions
                count = math.ceil(boh_staff_count * ratio)
                if count > 0:
                    boh_staff.append({
                        "position": position,
                        "count": count,
                        "ratio": ratio
                    })
        
        return boh_staff

    def _calculate_labor_cost(self, staff_list: List[Dict[str, Any]]) -> float:
        """Calculate total labor cost"""
        # Get default values
        min_wage = float(self.financial_defaults.get("min_wage", 15.00))
        benefits_percentage = float(self.financial_defaults.get("benefits_percentage", 0.25))
        
        total_cost = 0
        for staff in staff_list:
            position_cost = staff["count"] * min_wage * (1 + benefits_percentage)
            total_cost += position_cost
        
        return total_cost

    def _generate_staffing_recommendations(
        self,
        foh_staff: List[Dict[str, Any]],
        boh_staff: List[Dict[str, Any]],
        daily_covers: int,
        capacity: Dict[str, float]
    ) -> List[str]:
        """Generate staffing recommendations"""
        recommendations = []
        
        # Check staff-to-cover ratio
        total_staff = sum(pos["count"] for pos in foh_staff + boh_staff)
        staff_to_cover_ratio = daily_covers / total_staff if total_staff > 0 else 0
        
        min_ratio = float(self.efficiency_defaults.get("min_cover_per_staff", 20))
        max_ratio = float(self.efficiency_defaults.get("max_cover_per_staff", 40))
        
        if staff_to_cover_ratio < min_ratio:
            recommendations.append(
                f"Consider reducing staff count. Current ratio: {staff_to_cover_ratio:.1f} covers per staff (min: {min_ratio})"
            )
        elif staff_to_cover_ratio > max_ratio:
            recommendations.append(
                f"Consider increasing staff count. Current ratio: {staff_to_cover_ratio:.1f} covers per staff (max: {max_ratio})"
            )
        
        # Check FOH/BOH balance
        foh_count = sum(pos["count"] for pos in foh_staff)
        boh_count = sum(pos["count"] for pos in boh_staff)
        total_count = foh_count + boh_count
        
        if total_count > 0:
            foh_ratio = foh_count / total_count
            target_foh_ratio = float(self.staffing_defaults.get("target_foh_ratio", 0.6))
            
            if abs(foh_ratio - target_foh_ratio) > 0.1:
                recommendations.append(
                    f"Adjust FOH/BOH balance. Current FOH ratio: {foh_ratio:.1%} (target: {target_foh_ratio:.1%})"
                )
        
        # Check capacity utilization
        utilization = daily_covers / capacity["total_capacity"] if capacity["total_capacity"] > 0 else 0
        target_utilization = float(self.efficiency_defaults.get("target_utilization", 0.85))
        
        if utilization < target_utilization - 0.1:
            recommendations.append(
                f"Low capacity utilization. Current: {utilization:.1%} (target: {target_utilization:.1%})"
            )
        elif utilization > target_utilization + 0.1:
            recommendations.append(
                f"High capacity utilization. Current: {utilization:.1%} (target: {target_utilization:.1%})"
            )
        
        return recommendations

class FinancialCalculator:
    def __init__(self, db: Session):
        self.db = db
        self.financial_defaults = get_financial_defaults(db)
        self.operational_defaults = get_operational_defaults(db)
        self.efficiency_defaults = get_efficiency_defaults(db)

    def calculate_revenue_projections(
        self,
        operational_params: OperationalParameters,
        projection_period: str = "monthly",
        projection_length: int = 12
    ) -> RevenueResult:
        """Calculate revenue projections"""
        # Get default values
        base_growth_rate = float(self.financial_defaults.get("base_growth_rate", 0.05))
        peak_hour_multiplier = float(self.operational_defaults.get("peak_hour_multiplier", 1.5))
        
        # Generate periods
        periods = self._generate_periods(projection_period, projection_length)
        
        # Calculate base revenue
        base_revenue = operational_params.average_daily_revenue * 30  # Monthly base
        
        # Calculate projections
        projections = self._calculate_growth_projections(
            base_revenue,
            periods,
            operational_params
        )
        
        # Calculate summary metrics
        metrics = self._calculate_summary_metrics(projections)
        
        # Generate insights
        insights = self._generate_revenue_insights(projections, metrics)
        
        # Identify optimization opportunities
        opportunities = self._identify_optimization_opportunities(projections, metrics)
        
        return RevenueResult(
            projected_revenue=projections,
            growth_rate=metrics["growth_rate"],
            peak_revenue=metrics["peak_revenue"],
            average_revenue=metrics["average_revenue"],
            insights=insights,
            optimization_opportunities=opportunities
        )

    def calculate_profit_loss(
        self,
        revenue: float,
        operational_params: OperationalParameters
    ) -> PLResult:
        """Calculate profit and loss"""
        # Get default values
        food_cost_percentage = float(self.financial_defaults.get("food_cost_percentage", 0.35))
        beverage_cost_percentage = float(self.financial_defaults.get("beverage_cost_percentage", 0.25))
        overhead_percentage = float(self.financial_defaults.get("overhead_percentage", 0.15))
        target_profit_margin = float(self.financial_defaults.get("target_profit_margin", 0.15))
        
        # Calculate costs
        food_cost = revenue * food_cost_percentage
        beverage_cost = revenue * beverage_cost_percentage
        labor_cost = operational_params.monthly_labor_cost
        overhead_cost = revenue * overhead_percentage
        
        total_costs = food_cost + beverage_cost + labor_cost + overhead_cost
        profit = revenue - total_costs
        profit_margin = profit / revenue if revenue > 0 else 0
        
        # Generate historical comparison
        historical = self._generate_historical_comparison(revenue, {
            "food_cost": food_cost,
            "beverage_cost": beverage_cost,
            "labor_cost": labor_cost,
            "overhead_cost": overhead_cost
        })
        
        # Generate insights
        insights = self._generate_pl_insights(revenue, {
            "food_cost": food_cost,
            "beverage_cost": beverage_cost,
            "labor_cost": labor_cost,
            "overhead_cost": overhead_cost
        }, profit_margin)
        
        # Identify optimization opportunities
        opportunities = self._identify_pl_optimization_opportunities(
            revenue,
            {
                "food_cost": food_cost,
                "beverage_cost": beverage_cost,
                "labor_cost": labor_cost,
                "overhead_cost": overhead_cost
            },
            profit_margin
        )
        
        return PLResult(
            revenue=revenue,
            costs={
                "food_cost": food_cost,
                "beverage_cost": beverage_cost,
                "labor_cost": labor_cost,
                "overhead_cost": overhead_cost,
                "total_costs": total_costs
            },
            profit=profit,
            profit_margin=profit_margin,
            historical_comparison=historical,
            insights=insights,
            optimization_opportunities=opportunities
        )

    def _generate_periods(
        self,
        projection_period: str,
        projection_length: int
    ) -> List[str]:
        """Generate list of periods for projection"""
        periods = []
        current_date = datetime.now()
        
        if projection_period == "monthly":
            for i in range(projection_length):
                period_date = current_date + timedelta(days=30*i)
                periods.append(period_date.strftime("%Y-%m"))
        elif projection_period == "quarterly":
            for i in range(projection_length):
                period_date = current_date + timedelta(days=90*i)
                periods.append(f"Q{(period_date.month-1)//3 + 1} {period_date.year}")
        else:  # yearly
            for i in range(projection_length):
                period_date = current_date + timedelta(days=365*i)
                periods.append(str(period_date.year))
        
        return periods

    def _calculate_growth_projections(
        self,
        base_revenue: float,
        periods: List[str],
        operational_params: OperationalParameters
    ) -> Dict[str, List[float]]:
        """Calculate revenue growth projections"""
        # Get default values
        base_growth_rate = float(self.financial_defaults.get("base_growth_rate", 0.05))
        seasonal_factors = {
            "Q1": float(self.financial_defaults.get("q1_factor", 0.9)),
            "Q2": float(self.financial_defaults.get("q2_factor", 1.0)),
            "Q3": float(self.financial_defaults.get("q3_factor", 1.1)),
            "Q4": float(self.financial_defaults.get("q4_factor", 1.2))
        }
        
        projections = {
            "revenue": [],
            "growth_rate": [],
            "seasonal_adjusted": []
        }
        
        current_revenue = base_revenue
        for period in periods:
            # Calculate base growth
            growth_rate = base_growth_rate
            if "Q" in period:
                quarter = period.split()[0]
                growth_rate *= seasonal_factors.get(quarter, 1.0)
            
            # Apply growth
            current_revenue *= (1 + growth_rate)
            
            # Apply seasonal adjustment
            seasonal_factor = self._calculate_seasonal_factor(period)
            seasonal_revenue = current_revenue * seasonal_factor
            
            projections["revenue"].append(current_revenue)
            projections["growth_rate"].append(growth_rate)
            projections["seasonal_adjusted"].append(seasonal_revenue)
        
        return projections

    def _calculate_seasonal_factor(self, period: str) -> float:
        """Calculate seasonal factor for a period"""
        # Get default values
        peak_season_factor = float(self.operational_defaults.get("peak_season_factor", 1.2))
        off_season_factor = float(self.operational_defaults.get("off_season_factor", 0.8))
        
        if "Q" in period:
            quarter = int(period.split()[0][1])
            if quarter in [3, 4]:  # Peak seasons (summer and holidays)
                return peak_season_factor
            elif quarter in [1]:  # Off season (winter)
                return off_season_factor
            return 1.0
        return 1.0

    def _calculate_summary_metrics(
        self,
        projections: Dict[str, List[float]]
    ) -> Dict[str, float]:
        """Calculate summary metrics from projections"""
        return {
            "growth_rate": np.mean(projections["growth_rate"]),
            "peak_revenue": max(projections["revenue"]),
            "average_revenue": np.mean(projections["revenue"])
        }

    def _generate_revenue_insights(
        self,
        projections: Dict[str, List[float]],
        metrics: Dict[str, float]
    ) -> List[str]:
        """Generate insights from revenue projections"""
        insights = []
        
        # Get default values
        target_growth_rate = float(self.financial_defaults.get("target_growth_rate", 0.1))
        min_growth_rate = float(self.financial_defaults.get("min_growth_rate", 0.05))
        
        # Analyze growth rate
        if metrics["growth_rate"] < min_growth_rate:
            insights.append(
                f"Revenue growth rate ({metrics['growth_rate']:.1%}) is below minimum target ({min_growth_rate:.1%})"
            )
        elif metrics["growth_rate"] > target_growth_rate:
            insights.append(
                f"Strong revenue growth ({metrics['growth_rate']:.1%}) exceeds target ({target_growth_rate:.1%})"
            )
        
        # Analyze revenue trends
        revenue_trend = np.polyfit(range(len(projections["revenue"])), projections["revenue"], 1)[0]
        if revenue_trend < 0:
            insights.append("Negative revenue trend detected. Consider reviewing pricing and marketing strategy.")
        elif revenue_trend > 0:
            insights.append("Positive revenue trend detected. Consider expanding operations.")
        
        return insights

    def _identify_optimization_opportunities(
        self,
        projections: Dict[str, List[float]],
        metrics: Dict[str, float]
    ) -> List[str]:
        """Identify revenue optimization opportunities"""
        opportunities = []
        
        # Get default values
        target_growth_rate = float(self.financial_defaults.get("target_growth_rate", 0.1))
        min_growth_rate = float(self.financial_defaults.get("min_growth_rate", 0.05))
        
        # Analyze growth opportunities
        if metrics["growth_rate"] < target_growth_rate:
            opportunities.append(
                f"Implement growth strategies to achieve target growth rate of {target_growth_rate:.1%}"
            )
        
        # Analyze seasonal patterns
        seasonal_variation = np.std(projections["seasonal_adjusted"]) / np.mean(projections["seasonal_adjusted"])
        if seasonal_variation > 0.2:  # High seasonal variation
            opportunities.append(
                "Develop strategies to reduce seasonal revenue fluctuations"
            )
        
        return opportunities

    def _generate_historical_comparison(
        self,
        current_revenue: float,
        current_costs: Dict[str, float]
    ) -> Dict[str, Dict[str, float]]:
        """Generate historical comparison data"""
        # Get default values
        historical_growth_rate = float(self.financial_defaults.get("historical_growth_rate", 0.03))
        
        previous_revenue = current_revenue / (1 + historical_growth_rate)
        previous_costs = {
            cost_type: amount / (1 + historical_growth_rate)
            for cost_type, amount in current_costs.items()
        }
        
        return {
            "current": {
                "revenue": current_revenue,
                **current_costs
            },
            "previous": {
                "revenue": previous_revenue,
                **previous_costs
            }
        }

    def _generate_pl_insights(
        self,
        revenue: float,
        costs: Dict[str, float],
        profit_margin: float
    ) -> List[str]:
        """Generate profit and loss insights"""
        insights = []
        
        # Get default values
        target_profit_margin = float(self.financial_defaults.get("target_profit_margin", 0.15))
        min_profit_margin = float(self.financial_defaults.get("min_profit_margin", 0.1))
        
        # Get high cost threshold from operational constants
        high_cost_threshold = float(get_operational_constant(self.db, 'costs', 'high_cost_threshold'))
        
        # Analyze profit margin
        if profit_margin < min_profit_margin:
            insights.append(
                f"Profit margin ({profit_margin:.1%}) is below minimum target ({min_profit_margin:.1%})"
            )
        elif profit_margin > target_profit_margin:
            insights.append(
                f"Strong profit margin ({profit_margin:.1%}) exceeds target ({target_profit_margin:.1%})"
            )
        
        # Analyze cost structure
        total_costs = sum(costs.values())
        for cost_type, amount in costs.items():
            cost_percentage = amount / total_costs
            if cost_percentage > high_cost_threshold:  # If any cost type exceeds the threshold
                insights.append(
                    f"High {cost_type.replace('_', ' ')} ({cost_percentage:.1%} of total costs)"
                )
        
        return insights

    def _identify_pl_optimization_opportunities(
        self,
        revenue: float,
        costs: Dict[str, float],
        profit_margin: float
    ) -> List[str]:
        """Identify profit and loss optimization opportunities"""
        opportunities = []
        
        # Get default values
        target_profit_margin = float(self.financial_defaults.get("target_profit_margin", 0.15))
        target_food_cost = float(self.financial_defaults.get("target_food_cost", 0.35))
        target_beverage_cost = float(self.financial_defaults.get("target_beverage_cost", 0.25))
        target_labor_cost = float(self.financial_defaults.get("target_labor_cost", 0.25))
        target_overhead = float(self.financial_defaults.get("target_overhead", 0.15))
        
        # Analyze profit margin opportunities
        if profit_margin < target_profit_margin:
            opportunities.append(
                f"Implement cost control measures to achieve target profit margin of {target_profit_margin:.1%}"
            )
        
        # Analyze cost optimization opportunities
        total_costs = sum(costs.values())
        for cost_type, amount in costs.items():
            cost_percentage = amount / total_costs
            target = getattr(self, f"target_{cost_type}", None)
            if target and cost_percentage > target:
                opportunities.append(
                    f"Optimize {cost_type.replace('_', ' ')} to achieve target of {target:.1%}"
                )
        
        return opportunities

class PeakHourCalculator:
    def __init__(self, db: Session):
        self.db = db
        self.operational_defaults = get_operational_defaults(db)
        self.efficiency_defaults = get_efficiency_defaults(db)
        self.staffing_defaults = get_staffing_defaults(db)

    def analyze_peak_hours(
        self,
        operational_params: OperationalParameters,
        service_params: ServiceParameters
    ) -> PeakHourResult:
        """Analyze peak hours and staffing requirements"""
        # Get default values
        peak_hour_buffer = float(self.operational_defaults.get("peak_hour_buffer", 0.3))
        min_staff_per_shift = int(self.staffing_defaults.get("min_staff_per_shift", 2))
        max_staff_per_shift = int(self.staffing_defaults.get("max_staff_per_shift", 20))
        
        # Generate heatmap data
        heatmap_data = self._generate_heatmap_data(operational_params)
        
        # Calculate peak staffing requirements
        staffing_requirements = self._calculate_peak_staffing(
            operational_params,
            service_params
        )
        
        # Generate insights
        insights = self._generate_peak_hour_insights(
            heatmap_data,
            staffing_requirements
        )
        
        # Identify optimization opportunities
        opportunities = self._identify_peak_optimization_opportunities(
            heatmap_data,
            staffing_requirements
        )
        
        return PeakHourResult(
            heatmap_data=heatmap_data,
            peak_hours=staffing_requirements["peak_hours"],
            staffing_requirements=staffing_requirements["staffing"],
            insights=insights,
            optimization_opportunities=opportunities
        )

    def _generate_heatmap_data(
        self,
        operational_params: OperationalParameters
    ) -> Dict[str, Dict[str, Dict[str, Any]]]:
        """Generate heatmap data for peak hours analysis"""
        # Get default values
        peak_hour_multiplier = float(self.operational_defaults.get("peak_hour_multiplier", 1.5))
        off_peak_multiplier = float(self.operational_defaults.get("off_peak_multiplier", 0.7))
        
        heatmap_data = {}
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        hours = list(range(24))
        
        for day in days:
            heatmap_data[day] = {}
            for hour in hours:
                # Base traffic
                base_traffic = operational_params.base_traffic
                
                # Apply day factor
                day_factor = operational_params.day_factors.get(day, 1.0)
                
                # Apply hour factor
                hour_factor = operational_params.hour_factors.get(str(hour), 1.0)
                
                # Calculate traffic
                traffic = base_traffic * day_factor * hour_factor
                
                # Apply peak/off-peak multipliers
                if hour in operational_params.peak_hours:
                    traffic *= peak_hour_multiplier
                else:
                    traffic *= off_peak_multiplier
                
                heatmap_data[day][str(hour)] = {
                    "traffic": traffic,
                    "factor": day_factor * hour_factor,
                    "is_peak": hour in operational_params.peak_hours
                }
        
        return heatmap_data

    def _calculate_peak_staffing(
        self,
        operational_params: OperationalParameters,
        service_params: ServiceParameters
    ) -> Dict[str, Any]:
        """Calculate staffing requirements for peak hours"""
        # Get default values
        min_staff_per_shift = int(self.staffing_defaults.get("min_staff_per_shift", 2))
        max_staff_per_shift = int(self.staffing_defaults.get("max_staff_per_shift", 20))
        peak_hour_buffer = float(self.operational_defaults.get("peak_hour_buffer", 0.3))
        
        # Calculate base staffing
        base_staffing = {
            "foh": operational_params.base_foh_staff,
            "boh": operational_params.base_boh_staff
        }
        
        # Calculate peak staffing
        peak_staffing = {
            "foh": math.ceil(base_staffing["foh"] * (1 + peak_hour_buffer)),
            "boh": math.ceil(base_staffing["boh"] * (1 + peak_hour_buffer))
        }
        
        # Ensure staff counts are within limits
        peak_staffing = {
            "foh": max(min_staff_per_shift, min(peak_staffing["foh"], max_staff_per_shift)),
            "boh": max(min_staff_per_shift, min(peak_staffing["boh"], max_staff_per_shift))
        }
        
        return {
            "peak_hours": operational_params.peak_hours,
            "staffing": {
                "base": base_staffing,
                "peak": peak_staffing
            }
        }

    def _generate_peak_hour_insights(
        self,
        heatmap_data: Dict[str, Dict[str, Dict[str, Any]]],
        staffing_requirements: Dict[str, Any]
    ) -> List[str]:
        """Generate insights from peak hours analysis"""
        insights = []
        
        # Get default values
        target_utilization = float(self.efficiency_defaults.get("target_utilization", 0.85))
        
        # Analyze peak hour distribution
        peak_hours = staffing_requirements["peak_hours"]
        if len(peak_hours) > 4:
            insights.append(
                f"Extended peak hours ({len(peak_hours)} hours). Consider optimizing operational hours."
            )
        
        # Analyze staffing efficiency
        base_staffing = staffing_requirements["staffing"]["base"]
        peak_staffing = staffing_requirements["staffing"]["peak"]
        
        foh_increase = (peak_staffing["foh"] - base_staffing["foh"]) / base_staffing["foh"]
        boh_increase = (peak_staffing["boh"] - base_staffing["boh"]) / base_staffing["boh"]
        
        if foh_increase > 0.5:  # More than 50% increase in FOH staff
            insights.append(
                f"Significant FOH staff increase during peak hours ({foh_increase:.1%}). Consider cross-training."
            )
        
        if boh_increase > 0.5:  # More than 50% increase in BOH staff
            insights.append(
                f"Significant BOH staff increase during peak hours ({boh_increase:.1%}). Consider prep optimization."
            )
        
        return insights

    def _identify_peak_optimization_opportunities(
        self,
        heatmap_data: Dict[str, Dict[str, Dict[str, Any]]],
        staffing_requirements: Dict[str, Any]
    ) -> List[str]:
        """Identify optimization opportunities for peak hours"""
        opportunities = []
        
        # Get default values
        target_utilization = float(self.efficiency_defaults.get("target_utilization", 0.85))
        min_staff_per_shift = int(self.staffing_defaults.get("min_staff_per_shift", 2))
        max_staff_per_shift = int(self.staffing_defaults.get("max_staff_per_shift", 20))
        
        # Get peak traffic threshold from operational constants
        peak_traffic_threshold = float(get_operational_constant(self.db, 'traffic', 'peak_traffic_threshold'))
        
        # Analyze staffing levels
        peak_staffing = staffing_requirements["staffing"]["peak"]
        total_peak_staff = peak_staffing["foh"] + peak_staffing["boh"]
        
        if total_peak_staff >= max_staff_per_shift:
            opportunities.append(
                f"Peak staffing ({total_peak_staff}) at maximum limit. Consider operational optimization."
            )
        
        # Analyze traffic patterns
        peak_traffic = max(
            max(hour_data["traffic"] for hour_data in day_data.values())
            for day_data in heatmap_data.values()
        )
        
        if peak_traffic > peak_traffic_threshold:  # High peak traffic
            opportunities.append(
                "High peak traffic detected. Consider implementing queue management system."
            )
        
        return opportunities

class OptimizationCalculator:
    def __init__(self, db: Session):
        self.db = db
        self.staffing_defaults = get_staffing_defaults(db)
        self.financial_defaults = get_financial_defaults(db)
        self.operational_defaults = get_operational_defaults(db)
        self.efficiency_defaults = get_efficiency_defaults(db)
        self.space_defaults = get_space_defaults(db)

    def optimize_staffing(
        self,
        scenario_id: str,
        constraints: Optional[Dict[str, Any]] = None
    ) -> OptimizationResult:
        """Optimize staffing based on scenario parameters"""
        # Get default values
        min_staff_per_shift = int(self.staffing_defaults.get("min_staff_per_shift", 2))
        max_staff_per_shift = int(self.staffing_defaults.get("max_staff_per_shift", 20))
        target_utilization = float(self.efficiency_defaults.get("target_utilization", 0.85))
        min_wage = float(self.financial_defaults.get("min_wage", 15.00))
        benefits_percentage = float(self.financial_defaults.get("benefits_percentage", 0.25))
        
        # Get scenario from database
        scenario = get_scenario_by_id(self.db, scenario_id)
        if not scenario:
            raise ValueError(f"Scenario with ID {scenario_id} not found")
        
        # Extract parameters
        space_params = scenario.spaceParameters
        service_params = scenario.serviceParameters
        operational_params = scenario.operationalParameters
        
        # Calculate current staffing
        staffing_calculator = StaffingCalculator(self.db)
        current_staffing = staffing_calculator.calculate_staffing_requirements(
            space_params,
            service_params,
            operational_params
        )
        
        # Apply optimization algorithm
        optimized_staffing = self._optimize_staffing_algorithm(
            current_staffing,
            constraints,
            min_staff_per_shift,
            max_staff_per_shift,
            target_utilization
        )
        
        # Calculate labor cost savings
        current_cost = self._calculate_labor_cost(current_staffing.foh_staff + current_staffing.boh_staff)
        optimized_cost = self._calculate_labor_cost(optimized_staffing["foh"] + optimized_staffing["boh"])
        cost_savings = current_cost - optimized_cost
        
        # Generate insights
        insights = self._generate_optimization_insights(
            current_staffing,
            optimized_staffing,
            cost_savings
        )
        
        # Identify optimization opportunities
        opportunities = self._identify_optimization_opportunities(
            current_staffing,
            optimized_staffing,
            constraints
        )
        
        return OptimizationResult(
            original_scenario=scenario,
            optimized_staffing=optimized_staffing,
            cost_savings=cost_savings,
            insights=insights,
            optimization_opportunities=opportunities
        )

    def _optimize_staffing_algorithm(
        self,
        current_staffing: StaffingResult,
        constraints: Optional[Dict[str, Any]],
        min_staff_per_shift: int,
        max_staff_per_shift: int,
        target_utilization: float
    ) -> Dict[str, List[Dict[str, Any]]]:
        """Apply optimization algorithm to staffing"""
        # Get default values
        staff_buffer_percentage = float(self.staffing_defaults.get("staff_buffer_percentage", 0.15))
        
        # Extract current staffing
        foh_staff = current_staffing.foh_staff
        boh_staff = current_staffing.boh_staff
        
        # Apply optimization rules
        optimized_foh = []
        for position in foh_staff:
            # Calculate optimized count based on utilization
            optimized_count = math.ceil(position["count"] * (1 - staff_buffer_percentage))
            
            # Ensure within constraints
            if constraints and "max_foh_staff" in constraints:
                optimized_count = min(optimized_count, constraints["max_foh_staff"])
            
            # Ensure within min/max limits
            optimized_count = max(min_staff_per_shift, min(optimized_count, max_staff_per_shift))
            
            optimized_foh.append({
                "position": position["position"],
                "count": optimized_count,
                "ratio": position["ratio"]
            })
        
        optimized_boh = []
        for position in boh_staff:
            # Calculate optimized count based on utilization
            optimized_count = math.ceil(position["count"] * (1 - staff_buffer_percentage))
            
            # Ensure within constraints
            if constraints and "max_boh_staff" in constraints:
                optimized_count = min(optimized_count, constraints["max_boh_staff"])
            
            # Ensure within min/max limits
            optimized_count = max(min_staff_per_shift, min(optimized_count, max_staff_per_shift))
            
            optimized_boh.append({
                "position": position["position"],
                "count": optimized_count,
                "ratio": position["ratio"]
            })
        
        return {
            "foh": optimized_foh,
            "boh": optimized_boh
        }

    def _calculate_labor_cost(self, staff_list: List[Dict[str, Any]]) -> float:
        """Calculate total labor cost"""
        # Get default values
        min_wage = float(self.financial_defaults.get("min_wage", 15.00))
        benefits_percentage = float(self.financial_defaults.get("benefits_percentage", 0.25))
        
        total_cost = 0
        for staff in staff_list:
            position_cost = staff["count"] * min_wage * (1 + benefits_percentage)
            total_cost += position_cost
        
        return total_cost

    def _generate_optimization_insights(
        self,
        current_staffing: StaffingResult,
        optimized_staffing: Dict[str, List[Dict[str, Any]]],
        cost_savings: float
    ) -> List[str]:
        """Generate insights from optimization results"""
        insights = []
        
        # Get default values
        target_cost_savings = float(self.financial_defaults.get("target_cost_savings", 0.1))
        
        # Get significant reduction threshold from operational constants
        significant_reduction_threshold = float(get_operational_constant(self.db, 'staffing', 'significant_reduction_threshold'))
        
        # Calculate staffing changes
        current_foh = sum(pos["count"] for pos in current_staffing.foh_staff)
        current_boh = sum(pos["count"] for pos in current_staffing.boh_staff)
        optimized_foh = sum(pos["count"] for pos in optimized_staffing["foh"])
        optimized_boh = sum(pos["count"] for pos in optimized_staffing["boh"])
        
        foh_change = (current_foh - optimized_foh) / current_foh if current_foh > 0 else 0
        boh_change = (current_boh - optimized_boh) / current_boh if current_boh > 0 else 0
        
        # Analyze staffing changes
        if foh_change > significant_reduction_threshold:  # Significant reduction in FOH staff
            insights.append(
                f"Significant FOH staff reduction ({foh_change:.1%}). Consider cross-training to maintain service quality."
            )
        
        if boh_change > significant_reduction_threshold:  # Significant reduction in BOH staff
            insights.append(
                f"Significant BOH staff reduction ({boh_change:.1%}). Consider prep optimization to maintain kitchen efficiency."
            )
        
        # Analyze cost savings
        if cost_savings > 0:
            insights.append(
                f"Potential labor cost savings of ${cost_savings:.2f} per period."
            )
            
            if cost_savings / current_staffing.labor_cost > target_cost_savings:
                insights.append(
                    f"Cost savings exceed target of {target_cost_savings:.1%}. Consider reinvesting in staff training."
                )
        
        return insights

    def _identify_optimization_opportunities(
        self,
        current_staffing: StaffingResult,
        optimized_staffing: Dict[str, List[Dict[str, Any]]],
        constraints: Optional[Dict[str, Any]]
    ) -> List[str]:
        """Identify additional optimization opportunities"""
        opportunities = []
        
        # Get default values
        target_utilization = float(self.efficiency_defaults.get("target_utilization", 0.85))
        min_cover_per_staff = float(self.efficiency_defaults.get("min_cover_per_staff", 20))
        max_cover_per_staff = float(self.efficiency_defaults.get("max_cover_per_staff", 40))
        
        # Calculate current and optimized staffing
        current_total = sum(pos["count"] for pos in current_staffing.foh_staff + current_staffing.boh_staff)
        optimized_total = sum(pos["count"] for pos in optimized_staffing["foh"] + optimized_staffing["boh"])
        
        # Analyze staffing efficiency
        if current_total > optimized_total:
            opportunities.append(
                f"Reduce total staff from {current_total} to {optimized_total} to improve efficiency."
            )
        
        # Analyze position distribution
        current_foh_ratio = sum(pos["count"] for pos in current_staffing.foh_staff) / current_total if current_total > 0 else 0
        optimized_foh_ratio = sum(pos["count"] for pos in optimized_staffing["foh"]) / optimized_total if optimized_total > 0 else 0
        
        if abs(current_foh_ratio - optimized_foh_ratio) > 0.1:
            opportunities.append(
                f"Adjust FOH/BOH ratio from {current_foh_ratio:.1%} to {optimized_foh_ratio:.1%} for better balance."
            )
        
        # Check for constraint-based opportunities
        if constraints:
            if "max_foh_staff" in constraints and sum(pos["count"] for pos in optimized_staffing["foh"]) >= constraints["max_foh_staff"]:
                opportunities.append(
                    "FOH staffing at maximum limit. Consider cross-training to improve flexibility."
                )
            
            if "max_boh_staff" in constraints and sum(pos["count"] for pos in optimized_staffing["boh"]) >= constraints["max_boh_staff"]:
                opportunities.append(
                    "BOH staffing at maximum limit. Consider kitchen redesign for efficiency."
                )
        
        return opportunities

