// SMARTMESS AI - Final Mess Staff Executive Dashboard (Part 3 - Item 6)

export class StaffDashboardComponent {
  constructor(app) {
    this.app = app;
  }

  render() {
    const todayCounts = this.app.getStaffTodayAttendanceCounts();
    const todayMenu = this.app.getMenuForDay('tue');
    const leftovers = this.app.getLeftovers();
    const recommendations = this.app.getAIRecommendations();
    const dailyReport = this.app.getDailyReport();
    const mealWaste = this.app.getMealWasteData();
    const totalTodayLeftovers = mealWaste.breakfast.leftover + mealWaste.lunch.leftover + mealWaste.dinner.leftover;

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Staff Top Bar -->
        <div class="glass-card p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-xl shadow-md shadow-teal-600/20">
              👨‍🍳
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-base font-bold text-slate-900">Mess Executive Hub</h2>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">Admin</span>
              </div>
              <p class="text-xs text-slate-500 font-medium">Head Chef Suresh • Central Hostel Mess</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Prototype / Simulated Data
            </span>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Tue, 15 Apr 2025
            </span>
          </div>
        </div>

        <!-- Section 1: Today's Attendance Overview (Part 2 - Item 1 & Part 3) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Today's Expected Attendance</span>
              </h3>
              <p class="text-xs text-slate-500">Live tally from 80 hostel resident bookings</p>
            </div>
            <button id="staff-view-att-btn" class="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              <span>View Breakdown</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center">
            <!-- Breakfast -->
            <div class="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
              <span class="text-xs font-bold text-emerald-800">Breakfast</span>
              <div class="text-xl font-extrabold text-emerald-950 mt-1">${todayCounts.breakfast}</div>
              <span class="text-[10px] text-emerald-600 font-semibold">students (68/80)</span>
            </div>

            <!-- Lunch -->
            <div class="p-3 rounded-xl bg-amber-50/80 border border-amber-200">
              <span class="text-xs font-bold text-amber-800">Lunch</span>
              <div class="text-xl font-extrabold text-amber-950 mt-1">${todayCounts.lunch}</div>
              <span class="text-[10px] text-amber-600 font-semibold">students (72/80)</span>
            </div>

            <!-- Dinner -->
            <div class="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200">
              <span class="text-xs font-bold text-indigo-800">Dinner</span>
              <div class="text-xl font-extrabold text-indigo-950 mt-1">${todayCounts.dinner}</div>
              <span class="text-[10px] text-indigo-600 font-semibold">students (64/80)</span>
            </div>
          </div>
        </div>

        <!-- Section 2: AI Recommended Quantities (Part 2 Item 4 & Part 3 Item 6) -->
        <div class="glass-card p-4 border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/50 to-white">
          <div class="flex items-center justify-between mb-3">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                Smart Food Quantity Engine
              </span>
              <h3 class="text-sm font-bold text-slate-900 mt-1">Recommended Portions to Cook</h3>
            </div>
            <button id="staff-open-ai-btn" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center gap-1">
              <span>Open AI Hub</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <div class="p-3 rounded-xl bg-white border border-emerald-200 shadow-sm text-center">
              <span class="text-[11px] font-bold text-slate-500">Breakfast</span>
              <div class="text-xl font-black text-emerald-700 mt-0.5">${recommendations.breakfast.recommendedPortions}</div>
              <span class="text-[10px] text-slate-400">portions</span>
            </div>

            <div class="p-3 rounded-xl bg-white border border-amber-200 shadow-sm text-center">
              <span class="text-[11px] font-bold text-slate-500">Lunch</span>
              <div class="text-xl font-black text-amber-600 mt-0.5">${recommendations.lunch.recommendedPortions}</div>
              <span class="text-[10px] text-slate-400">portions</span>
            </div>

            <div class="p-3 rounded-xl bg-white border border-indigo-200 shadow-sm text-center">
              <span class="text-[11px] font-bold text-slate-500">Dinner</span>
              <div class="text-xl font-black text-indigo-700 mt-0.5">${recommendations.dinner.recommendedPortions}</div>
              <span class="text-[10px] text-slate-400">portions</span>
            </div>
          </div>
          <p class="text-[11px] text-emerald-800 mt-2.5 font-medium flex items-center gap-1.5">
            <span>✨</span> Recommendation based on attendance, previous consumption, historical leftovers, menu and day.
          </p>
        </div>

        <!-- Section 3: Today's Menu Summary (Part 2 Item 1) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-bold text-slate-900">Today's Menu</h3>
            <button id="staff-edit-menu-btn" class="text-xs font-bold text-teal-600 hover:text-teal-700">
              Manage Menu ✎
            </button>
          </div>

          <div class="space-y-2 text-xs">
            <div class="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">🥣</span>
                <div>
                  <span class="font-bold text-slate-900">Breakfast:</span>
                  <span class="text-slate-600 ml-1">${todayMenu.breakfast.items}</span>
                </div>
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">🍲</span>
                <div>
                  <span class="font-bold text-slate-900">Lunch:</span>
                  <span class="text-slate-600 ml-1">${todayMenu.lunch.items}</span>
                </div>
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">🍛</span>
                <div>
                  <span class="font-bold text-slate-900">Dinner:</span>
                  <span class="text-slate-600 ml-1">${todayMenu.dinner.items}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Current Food Waste Status (Part 3 - Item 1 & 6) -->
        <div class="glass-card p-4 border border-slate-200">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900">Current Waste & Leftovers</h3>
              <p class="text-[11px] text-slate-500">Today's audit: 26 portions leftover across meals</p>
            </div>
            <button id="staff-record-waste-btn" class="text-xs font-bold text-teal-600 hover:text-teal-700">
              Record Leftovers ➔
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-3">
            <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span class="text-[11px] font-bold text-amber-800">Today's Food Waste</span>
              <div class="text-xl font-extrabold text-amber-950 mt-0.5">${totalTodayLeftovers} portions</div>
              <span class="text-[10px] text-amber-700">B: 8 | L: 12 | D: 6</span>
            </div>

            <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
              <span class="text-[11px] font-bold text-purple-800">Waste Percentage</span>
              <div class="text-xl font-extrabold text-purple-950 mt-0.5">${dailyReport.wastePercentage}%</div>
              <span class="text-[10px] text-emerald-700 font-bold">Target &lt; 10%</span>
            </div>
          </div>

          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-500 font-medium">Previous Day Leftovers:</span>
            <span class="font-bold text-slate-800">B: ${leftovers.breakfast} | L: ${leftovers.lunch} | D: ${leftovers.dinner} portions</span>
          </div>
        </div>

        <!-- Quick Action Nav Grid -->
        <div class="grid grid-cols-3 gap-2">
          <button id="quick-kitchen-nav" class="p-3 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 transition shadow-sm text-center">
            <div class="text-xl mb-1">👨‍🍳</div>
            <div class="text-xs font-bold text-slate-900">Kitchen Prep</div>
            <p class="text-[9px] text-slate-400">Confirm batches</p>
          </button>
          <button id="quick-waste-nav" class="p-3 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 transition shadow-sm text-center">
            <div class="text-xl mb-1">🍱</div>
            <div class="text-xs font-bold text-slate-900">Record Waste</div>
            <p class="text-[9px] text-slate-400">Audit leftovers</p>
          </button>
          <button id="quick-reports-nav" class="p-3 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 transition shadow-sm text-center">
            <div class="text-xl mb-1">📊</div>
            <div class="text-xs font-bold text-slate-900">Full Reports</div>
            <p class="text-[9px] text-slate-400">Trends & savings</p>
          </button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('staff-view-att-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('attendance');
    });

    document.getElementById('staff-open-ai-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('recommendation');
    });

    document.getElementById('staff-edit-menu-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('menu');
    });

    document.getElementById('staff-record-waste-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('waste');
    });

    document.getElementById('quick-kitchen-nav')?.addEventListener('click', () => {
      this.app.switchStaffTab('kitchen');
    });

    document.getElementById('quick-waste-nav')?.addEventListener('click', () => {
      this.app.switchStaffTab('waste');
    });

    document.getElementById('quick-reports-nav')?.addEventListener('click', () => {
      this.app.switchStaffTab('reports');
    });
  }
}
