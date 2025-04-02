
export const spaceRules = {
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
</div>`
};
