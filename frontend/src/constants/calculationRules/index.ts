
import { spaceRules } from './spaceRules';
import { serviceRules } from './serviceRules';
import { kitchenRules } from './kitchenRules';
import { efficiencyRules } from './efficiencyRules';
import { revenueRules } from './revenueRules';
import { laborCostRules } from './laborCostRules';
import { operationalRules } from './operationalRules';

export const CALCULATION_RULES = {
  space: spaceRules,
  service: serviceRules,
  kitchen: kitchenRules,
  efficiency: efficiencyRules,
  revenue: revenueRules,
  laborCost: laborCostRules,
  operational: operationalRules
};
