
export const revenueRules = {
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
</div>`
};
