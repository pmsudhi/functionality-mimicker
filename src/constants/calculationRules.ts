
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
    rules: `<div class="font-medium mb-1">Formulas:</div>
───────────────────────────────
<div class="space-y-2">
  <div class="formula">
    <span class="text-blue-400">Servers Required</span> = 
    <span class="text-pink-400">Total Seating</span> ÷ 
    <span class="text-emerald-400">Covers per Waiter</span>
  </div>

  <div class="formula">
    <span class="text-blue-400">Runners Required</span> = 
    <span class="text-pink-400">Servers</span> × 
    <span class="text-emerald-400">Runner Ratio</span>
  </div>
</div>

<div class="font-medium mt-4 mb-1">Service Standards:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    <div class="font-medium">Covers per Waiter:</div>
    • 12 covers - Premium Dining
    • 16 covers - Casual Dining
    • 20 covers - Fast Casual
    • 24 covers - Fast Casual (high efficiency)
  </div>

  <div class="mb-2">
    <div class="font-medium">Runner to Waiter Ratios:</div>
    • 100% - Full support (1:1)
    • 75% - High support (3:4)
    • 50% - Medium support (1:2)
    • 25% - Basic support (1:4)
  </div>
</div>`
  },
  kitchen: {
    title: "Kitchen Staffing",
    rules: `<div class="font-medium mb-1">Formulas:</div>
───────────────────────────────
<div class="space-y-2">
  <div class="formula">
    <span class="text-blue-400">Line Cooks</span> = 
    <span class="text-pink-400">Kitchen Stations</span> ÷ 
    <span class="text-emerald-400">Stations per Chef</span>
  </div>

  <div class="formula">
    <span class="text-blue-400">Prep Cooks</span> = 
    <span class="text-pink-400">Line Cooks</span> × 
    <span class="text-emerald-400">0.75</span>
  </div>

  <div class="formula">
    <span class="text-blue-400">Kitchen Helpers</span> = 
    <span class="text-pink-400">Line Cooks</span> × 
    <span class="text-emerald-400">0.50</span>
  </div>

  <div class="formula">
    <span class="text-blue-400">Dishwashers</span> = 
    max(<span class="text-emerald-400">1</span>, 
    <span class="text-pink-400">Total Seating</span> ÷ 
    <span class="text-emerald-400">80</span>)
  </div>
</div>

<div class="font-medium mt-4 mb-1">Staffing Standards:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    <div class="font-medium">Stations per Chef:</div>
    • Premium: 1.0 station
    • Casual: 1.5 stations
    • Fast Casual: 2.0 stations
  </div>

  <div class="mb-2">
    <div class="font-medium">Required Staff:</div>
    • Executive Chef: Always 1
    • Sous Chefs:
      - Premium: 2
      - Casual: 1
      - Fast Casual: 0
  </div>
</div>`
  },
  efficiency: {
    title: "Efficiency Adjustments",
    rules: `<div class="font-medium mb-1">Formula:</div>
───────────────────────────────
<div class="space-y-2">
  <div class="formula">
    <span class="text-blue-400">Combined Efficiency</span> = Average of:
    <ul class="list-disc ml-6 mt-1 space-y-1">
      <li><span class="text-pink-400">Service Efficiency</span></li>
      <li><span class="text-pink-400">Kitchen Efficiency</span></li>
      <li><span class="text-pink-400">Staff Productivity</span></li>
      <li><span class="text-pink-400">Operational Efficiency</span></li>
    </ul>
  </div>
</div>

<div class="font-medium mt-4 mb-1">Industry Benchmarks:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    <div class="font-medium">Labor Cost Targets:</div>
    • Premium Dining: 28%
    • Casual Dining: 25%
    • Fast Casual: 22%
  </div>

  <div class="mb-2">
    <div class="font-medium">Efficiency Impact:</div>
    • Higher efficiency = Lower staffing needs
    • Each 1% improvement reduces staff by ~0.5%
  </div>
</div>`
  },
  revenue: {
    title: "Revenue Calculations",
    rules: `<div class="font-medium mb-1">Formula:</div>
───────────────────────────────
<div class="space-y-2">
  <div class="formula">
    <span class="text-blue-400">Monthly Revenue</span> = 
    <span class="text-pink-400">Total Capacity</span>
    × <span class="text-emerald-400">Average Spend</span>
    × <span class="text-emerald-400">Turns per Day</span>
    × <span class="text-emerald-400">Operating Days</span>
    ÷ <span class="text-emerald-400">12</span>
  </div>
</div>

<div class="font-medium mt-4 mb-1">Average Spend:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    • Premium: SAR 250/guest
    • Casual: SAR 180/guest
    • Fast Casual: SAR 120/guest
  </div>
</div>

<div class="font-medium mt-4 mb-1">Operating Parameters:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    • Standard Year: 365 days
    • Ramadan Period: 
      - 15 days at 50% capacity
      - Adjusted operating hours
      - Modified peak times
  </div>
</div>`
  },
  laborCost: {
    title: "Labor Cost Calculations",
    rules: `<div class="font-medium mb-1">Formulas:</div>
───────────────────────────────
<div class="space-y-2">
  <div class="formula">
    <span class="text-blue-400">FOH Cost</span> = Sum of:
    <ul class="list-disc ml-6 mt-1 space-y-1">
      <li><span class="text-pink-400">Servers</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Runners</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Hosts</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Managers</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Cashiers</span> × <span class="text-emerald-400">Rate</span></li>
    </ul>
  </div>

  <div class="formula mt-3">
    <span class="text-blue-400">BOH Cost</span> = Sum of:
    <ul class="list-disc ml-6 mt-1 space-y-1">
      <li><span class="text-pink-400">Executive Chef</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Sous Chefs</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Line Cooks</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Prep Cooks</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Kitchen Helpers</span> × <span class="text-emerald-400">Rate</span></li>
      <li><span class="text-pink-400">Dishwashers</span> × <span class="text-emerald-400">Rate</span></li>
    </ul>
  </div>
</div>

<div class="font-medium mt-4 mb-1">Key Metrics:</div>
───────────────────────────────
<div class="space-y-2 ml-2">
  <div class="formula">
    <span class="text-blue-400">Total Labor</span> = <span class="text-pink-400">FOH Cost</span> + <span class="text-pink-400">BOH Cost</span>
  </div>
  <div class="formula">
    <span class="text-blue-400">Labor Cost %</span> = (<span class="text-pink-400">Total Labor</span> ÷ <span class="text-emerald-400">Revenue</span>) × <span class="text-emerald-400">100</span>
  </div>
</div>`
  },
  operational: {
    title: "Operational Hours",
    rules: `<div class="font-medium mb-1">Formula:</div>
───────────────────────────────
<div class="space-y-2">
  <div class="formula">
    <span class="text-blue-400">Total Hours</span> = <span class="text-pink-400">Operating Days</span> × <span class="text-emerald-400">Peak Hours</span>
  </div>
</div>

<div class="font-medium mt-4 mb-1">Service Impact:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    <div class="font-medium">Staffing Requirements:</div>
    • Fast Casual: Base staffing
    • Casual: +20% staff
    • Premium: +40% staff
  </div>
</div>

<div class="font-medium mt-4 mb-1">Peak Hour Types:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    • Standard: 4-6 hours
    • Extended: 6-8 hours
    • Full Day: 8-12 hours
  </div>
</div>

<div class="font-medium mt-4 mb-1">Ramadan Adjustments:</div>
───────────────────────────────
<div class="ml-2">
  <div class="mb-2">
    • Reduced hours: -30% to -50%
    • Shifted peak times
    • Modified staff scheduling
  </div>
</div>`
  }
};
