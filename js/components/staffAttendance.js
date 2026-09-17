// SMARTMESS AI - Staff Attendance Overview Component (Part 2 - Item 3)

export class StaffAttendanceComponent {
  constructor(app) {
    this.app = app;
  }

  render() {
    const todayCounts = this.app.getStaffTodayAttendanceCounts();
    const totalEnrolled = 80;
    const reasonsStats = this.app.getAggregatedAbsenceReasons();

    const bfPct = Math.round((todayCounts.breakfast / totalEnrolled) * 100);
    const lunchPct = Math.round((todayCounts.lunch / totalEnrolled) * 100);
    const dinnerPct = Math.round((todayCounts.dinner / totalEnrolled) * 100);

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Header -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="staff-att-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900">Attendance Overview</h2>
                <p class="text-xs text-slate-500 font-medium">Real-time Student Headcounts & Absence Insights</p>
              </div>
            </div>

            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Tue, 15 Apr 2025
            </span>
          </div>
        </div>

        <!-- Section 1: Number of Students Expected (Part 2 - Item 3) -->
        <div class="glass-card p-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Expected Attendance per Meal
          </h3>

          <div class="space-y-3">
            <!-- Breakfast bar -->
            <div class="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="font-bold text-slate-900 flex items-center gap-2">
                  <span>🥣</span> Breakfast
                </span>
                <span class="font-extrabold text-emerald-700 text-sm">
                  ${todayCounts.breakfast} <span class="text-slate-400 font-medium text-xs">/ ${totalEnrolled} students</span>
                </span>
              </div>
              <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full transition-all duration-700" style="width: ${bfPct}%"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                <span>${bfPct}% Attendance Rate</span>
                <span>${totalEnrolled - todayCounts.breakfast} expected absences</span>
              </div>
            </div>

            <!-- Lunch bar -->
            <div class="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="font-bold text-slate-900 flex items-center gap-2">
                  <span>🍲</span> Lunch
                </span>
                <span class="font-extrabold text-amber-700 text-sm">
                  ${todayCounts.lunch} <span class="text-slate-400 font-medium text-xs">/ ${totalEnrolled} students</span>
                </span>
              </div>
              <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full transition-all duration-700" style="width: ${lunchPct}%"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                <span>${lunchPct}% Attendance Rate</span>
                <span>${totalEnrolled - todayCounts.lunch} expected absences</span>
              </div>
            </div>

            <!-- Dinner bar -->
            <div class="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="font-bold text-slate-900 flex items-center gap-2">
                  <span>🍛</span> Dinner
                </span>
                <span class="font-extrabold text-indigo-700 text-sm">
                  ${todayCounts.dinner} <span class="text-slate-400 font-medium text-xs">/ ${totalEnrolled} students</span>
                </span>
              </div>
              <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div class="bg-indigo-500 h-full rounded-full transition-all duration-700" style="width: ${dinnerPct}%"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                <span>${dinnerPct}% Attendance Rate</span>
                <span>${totalEnrolled - todayCounts.dinner} expected absences</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Aggregated Reasons for Absence (Part 2 - Item 3) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900">Aggregated Absence Reasons</h3>
              <p class="text-xs text-slate-500">Why students skip meals today</p>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              🛡️ Privacy-Preserved
            </span>
          </div>

          <!-- Reason Bars matching prompt exactly -->
          <div class="space-y-2.5 text-xs">
            ${reasonsStats.map(item => `
              <div>
                <div class="flex items-center justify-between font-semibold mb-1">
                  <span class="text-slate-700 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full ${item.color}"></span>
                    ${item.reason}
                  </span>
                  <span class="text-slate-900 font-bold">${item.percentage}%</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="${item.barColor} h-full rounded-full transition-all duration-500" style="width: ${item.percentage}%"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Privacy Protection Notice (Important Requirement from prompt) -->
          <div class="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2">
            <span class="text-sm mt-0.5">🔒</span>
            <p>
              <b>Student Privacy Guarantee:</b> Individual students' personal health notes and identities are strictly confidential. Only anonymized aggregated percentages are shown to mess kitchen planners.
            </p>
          </div>
        </div>

        <!-- Action shortcut to AI Recommendation -->
        <div class="glass-card p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between shadow-md">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-200">Next Step in Workflow</h4>
            <p class="text-sm font-extrabold mt-0.5">Calculate Recommended Cook Quantities</p>
          </div>
          <button id="goto-ai-from-att" class="px-3.5 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow hover:bg-emerald-50 transition">
            View AI Math ➔
          </button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('staff-att-back-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('dashboard');
    });

    document.getElementById('goto-ai-from-att')?.addEventListener('click', () => {
      this.app.switchStaffTab('recommendation');
    });
  }
}
