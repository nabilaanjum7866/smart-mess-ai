// SMARTMESS AI - Student Profile Component (Screen 10 in Reference)

import { DAYS_OF_WEEK } from '../data/studentsData.js';

export class StudentProfileComponent {
  constructor(app) {
    this.app = app;
  }

  calculateWeeklySummary(studentId) {
    const records = this.app.getStudentAttendance(studentId);
    let bf = 0, lunch = 0, dinner = 0;

    DAYS_OF_WEEK.forEach(day => {
      const dayRec = records[day.id] || {};
      if (dayRec.breakfast) bf++;
      if (dayRec.lunch) lunch++;
      if (dayRec.dinner) dinner++;
    });

    return {
      bfPct: Math.round((bf / 7) * 100),
      lunchPct: Math.round((lunch / 7) * 100),
      dinnerPct: Math.round((dinner / 7) * 100)
    };
  }

  render() {
    const student = this.app.getCurrentStudent();
    const stats = this.calculateWeeklySummary(student.id);

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Header -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="profile-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900">My Profile</h2>
                <p class="text-xs text-slate-500 font-medium">Student Identity & Attendance Metrics</p>
              </div>
            </div>

            <!-- Logout action -->
            <button id="logout-btn" class="text-xs font-bold text-rose-600 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50 transition flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        <!-- Main Profile Card -->
        <div class="glass-card p-5 text-center">
          <div class="relative inline-block mx-auto mb-3">
            <img src="${student.avatar}" alt="${student.name}" class="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500/30 p-1 shadow-md" />
            <button id="edit-avatar-badge" class="absolute bottom-0 right-0 p-1.5 bg-emerald-600 text-white rounded-full shadow hover:bg-emerald-700 transition">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <h3 class="text-base font-extrabold text-slate-900">${student.name}</h3>
          <p class="text-xs text-slate-500 font-medium">${student.year} • ${student.block} • Room ${student.room}</p>

          <!-- Details List (Matches Screen 10) -->
          <div class="mt-5 space-y-2.5 text-left border-t border-slate-100 pt-4 text-xs">
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="text-slate-500 font-medium flex items-center gap-2">
                <span>🪪</span> Roll Number
              </span>
              <span class="font-bold text-slate-800 font-mono">${student.rollNo}</span>
            </div>

            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="text-slate-500 font-medium flex items-center gap-2">
                <span>🎓</span> Department
              </span>
              <span class="font-bold text-slate-800">${student.department}</span>
            </div>

            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="text-slate-500 font-medium flex items-center gap-2">
                <span>🏢</span> Hostel & Room
              </span>
              <span class="font-bold text-slate-800">${student.hostel} (${student.block} - ${student.room})</span>
            </div>

            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="text-slate-500 font-medium flex items-center gap-2">
                <span>📞</span> Contact
              </span>
              <span class="font-bold text-slate-800">${student.phone}</span>
            </div>

            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="text-slate-500 font-medium flex items-center gap-2">
                <span>✉️</span> Email
              </span>
              <span class="font-bold text-slate-800 font-mono">${student.email}</span>
            </div>

            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="text-slate-500 font-medium flex items-center gap-2">
                <span>🥗</span> Diet Preference
              </span>
              <span class="font-bold text-emerald-700">${student.dietPreference || 'Vegetarian'}</span>
            </div>
          </div>
        </div>

        <!-- Attendance Summary (This Week) - Circular Progress Rings (Screen 10) -->
        <div class="glass-card p-4">
          <h3 class="text-xs font-bold text-slate-900 mb-3 flex items-center justify-between">
            <span>Attendance Summary (This Week)</span>
            <span class="text-[10px] text-slate-400">Target: 75%+</span>
          </h3>

          <div class="grid grid-cols-3 gap-3 text-center">
            <!-- Breakfast Ring -->
            <div class="flex flex-col items-center">
              <div class="relative w-16 h-16 flex items-center justify-center">
                <svg class="w-16 h-16" viewBox="0 0 36 36">
                  <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-emerald-500 progress-ring-circle" stroke-dasharray="${stats.bfPct}, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span class="absolute text-xs font-extrabold text-slate-800">${stats.bfPct}%</span>
              </div>
              <span class="text-[11px] font-bold text-slate-700 mt-1">Breakfast</span>
            </div>

            <!-- Lunch Ring -->
            <div class="flex flex-col items-center">
              <div class="relative w-16 h-16 flex items-center justify-center">
                <svg class="w-16 h-16" viewBox="0 0 36 36">
                  <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-amber-500 progress-ring-circle" stroke-dasharray="${stats.lunchPct}, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span class="absolute text-xs font-extrabold text-slate-800">${stats.lunchPct}%</span>
              </div>
              <span class="text-[11px] font-bold text-slate-700 mt-1">Lunch</span>
            </div>

            <!-- Dinner Ring -->
            <div class="flex flex-col items-center">
              <div class="relative w-16 h-16 flex items-center justify-center">
                <svg class="w-16 h-16" viewBox="0 0 36 36">
                  <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-indigo-500 progress-ring-circle" stroke-dasharray="${stats.dinnerPct}, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span class="absolute text-xs font-extrabold text-slate-800">${stats.dinnerPct}%</span>
              </div>
              <span class="text-[11px] font-bold text-slate-700 mt-1">Dinner</span>
            </div>
          </div>

          <!-- Edit Profile Button (Screen 10) -->
          <button id="open-edit-profile-btn" class="w-full mt-4 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit Profile</span>
          </button>
        </div>

        <!-- Simulated Students Demo Switcher (Switch between 85+ students) -->
        <div class="glass-card p-4 border border-emerald-200/80 bg-emerald-50/30">
          <label class="block text-xs font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
            <span>👥</span> Switch Demo Student (Dataset of 85+ Residents)
          </label>
          <select id="switch-student-select" class="w-full text-xs font-semibold rounded-xl border border-emerald-300 p-2.5 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500">
            ${this.app.getStudentsList().map(s => `
              <option value="${s.id}" ${s.id === student.id ? 'selected' : ''}>
                ${s.rollNo} — ${s.name} (${s.block} • ${s.department.split(' ')[0]})
              </option>
            `).join('')}
          </select>
          <p class="text-[10px] text-slate-500 mt-1.5">
            Test how different hostel students have unique attendance streaks and preferences.
          </p>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('profile-back-btn')?.addEventListener('click', () => {
      this.app.switchStudentTab('home');
    });

    document.getElementById('logout-btn')?.addEventListener('click', () => {
      this.app.logout();
    });

    document.getElementById('open-edit-profile-btn')?.addEventListener('click', () => {
      this.openEditModal();
    });

    document.getElementById('switch-student-select')?.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      this.app.setCurrentStudentById(selectedId);
      this.app.showToast(`Switched active profile to ${this.app.getCurrentStudent().name}`, 'success');
      this.app.render();
    });
  }

  openEditModal() {
    const student = this.app.getCurrentStudent();
    const modalEl = document.getElementById('edit-profile-modal-container');
    if (!modalEl) return;

    modalEl.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div class="glass-card w-full max-w-md p-5 bg-white border border-slate-200 shadow-2xl rounded-3xl animate-scale-up">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 class="text-sm font-bold text-slate-900">Edit Student Profile</h3>
            <button id="close-edit-modal-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-700">✕</button>
          </div>

          <form id="edit-profile-form" class="space-y-3 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" id="edit-name" value="${student.name}" required class="w-full rounded-xl border border-slate-200 p-2 text-slate-900 focus:border-emerald-500 focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Block</label>
                <select id="edit-block" class="w-full rounded-xl border border-slate-200 p-2 text-slate-900 focus:border-emerald-500 focus:outline-none">
                  <option ${student.block === 'Block A' ? 'selected' : ''}>Block A</option>
                  <option ${student.block === 'Block B' ? 'selected' : ''}>Block B</option>
                  <option ${student.block === 'Block C' ? 'selected' : ''}>Block C</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Room No</label>
                <input type="text" id="edit-room" value="${student.room}" required class="w-full rounded-xl border border-slate-200 p-2 text-slate-900 focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Contact Phone</label>
              <input type="text" id="edit-phone" value="${student.phone}" required class="w-full rounded-xl border border-slate-200 p-2 text-slate-900 focus:border-emerald-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Dietary Preference</label>
              <select id="edit-diet" class="w-full rounded-xl border border-slate-200 p-2 text-slate-900 focus:border-emerald-500 focus:outline-none">
                <option ${student.dietPreference === 'Vegetarian' ? 'selected' : ''}>Vegetarian</option>
                <option ${student.dietPreference === 'Non-Vegetarian' ? 'selected' : ''}>Non-Vegetarian</option>
                <option ${student.dietPreference === 'Vegan' ? 'selected' : ''}>Vegan</option>
                <option ${student.dietPreference === 'Jain' ? 'selected' : ''}>Jain</option>
              </select>
            </div>

            <div class="pt-3 flex items-center gap-2">
              <button type="button" id="cancel-edit-modal-btn" class="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button type="submit" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `;

    modalEl.classList.remove('hidden');

    const close = () => {
      modalEl.classList.add('hidden');
      modalEl.innerHTML = '';
    };

    document.getElementById('close-edit-modal-btn')?.addEventListener('click', close);
    document.getElementById('cancel-edit-modal-btn')?.addEventListener('click', close);

    document.getElementById('edit-profile-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      student.name = document.getElementById('edit-name').value;
      student.block = document.getElementById('edit-block').value;
      student.room = document.getElementById('edit-room').value;
      student.phone = document.getElementById('edit-phone').value;
      student.dietPreference = document.getElementById('edit-diet').value;

      this.app.updateStudentProfile(student);
      close();
      this.app.showToast('Profile updated successfully!', 'success');
      this.app.render();
    });
  }
}
