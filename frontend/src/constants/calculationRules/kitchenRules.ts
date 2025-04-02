
export const kitchenRules = {
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
</div>`
};
