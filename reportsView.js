// SMARTMESS AI - Reports & Analytics Component (Part 3 - Items 2, 3, 4 / Screen 9)

export class ReportsViewComponent {
  constructor(app) {
    this.app = app;
    this.timeFilter = 'today'; // 'today', '7days'
    this.mealFilter = 'all';   // 'all', 'breakfast', 'lunch', 'dinner'
  }

  render() {
    const report = this.app.getDailyReport();
    const mealWaste = this.app.getMealWasteData();
    const reasonsStats = this.app.getAggregatedAbsenceReasons();
    const todayCounts = this.app.getStaffTodayAttendanceCounts();

    // Calculate dynamic values based on filters
    let preparedCount = report.foodPrepared;
    let consumedCount = report.foodConsumed;
    let leftoversCount = report.leftovers;
    let wastePct = report.wastePercentage;

    if (this.mealFilter === 'breakfast') {
      preparedCount = mealWaste.breakfast.prepared;
      consumedCount = mealWaste.breakfast.consumed;
      leftoversCount = mealWaste.breakfast.leftover;
      wastePct = Number(((leftoversCount / preparedCount) * 100).toFixed(1));
    } else if (this.mealFilter === 'lunch') {
      preparedCount = mealWaste.lunch.prepared;
      consumedCount = mealWaste.lunch.consumed;
      leftoversCount = mealWaste.lunch.leftover;
      wastePct = Number(((leftoversCount / preparedCount) * 100).toFixed(1));
    } else if (this.mealFilter === 'dinner') {
      preparedCount = mealWaste.dinner.prepared;
      consumedCount = mealWaste.dinner.consumed;
      leftoversCount = mealWaste.dinner.leftover;
      wastePct = Number(((leftoversCount / preparedCount) * 100).toFixed(1));
    }

    if (this.timeFilter === '7days' && this.mealFilter === 'all') {
      preparedCount = report.wasteTrend.reduce((sum, d) => sum + d.prepared, 0);
      consumedCount = report.wasteTrend.reduce((sum, d) => sum + d.consumed, 0);
      leftoversCount = report.wasteTrend.reduce((sum, d) => sum + d.leftovers, 0);
      wastePct = Number(((leftoversCount / preparedCount) * 100).toFixed(1));
    }

    const costPerPortion = 42; // ₹42 per portion
    const wastedCost = leftoversCount * costPerPortion;
    const totalExpenditure = preparedCount * costPerPortion;
    const estimatedSavedCost = (this.timeFilter === '7days' ? 140 : 20) * costPerPortion; // Saved vs flat 80 portions baseline
    const attendancePct = Math.round((todayCounts.lunch / todayCounts.totalStudents) * 100);

    return `
      <div class="space-y-4 pb-24 animate-fade-in">
        <!-- Header (Screen 9 in Reference) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="reports-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900">Reports & Analytics</h2>
                <p class="text-xs text-slate-500 font-medium">Food Waste Tracking & Kitchen Expenditure</p>
              </div>
            </div>

            <!-- Transparency Disclaimer Badge (Part 3 - Item 7) -->
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Prototype / Simulated Data
            </span>
          </div>
        </div>

        <!-- Filter Controls Bar (Part 3 - Item 3) -->
        <div class="glass-card p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <!-- Time Filter Pills -->
          <div class="flex items-center p-1 bg-slate-100 rounded-xl">
            <button class="time-filter-btn px-3 py-1.5 rounded-lg font-bold transition ${
              this.timeFilter === 'today' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }" data-time="today">
              Today (15 Apr)
            </button>
            <button class="time-filter-btn px-3 py-1.5 rounded-lg font-bold transition ${
              this.timeFilter === '7days' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }" data-time="7days">
              Last 7 Days
            </button>
          </div>

          <!-- Meal Filter Pills -->
          <div class="flex items-center p-1 bg-slate-100 rounded-xl">
            <button class="meal-filter-btn px-2.5 py-1.5 rounded-lg font-bold transition ${
              this.mealFilter === 'all' ? 'bg-teal-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }" data-meal="all">All</button>
            <button class="meal-filter-btn px-2.5 py-1.5 rounded-lg font-bold transition ${
              this.mealFilter === 'breakfast' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }" data-meal="breakfast">Breakfast</button>
            <button class="meal-filter-btn px-2.5 py-1.5 rounded-lg font-bold transition ${
              this.mealFilter === 'lunch' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }" data-meal="lunch">Lunch</button>
            <button class="meal-filter-btn px-2.5 py-1.5 rounded-lg font-bold transition ${
              this.mealFilter === 'dinner' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }" data-meal="dinner">Dinner</button>
          </div>
        </div>

        <!-- 6 Visual Metric Cards (Part 3 - Item 2 & Screen 9) -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <!-- Food Prepared Card -->
          <div class="glass-card p-3.5 border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">🍲</span>
              <span class="text-[11px] font-bold text-slate-500">Food Prepared</span>
            </div>
            <div class="text-2xl font-black text-slate-900">${preparedCount}</div>
            <span class="text-[10px] text-slate-400 font-medium">portions batch</span>
          </div>

          <!-- Food Consumed Card -->
          <div class="glass-card p-3.5 border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">😋</span>
              <span class="text-[11px] font-bold text-slate-500">Food Consumed</span>
            </div>
            <div class="text-2xl font-black text-emerald-700">${consumedCount}</div>
            <span class="text-[10px] text-slate-400 font-medium">portions eaten</span>
          </div>

          <!-- Leftovers Card -->
          <div class="glass-card p-3.5 border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">🍱</span>
              <span class="text-[11px] font-bold text-slate-500">Leftovers</span>
            </div>
            <div class="text-2xl font-black text-amber-600">${leftoversCount}</div>
            <span class="text-[10px] text-slate-400 font-medium">portions remaining</span>
          </div>

          <!-- Waste Percentage Card -->
          <div class="glass-card p-3.5 border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">📉</span>
              <span class="text-[11px] font-bold text-slate-500">Waste %</span>
            </div>
            <div class="text-2xl font-black text-purple-700">${wastePct}%</div>
            <span class="text-[10px] text-emerald-600 font-bold">↓ 6.7% vs baseline</span>
          </div>

          <!-- Attendance % Card -->
          <div class="glass-card p-3.5 border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">👥</span>
              <span class="text-[11px] font-bold text-slate-500">Attendance %</span>
            </div>
            <div class="text-2xl font-black text-blue-700">${attendancePct}%</div>
            <span class="text-[10px] text-slate-400 font-medium">average attendance</span>
          </div>

          <!-- Estimated Cost & Savings Card -->
          <div class="glass-card p-3.5 border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">💰</span>
              <span class="text-[11px] font-bold text-slate-500">Est. Cost / Savings</span>
            </div>
            <div class="text-xl font-black text-emerald-700">₹${estimatedSavedCost}</div>
            <span class="text-[10px] text-slate-500 font-medium">saved (Wasted: ₹${wastedCost})</span>
          </div>
        </div>

        <!-- Prepared vs Consumed Comparison Bar (Part 3 - Item 3) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Prepared vs Consumed Ratio
            </h3>
            <span class="text-xs font-bold text-slate-700">
              ${consumedCount} / ${preparedCount} Portions
            </span>
          </div>
          <div class="w-full bg-slate-200 h-4 rounded-full overflow-hidden flex">
            <div class="bg-emerald-500 h-full transition-all duration-500" style="width: ${Math.round((consumedCount / preparedCount) * 100)}%" title="Consumed: ${consumedCount} portions"></div>
            <div class="bg-amber-400 h-full transition-all duration-500" style="width: ${Math.round((leftoversCount / preparedCount) * 100)}%" title="Leftovers: ${leftoversCount} portions"></div>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded bg-emerald-500"></span>
              <span>Consumed: <b>${consumedCount} portions (${Math.round((consumedCount / preparedCount) * 100)}%)</b></span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded bg-amber-400"></span>
              <span>Leftovers: <b>${leftoversCount} portions (${Math.round((leftoversCount / preparedCount) * 100)}%)</b></span>
            </span>
          </div>
        </div>

        <!-- 7-Day Food Waste Trend Bar Chart (Part 3 - Item 2 & Screen 9) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-xs font-bold text-slate-900">7-Day Food Waste Trend</h3>
              <p class="text-[10px] text-slate-400">Weekly waste % across all 3 daily meals</p>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] font-bold text-teal-700">
              <span class="w-2.5 h-2.5 rounded bg-teal-600"></span>
              <span>Daily Waste %</span>
            </div>
          </div>

          <!-- Bar Chart -->
          <div class="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-1 border-b border-slate-100">
            ${report.wasteTrend.map(item => {
              const barHeightPct = Math.min(100, Math.round((item.wastePct / 20) * 100));
              const isToday = item.isToday;

              return `
                <div class="flex-1 flex flex-col items-center gap-1 group relative">
                  <!-- Hover tooltip -->
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 font-bold shadow">
                    ${item.wastePct}% • ${item.leftovers} portions
                  </div>

                  <!-- Bar -->
                  <div class="w-full max-w-[28px] rounded-t-md transition-all duration-700 ${
                    isToday ? 'bg-teal-600 ring-2 ring-teal-400' : 'bg-teal-700/60 hover:bg-teal-700'
                  }" style="height: ${barHeightPct}%"></div>

