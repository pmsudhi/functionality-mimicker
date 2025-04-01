
export const serviceRules = {
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
</div>`
};
