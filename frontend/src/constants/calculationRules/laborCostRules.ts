
export const laborCostRules = {
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
</div>`
};