                  <!-- Day label -->
                  <span class="text-[10px] font-bold ${isToday ? 'text-teal-900 font-black' : 'text-slate-400'}">
                    ${item.day}
                  </span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>Pre-AI Baseline: <b class="text-rose-600 line-through">18.5%</b></span>
            <span>AI Average: <b class="text-emerald-700">9.6%</b> (↓ 48% reduction)</span>
          </div>
        </div>

        <!-- Attendance & Leftovers by Meal Comparison (Part 3 - Item 3) -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Attendance by Meal -->
          <div class="glass-card p-3.5 border border-slate-200">
            <h4 class="text-xs font-bold text-slate-800 mb-2.5">Attendance by Meal</h4>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-slate-600">🥣 Breakfast:</span>
                <span class="font-extrabold text-emerald-700">${todayCounts.breakfast} / 80</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-600">🍲 Lunch:</span>
                <span class="font-extrabold text-amber-700">${todayCounts.lunch} / 80</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-600">🍛 Dinner:</span>
                <span class="font-extrabold text-indigo-700">${todayCounts.dinner} / 80</span>
              </div>
            </div>
          </div>

          <!-- Leftovers by Meal -->
          <div class="glass-card p-3.5 border border-slate-200">
            <h4 class="text-xs font-bold text-slate-800 mb-2.5">Leftovers by Meal</h4>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-slate-600">🥣 Breakfast:</span>
                <span class="font-extrabold text-amber-700">${mealWaste.breakfast.leftover} portions</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-600">🍲 Lunch:</span>
                <span class="font-extrabold text-amber-700">${mealWaste.lunch.leftover} portions</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-600">🍛 Dinner:</span>
                <span class="font-extrabold text-amber-700">${mealWaste.dinner.leftover} portions</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Attendance Reason Insights (Part 3 - Item 4) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Why Students Skipped Meals This Week
              </h3>
              <p class="text-[11px] text-slate-500">Aggregated absence analysis from simulated student bookings</p>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Aggregated Tally
            </span>
          </div>

