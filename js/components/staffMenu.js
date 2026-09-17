// SMARTMESS AI - Staff Menu Management Component (Part 2 - Item 2 / Screen 5)

import { DAYS_OF_WEEK } from '../data/studentsData.js';

export class StaffMenuComponent {
  constructor(app) {
    this.app = app;
    this.selectedDay = 'tue';
  }

  render() {
    const weeklyMenu = this.app.getWeeklyMenu();
    const currentMenu = weeklyMenu[this.selectedDay] || weeklyMenu['tue'];
    const currentDayObj = DAYS_OF_WEEK.find(d => d.id === this.selectedDay) || DAYS_OF_WEEK[1];

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Header -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="staff-menu-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900">Manage Menu</h2>
                <p class="text-xs text-slate-500 font-medium">Add, Edit & Schedule Mess Meals</p>
              </div>
            </div>

            <!-- Date Selector dropdown/stepper -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
              <button id="prev-day-btn" class="hover:text-teal-700 p-0.5">‹</button>
              <span>${currentDayObj.label} 2025</span>
              <button id="next-day-btn" class="hover:text-teal-700 p-0.5">›</button>
            </div>
          </div>
        </div>

        <!-- Quick Day Selector Pills -->
        <div class="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          ${DAYS_OF_WEEK.map(day => `
            <button class="staff-day-pill px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
              day.id === this.selectedDay ? 'bg-teal-700 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }" data-day="${day.id}">
              ${day.name} (${day.fullDate})
            </button>
          `).join('')}
        </div>

        <!-- Menu Cards (Screen 5 in Reference) -->
        <div class="space-y-3">
          <!-- Breakfast Card -->
          <div class="glass-card p-4 border border-slate-200">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  🥣
                </div>
                <div>
                  <span class="text-xs font-bold text-slate-900">Breakfast</span>
                  <p class="text-[11px] text-slate-500">7:30 AM – 9:00 AM</p>
                  <p class="text-xs font-semibold text-slate-800 mt-1" id="display-bf-items">
                    ${currentMenu.breakfast.items}
                  </p>
                </div>
              </div>

              <button class="edit-meal-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 text-xs font-bold transition" data-meal="breakfast">
                Edit
              </button>
            </div>
          </div>

          <!-- Lunch Card -->
          <div class="glass-card p-4 border border-slate-200">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  🍲
                </div>
                <div>
                  <span class="text-xs font-bold text-slate-900">Lunch</span>
                  <p class="text-[11px] text-slate-500">12:30 PM – 2:00 PM</p>
                  <p class="text-xs font-semibold text-slate-800 mt-1" id="display-lunch-items">
                    ${currentMenu.lunch.items}
                  </p>
                </div>
              </div>

              <button class="edit-meal-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 text-xs font-bold transition" data-meal="lunch">
                Edit
              </button>
            </div>
          </div>

          <!-- Dinner Card -->
          <div class="glass-card p-4 border border-slate-200">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  🍛
                </div>
                <div>
                  <span class="text-xs font-bold text-slate-900">Dinner</span>
                  <p class="text-[11px] text-slate-500">7:30 PM – 9:00 PM</p>
                  <p class="text-xs font-semibold text-slate-800 mt-1" id="display-dinner-items">
                    ${currentMenu.dinner.items}
                  </p>
                </div>
              </div>

              <button class="edit-meal-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 text-xs font-bold transition" data-meal="dinner">
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Big Save Menu Button (Screen 5) -->
        <div class="pt-2">
          <button id="save-menu-btn" class="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-lg shadow-teal-800/20 transition flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Save Menu</span>
          </button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('staff-menu-back-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('dashboard');
    });

    const dayPills = document.querySelectorAll('.staff-day-pill');
    dayPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.selectedDay = pill.getAttribute('data-day') || 'tue';
        this.app.render();
      });
    });

    const editBtns = document.querySelectorAll('.edit-meal-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mealId = btn.getAttribute('data-meal');
        this.openEditMealModal(mealId);
      });
    });

    document.getElementById('save-menu-btn')?.addEventListener('click', () => {
      this.app.showToast(`Menu for ${this.selectedDay.toUpperCase()} saved & synced to all student portals!`, 'success');
      this.app.render();
    });
  }

  openEditMealModal(mealId) {
    const weeklyMenu = this.app.getWeeklyMenu();
    const meal = weeklyMenu[this.selectedDay][mealId];
    const mealName = mealId.charAt(0).toUpperCase() + mealId.slice(1);
    const modalEl = document.getElementById('edit-meal-modal-container');
    if (!modalEl) return;

    modalEl.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div class="glass-card w-full max-w-md p-5 bg-white border border-slate-200 shadow-2xl rounded-3xl animate-scale-up">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 class="text-sm font-bold text-slate-900">Edit ${mealName} Menu (${this.selectedDay.toUpperCase()})</h3>
            <button id="close-meal-modal-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-700">✕</button>
          </div>

          <form id="edit-meal-form" class="space-y-3 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Dishes & Ingredients (Comma-separated)</label>
              <textarea id="meal-items-input" rows="3" required class="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 focus:border-teal-500 focus:outline-none resize-none">${meal.items}</textarea>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Estimated Calories</label>
                <input type="text" id="meal-calories-input" value="${meal.calories || '600 kcal'}" class="w-full rounded-xl border border-slate-200 p-2 text-slate-800 focus:border-teal-500 focus:outline-none" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Diet Type</label>
                <select id="meal-veg-input" class="w-full rounded-xl border border-slate-200 p-2 text-slate-800 focus:border-teal-500 focus:outline-none">
                  <option value="true" ${meal.isVeg ? 'selected' : ''}>100% Vegetarian</option>
                  <option value="false" ${!meal.isVeg ? 'selected' : ''}>Non-Veg / Egg</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Chef Special Tag (Optional)</label>
              <input type="text" id="meal-special-input" value="${meal.special || ''}" placeholder="e.g. Special Paneer Curry" class="w-full rounded-xl border border-slate-200 p-2 text-slate-800 focus:border-teal-500 focus:outline-none" />
            </div>

            <div class="pt-3 flex items-center gap-2">
              <button type="button" id="delete-meal-item-btn" class="py-2.5 px-3 rounded-xl border border-rose-200 text-rose-600 font-bold hover:bg-rose-50 transition">
                Clear Items
              </button>
              <button type="submit" class="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shadow transition">
                Update Meal
              </button>
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

    document.getElementById('close-meal-modal-btn')?.addEventListener('click', close);

    document.getElementById('delete-meal-item-btn')?.addEventListener('click', () => {
      document.getElementById('meal-items-input').value = 'Simple Roti, Dal, Rice';
    });

    document.getElementById('edit-meal-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      meal.items = document.getElementById('meal-items-input').value.trim();
      meal.calories = document.getElementById('meal-calories-input').value.trim();
      meal.isVeg = document.getElementById('meal-veg-input').value === 'true';
      meal.special = document.getElementById('meal-special-input').value.trim();

      this.app.updateWeeklyMenu(weeklyMenu);
      close();
      this.app.showToast(`${mealName} menu updated!`, 'success');
      this.app.render();
    });
  }
}
