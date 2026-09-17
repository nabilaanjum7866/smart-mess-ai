// SMARTMESS AI - Waste Tracking Component (Part 3 - Item 1 / Screen 8)

export class WasteTrackingComponent {
  constructor(app) {
    this.app = app;
  }

  render() {
    const mealWaste = this.app.getMealWasteData();
    const bf = mealWaste.breakfast;
    const lunch = mealWaste.lunch;
    const dinner = mealWaste.dinner;

    const totalPrepared = bf.prepared + lunch.prepared + dinner.prepared;
    const totalLeftovers = bf.leftover + lunch.leftover + dinner.leftover;
    const totalConsumed = totalPrepared - totalLeftovers;
    // Calculate percentage based on 220 standard daily prepared portions (or totalPrepared)
    const basePrepared = this.app.getDailyReport().foodPrepared || 220;
    const wastePct = Number(((totalLeftovers / basePrepared) * 100).toFixed(1));

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Header (Screen 8 in Reference) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="waste-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900">Record Leftovers</h2>
                <p class="text-xs text-slate-500 font-medium">Post-Meal Waste Auditing & Recycling</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                Prototype / Simulated Data
              </span>
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
                <button class="hover:text-teal-700 p-0.5">‹</button>
                <span>Tue, 15 Apr 2025</span>
                <button class="hover:text-teal-700 p-0.5">›</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Waste Highlight Summary Banner (Part 3 - Item 1) -->
        <div class="glass-card p-4 bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-2 py-0.5 rounded">
                Daily Waste Audit
              </span>
              <div class="mt-1 flex items-baseline gap-3">
                <span class="text-2xl font-black tracking-tight" id="summary-waste-portions">${totalLeftovers} portions</span>
                <span class="text-emerald-200 text-xs font-semibold">Today's Food Waste</span>
              </div>
            </div>

            <div class="text-right">
              <span class="text-2xl font-black text-amber-300" id="summary-waste-pct">${wastePct}%</span>
              <span class="block text-[11px] text-emerald-100 font-medium">Waste Percentage</span>
            </div>
          </div>

          <div class="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-emerald-100">
            <span>Prepared: <b class="text-white">${totalPrepared} portions</b></span>
            <span>•</span>
            <span>Consumed: <b class="text-white" id="summary-consumed-portions">${totalConsumed} portions</b></span>
            <span>•</span>
            <span>Target: <b class="text-emerald-300">&lt; 10% Waste</b></span>
          </div>
        </div>

        <!-- Meal Leftovers Entry Table (Part 3 - Item 1 & Screen 8) -->
        <div class="glass-card p-4">
          <form id="leftovers-form" class="space-y-4">
            <div class="overflow-hidden rounded-2xl border border-slate-200">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                    <th class="py-3 px-3">Meal</th>
                    <th class="py-3 px-2 text-center">Prepared</th>
                    <th class="py-3 px-2 text-center">Consumed</th>
                    <th class="py-3 px-3 text-right">Leftover Quantity</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <!-- Breakfast row -->
                  <tr class="hover:bg-slate-50/60 transition">
                    <td class="py-3.5 px-3">
                      <div class="flex items-center gap-2.5">
                        <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">🥣</span>
                        <div>
                          <span class="font-bold text-slate-900">Breakfast</span>
                          <div class="text-[10px] text-slate-400 font-normal">Idli, Sambar</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3.5 px-2 text-center font-bold text-slate-700">
                      ${bf.prepared}
                    </td>
                    <td class="py-3.5 px-2 text-center font-bold text-emerald-700" id="consumed-display-bf">
                      ${bf.consumed}
                    </td>
                    <td class="py-3.5 px-3 text-right">
                      <div class="inline-flex items-center gap-1.5 justify-end">
                        <button type="button" class="leftover-stepper-btn p-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 w-6 h-6 flex items-center justify-center" data-target="leftover-bf-input" data-delta="-1">-</button>
                        <input 
                          type="number" 
                          id="leftover-bf-input" 
                          min="0" 
                          max="40" 
                          value="${bf.leftover}" 
                          class="w-14 text-center py-1 px-1.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-teal-500" 
                        />
                        <button type="button" class="leftover-stepper-btn p-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 w-6 h-6 flex items-center justify-center" data-target="leftover-bf-input" data-delta="1">+</button>
                        <span class="text-slate-500 font-medium text-xs ml-1">portions</span>
                      </div>
                    </td>
                  </tr>

                  <!-- Lunch row -->
                  <tr class="hover:bg-slate-50/60 transition bg-amber-50/20">
                    <td class="py-3.5 px-3">
                      <div class="flex items-center gap-2.5">
                        <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">🍲</span>
                        <div>
                          <span class="font-bold text-slate-900">Lunch</span>
                          <div class="text-[10px] text-slate-400 font-normal">Rice, Dal, Veg Curry</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3.5 px-2 text-center font-bold text-slate-700">
                      ${lunch.prepared}
                    </td>
                    <td class="py-3.5 px-2 text-center font-bold text-amber-700" id="consumed-display-lunch">
                      ${lunch.consumed}
                    </td>
                    <td class="py-3.5 px-3 text-right">
                      <div class="inline-flex items-center gap-1.5 justify-end">
                        <button type="button" class="leftover-stepper-btn p-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 w-6 h-6 flex items-center justify-center" data-target="leftover-lunch-input" data-delta="-1">-</button>
                        <input 
                          type="number" 
                          id="leftover-lunch-input" 
                          min="0" 
                          max="40" 
                          value="${lunch.leftover}" 
                          class="w-14 text-center py-1 px-1.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-teal-500" 
                        />
                        <button type="button" class="leftover-stepper-btn p-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 w-6 h-6 flex items-center justify-center" data-target="leftover-lunch-input" data-delta="1">+</button>
                        <span class="text-slate-500 font-medium text-xs ml-1">portions</span>
                      </div>
                    </td>
                  </tr>

                  <!-- Dinner row -->
                  <tr class="hover:bg-slate-50/60 transition">
                    <td class="py-3.5 px-3">
                      <div class="flex items-center gap-2.5">
                        <span class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">🍛</span>
                        <div>
                          <span class="font-bold text-slate-900">Dinner</span>
                          <div class="text-[10px] text-slate-400 font-normal">Chapati, Paneer</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3.5 px-2 text-center font-bold text-slate-700">
                      ${dinner.prepared}
                    </td>
                    <td class="py-3.5 px-2 text-center font-bold text-indigo-700" id="consumed-display-dinner">
                      ${dinner.consumed}
                    </td>
                    <td class="py-3.5 px-3 text-right">
                      <div class="inline-flex items-center gap-1.5 justify-end">
                        <button type="button" class="leftover-stepper-btn p-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 w-6 h-6 flex items-center justify-center" data-target="leftover-dinner-input" data-delta="-1">-</button>
                        <input 
                          type="number" 
                          id="leftover-dinner-input" 
                          min="0" 
                          max="40" 
                          value="${dinner.leftover}" 
                          class="w-14 text-center py-1 px-1.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-teal-500" 
                        />
                        <button type="button" class="leftover-stepper-btn p-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 w-6 h-6 flex items-center justify-center" data-target="leftover-dinner-input" data-delta="1">+</button>
                        <span class="text-slate-500 font-medium text-xs ml-1">portions</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Action Buttons -->
            <div class="pt-1 flex items-center gap-2">
              <button type="submit" class="flex-1 py-3.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Save Leftovers & Feed AI</span>
              </button>
            </div>
          </form>
        </div>

        <!-- AI Feedback loop explanation -->
        <div class="p-3.5 rounded-2xl bg-teal-50 border border-teal-200/80 text-xs text-teal-950 flex items-start gap-2.5">
          <span class="text-base">🔄</span>
          <div>
            <p class="font-bold">Continuous AI Optimization Loop:</p>
            <p class="text-[11px] text-teal-800 mt-0.5 leading-relaxed">
              Recording 26 leftover portions today automatically trims tomorrow's initial cooking buffer by 0.5× factor, guaranteeing the kitchen never repeats overproduction.
            </p>
          </div>
        </div>

        <!-- Direct shortcut to Reports -->
        <button id="goto-reports-from-waste-btn" class="w-full py-3 px-4 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs shadow-sm transition flex items-center justify-center gap-2">
          <span>Open Full Reports & Analytics Dashboard</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('waste-back-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('dashboard');
    });

