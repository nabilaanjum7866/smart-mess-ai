// SMARTMESS AI - Reason for Not Attending Modal Component (Screen 4 in Reference)

import { REASONS, DAYS_OF_WEEK } from '../data/studentsData.js';

export class ReasonModalComponent {
  constructor(app) {
    this.app = app;
    this.currentDay = 'tue';
    this.currentMeal = 'lunch';
  }

  open(dayId, mealId) {
    this.currentDay = dayId;
    this.currentMeal = mealId;
    const modalEl = document.getElementById('reason-modal-container');
    if (!modalEl) return;

    modalEl.innerHTML = this.render();
    modalEl.classList.remove('hidden');
    this.attachEvents();
  }

  close() {
    const modalEl = document.getElementById('reason-modal-container');
    if (modalEl) {
      modalEl.classList.add('hidden');
      modalEl.innerHTML = '';
    }
  }

  render() {
    const dayObj = DAYS_OF_WEEK.find(d => d.id === this.currentDay) || { fullDate: '15 Apr', name: 'Tue' };
    const mealLabel = this.currentMeal.charAt(0).toUpperCase() + this.currentMeal.slice(1);
    const student = this.app.getCurrentStudent();
    const currentRec = this.app.getStudentAttendanceForDay(student.id, this.currentDay);
    const existingReason = currentRec?.[`reason_${this.currentMeal}`] || 'Outside food';
    const existingNote = currentRec?.[`note_${this.currentMeal}`] || '';

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div class="glass-card w-full max-w-md p-5 bg-white border border-slate-200 shadow-2xl rounded-3xl animate-scale-up">
          <!-- Modal Header -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div class="flex items-center gap-2">
              <button id="close-reason-modal" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h3 class="text-sm font-bold text-slate-900">Reason for Not Attending</h3>
                <p class="text-[11px] text-slate-500 font-medium">Select reason for ${dayObj.fullDate} (${mealLabel})</p>
              </div>
            </div>
            <span class="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
              ✕
            </span>
          </div>

          <!-- Reason Radio Options List -->
          <form id="reason-form" class="space-y-2.5">
            <div class="space-y-2">
              ${REASONS.map((reason, index) => {
                const isSelected = reason === existingReason || (index === 0 && !existingReason);
                return `
                  <label class="flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-semibold shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }">
                    <div class="flex items-center gap-3 text-xs">
                      <span class="w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }">
                        ${isSelected ? '✓' : ''}
                      </span>
                      <span>${reason}</span>
                    </div>
                    <input type="radio" name="absenceReason" value="${reason}" ${isSelected ? 'checked' : ''} class="hidden reason-radio-input" />
                  </label>
                `;
              }).join('')}
            </div>

            <!-- Optional Additional Note -->
            <div class="mt-4 pt-2">
              <label class="block text-xs font-semibold text-slate-700 mb-1">
                Any additional note <span class="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea 
                id="reason-note-input" 
                rows="2" 
                class="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50/60 resize-none"
                placeholder="e.g. Fever, headache, attending college symposium..."
              >${existingNote}</textarea>
            </div>

            <!-- Submit Action -->
            <div class="mt-5 pt-2 flex items-center gap-2">
              <button 
                type="button" 
                id="cancel-reason-btn" 
                class="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Keep Present
              </button>
              <button 
                type="submit" 
                class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Submit Reason</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const student = this.app.getCurrentStudent();

    document.getElementById('close-reason-modal')?.addEventListener('click', () => this.close());
    document.getElementById('cancel-reason-btn')?.addEventListener('click', () => this.close());

    // Interactive radio item highlighting
    const radios = document.querySelectorAll('.reason-radio-input');
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('label:has(.reason-radio-input)').forEach(lbl => {
          lbl.classList.remove('border-emerald-500', 'bg-emerald-50/50', 'text-emerald-950', 'font-semibold', 'shadow-sm');
          lbl.classList.add('border-slate-200', 'text-slate-700');
          const checkIcon = lbl.querySelector('span:first-child');
          if (checkIcon) {
            checkIcon.className = 'w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center';
            checkIcon.textContent = '';
          }
        });

        const activeLabel = radio.closest('label');
        if (activeLabel) {
          activeLabel.classList.add('border-emerald-500', 'bg-emerald-50/50', 'text-emerald-950', 'font-semibold', 'shadow-sm');
          activeLabel.classList.remove('border-slate-200', 'text-slate-700');
          const checkIcon = activeLabel.querySelector('span:first-child');
          if (checkIcon) {
            checkIcon.className = 'w-4 h-4 rounded-full border border-emerald-600 bg-emerald-600 text-white flex items-center justify-center';
            checkIcon.textContent = '✓';
          }
        }
      });
    });

    const form = document.getElementById('reason-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedRadio = document.querySelector('input[name="absenceReason"]:checked');
      const selectedReason = selectedRadio ? selectedRadio.value : 'Other';
      const note = document.getElementById('reason-note-input')?.value.trim() || '';

      this.app.setStudentAttendance(student.id, this.currentDay, this.currentMeal, false, selectedReason, note);
      this.close();
      this.app.showToast(`Noted: Absent for ${this.currentMeal.toUpperCase()} (${selectedReason})`, 'warning');
      this.app.render();
    });
  }
}
