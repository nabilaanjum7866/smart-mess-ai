// SMARTMESS AI - Student Dashboard Component (Screen 2 in Reference)

export class StudentDashboardComponent {
  constructor(app) {
    this.app = app;
  }

  render() {
    const student = this.app.getCurrentStudent();
    const todayAttendance = this.app.getStudentAttendanceForDay(student.id, 'tue');
    const todayMenu = this.app.getMenuForDay('tue');

    const isBreakfastAttending = todayAttendance?.breakfast ?? true;
    const isLunchAttending = todayAttendance?.lunch ?? true;
    const isDinnerAttending = todayAttendance?.dinner ?? true;

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Top Student Greeting Bar -->
        <div class="glass-card p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <img src="${student.avatar}" alt="${student.name}" class="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/40 p-0.5" />
              <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h2 class="text-base font-bold text-slate-900">Hi, ${student.name.split(' ')[0]} 👋</h2>
              </div>
              <p class="text-xs text-slate-500 font-medium">${student.year.split(' ')[0]} • ${student.block} • Room ${student.room}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button id="dashboard-notif-btn" class="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
          </div>
        </div>

        <!-- Today's Mess Card -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Today's Mess</span>
            </h3>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Tue, 15 Apr 2025
            </span>
          </div>

          <!-- 3 Meal Chips Row -->
          <div class="grid grid-cols-3 gap-2">
            <!-- Breakfast Chip -->
            <div class="p-2.5 rounded-xl ${isBreakfastAttending ? 'bg-emerald-50/80 border border-emerald-200' : 'bg-rose-50/70 border border-rose-200'} transition-all">
              <div class="flex items-center justify-between text-xs font-bold ${isBreakfastAttending ? 'text-emerald-800' : 'text-rose-700'}">
                <span>Breakfast</span>
                <span>${isBreakfastAttending ? '✓' : '✕'}</span>
              </div>
              <div class="text-[11px] text-slate-500 mt-1 font-medium">7:30 - 9:00</div>
              <div class="text-[10px] mt-1 font-semibold ${isBreakfastAttending ? 'text-emerald-600' : 'text-rose-500'}">
                ${isBreakfastAttending ? 'Attended' : 'Skipped'}
              </div>
            </div>

            <!-- Lunch Chip -->
            <div class="p-2.5 rounded-xl ${isLunchAttending ? 'bg-amber-50/80 border border-amber-200' : 'bg-rose-50/70 border border-rose-200'} transition-all">
              <div class="flex items-center justify-between text-xs font-bold ${isLunchAttending ? 'text-amber-900' : 'text-rose-700'}">
                <span>Lunch</span>
                <span>${isLunchAttending ? '✓' : '✕'}</span>
              </div>
              <div class="text-[11px] text-slate-500 mt-1 font-medium">12:30 - 2:00</div>
              <div class="text-[10px] mt-1 font-semibold ${isLunchAttending ? 'text-amber-700' : 'text-rose-500'}">
                ${isLunchAttending ? 'Going (12:30)' : 'Not Going'}
              </div>
            </div>

            <!-- Dinner Chip -->
            <div class="p-2.5 rounded-xl ${isDinnerAttending ? 'bg-indigo-50/80 border border-indigo-200' : 'bg-rose-50/70 border border-rose-200'} transition-all">
              <div class="flex items-center justify-between text-xs font-bold ${isDinnerAttending ? 'text-indigo-900' : 'text-rose-700'}">
                <span>Dinner</span>
                <span>${isDinnerAttending ? '✓' : '✕'}</span>
              </div>
              <div class="text-[11px] text-slate-500 mt-1 font-medium">7:30 - 9:00</div>
              <div class="text-[10px] mt-1 font-semibold ${isDinnerAttending ? 'text-indigo-700' : 'text-rose-500'}">
                ${isDinnerAttending ? 'Attending' : 'Skipped'}
              </div>
            </div>
          </div>
        </div>

        <!-- Easy Meal Attendance (Interactive Widget) -->
        <div class="glass-card p-4 border-2 border-emerald-500/20 bg-gradient-to-br from-white to-emerald-50/40">
          <div class="flex items-center justify-between mb-2">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                Quick Action • Lunch Today
              </span>
              <h4 class="text-sm font-bold text-slate-900 mt-1">Will you attend Lunch today?</h4>
              <p class="text-xs text-slate-500">Cutoff: 11:30 AM (Helps kitchen cook exact portions)</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mt-3">
            <button id="quick-attend-yes" class="py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isLunchAttending ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-600' : 'bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50'}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>YES, I'M COMING</span>
            </button>

            <button id="quick-attend-no" class="py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${!isLunchAttending ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-600' : 'bg-white border-2 border-rose-300 text-rose-600 hover:bg-rose-50'}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>NO, SKIP MEAL</span>
            </button>
          </div>

          ${!isLunchAttending && todayAttendance?.reason_lunch ? `
            <div class="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200/80 text-xs text-rose-800 flex items-center justify-between">
              <div>
                <span class="font-bold">Reason recorded:</span> ${todayAttendance.reason_lunch}
                ${todayAttendance.note_lunch ? `<span class="italic text-slate-500 text-[11px]">("${todayAttendance.note_lunch}")</span>` : ''}
              </div>
              <button id="change-reason-btn" class="text-[11px] font-bold underline hover:text-rose-950">Change</button>
            </div>
          ` : ''}
        </div>

        <!-- Today's Menu Card -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Today's Menu</span>
            </h3>
            <button id="nav-to-menu-btn" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>View All Week</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div class="space-y-2.5">
            <!-- Breakfast item -->
            <div class="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition flex items-center gap-3 border border-slate-100">
              <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                🥣
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Breakfast</span>
                  <span class="text-[10px] text-slate-400">7:30 - 9:00</span>
                </div>
                <p class="text-xs text-slate-600 truncate font-medium mt-0.5">${todayMenu.breakfast.items}</p>
              </div>
            </div>

            <!-- Lunch item -->
            <div class="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition flex items-center gap-3 border border-slate-100">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                🍲
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Lunch</span>
                  <span class="text-[10px] text-slate-400">12:30 - 2:00</span>
                </div>
                <p class="text-xs text-slate-600 truncate font-medium mt-0.5">${todayMenu.lunch.items}</p>
              </div>
            </div>

            <!-- Dinner item -->
            <div class="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition flex items-center gap-3 border border-slate-100">
              <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                🍛
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Dinner</span>
                  <span class="text-[10px] text-slate-400">7:30 - 9:00</span>
                </div>
                <p class="text-xs text-slate-600 truncate font-medium mt-0.5">${todayMenu.dinner.items}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sustainability Green Impact Banner -->
        <div class="glass-card p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Zero-Waste Hostel Champion</span>
              </div>
              <h4 class="text-lg font-extrabold tracking-tight">${student.savedWasteKg} kg Food Saved</h4>
              <p class="text-xs text-emerald-100">Streak: <span class="font-bold text-amber-300">${student.streakDays} Days</span> of timely meal responses!</p>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl">
              🌱
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const student = this.app.getCurrentStudent();

    document.getElementById('dashboard-notif-btn')?.addEventListener('click', () => {
      this.app.showNotificationsModal();
    });

    document.getElementById('nav-to-menu-btn')?.addEventListener('click', () => {
      this.app.switchStudentTab('menu');
    });

    document.getElementById('quick-attend-yes')?.addEventListener('click', () => {
      this.app.setStudentAttendance(student.id, 'tue', 'lunch', true);
      this.app.showToast('Attendance recorded: Coming for Lunch! 🍽️', 'success');
      this.app.triggerConfetti();
      this.app.render();
    });

    document.getElementById('quick-attend-no')?.addEventListener('click', () => {
      this.app.openReasonModal('tue', 'lunch');
    });

    document.getElementById('change-reason-btn')?.addEventListener('click', () => {
      this.app.openReasonModal('tue', 'lunch');
    });
  }
}
