
export const efficiencyRules = {
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
</div>`
};