          <div class="space-y-2 text-xs">
            ${reasonsStats.map(item => `
              <div>
                <div class="flex items-center justify-between font-semibold mb-1">
                  <span class="text-slate-700">${item.reason}</span>
                  <span class="text-slate-900 font-bold">${item.percentage}%</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="${item.barColor} h-full rounded-full transition-all duration-500" style="width: ${item.percentage}%"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Dynamic Key Insight Card (Part 3 - Item 4 requirement) -->
          <div class="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
            <span class="text-base mt-0.5">💡</span>
            <div>
              <span class="font-bold">AI Pattern Insight:</span>
              <p class="text-[11px] text-amber-900 mt-0.5 leading-relaxed font-medium">
                "Attendance is lower during lunch on academic days."
              </p>
              <p class="text-[10px] text-amber-800 mt-0.5">
                Students attending afternoon college labs frequently opt for campus food stalls, allowing the AI to safely reduce lunch portion batch sizing by 14%.
              </p>
            </div>
          </div>
        </div>

        <!-- Campus Environmental & Financial Summary -->
        <div class="p-4 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-800 text-white shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Continuous Hostel Impact</span>
              <h4 class="text-base font-extrabold mt-0.5">₹25,200 Estimated Monthly Savings</h4>
              <p class="text-xs text-emerald-100 mt-0.5">385 kg food waste prevented • 184 kg CO2e greenhouse emissions avoided</p>
            </div>
            <div class="text-3xl">🌱</div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('reports-back-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('dashboard');
    });

    // Time filter pills
    document.querySelectorAll('.time-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.timeFilter = btn.getAttribute('data-time') || 'today';
        this.app.render();
      });
    });

    // Meal filter pills
    document.querySelectorAll('.meal-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.mealFilter = btn.getAttribute('data-meal') || 'all';
        this.app.render();
      });
    });
  }
}
