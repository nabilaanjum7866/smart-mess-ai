// SMARTMESS AI - Weekly Attendance Component (Screen 3 in Reference)

import { DAYS_OF_WEEK, MEALS } from '../data/studentsData.js';

export class WeeklyAttendanceComponent {
  constructor(app) {
    this.app = app;
  }

  calculateStats(studentId) {
    const records = this.app.getStudentAttendance(studentId);
    let totalMeals = 21;
    let attendedTotal = 0;
    let bfAttended = 0;
    let lunchAttended = 0;
    let dinnerAttended = 0;

    DAYS_OF_WEEK.forEach(day => {
      const dayRec = records[day.id] || {};
      if (dayRec.breakfast) bfAttended++;
      if (dayRec.lunch) lunchAttended++;
      if (dayRec.dinner) dinnerAttended++;
    });

    attendedTotal = bfAttended + lunchAttended + dinnerAttended;

    return {
      totalMeals,
      attendedTotal,
      bfPct: Math.round((bfAttended / 7) * 100),
      lunchPct: Math.round((lunchAttended / 7) * 100),
      dinnerPct: Math.round((dinnerAttended / 7) * 100),
      overallPct: Math.round((attendedTotal / totalMeals) * 100)
    };
  }

  render() {
    const student = this.app.getCurrentStudent();
    const records = this.app.getStudentAttendance(student.id);
    const stats = this.calculateStats(student.id);

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Top Navigation / Week Selector -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="att-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900">Mark Attendance</h2>
                <p class="text-xs text-slate-500">7 Days × 3 Meals Matrix</p>
              </div>
            </div>

            <!-- Week Navigator -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
              <button class="hover:text-emerald-700 p-0.5" title="Previous Week">‹</button>
              <span>This Week</span>
              <button class="hover:text-emerald-700 p-0.5" title="Next Week">›</button>
            </div>
          </div>
        </div>

        <!-- 7-Day x 3-Meal Interactive Table -->
        <div class="glass-card p-4 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-center border-collapse">
              <thead>
                <tr class="border-b border-slate-100">
                  <th class="py-2.5 px-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Day</th>
                  <th class="py-2.5 px-3 text-xs font-bold text-slate-700">Breakfast</th>
                  <th class="py-2.5 px-3 text-xs font-bold text-slate-700">Lunch</th>
                  <th class="py-2.5 px-3 text-xs font-bold text-slate-700">Dinner</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${DAYS_OF_WEEK.map(day => {
                  const dayRec = records[day.id] || {};
                  const isToday = day.isToday;

                  return `
                    <tr class="hover:bg-slate-50/70 transition ${isToday ? 'bg-emerald-50/40 font-semibold' : ''}">
                      <td class="py-3 px-3 text-left">
                        <div class="flex flex-col">
                          <span class="text-xs font-bold ${isToday ? 'text-emerald-800 flex items-center gap-1' : 'text-slate-800'}">
                            ${day.name}
                            ${isToday ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>' : ''}
                          </span>
                          <span class="text-[10px] text-slate-400 font-medium">${day.fullDate}</span>
                        </div>
                      </td>

                      <!-- Breakfast cell -->
                      <td class="py-3 px-3">
                        <div class="flex justify-center">
                          <button 
                            class="attendance-check-btn ${dayRec.breakfast ? 'present' : 'absent'}"
                            data-day="${day.id}" 
                            data-meal="breakfast"
                            title="${dayRec.breakfast ? 'Attending Breakfast' : (dayRec.reason_breakfast || 'Not Attending')}"
                          >
                            ${dayRec.breakfast ? '✓' : '○'}
                          </button>
                        </div>
                      </td>

                      <!-- Lunch cell -->
                      <td class="py-3 px-3">
                        <div class="flex justify-center">
                          <button 
                            class="attendance-check-btn ${dayRec.lunch ? 'present' : 'absent'}"
                            data-day="${day.id}" 
                            data-meal="lunch"
                            title="${dayRec.lunch ? 'Attending Lunch' : (dayRec.reason_lunch || 'Not Attending')}"
                          >
                            ${dayRec.lunch ? '✓' : '○'}
                          </button>
                        </div>
                      </td>

                      <!-- Dinner cell -->
                      <td class="py-3 px-3">
                        <div class="flex justify-center">
                          <button 
                            class="attendance-check-btn ${dayRec.dinner ? 'present' : 'absent'}"
                            data-day="${day.id}" 
                            data-meal="dinner"
                            title="${dayRec.dinner ? 'Attending Dinner' : (dayRec.reason_dinner || 'Not Attending')}"
                          >
                            ${dayRec.dinner ? '✓' : '○'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Table Legend -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-xs font-medium text-slate-600">
            <div class="flex items-center gap-1.5">
              <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>Present</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-5 h-5 rounded-full border-2 border-rose-400 text-rose-500 flex items-center justify-center text-[10px] font-bold">○</span>
              <span>Not Attended</span>
            </div>
          </div>
          <p class="text-[11px] text-slate-400 text-center mt-2">
            💡 Tap any circle to toggle attendance or provide a reason for absence.
          </p>
        </div>

        <!-- Attendance Stats (Percentages & Total Meals) -->
        <div class="glass-card p-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Weekly Attendance Summary
          </h3>
          <div class="grid grid-cols-4 gap-2 text-center">
            <!-- Breakfast % -->
            <div class="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div class="text-base font-extrabold text-emerald-600">${stats.bfPct}%</div>
              <div class="text-[10px] text-slate-500 font-semibold mt-0.5">Breakfast</div>
            </div>

            <!-- Lunch % -->
            <div class="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div class="text-base font-extrabold text-amber-600">${stats.lunchPct}%</div>
              <div class="text-[10px] text-slate-500 font-semibold mt-0.5">Lunch</div>
            </div>

            <!-- Dinner % -->
            <div class="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div class="text-base font-extrabold text-indigo-600">${stats.dinnerPct}%</div>
              <div class="text-[10px] text-slate-500 font-semibold mt-0.5">Dinner</div>
            </div>

            <!-- Total Meals -->
            <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
              <div class="text-base font-extrabold text-emerald-800">${stats.attendedTotal}/${stats.totalMeals}</div>
              <div class="text-[10px] text-emerald-700 font-semibold mt-0.5">Attended</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const student = this.app.getCurrentStudent();

    document.getElementById('att-back-btn')?.addEventListener('click', () => {
      this.app.switchStudentTab('home');
    });

    const buttons = document.querySelectorAll('.attendance-check-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dayId = btn.getAttribute('data-day');
        const mealId = btn.getAttribute('data-meal');
        const isCurrentlyPresent = btn.classList.contains('present');

        if (isCurrentlyPresent) {
          // Switching to Absent: Prompt Reason Modal
          this.app.openReasonModal(dayId, mealId);
        } else {
          // Switching to Present
          this.app.setStudentAttendance(student.id, dayId, mealId, true);
          this.app.showToast(`Marked Present for ${mealId.toUpperCase()} (${dayId.toUpperCase()})`, 'success');
          this.app.render();
        }
      });
    });
  }
}
