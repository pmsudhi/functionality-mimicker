
export const operationalRules = {
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
</div>`
};
