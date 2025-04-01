
export const CALCULATION_RULES = {
  space: {
    title: "Space Parameters",
    rules: `<div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-t-lg p-3 border-b border-blue-100 dark:border-blue-900">
  <h3 class="text-base font-semibold text-blue-700 dark:text-blue-300">Space Parameters</h3>
</div>
<div class="p-4 space-y-4">
  <!-- Formulas Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Formulas
    </div>
    <div class="space-y-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
      <div class="flex items-center">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">FOH Area</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Total Restaurant Area</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">FOH%</span>
      </div>
      
      <div class="flex items-center">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Internal Seating</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">FOH Area</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">÷</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">Area per Cover</span>
      </div>
      
      <div class="flex items-center">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Total Seating</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Internal Seating</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">+</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">External Seating</span>
      </div>
    </div>
  </div>

  <!-- Area per Cover Options Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      Area per Cover Options
    </div>
    
    <div class="space-y-2">
      <div class="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-blue-700 dark:text-blue-300 mb-1">Fast Casual:</div>
        <div class="flex flex-col gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>1.50 sqm - Quick service</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>1.67 sqm - Standard service</span>
          </div>
        </div>
      </div>
      
      <div class="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-indigo-700 dark:text-indigo-300 mb-1">Casual Dining:</div>
        <div class="flex flex-col gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-indigo-400"></div>
            <span>1.86 sqm - Regular comfort</span>
          </div>
        </div>
      </div>
      
      <div class="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-purple-700 dark:text-purple-300 mb-1">Premium Dining:</div>
        <div class="flex flex-col gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>2.05 sqm - Enhanced comfort</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>2.32 sqm - Luxury spacing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  service: {
    title: "Service Parameters",
    rules: `<div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-t-lg p-3 border-b border-purple-100 dark:border-purple-900">
  <h3 class="text-base font-semibold text-purple-700 dark:text-purple-300">Service Parameters</h3>
</div>
<div class="p-4 space-y-4">
  <!-- Formulas Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Formulas
    </div>
    
    <div class="space-y-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[130px]">Servers Required</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Total Seating</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">÷</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">Covers per Waiter</span>
      </div>
      
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[130px]">Runners Required</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Servers</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">Runner Ratio</span>
      </div>
    </div>
  </div>

  <!-- Service Standards Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      Service Standards
    </div>
    
    <div class="space-y-3">
      <div class="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-purple-700 dark:text-purple-300 mb-1">Covers per Waiter:</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>12 covers - Premium Dining</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>16 covers - Casual Dining</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>20 covers - Fast Casual</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>24 covers - Fast Casual (high efficiency)</span>
          </div>
        </div>
      </div>
      
      <div class="bg-pink-50 dark:bg-pink-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-pink-700 dark:text-pink-300 mb-1">Runner to Waiter Ratios:</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-pink-400"></div>
            <span>100% - Full support (1:1)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-pink-400"></div>
            <span>75% - High support (3:4)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-pink-400"></div>
            <span>50% - Medium support (1:2)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-pink-400"></div>
            <span>25% - Basic support (1:4)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  kitchen: {
    title: "Kitchen Staffing",
    rules: `<div class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-t-lg p-3 border-b border-emerald-100 dark:border-emerald-900">
  <h3 class="text-base font-semibold text-emerald-700 dark:text-emerald-300">Kitchen Staffing</h3>
</div>
<div class="p-4 space-y-4">
  <!-- Formulas Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Formulas
    </div>
    
    <div class="space-y-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Line Cooks</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Kitchen Stations</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">÷</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">Stations per Chef</span>
      </div>
      
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Prep Cooks</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Line Cooks</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">0.75</span>
      </div>
      
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Kitchen Helpers</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Line Cooks</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">0.50</span>
      </div>
      
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Dishwashers</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="text-gray-500 dark:text-gray-400">max(</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">1</span>
        <span class="text-gray-500 dark:text-gray-400">, </span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Total Seating</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">÷</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">80</span>
        <span class="text-gray-500 dark:text-gray-400">)</span>
      </div>
    </div>
  </div>

  <!-- Staffing Standards Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Staffing Standards
    </div>
    
    <div class="space-y-3">
      <div class="bg-teal-50 dark:bg-teal-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-teal-700 dark:text-teal-300 mb-1">Stations per Chef:</div>
        <div class="flex flex-col gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-teal-400"></div>
            <span>Premium: 1.0 station</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-teal-400"></div>
            <span>Casual: 1.5 stations</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-teal-400"></div>
            <span>Fast Casual: 2.0 stations</span>
          </div>
        </div>
      </div>
      
      <div class="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-emerald-700 dark:text-emerald-300 mb-1">Required Staff:</div>
        <div class="flex flex-col gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>Executive Chef: Always 1</span>
          </div>
          <div class="font-medium text-xs text-emerald-600 dark:text-emerald-400 ml-2 mt-1">Sous Chefs:</div>
          <div class="flex items-center gap-2 ml-4">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
            <span>Premium: 2</span>
          </div>
          <div class="flex items-center gap-2 ml-4">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
            <span>Casual: 1</span>
          </div>
          <div class="flex items-center gap-2 ml-4">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
            <span>Fast Casual: 0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  efficiency: {
    title: "Efficiency Adjustments",
    rules: `<div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-t-lg p-3 border-b border-amber-100 dark:border-amber-900">
  <h3 class="text-base font-semibold text-amber-700 dark:text-amber-300">Efficiency Adjustments</h3>
</div>
<div class="p-4 space-y-4">
  <!-- Formulas Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Formula
    </div>
    
    <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
      <div class="flex items-start">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[150px] mt-1">Combined Efficiency</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2 mt-1">=</span>
        <div class="flex flex-col">
          <span class="text-gray-700 dark:text-gray-300">Average of:</span>
          <ul class="list-disc pl-5 mt-1 space-y-1 text-gray-600 dark:text-gray-400">
            <li class="text-pink-500 dark:text-pink-400">Service Efficiency</li>
            <li class="text-pink-500 dark:text-pink-400">Kitchen Efficiency</li>
            <li class="text-pink-500 dark:text-pink-400">Staff Productivity</li>
            <li class="text-pink-500 dark:text-pink-400">Operational Efficiency</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Industry Benchmarks Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      Industry Benchmarks
    </div>
    
    <div class="space-y-3">
      <div class="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-amber-700 dark:text-amber-300 mb-1">Labor Cost Targets:</div>
        <div class="flex flex-col gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Premium Dining: 28%</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Casual Dining: 25%</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Fast Casual: 22%</span>
          </div>
        </div>
      </div>
      
      <div class="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-2.5">
        <div class="font-medium text-sm text-yellow-700 dark:text-yellow-300 mb-1">Efficiency Impact:</div>
        <div class="flex flex-col gap-1 pl-2">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span>Higher efficiency = Lower staffing needs</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span>Each 1% improvement reduces staff by ~0.5%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  revenue: {
    title: "Revenue Calculations",
    rules: `<div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-t-lg p-3 border-b border-green-100 dark:border-green-900">
  <h3 class="text-base font-semibold text-green-700 dark:text-green-300">Revenue Calculations</h3>
</div>
<div class="p-4 space-y-4">
  <!-- Formulas Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Formula
    </div>
    
    <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
      <div class="flex flex-wrap items-center">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[130px]">Monthly Revenue</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <div class="flex flex-wrap items-center">
          <span class="font-medium text-pink-500 dark:text-pink-400">Total Capacity</span>
          <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
          <span class="font-medium text-emerald-500 dark:text-emerald-400">Average Spend</span>
          <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
          <span class="font-medium text-emerald-500 dark:text-emerald-400">Turns per Day</span>
          <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
          <span class="font-medium text-emerald-500 dark:text-emerald-400">Operating Days</span>
          <span class="text-gray-500 dark:text-gray-400 mx-1">÷</span>
          <span class="font-medium text-emerald-500 dark:text-emerald-400">12</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Average Spend Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Average Spend
    </div>
    
    <div class="bg-green-50 dark:bg-green-950/30 rounded-lg p-2.5">
      <div class="flex flex-col gap-1 pl-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Premium: SAR 250/guest</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Casual: SAR 180/guest</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Fast Casual: SAR 120/guest</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Operating Parameters Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Operating Parameters
    </div>
    
    <div class="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-2.5">
      <div class="flex flex-col gap-1 pl-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span>Standard Year: 365 days</span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span class="font-medium">Ramadan Period:</span>
        </div>
        <div class="flex flex-col gap-1 ml-4">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
            <span>15 days at 50% capacity</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
            <span>Adjusted operating hours</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
            <span>Modified peak times</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  laborCost: {
    title: "Labor Cost Calculations",
    rules: `<div class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-t-lg p-3 border-b border-red-100 dark:border-red-900">
  <h3 class="text-base font-semibold text-red-700 dark:text-red-300">Labor Cost Calculations</h3>
</div>
<div class="p-4 space-y-4">
  <!-- Formulas Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Formulas
    </div>
    
    <div class="space-y-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
      <div>
        <div class="flex items-start">
          <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[100px] mt-1">FOH Cost</span>
          <span class="text-gray-500 dark:text-gray-400 mx-2 mt-1">=</span>
          <div class="flex flex-col">
            <span class="text-gray-700 dark:text-gray-300">Sum of:</span>
            <ul class="list-disc pl-5 mt-1 space-y-1">
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Servers</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Runners</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Hosts</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Managers</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Cashiers</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div>
        <div class="flex items-start">
          <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[100px] mt-1">BOH Cost</span>
          <span class="text-gray-500 dark:text-gray-400 mx-2 mt-1">=</span>
          <div class="flex flex-col">
            <span class="text-gray-700 dark:text-gray-300">Sum of:</span>
            <ul class="list-disc pl-5 mt-1 space-y-1">
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Executive Chef</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Sous Chefs</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Line Cooks</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Prep Cooks</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Kitchen Helpers</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
              <li><span class="font-medium text-pink-500 dark:text-pink-400">Dishwashers</span> × <span class="font-medium text-emerald-500 dark:text-emerald-400">Rate</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Key Metrics Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
      Key Metrics
    </div>
    
    <div class="space-y-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg p-3">
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Total Labor</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">FOH Cost</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">+</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">BOH Cost</span>
      </div>
      
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Labor Cost %</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="text-gray-500 dark:text-gray-400">(</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Total Labor</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">÷</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">Revenue</span>
        <span class="text-gray-500 dark:text-gray-400">)</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">100</span>
      </div>
    </div>
  </div>
</div>`,
  },
  operational: {
    title: "Operational Hours",
    rules: `<div class="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 rounded-t-lg p-3 border-b border-sky-100 dark:border-sky-900">
  <h3 class="text-base font-semibold text-sky-700 dark:text-sky-300">Operational Hours</h3>
</div>
<div class="p-4 space-y-4">
  <!-- Formulas Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Formula
    </div>
    
    <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
      <div class="flex items-center flex-wrap">
        <span class="font-medium text-blue-500 dark:text-blue-400 min-w-[110px]">Total Hours</span>
        <span class="text-gray-500 dark:text-gray-400 mx-2">=</span>
        <span class="font-medium text-pink-500 dark:text-pink-400">Operating Days</span>
        <span class="text-gray-500 dark:text-gray-400 mx-1">×</span>
        <span class="font-medium text-emerald-500 dark:text-emerald-400">Peak Hours</span>
      </div>
    </div>
  </div>

  <!-- Service Impact Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Service Impact
    </div>
    
    <div class="bg-sky-50 dark:bg-sky-950/30 rounded-lg p-2.5">
      <div class="font-medium text-sm text-sky-700 dark:text-sky-300 mb-1">Staffing Requirements:</div>
      <div class="flex flex-col gap-1 pl-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-sky-400"></div>
          <span>Fast Casual: Base staffing</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-sky-400"></div>
          <span>Casual: +20% staff</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-sky-400"></div>
          <span>Premium: +40% staff</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Peak Hour Types Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Peak Hour Types
    </div>
    
    <div class="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2.5">
      <div class="flex flex-col gap-1 pl-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-blue-400"></div>
          <span>Standard: 4-6 hours</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-blue-400"></div>
          <span>Extended: 6-8 hours</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-blue-400"></div>
          <span>Full Day: 8-12 hours</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Ramadan Adjustments Section -->
  <div>
    <div class="font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center">
      <svg class="w-4 h-4 mr-1.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Ramadan Adjustments
    </div>
    
    <div class="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-2.5">
      <div class="flex flex-col gap-1 pl-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-indigo-400"></div>
          <span>Reduced hours: -30% to -50%</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-indigo-400"></div>
          <span>Shifted peak times</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-indigo-400"></div>
          <span>Modified staff scheduling</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
  }
};
