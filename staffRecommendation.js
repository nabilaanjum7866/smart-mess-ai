// SMARTMESS AI - AI Food Quantity Recommendation Component (Part 2 - Item 4, 6 & Screen 6)

import { SPECIAL_EVENTS } from '../data/messData.js';

export class StaffRecommendationComponent {
  constructor(app) {
    this.app = app;
  }

  render() {
    const selectedEventId = this.app.getSelectedEvent();
    const recommendations = this.app.getAIRecommendations();
    const selectedEvent = SPECIAL_EVENTS.find(e => e.id === selectedEventId) || SPECIAL_EVENTS[0];

    const bf = recommendations.breakfast;
    const lunch = recommendations.lunch;
    const dinner = recommendations.dinner;

    const totalSavedPortions = bf.portionsSaved + lunch.portionsSaved + dinner.portionsSaved;
    const totalCostSaved = bf.estimatedCostSaved + lunch.estimatedCostSaved + dinner.estimatedCostSaved;
    const totalCo2 = Number((bf.co2SavedKg + lunch.co2SavedKg + dinner.co2SavedKg).toFixed(1));

    return `
      <div class="space-y-4 pb-20 animate-fade-in">
        <!-- Header (Screen 6 in Reference) -->
        <div class="glass-card p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button id="ai-rec-back-btn" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Recommended Quantity</span>
                  <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">AI ML</span>
                </h2>
                <p class="text-xs text-slate-500 font-medium">Predictive Kitchen Batch Sizing</p>
              </div>
            </div>

            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
              <button class="hover:text-teal-700 p-0.5">‹</button>
              <span>Tue, 15 Apr 2025</span>
              <button class="hover:text-teal-700 p-0.5">›</button>
            </div>
          </div>
        </div>

        <!-- Special Event Modifier Selector (Part 2 - Item 6) -->
        <div class="glass-card p-4 border border-teal-200/80 bg-teal-50/30">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>📅</span> Campus Schedule / Special Event Modifier
            </label>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
              Factor: ${selectedEvent.multiplier}x
            </span>
          </div>
          
          <select id="special-event-select" class="w-full text-xs font-bold rounded-xl border border-teal-300 p-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm cursor-pointer">
            ${SPECIAL_EVENTS.map(event => `
              <option value="${event.id}" ${event.id === selectedEventId ? 'selected' : ''}>
                ${event.name} — ${event.desc}
              </option>
            `).join('')}
          </select>
          <p class="text-[11px] text-slate-500 mt-1.5">
            Notice how shifting events dynamically re-calculates recommended cook quantities to prevent over/under production.
          </p>
        </div>

        <!-- 3 Big Recommended Quantity Cards (Screen 6 in Reference) -->
        <div class="grid grid-cols-3 gap-2.5">
          <!-- Breakfast Card -->
          <div class="glass-card p-4 text-center border-2 border-emerald-500/40 bg-gradient-to-b from-white to-emerald-50/50 shadow-md">
            <div class="w-9 h-9 mx-auto rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-1.5">
              🥣
            </div>
            <span class="text-xs font-bold text-slate-700">Breakfast</span>
            <div class="text-3xl font-black text-emerald-700 my-1">${bf.recommendedPortions}</div>
            <span class="text-xs font-semibold text-emerald-800/80">portions</span>
            <div class="mt-2 pt-2 border-t border-emerald-200/60 text-[10px] text-slate-500">
              Exp: <b>${bf.expectedAttendance}</b> | Left: <b>${bf.previousLeftovers}</b>
            </div>
          </div>

          <!-- Lunch Card -->
          <div class="glass-card p-4 text-center border-2 border-amber-500/40 bg-gradient-to-b from-white to-amber-50/50 shadow-md">
            <div class="w-9 h-9 mx-auto rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base mb-1.5">
              🍲
            </div>
            <span class="text-xs font-bold text-slate-700">Lunch</span>
            <div class="text-3xl font-black text-amber-600 my-1">${lunch.recommendedPortions}</div>
            <span class="text-xs font-semibold text-amber-800/80">portions</span>
            <div class="mt-2 pt-2 border-t border-amber-200/60 text-[10px] text-slate-500">
              Exp: <b>${lunch.expectedAttendance}</b> | Left: <b>${lunch.previousLeftovers}</b>
            </div>
          </div>

          <!-- Dinner Card -->
          <div class="glass-card p-4 text-center border-2 border-indigo-500/40 bg-gradient-to-b from-white to-indigo-50/50 shadow-md">
            <div class="w-9 h-9 mx-auto rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-base mb-1.5">
              🍛
            </div>
            <span class="text-xs font-bold text-slate-700">Dinner</span>
            <div class="text-3xl font-black text-indigo-700 my-1">${dinner.recommendedPortions}</div>
            <span class="text-xs font-semibold text-indigo-800/80">portions</span>
            <div class="mt-2 pt-2 border-t border-indigo-200/60 text-[10px] text-slate-500">
              Exp: <b>${dinner.expectedAttendance}</b> | Left: <b>${dinner.previousLeftovers}</b>
            </div>
          </div>
        </div>

        <!-- AI Core Explanation Banner (Screen 6 Subtext) -->
        <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900">
          <div class="flex items-start gap-2.5">
            <span class="text-base">💡</span>
            <div>
              <p class="font-bold text-emerald-950">
                Based on: attendance + previous consumption + leftovers + menu + day.
              </p>
              <p class="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                Prevents preparing a flat 80-portion fixed buffer. Today you save approximately 
                <b>${totalSavedPortions} excess meal portions</b> (~₹${totalCostSaved} saved and ${totalCo2} kg CO2 avoided).
              </p>
            </div>
          </div>
        </div>

        <!-- View Details Button (Screen 6 in Reference) -->
        <button id="ai-view-details-btn" class="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2">
          <span>View Details & Mathematical Breakdown</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Send to Kitchen View Action -->
        <div class="pt-1">
          <button id="send-to-kitchen-btn" class="w-full py-3.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-lg shadow-teal-800/25 transition flex items-center justify-center gap-2">
            <span>Send to Kitchen Preparation</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('ai-rec-back-btn')?.addEventListener('click', () => {
      this.app.switchStaffTab('dashboard');
    });

    document.getElementById('special-event-select')?.addEventListener('change', (e) => {
      const eventId = e.target.value;
      this.app.setSelectedEvent(eventId);
      this.app.showToast(`AI Re-calculated for: ${eventId.toUpperCase()}`, 'success');
      this.app.render();
    });

    document.getElementById('ai-view-details-btn')?.addEventListener('click', () => {
      this.openExplainabilityModal();
    });

    document.getElementById('send-to-kitchen-btn')?.addEventListener('click', () => {
      this.app.syncRecommendationsToKitchen();
      this.app.showToast('Portions synced directly to Kitchen Prep Display!', 'success');
      this.app.switchStaffTab('kitchen');
    });
  }

  openExplainabilityModal() {
    const recommendations = this.app.getAIRecommendations();
    const modalEl = document.getElementById('ai-details-modal-container');
    if (!modalEl) return;

    modalEl.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div class="glass-card w-full max-w-lg p-5 bg-white border border-slate-200 shadow-2xl rounded-3xl animate-scale-up max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">🧠</span>
              <div>
                <h3 class="text-sm font-bold text-slate-900">Explainable AI Formula</h3>
                <p class="text-[11px] text-slate-500 font-medium">Clear, Transparent Hostel Portion Sizing</p>
              </div>
            </div>
            <button id="close-ai-modal-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-700">✕</button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed">
              <b>Equation:</b><br/>
              Recommended = Round( (Expected_Attendance × 0.85 + Historical_Avg × 0.15 + Safety_Buffer - (Previous_Leftovers × 0.5)) × Event_Factor )
            </div>

            <!-- Breakfast Breakdown -->
            <div class="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <div class="flex items-center justify-between font-bold text-emerald-950 mb-2">
                <span>Breakfast Calculation (Target: ${recommendations.breakfast.recommendedPortions} Portions)</span>
                <span class="text-xs bg-emerald-200/80 px-2 py-0.5 rounded-full">94% Confidence</span>
              </div>
              <ul class="space-y-1 text-slate-700 text-[11px]">
                ${recommendations.breakfast.breakdown.map(item => `
                  <li class="flex justify-between py-0.5 border-b border-emerald-100/60">
                    <span>${item.label}:</span>
                    <span class="font-bold text-slate-900">${item.value}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Lunch Breakdown -->
            <div class="p-3 rounded-xl border border-amber-200 bg-amber-50/40">
              <div class="flex items-center justify-between font-bold text-amber-950 mb-2">
                <span>Lunch Calculation (Target: ${recommendations.lunch.recommendedPortions} Portions)</span>
                <span class="text-xs bg-amber-200/80 px-2 py-0.5 rounded-full">96% Confidence</span>
              </div>
              <ul class="space-y-1 text-slate-700 text-[11px]">
                ${recommendations.lunch.breakdown.map(item => `
                  <li class="flex justify-between py-0.5 border-b border-amber-100/60">
                    <span>${item.label}:</span>
                    <span class="font-bold text-slate-900">${item.value}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Dinner Breakdown -->
            <div class="p-3 rounded-xl border border-indigo-200 bg-indigo-50/40">
              <div class="flex items-center justify-between font-bold text-indigo-950 mb-2">
                <span>Dinner Calculation (Target: ${recommendations.dinner.recommendedPortions} Portions)</span>
                <span class="text-xs bg-indigo-200/80 px-2 py-0.5 rounded-full">93% Confidence</span>
              </div>
              <ul class="space-y-1 text-slate-700 text-[11px]">
                ${recommendations.dinner.breakdown.map(item => `
                  <li class="flex justify-between py-0.5 border-b border-indigo-100/60">
                    <span>${item.label}:</span>
                    <span class="font-bold text-slate-900">${item.value}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <button id="ok-ai-modal-btn" class="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow transition">
              Understood, Close Breakdown
            </button>
          </div>
        </div>
      </div>
    `;

    modalEl.classList.remove('hidden');

    const close = () => {
      modalEl.classList.add('hidden');
      modalEl.innerHTML = '';
    };

    document.getElementById('close-ai-modal-btn')?.addEventListener('click', close);
    document.getElementById('ok-ai-modal-btn')?.addEventListener('click', close);
  }
}
