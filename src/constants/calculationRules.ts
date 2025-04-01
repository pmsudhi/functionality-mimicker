export const CALCULATION_RULES = {
  space: {
    title: "Space Parameters",
    rules: `<div class="font-medium mb-1">Formulas:</div>
───────────────────────────────
<div class="space-y-2">
  <div class="formula">
    <span class="text-blue-400">FOH Area</span> = 
    <span class="text-pink-400">Total Restaurant Area</span> × 
    <span class="text-emerald-400">FOH%</span>
  </div>

  <div class="formula">
    <span class="text-blue-400">Internal Seating</span> = 
    <span class="text-pink-400">FOH Area</span> ÷ 
    <span class="text-emerald-400">Area per Cover</span>
  </div>

  <div class="formula">
    <span class="text-blue-400">Total Seating</span> = 
    <span class="text-pink-400">Internal Seating</span> + 
    <span class="text-emerald-400">External Seating</span>
  </div>
</div>

<div class="font-medium mt-4 mb-1">Area per Cover Options:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    <div class="font-medium">Fast Casual:</div>
    • 1.50 sqm - Quick service
    • 1.67 sqm - Standard service
  </div>

  <div class="mb-2">
    <div class="font-medium">Casual Dining:</div>
    • 1.86 sqm - Regular comfort
  </div>

  <div class="mb-2">
    <div class="font-medium">Premium Dining:</div>
    • 2.05 sqm - Enhanced comfort
    • 2.32 sqm - Luxury spacing
  </div>
</div>`,
  },
  service: {
    title: "Service Parameters",
    rules: `Formulas:
───────────────────────────────
<span style="color: #60A5FA">Servers Required</span> = <span style="color: #F472B6">Total Seating</span> ÷ <span style="color: #34D399">Covers per Waiter</span>

<span style="color: #60A5FA">Runners Required</span> = <span style="color: #F472B6">Servers</span> × <span style="color: #34D399">Runner Ratio</span>

Service Standards:
───────────────────────────────
Covers per Waiter:
• 12 covers - Premium Dining
• 16 covers - Casual Dining
• 20 covers - Fast Casual
• 24 covers - Fast Casual (high efficiency)

Runner to Waiter Ratios:
• 100% - Full support (1:1)
• 75% - High support (3:4)
• 50% - Medium support (1:2)
• 25% - Basic support (1:4)`
  },
  kitchen: {
    title: "Kitchen Staffing",
    rules: `Formulas:
───────────────────────────────
<span style="color: #60A5FA">Line Cooks</span> = <span style="color: #F472B6">Kitchen Stations</span> ÷ <span style="color: #34D399">Stations per Chef</span>

<span style="color: #60A5FA">Prep Cooks</span> = <span style="color: #F472B6">Line Cooks</span> × <span style="color: #34D399">0.75</span>

<span style="color: #60A5FA">Kitchen Helpers</span> = <span style="color: #F472B6">Line Cooks</span> × <span style="color: #34D399">0.50</span>

<span style="color: #60A5FA">Dishwashers</span> = max(<span style="color: #34D399">1</span>, <span style="color: #F472B6">Total Seating</span> ÷ <span style="color: #34D399">80</span>)

Staffing Standards:
───────────────────────────────
Stations per Chef:
• Premium: 1.0 station
• Casual: 1.5 stations
• Fast Casual: 2.0 stations

Required Staff:
• Executive Chef: Always 1
• Sous Chefs:
  - Premium: 2
  - Casual: 1
  - Fast Casual: 0`
  },
  efficiency: {
    title: "Efficiency Adjustments",
    rules: `Formula:
───────────────────────────────
<span style="color: #60A5FA">Combined Efficiency</span> = Average of:
• <span style="color: #F472B6">Service Efficiency</span>
• <span style="color: #F472B6">Kitchen Efficiency</span>
• <span style="color: #F472B6">Staff Productivity</span>
• <span style="color: #F472B6">Operational Efficiency</span>

Industry Benchmarks:
───────────────────────────────
Labor Cost Targets:
• Premium Dining: 28%
• Casual Dining: 25%
• Fast Casual: 22%

Efficiency Impact:
• Higher efficiency = Lower staffing needs
• Each 1% improvement reduces staff by ~0.5%`
  },
  revenue: {
    title: "Revenue Calculations",
    rules: `Formula:
───────────────────────────────
<span style="color: #60A5FA">Monthly Revenue</span> = 
  <span style="color: #F472B6">Total Capacity</span>
  × <span style="color: #34D399">Average Spend</span>
  × <span style="color: #34D399">Turns per Day</span>
  × <span style="color: #34D399">Operating Days</span>
  ÷ <span style="color: #34D399">12</span>

Average Spend:
───────────────────────────────
• Premium: SAR 250/guest
• Casual: SAR 180/guest
• Fast Casual: SAR 120/guest

Operating Parameters:
───────────────────────────────
Standard Year: 365 days
Ramadan Period: 
• 15 days at 50% capacity
• Adjusted operating hours
• Modified peak times`
  },
  laborCost: {
    title: "Labor Cost Calculations",
    rules: `Formulas:
───────────────────────────────
<span style="color: #60A5FA">FOH Cost</span> = Sum of:
• <span style="color: #F472B6">Servers</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Runners</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Hosts</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Managers</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Cashiers</span> × <span style="color: #34D399">Rate</span>

<span style="color: #60A5FA">BOH Cost</span> = Sum of:
• <span style="color: #F472B6">Executive Chef</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Sous Chefs</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Line Cooks</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Prep Cooks</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Kitchen Helpers</span> × <span style="color: #34D399">Rate</span>
• <span style="color: #F472B6">Dishwashers</span> × <span style="color: #34D399">Rate</span>

Key Metrics:
───────────────────────────────
<span style="color: #60A5FA">Total Labor</span> = <span style="color: #F472B6">FOH Cost</span> + <span style="color: #F472B6">BOH Cost</span>
<span style="color: #60A5FA">Labor Cost %</span> = (<span style="color: #F472B6">Total Labor</span> ÷ <span style="color: #34D399">Revenue</span>) × <span style="color: #34D399">100</span>`
  },
  operational: {
    title: "Operational Hours",
    rules: `Formula:
───────────────────────────────
<span style="color: #60A5FA">Total Hours</span> = <span style="color: #F472B6">Operating Days</span> × <span style="color: #34D399">Peak Hours</span>

Service Impact:
───────────────────────────────
Staffing Requirements:
• Fast Casual: Base staffing
• Casual: +20% staff
• Premium: +40% staff

Peak Hour Types:
───────────────────────────────
• Standard: 4-6 hours
• Extended: 6-8 hours
• Full Day: 8-12 hours

Ramadan Adjustments:
───────────────────────────────
• Reduced hours: -30% to -50%
• Shifted peak times
• Modified staff scheduling`
  }
}; 