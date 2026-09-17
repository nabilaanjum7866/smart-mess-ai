// SMARTMESS AI - Kitchen Preparation View Component (Part 2 - Item 5 / Screen 7)

export class KitchenViewComponent {
  constructor(app) {
    this.app = app;
  }

  render() {
    const kitchenData = this.app.getKitchenStatus();

    const statusBadgeClass = (status) => {
      if (status === 'Ready') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      if (status === 'In Progress') return 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse';
      return 'bg-slate-100 text-slate-600 border-slate-200';
    };

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Header (Screen 7 in Reference) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="kitchen-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900">Mess Recommendation</h2>
                <p class="text-xs text-slate-500 font-medium">Kitchen Live Cook Orders & Batch Status</p>
              </div>
            </div>

            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
              <button class="hover:text-teal-700 p-0.5">‹</button>
              <span>Tue, 15 Apr 2025</span>
              <button class="hover:text-teal-700 p-0.5">›</button>
            </div>
          </div>
        </div>

        <!-- Kitchen Table (Screen 7 in Reference) -->
        <div class="glass-card p-4 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th class="py-3 px-3">Meal</th>
                  <th class="py-3 px-3 text-center">Recommended</th>
                  <th class="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs">
                <!-- Breakfast Row -->
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="py-3.5 px-3">
                    <div class="flex items-center gap-2.5">
                      <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm flex-shrink-0">🥣</span>
                      <div>
                        <span class="font-bold text-slate-900">Breakfast</span>
                        <div class="text-[10px] text-slate-400 font-normal">Idli, Sambar, Chutney</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-3 text-center">
                    <span class="text-base font-extrabold text-slate-900">${kitchenData.breakfast.recommended}</span>
                    <span class="text-[11px] text-slate-500 block font-normal">portions</span>
                  </td>
                  <td class="py-3.5 px-3 text-right">
                    <select class="kitchen-status-select text-[11px] font-bold px-2.5 py-1 rounded-xl border ${statusBadgeClass(kitchenData.breakfast.status)} focus:outline-none cursor-pointer" data-meal="breakfast">
                      <option value="Ready" ${kitchenData.breakfast.status === 'Ready' ? 'selected' : ''}>Ready</option>
                      <option value="In Progress" ${kitchenData.breakfast.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                      <option value="Pending" ${kitchenData.breakfast.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    </select>
                  </td>
                </tr>

                <!-- Lunch Row -->
                <tr class="hover:bg-slate-50/80 transition bg-amber-50/20">
                  <td class="py-3.5 px-3">
                    <div class="flex items-center gap-2.5">
                      <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm flex-shrink-0">🍲</span>
                      <div>
                        <span class="font-bold text-slate-900">Lunch</span>
                        <div class="text-[10px] text-slate-400 font-normal">Rice, Dal, Veg Curry, Salad</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-3 text-center">
                    <span class="text-base font-extrabold text-amber-700">${kitchenData.lunch.recommended}</span>
                    <span class="text-[11px] text-slate-500 block font-normal">portions</span>
                  </td>
                  <td class="py-3.5 px-3 text-right">
                    <select class="kitchen-status-select text-[11px] font-bold px-2.5 py-1 rounded-xl border ${statusBadgeClass(kitchenData.lunch.status)} focus:outline-none cursor-pointer" data-meal="lunch">
                      <option value="Ready" ${kitchenData.lunch.status === 'Ready' ? 'selected' : ''}>Ready</option>
                      <option value="In Progress" ${kitchenData.lunch.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                      <option value="Pending" ${kitchenData.lunch.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    </select>
                  </td>
                </tr>

                <!-- Dinner Row -->
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="py-3.5 px-3">
                    <div class="flex items-center gap-2.5">
                      <span class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm flex-shrink-0">🍛</span>
                      <div>
                        <span class="font-bold text-slate-900">Dinner</span>
                        <div class="text-[10px] text-slate-400 font-normal">Chapati, Paneer, Veg Pulao</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-3 text-center">
                    <span class="text-base font-extrabold text-slate-900">${kitchenData.dinner.recommended}</span>
                    <span class="text-[11px] text-slate-500 block font-normal">portions</span>
                  </td>
                  <td class="py-3.5 px-3 text-right">
                    <select class="kitchen-status-select text-[11px] font-bold px-2.5 py-1 rounded-xl border ${statusBadgeClass(kitchenData.dinner.status)} focus:outline-none cursor-pointer" data-meal="dinner">
                      <option value="Ready" ${kitchenData.dinner.status === 'Ready' ? 'selected' : ''}>Ready</option>
                      <option value="In Progress" ${kitchenData.dinner.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                      <option value="Pending" ${kitchenData.dinner.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Kitchen Live Action Buttons -->
        <div class="space-y-2.5 pt-1">
          <!-- Confirm Preparation Button (Part 2 - Item 5) -->
          <button id="confirm-prep-btn" class="w-full py-3.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Confirm Preparation</span>
          </button>

          <!-- Update Leftovers Button (Screen 7 in Reference) -->
          <button id="goto-waste-from-kitchen-btn" class="w-full py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm transition flex items-center justify-center gap-2">
            <span>Update Leftovers</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('kitchen-back-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('dashboard');
    });

    const statusSelects = document.querySelectorAll('.kitchen-status-select');
    statusSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        const mealId = select.getAttribute('data-meal');
        const newStatus = e.target.value;
        this.app.updateKitchenMealStatus(mealId, newStatus);
        this.app.showToast(`${mealId.toUpperCase()} status updated to: ${newStatus}`, 'success');
        this.app.render();
      });
    });

    document.getElementById('confirm-prep-btn')?.addEventListener('click', () => {
      this.app.showToast('Kitchen batch preparation confirmed! Counters notified.', 'success');
      this.app.triggerConfetti();
    });

    document.getElementById('goto-waste-from-kitchen-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('waste');
    });
  }
}
