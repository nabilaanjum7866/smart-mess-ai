// SMARTMESS AI - Student Menu View Component

import { DAYS_OF_WEEK } from '../data/studentsData.js';

export class MenuViewComponent {
  constructor(app) {
    this.app = app;
    this.selectedDay = 'tue';
  }

  render() {
    const menuData = this.app.getWeeklyMenu();
    const currentDayMenu = menuData[this.selectedDay] || menuData['tue'];

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Header -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="menu-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900">Hostel Weekly Menu</h2>
                <p class="text-xs text-slate-500 font-medium">Nutrition-Balanced Meal Schedule</p>
              </div>
            </div>

            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Week 16 (April)
            </span>
          </div>
        </div>

        <!-- Day Selector Pills (Mon - Sun) -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          ${DAYS_OF_WEEK.map(day => {
            const isSelected = day.id === this.selectedDay;
            const isToday = day.isToday;

            return `
              <button 
                class="day-filter-btn flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                }"
                data-day="${day.id}"
              >
                <div class="flex flex-col items-center">
                  <span>${day.name}</span>
                  <span class="text-[10px] font-normal ${isSelected ? 'text-emerald-100' : 'text-slate-400'}">${day.fullDate}</span>
                </div>
                ${isToday ? `<span class="inline-block w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-500'} mt-0.5"></span>` : ''}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Meal Cards for Selected Day -->
        <div class="space-y-3">
          <!-- Breakfast Card -->
          <div class="glass-card p-4 hover:border-emerald-300 transition border">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <div class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base">🥣</span>
                <div>
                  <h3 class="text-xs font-bold text-slate-900">Breakfast</h3>
                  <p class="text-[10px] text-slate-500">7:30 AM – 9:00 AM</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  ${currentDayMenu.breakfast.calories}
                </span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
                  ${currentDayMenu.breakfast.isVeg ? 'Veg' : 'Egg / Non-Veg'}
                </span>
              </div>
            </div>

            <p class="text-xs font-semibold text-slate-800 leading-relaxed">
              ${currentDayMenu.breakfast.items}
            </p>

            ${currentDayMenu.breakfast.special ? `
              <div class="mt-2.5 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-amber-700 bg-amber-50/60 px-2.5 py-1 rounded-lg">
                <span class="font-medium">✨ Chef Special: <b>${currentDayMenu.breakfast.special}</b></span>
                <span>Freshly Prepared</span>
              </div>
            ` : ''}
          </div>

          <!-- Lunch Card -->
          <div class="glass-card p-4 hover:border-emerald-300 transition border">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <div class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base">🍲</span>
                <div>
                  <h3 class="text-xs font-bold text-slate-900">Lunch</h3>
                  <p class="text-[10px] text-slate-500">12:30 PM – 2:00 PM</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  ${currentDayMenu.lunch.calories}
                </span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
                  ${currentDayMenu.lunch.isVeg ? 'Veg' : 'Egg / Non-Veg'}
                </span>
              </div>
            </div>

            <p class="text-xs font-semibold text-slate-800 leading-relaxed">
              ${currentDayMenu.lunch.items}
            </p>

            ${currentDayMenu.lunch.special ? `
              <div class="mt-2.5 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50/60 px-2.5 py-1 rounded-lg">
                <span class="font-medium">✨ Chef Special: <b>${currentDayMenu.lunch.special}</b></span>
                <span>Warm Buffet</span>
              </div>
            ` : ''}
          </div>

          <!-- Dinner Card -->
          <div class="glass-card p-4 hover:border-emerald-300 transition border">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <div class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base">🍛</span>
                <div>
                  <h3 class="text-xs font-bold text-slate-900">Dinner</h3>
                  <p class="text-[10px] text-slate-500">7:30 PM – 9:00 PM</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  ${currentDayMenu.dinner.calories}
                </span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
                  ${currentDayMenu.dinner.isVeg ? 'Veg' : 'Egg / Non-Veg'}
                </span>
              </div>
            </div>

            <p class="text-xs font-semibold text-slate-800 leading-relaxed">
              ${currentDayMenu.dinner.items}
            </p>

            ${currentDayMenu.dinner.special ? `
              <div class="mt-2.5 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-indigo-800 bg-indigo-50/60 px-2.5 py-1 rounded-lg">
                <span class="font-medium">✨ Chef Special: <b>${currentDayMenu.dinner.special}</b></span>
                <span>Dessert Included</span>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/50 text-[11px] text-emerald-800 flex items-center gap-2">
          <span>🌿</span>
          <p>Meals are prepared with local produce. Please notify the kitchen in advance if you will not attend to prevent food wastage!</p>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('menu-back-btn')?.addEventListener('click', () => {
      this.app.switchStudentTab('home');
    });

    const dayButtons = document.querySelectorAll('.day-filter-btn');
    dayButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedDay = btn.getAttribute('data-day') || 'tue';
        this.app.render();
      });
    });
  }
}