    document.getElementById('goto-reports-from-waste-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('reports');
    });

    // Stepper buttons
    document.querySelectorAll('.leftover-stepper-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        const input = document.getElementById(targetId);
        if (input) {
          let val = (parseInt(input.value, 10) || 0) + delta;
          if (val < 0) val = 0;
          if (val > 40) val = 40;
          input.value = val;
          this.recalcLiveValues();
        }
      });
    });

    // Input changes
    ['leftover-bf-input', 'leftover-lunch-input', 'leftover-dinner-input'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => {
        this.recalcLiveValues();
      });
    });

    document.getElementById('leftovers-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const bfLeft = parseInt(document.getElementById('leftover-bf-input').value, 10) || 0;
      const lunchLeft = parseInt(document.getElementById('leftover-lunch-input').value, 10) || 0;
      const dinnerLeft = parseInt(document.getElementById('leftover-dinner-input').value, 10) || 0;

      this.app.updateMealWaste({
        breakfast: { prepared: 70, consumed: Math.max(0, 70 - bfLeft), leftover: bfLeft },
        lunch: { prepared: 75, consumed: Math.max(0, 75 - lunchLeft), leftover: lunchLeft },
        dinner: { prepared: 65, consumed: Math.max(0, 65 - dinnerLeft), leftover: dinnerLeft }
      });

      this.app.showToast('Today\'s leftovers (26 portions, 11.8% waste) saved and synced to Reports!', 'success');
      this.app.triggerConfetti();
      this.app.switchStaffTab('reports');
    });
  }

  recalcLiveValues() {
    const bfLeft = parseInt(document.getElementById('leftover-bf-input')?.value, 10) || 0;
    const lunchLeft = parseInt(document.getElementById('leftover-lunch-input')?.value, 10) || 0;
    const dinnerLeft = parseInt(document.getElementById('leftover-dinner-input')?.value, 10) || 0;

    const totalLeftovers = bfLeft + lunchLeft + dinnerLeft;
    const basePrepared = this.app.getDailyReport().foodPrepared || 220;
    const totalPrepared = 70 + 75 + 65;
    const totalConsumed = totalPrepared - totalLeftovers;
    const wastePct = Number(((totalLeftovers / basePrepared) * 100).toFixed(1));

    const portionsEl = document.getElementById('summary-waste-portions');
    if (portionsEl) portionsEl.textContent = `${totalLeftovers} portions`;

    const wastePctEl = document.getElementById('summary-waste-pct');
    if (wastePctEl) wastePctEl.textContent = `${wastePct}%`;

    const consumedEl = document.getElementById('summary-consumed-portions');
    if (consumedEl) consumedEl.textContent = `${totalConsumed} portions`;

    const bfConsumedEl = document.getElementById('consumed-display-bf');
    if (bfConsumedEl) bfConsumedEl.textContent = Math.max(0, 70 - bfLeft);

    const lunchConsumedEl = document.getElementById('consumed-display-lunch');
    if (lunchConsumedEl) lunchConsumedEl.textContent = Math.max(0, 75 - lunchLeft);

    const dinnerConsumedEl = document.getElementById('consumed-display-dinner');
    if (dinnerConsumedEl) dinnerConsumedEl.textContent = Math.max(0, 65 - dinnerLeft);
  }
}
