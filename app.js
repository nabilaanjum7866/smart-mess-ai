// SMARTMESS AI - Master Application Controller & Reactive State Manager (Part 3)

import { generateStudents, generateAttendanceMatrix, PRIMARY_STUDENT, DAYS_OF_WEEK } from './data/studentsData.js';
import { DEFAULT_WEEKLY_MENU, DEFAULT_LEFTOVERS, DEFAULT_KITCHEN_STATUS, DEFAULT_DAILY_REPORT, DEFAULT_MEAL_WASTE } from './data/messData.js';
import { FoodQuantityAI } from './ai/recommendation.js';

import { AuthComponent } from './components/auth.js';
import { StudentDashboardComponent } from './components/studentDashboard.js';
import { WeeklyAttendanceComponent } from './components/weeklyAttendance.js';
import { ReasonModalComponent } from './components/reasonModal.js';
import { MenuViewComponent } from './components/menuView.js';
import { StudentProfileComponent } from './components/studentProfile.js';

import { StaffDashboardComponent } from './components/staffDashboard.js';
import { StaffAttendanceComponent } from './components/staffAttendance.js';
import { StaffMenuComponent } from './components/staffMenu.js';
import { StaffRecommendationComponent } from './components/staffRecommendation.js';
import { KitchenViewComponent } from './components/kitchenView.js';
import { WasteTrackingComponent } from './components/wasteTracking.js';
import { ReportsViewComponent } from './components/reportsView.js';

// 13-Step Guided Hackathon Walkthrough Sequence (Part 3)
export const HACKATHON_DEMO_STEPS = [
  { step: 1, title: '1. Login as Student', desc: 'Authenticate with Roll BT2025 (Ayesha Khan)', role: 'auth', action: 'show_auth_student' },
  { step: 2, title: '2. Mark Today Attendance', desc: 'Confirm attending or skip Lunch on Student Dashboard', role: 'student', tab: 'home', action: 'focus_quick_attend' },
  { step: 3, title: '3. Reason for Missing Meal', desc: 'Provide categorized absence reason (Outside food, Class/Lab)', role: 'student', tab: 'home', action: 'open_reason_modal' },
  { step: 4, title: '4. Show Weekly Attendance', desc: 'Inspect 7-day x 3-meal matrix with attendance percentages', role: 'student', tab: 'attendance', action: 'none' },
  { step: 5, title: '5. Login as Mess Staff', desc: 'Switch to Mess Manager / Chef Suresh portal', role: 'staff', tab: 'dashboard', action: 'none' },
  { step: 6, title: '6. See Expected Headcounts', desc: 'Review Breakfast (68), Lunch (72), Dinner (64) / 80', role: 'staff', tab: 'attendance', action: 'none' },
  { step: 7, title: '7. Select Today\'s Menu', desc: 'Inspect / edit meal ingredients and Chef Specials', role: 'staff', tab: 'menu', action: 'none' },
  { step: 8, title: '8. Open AI Recommendation', desc: 'Examine attendance + leftovers + event factor algorithm', role: 'staff', tab: 'recommendation', action: 'none' },
  { step: 9, title: '9. Recommended Portions', desc: 'Verify AI batch sizes: 70 Breakfast, 75 Lunch, 65 Dinner', role: 'staff', tab: 'recommendation', action: 'open_ai_details' },
  { step: 10, title: '10. Confirm Kitchen Preparation', desc: 'Track batch status (Ready, In Progress, Pending) & confirm', role: 'staff', tab: 'kitchen', action: 'none' },
  { step: 11, title: '11. Record Leftovers Quantity', desc: 'Audit leftovers: 8 Breakfast, 12 Lunch, 6 Dinner (26 portions, 11.8%)', role: 'staff', tab: 'waste', action: 'none' },
  { step: 12, title: '12. Open Reports & Analytics', desc: 'Analyze Prepared vs Consumed, 7-day trend & cost savings', role: 'staff', tab: 'reports', action: 'none' },
  { step: 13, title: '13. Closed Loop Reduction', desc: 'Verify how audited leftovers feed tomorrow\'s AI prediction', role: 'staff', tab: 'reports', action: 'celebrate_finish' }
];

export class SmartMessApp {
  constructor() {
    this.STORAGE_KEY = 'smartmess_ai_v2_state';

    // State
    this.students = [];
    this.attendance = {};
    this.weeklyMenu = {};
    this.leftovers = {};
    this.mealWaste = {};
    this.kitchenStatus = {};
    this.dailyReport = {};

    this.currentRole = 'student'; // 'student', 'staff', or 'auth'
    this.currentStudentId = 'std_2025'; // Ayesha Khan
    this.activeStudentTab = 'home'; // 'home', 'attendance', 'menu', 'profile'
    this.activeStaffTab = 'dashboard'; // 'dashboard', 'attendance', 'menu', 'recommendation', 'kitchen', 'waste', 'reports'
    this.selectedEventId = 'normal';
    this.viewMode = 'desktop'; // 'mobile', 'desktop', 'poster'

    // Hackathon Guided Demo Step
    this.demoTourActive = true;
    this.currentDemoStepIndex = 1; // 0-indexed (0 to 12) -> default at Step 2 (Student Dashboard)

    // Sub-components
    this.authComp = new AuthComponent(this);
    this.studentDashComp = new StudentDashboardComponent(this);
    this.weeklyAttComp = new WeeklyAttendanceComponent(this);
    this.reasonModalComp = new ReasonModalComponent(this);
    this.menuViewComp = new MenuViewComponent(this);
    this.studentProfileComp = new StudentProfileComponent(this);

    this.staffDashComp = new StaffDashboardComponent(this);
    this.staffAttComp = new StaffAttendanceComponent(this);
    this.staffMenuComp = new StaffMenuComponent(this);
    this.staffRecComp = new StaffRecommendationComponent(this);
    this.kitchenComp = new KitchenViewComponent(this);
    this.wasteComp = new WasteTrackingComponent(this);
    this.reportsComp = new ReportsViewComponent(this);

    this.init();
  }

  init() {
    this.loadState();
    this.render();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.students = parsed.students || generateStudents();
        this.attendance = parsed.attendance || generateAttendanceMatrix(this.students);
        this.weeklyMenu = parsed.weeklyMenu || JSON.parse(JSON.stringify(DEFAULT_WEEKLY_MENU));
        this.leftovers = parsed.leftovers || { ...DEFAULT_LEFTOVERS };
        this.mealWaste = parsed.mealWaste || JSON.parse(JSON.stringify(DEFAULT_MEAL_WASTE));
        this.kitchenStatus = parsed.kitchenStatus || JSON.parse(JSON.stringify(DEFAULT_KITCHEN_STATUS));
        this.dailyReport = parsed.dailyReport || JSON.parse(JSON.stringify(DEFAULT_DAILY_REPORT));
        this.currentRole = parsed.currentRole || 'student';
        this.currentStudentId = parsed.currentStudentId || 'std_2025';
        this.viewMode = parsed.viewMode || 'desktop';
        this.demoTourActive = parsed.demoTourActive !== undefined ? parsed.demoTourActive : true;
        this.currentDemoStepIndex = parsed.currentDemoStepIndex || 1;
        return;
      }
    } catch (e) {
      console.warn('Initializing fresh state.', e);
    }

    this.resetToDefaults();
  }

  saveState() {
    try {
      const stateToStore = {
        students: this.students,
        attendance: this.attendance,
        weeklyMenu: this.weeklyMenu,
        leftovers: this.leftovers,
        mealWaste: this.mealWaste,
        kitchenStatus: this.kitchenStatus,
        dailyReport: this.dailyReport,
        currentRole: this.currentRole,
        currentStudentId: this.currentStudentId,
        viewMode: this.viewMode,
        demoTourActive: this.demoTourActive,
        currentDemoStepIndex: this.currentDemoStepIndex
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToStore));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  resetToDefaults() {
    this.students = generateStudents();
    this.attendance = generateAttendanceMatrix(this.students);
    this.weeklyMenu = JSON.parse(JSON.stringify(DEFAULT_WEEKLY_MENU));
    this.leftovers = { ...DEFAULT_LEFTOVERS };
    this.mealWaste = JSON.parse(JSON.stringify(DEFAULT_MEAL_WASTE));
    this.kitchenStatus = JSON.parse(JSON.stringify(DEFAULT_KITCHEN_STATUS));
    this.dailyReport = JSON.parse(JSON.stringify(DEFAULT_DAILY_REPORT));
    this.currentRole = 'student';
    this.currentStudentId = 'std_2025';
    this.activeStudentTab = 'home';
    this.activeStaffTab = 'dashboard';
    this.currentDemoStepIndex = 1;
    this.saveState();
  }

  // --- Getters & Queries ---
  getStudentsList() { return this.students; }
  getCurrentStudent() { return this.students.find(s => s.id === this.currentStudentId) || this.students[0]; }
  setCurrentStudentById(id) { this.currentStudentId = id; this.saveState(); }
  getStudentAttendance(studentId) { return this.attendance[studentId] || {}; }
  getStudentAttendanceForDay(studentId, dayId) { return this.attendance[studentId]?.[dayId] || {}; }
  getWeeklyMenu() { return this.weeklyMenu; }
  getMenuForDay(dayId) { return this.weeklyMenu[dayId] || this.weeklyMenu['tue']; }
  getLeftovers() { return this.leftovers; }
  getMealWasteData() { return this.mealWaste; }
  getKitchenStatus() { return this.kitchenStatus; }
  getDailyReport() { return this.dailyReport; }
  getSelectedEvent() { return this.selectedEventId; }
  setSelectedEvent(eventId) { this.selectedEventId = eventId; }

  // Tuesday attendance counts from 80 students
  getStaffTodayAttendanceCounts() {
    let bf = 0, lunch = 0, dinner = 0;
    const poolSize = Math.min(80, this.students.length);

    for (let i = 0; i < poolSize; i++) {
      const student = this.students[i];
      const att = this.attendance[student.id]?.['tue'] || {};
      if (att.breakfast) bf++;
      if (att.lunch) lunch++;
      if (att.dinner) dinner++;
    }

    return { breakfast: bf, lunch, dinner, totalStudents: poolSize };
  }

  getAggregatedAbsenceReasons() {
    return [
      { reason: 'Outside food', percentage: 30, color: 'bg-amber-500', barColor: 'bg-amber-500' },
      { reason: 'Class / Academic', percentage: 25, color: 'bg-blue-500', barColor: 'bg-blue-500' },
      { reason: 'Personal work', percentage: 18, color: 'bg-purple-500', barColor: 'bg-purple-500' },
      { reason: 'Not feeling well', percentage: 12, color: 'bg-rose-500', barColor: 'bg-rose-500' },
      { reason: 'Travel / Leave', percentage: 10, color: 'bg-teal-500', barColor: 'bg-teal-500' },
      { reason: 'Other', percentage: 5, color: 'bg-slate-400', barColor: 'bg-slate-400' }
    ];
  }

  getAIRecommendations() {
    const todayCounts = this.getStaffTodayAttendanceCounts();
    return FoodQuantityAI.calculateAll(todayCounts, this.leftovers, this.selectedEventId);
  }

  // --- State Modifiers ---
  loginAsStudent(rollNo) {
    const matched = this.students.find(s => s.rollNo.toUpperCase() === rollNo.toUpperCase());
    this.currentStudentId = matched ? matched.id : 'std_2025';
    this.currentRole = 'student';
    this.activeStudentTab = 'home';
    this.saveState();
    this.showToast(`Welcome, ${this.getCurrentStudent().name}!`, 'success');
    this.render();
  }

  loginAsStaff(staffId) {
    this.currentRole = 'staff';
    this.activeStaffTab = 'dashboard';
    this.saveState();
    this.showToast('Logged in as Mess Staff / Kitchen Manager', 'success');
    this.render();
  }

  logout() {
    this.currentRole = 'auth';
    this.saveState();
    this.showToast('You have been logged out.', 'info');
    this.render();
  }

  setStudentAttendance(studentId, dayId, mealId, isPresent, reason = '', note = '') {
    if (!this.attendance[studentId]) this.attendance[studentId] = {};
    if (!this.attendance[studentId][dayId]) this.attendance[studentId][dayId] = {};

    this.attendance[studentId][dayId][mealId] = isPresent;
    if (!isPresent) {
      this.attendance[studentId][dayId][`reason_${mealId}`] = reason || 'Other';
      this.attendance[studentId][dayId][`note_${mealId}`] = note || '';
    } else {
      delete this.attendance[studentId][dayId][`reason_${mealId}`];
      delete this.attendance[studentId][dayId][`note_${mealId}`];
    }
    this.saveState();
  }

  openReasonModal(dayId, mealId) {
    this.reasonModalComp.open(dayId, mealId);
  }

  updateStudentProfile(updatedStudent) {
    const idx = this.students.findIndex(s => s.id === updatedStudent.id);
    if (idx !== -1) {
      this.students[idx] = { ...this.students[idx], ...updatedStudent };
      this.saveState();
    }
  }

  updateWeeklyMenu(newMenu) {
    this.weeklyMenu = newMenu;
    this.saveState();
  }

  updateKitchenMealStatus(mealId, newStatus) {
    if (this.kitchenStatus[mealId]) {
      this.kitchenStatus[mealId].status = newStatus;
      this.saveState();
    }
  }

  syncRecommendationsToKitchen() {
    const recs = this.getAIRecommendations();
    this.kitchenStatus.breakfast.recommended = recs.breakfast.recommendedPortions;
    this.kitchenStatus.lunch.recommended = recs.lunch.recommendedPortions;
    this.kitchenStatus.dinner.recommended = recs.dinner.recommendedPortions;
    this.saveState();
  }

  updateLeftovers(newLeftovers) {
    this.leftovers = { ...newLeftovers };
    this.saveState();
  }

  // Part 3 - Item 1: Update meal-level waste
  updateMealWaste(newMealWaste) {
    this.mealWaste = { ...newMealWaste };
    const totalLeftovers = (this.mealWaste.breakfast.leftover || 0) + (this.mealWaste.lunch.leftover || 0) + (this.mealWaste.dinner.leftover || 0);
    const totalPrepared = (this.mealWaste.breakfast.prepared || 0) + (this.mealWaste.lunch.prepared || 0) + (this.mealWaste.dinner.prepared || 0);
    const basePrepared = this.dailyReport.foodPrepared || 220;

    this.dailyReport.leftovers = totalLeftovers;
    this.dailyReport.foodConsumed = Math.max(0, basePrepared - totalLeftovers);
    this.dailyReport.wastePercentage = Number(((totalLeftovers / basePrepared) * 100).toFixed(1));

    // Also update leftovers for tomorrow's AI engine feedback loop
    this.leftovers = {
      breakfast: this.mealWaste.breakfast.leftover,
      lunch: this.mealWaste.lunch.leftover,
      dinner: this.mealWaste.dinner.leftover
    };

    this.saveState();
  }

  switchStudentTab(tab) {
    this.activeStudentTab = tab;
    this.render();
  }

  switchStaffTab(tab) {
    this.activeStaffTab = tab;
    this.render();
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.saveState();
    this.render();
  }

  // --- Guided Hackathon Demo Step Controller (Part 3) ---
  executeDemoStep(stepIndex) {
    this.currentDemoStepIndex = Math.max(0, Math.min(HACKATHON_DEMO_STEPS.length - 1, stepIndex));
    const stepObj = HACKATHON_DEMO_STEPS[this.currentDemoStepIndex];

    this.currentRole = stepObj.role;
    if (stepObj.role === 'student') {
      this.activeStudentTab = stepObj.tab || 'home';
    } else if (stepObj.role === 'staff') {
      this.activeStaffTab = stepObj.tab || 'dashboard';
    }

    this.saveState();
    this.render();

    // Trigger step action if applicable
    setTimeout(() => {
      if (stepObj.action === 'open_reason_modal') {
        this.openReasonModal('tue', 'lunch');
      } else if (stepObj.action === 'open_ai_details') {
        this.staffRecComp.openExplainabilityModal();
      } else if (stepObj.action === 'celebrate_finish') {
        this.triggerConfetti();
        this.showToast('🎉 Complete Closed-Loop Flow Verified!', 'success');
      }
    }, 150);
  }

  nextDemoStep() {
    if (this.currentDemoStepIndex < HACKATHON_DEMO_STEPS.length - 1) {
      this.executeDemoStep(this.currentDemoStepIndex + 1);
    } else {
      this.executeDemoStep(0); // Loop back
    }
  }

  prevDemoStep() {
    if (this.currentDemoStepIndex > 0) {
      this.executeDemoStep(this.currentDemoStepIndex - 1);
    }
  }

  toggleDemoTour() {
    this.demoTourActive = !this.demoTourActive;
    this.saveState();
    this.render();
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'success' : type === 'warning' ? 'warning' : ''}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  triggerConfetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#059669', '#10b981', '#34d399', '#0d9488', '#f59e0b']
      });
    }
  }

  showNotificationsModal() {
    const modalEl = document.getElementById('notif-modal-container');
    if (!modalEl) return;

    modalEl.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div class="glass-card w-full max-w-md p-5 bg-white border border-slate-200 shadow-2xl rounded-3xl animate-scale-up">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>🔔 Notifications</span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">2 New</span>
            </h3>
            <button id="close-notif-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-700">✕</button>
          </div>

          <div class="space-y-2.5 text-xs">
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80">
              <div class="font-bold text-emerald-950 flex items-center justify-between">
                <span>Lunch Attendance Cutoff Reminder</span>
                <span class="text-[10px] text-emerald-600 font-normal">10m ago</span>
              </div>
              <p class="text-slate-600 mt-1 leading-relaxed">
                Confirm your lunch booking before 11:30 AM to help mess staff cook precise portions.
              </p>
            </div>

            <div class="p-3 rounded-xl bg-teal-50 border border-teal-200/80">
              <div class="font-bold text-teal-950 flex items-center justify-between">
                <span>Zero Waste Champion Milestone! 🎉</span>
                <span class="text-[10px] text-teal-600 font-normal">1h ago</span>
              </div>
              <p class="text-slate-600 mt-1 leading-relaxed">
                You have reached a 12-day streak of accurate meal notifications, preventing 14.8 kg CO2 emissions!
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    modalEl.classList.remove('hidden');
    document.getElementById('close-notif-btn')?.addEventListener('click', () => {
      modalEl.classList.add('hidden');
      modalEl.innerHTML = '';
    });
  }

  // --- Rendering Loop ---
  render() {
    const root = document.getElementById('app-root');
    if (!root) return;

    this.renderTopNav();

    if (this.currentRole === 'auth') {
      root.innerHTML = this.authComp.render();
      this.authComp.attachEvents();
      return;
    }

    if (this.viewMode === 'poster') {
      this.renderPosterBoardView(root);
      return;
    }

    const isMobileMode = this.viewMode === 'mobile';
    let contentHtml = this.currentRole === 'student' ? this.renderStudentShell() : this.renderStaffShell();

    if (isMobileMode) {
      root.innerHTML = `
        <div class="w-full flex justify-center py-6 px-4">
          <div class="phone-mockup-frame">
            <div class="phone-island">
              <div class="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
            </div>
            <div class="phone-screen pt-10 px-3 pb-2 bg-slate-50/50">
              ${contentHtml}
            </div>
          </div>
        </div>
      `;
    } else {
      root.innerHTML = `
        <div class="max-w-5xl mx-auto py-6 px-4 sm:px-6">
          ${contentHtml}
        </div>
      `;
    }

    if (this.currentRole === 'student') {
      this.attachStudentShellEvents();
    } else {
      this.attachStaffShellEvents();
    }
  }

  renderTopNav() {
    const navEl = document.getElementById('top-bar-container');
    if (!navEl) return;

    const currentStep = HACKATHON_DEMO_STEPS[this.currentDemoStepIndex];

    navEl.innerHTML = `
      <header class="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-sm">
        <!-- Main Top Bar -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <!-- Logo & Brand -->
          <div class="flex items-center gap-3 cursor-pointer" id="brand-logo-btn">
            <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-emerald-600/30">
              🌿
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-slate-900 tracking-tight text-base">SMARTMESS</span>
                <span class="text-xs font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">AI</span>
              </div>
              <p class="hidden sm:block text-[10px] text-slate-500 font-medium">Right Food. Right Quantity. A Smarter Mess.</p>
            </div>
          </div>

          <!-- Center: Portal Switcher -->
          <div class="flex items-center p-1 bg-slate-100 rounded-xl">
            <button id="switch-portal-student" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              this.currentRole === 'student' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }">
              👩‍🎓 Student Portal
            </button>
            <button id="switch-portal-staff" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              this.currentRole === 'staff' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }">
              👨‍🍳 Mess Staff Portal
            </button>
          </div>

          <!-- Right: Tour Toggle & View Mode -->
          <div class="flex items-center gap-2">
            <!-- Hackathon Tour Toggle -->
            <button id="toggle-tour-btn" class="px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              this.demoTourActive ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }" title="Toggle 13-Step Guided Hackathon Walkthrough Bar">
              <span>⚡</span>
              <span class="hidden sm:inline">Demo Guide</span>
            </button>

            <!-- View Mode Switcher -->
            <div class="hidden md:flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
              <button id="view-desktop-btn" class="px-2.5 py-1 rounded-lg transition ${this.viewMode === 'desktop' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'hover:text-slate-900'}" title="Desktop View">
                💻 Web
              </button>
              <button id="view-mobile-btn" class="px-2.5 py-1 rounded-lg transition ${this.viewMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'hover:text-slate-900'}" title="Mobile Phone Mockup">
                📱 Mobile
              </button>
              <button id="view-poster-btn" class="px-2.5 py-1 rounded-lg transition ${this.viewMode === 'poster' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'hover:text-slate-900'}" title="Poster View">
                📋 Poster
              </button>
            </div>

            <!-- Reset Data -->
            <button id="reset-data-btn" class="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition" title="Reset Demo Data">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Guided Hackathon Tour Banner (Part 3) -->
        ${this.demoTourActive ? `
          <div class="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white px-4 py-2 text-xs shadow-inner">
            <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 min-w-0">
                <span class="px-2 py-0.5 rounded-md bg-amber-400 text-slate-900 font-black text-[10px] tracking-wide flex-shrink-0">
                  STEP ${currentStep.step}/13
                </span>
                <span class="font-bold text-white truncate">${currentStep.title}</span>
                <span class="hidden md:inline text-emerald-200 text-[11px] truncate">• ${currentStep.desc}</span>
              </div>

              <div class="flex items-center gap-1.5 flex-shrink-0">
                <button id="tour-prev-btn" class="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition">
                  ‹ Prev
                </button>
                <button id="tour-next-btn" class="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow transition flex items-center gap-1">
                  <span>Next Step</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          </div>
        ` : ''}
      </header>
    `;

    document.getElementById('brand-logo-btn')?.addEventListener('click', () => {
      if (this.currentRole === 'student') this.switchStudentTab('home');
      else this.switchStaffTab('dashboard');
    });

    document.getElementById('switch-portal-student')?.addEventListener('click', () => {
      this.currentRole = 'student';
      this.saveState();
      this.render();
    });

    document.getElementById('switch-portal-staff')?.addEventListener('click', () => {
      this.currentRole = 'staff';
      this.saveState();
      this.render();
    });

    document.getElementById('toggle-tour-btn')?.addEventListener('click', () => this.toggleDemoTour());
    document.getElementById('tour-prev-btn')?.addEventListener('click', () => this.prevDemoStep());
    document.getElementById('tour-next-btn')?.addEventListener('click', () => this.nextDemoStep());

    document.getElementById('view-desktop-btn')?.addEventListener('click', () => this.setViewMode('desktop'));
    document.getElementById('view-mobile-btn')?.addEventListener('click', () => this.setViewMode('mobile'));
    document.getElementById('view-poster-btn')?.addEventListener('click', () => this.setViewMode('poster'));

    document.getElementById('reset-data-btn')?.addEventListener('click', () => {
      if (confirm('Reset simulated database back to fresh default state?')) {
        this.resetToDefaults();
        this.showToast('Database reset to fresh calibrated demo state!', 'success');
        this.render();
      }
    });
  }

  // --- Student Shell Layout ---
  renderStudentShell() {
    let mainTabHtml = '';
    if (this.activeStudentTab === 'home') mainTabHtml = this.studentDashComp.render();
    else if (this.activeStudentTab === 'attendance') mainTabHtml = this.weeklyAttComp.render();
    else if (this.activeStudentTab === 'menu') mainTabHtml = this.menuViewComp.render();
    else if (this.activeStudentTab === 'profile') mainTabHtml = this.studentProfileComp.render();

    return `
      <div class="student-shell relative">
        ${mainTabHtml}

        <!-- Bottom Navigation: Home | Attendance | Menu | Profile -->
        <div class="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 p-1.5 z-30 flex items-center justify-around">
          <button class="student-nav-btn flex flex-col items-center py-1 px-3 rounded-xl transition ${
            this.activeStudentTab === 'home' ? 'text-emerald-700 font-extrabold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="home">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="text-[10px] mt-0.5">Home</span>
          </button>

          <button class="student-nav-btn flex flex-col items-center py-1 px-3 rounded-xl transition ${
            this.activeStudentTab === 'attendance' ? 'text-emerald-700 font-extrabold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="attendance">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-[10px] mt-0.5">Attendance</span>
          </button>

          <button class="student-nav-btn flex flex-col items-center py-1 px-3 rounded-xl transition ${
            this.activeStudentTab === 'menu' ? 'text-emerald-700 font-extrabold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span class="text-[10px] mt-0.5">Menu</span>
          </button>

          <button class="student-nav-btn flex flex-col items-center py-1 px-3 rounded-xl transition ${
            this.activeStudentTab === 'profile' ? 'text-emerald-700 font-extrabold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="profile">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-[10px] mt-0.5">Profile</span>
          </button>
        </div>
      </div>
    `;
  }

  attachStudentShellEvents() {
    const navButtons = document.querySelectorAll('.student-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchStudentTab(tab);
      });
    });

    if (this.activeStudentTab === 'home') this.studentDashComp.attachEvents();
    else if (this.activeStudentTab === 'attendance') this.weeklyAttComp.attachEvents();
    else if (this.activeStudentTab === 'menu') this.menuViewComp.attachEvents();
    else if (this.activeStudentTab === 'profile') this.studentProfileComp.attachEvents();
  }

  // --- Staff Shell Layout ---
  renderStaffShell() {
    let mainTabHtml = '';
    if (this.activeStaffTab === 'dashboard') mainTabHtml = this.staffDashComp.render();
    else if (this.activeStaffTab === 'attendance') mainTabHtml = this.staffAttComp.render();
    else if (this.activeStaffTab === 'menu') mainTabHtml = this.staffMenuComp.render();
    else if (this.activeStaffTab === 'recommendation') mainTabHtml = this.staffRecComp.render();
    else if (this.activeStaffTab === 'kitchen') mainTabHtml = this.kitchenComp.render();
    else if (this.activeStaffTab === 'waste') mainTabHtml = this.wasteComp.render();
    else if (this.activeStaffTab === 'reports') mainTabHtml = this.reportsComp.render();

    return `
      <div class="staff-shell relative">
        ${mainTabHtml}

        <!-- Staff Navigation Bar -->
        <div class="fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 p-1.5 z-30 flex items-center justify-around overflow-x-auto no-scrollbar">
          <button class="staff-nav-btn flex flex-col items-center py-1 px-2.5 rounded-xl transition flex-shrink-0 ${
            this.activeStaffTab === 'dashboard' ? 'text-teal-700 font-extrabold bg-teal-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="dashboard">
            <span class="text-base leading-none">🏠</span>
            <span class="text-[9px] mt-1 font-semibold">Home</span>
          </button>

          <button class="staff-nav-btn flex flex-col items-center py-1 px-2.5 rounded-xl transition flex-shrink-0 ${
            this.activeStaffTab === 'attendance' ? 'text-teal-700 font-extrabold bg-teal-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="attendance">
            <span class="text-base leading-none">👥</span>
            <span class="text-[9px] mt-1 font-semibold">Counts</span>
          </button>

          <button class="staff-nav-btn flex flex-col items-center py-1 px-2.5 rounded-xl transition flex-shrink-0 ${
            this.activeStaffTab === 'menu' ? 'text-teal-700 font-extrabold bg-teal-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="menu">
            <span class="text-base leading-none">📋</span>
            <span class="text-[9px] mt-1 font-semibold">Menu</span>
          </button>

          <button class="staff-nav-btn flex flex-col items-center py-1 px-2.5 rounded-xl transition flex-shrink-0 ${
            this.activeStaffTab === 'recommendation' ? 'text-emerald-700 font-extrabold bg-emerald-50 ring-1 ring-emerald-300' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="recommendation">
            <span class="text-base leading-none">🧠</span>
            <span class="text-[9px] mt-1 font-extrabold text-emerald-700">AI Cook</span>
          </button>

          <button class="staff-nav-btn flex flex-col items-center py-1 px-2.5 rounded-xl transition flex-shrink-0 ${
            this.activeStaffTab === 'kitchen' ? 'text-teal-700 font-extrabold bg-teal-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="kitchen">
            <span class="text-base leading-none">🍳</span>
            <span class="text-[9px] mt-1 font-semibold">Kitchen</span>
          </button>

          <button class="staff-nav-btn flex flex-col items-center py-1 px-2.5 rounded-xl transition flex-shrink-0 ${
            this.activeStaffTab === 'waste' ? 'text-teal-700 font-extrabold bg-teal-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="waste">
            <span class="text-base leading-none">🍱</span>
            <span class="text-[9px] mt-1 font-semibold">Leftovers</span>
          </button>

          <button class="staff-nav-btn flex flex-col items-center py-1 px-2.5 rounded-xl transition flex-shrink-0 ${
            this.activeStaffTab === 'reports' ? 'text-teal-700 font-extrabold bg-teal-50' : 'text-slate-400 hover:text-slate-600'
          }" data-tab="reports">
            <span class="text-base leading-none">📊</span>
            <span class="text-[9px] mt-1 font-semibold">Reports</span>
          </button>
        </div>
      </div>
    `;
  }

  attachStaffShellEvents() {
    const navButtons = document.querySelectorAll('.staff-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchStaffTab(tab);
      });
    });

    if (this.activeStaffTab === 'dashboard') this.staffDashComp.attachEvents();
    else if (this.activeStaffTab === 'attendance') this.staffAttComp.attachEvents();
    else if (this.activeStaffTab === 'menu') this.staffMenuComp.attachEvents();
    else if (this.activeStaffTab === 'recommendation') this.staffRecComp.attachEvents();
    else if (this.activeStaffTab === 'kitchen') this.kitchenComp.attachEvents();
    else if (this.activeStaffTab === 'waste') this.wasteComp.attachEvents();
    else if (this.activeStaffTab === 'reports') this.reportsComp.attachEvents();
  }

  // --- Reference Poster Board Mode ---
  renderPosterBoardView(root) {
    root.innerHTML = `
      <div class="max-w-7xl mx-auto py-4 px-4">
        <div class="glass-card p-4 mb-6 bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white shadow-xl flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl">
              🌿
            </div>
            <div>
              <h2 class="text-xl font-extrabold tracking-tight">SMARTMESS AI — Complete Multi-Screen Architecture Board</h2>
              <p class="text-xs text-emerald-200">Side-by-side presentation view matching the hackathon architecture graphic</p>
            </div>
          </div>

          <span class="px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400 text-xs font-bold text-emerald-100">
            ✓ All 10 Screens Functional & Linked
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="glass-card p-4 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span class="text-xs font-bold text-slate-800">1. Login Page</span>
              <button class="text-[11px] font-bold text-emerald-600 hover:underline poster-interact-btn" data-role="auth">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              ${this.authComp.render()}
            </div>
          </div>

          <div class="glass-card p-4 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span class="text-xs font-bold text-slate-800">2. Student Dashboard</span>
              <button class="text-[11px] font-bold text-emerald-600 hover:underline poster-interact-btn" data-role="student" data-tab="home">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              ${this.studentDashComp.render()}
            </div>
          </div>

          <div class="glass-card p-4 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span class="text-xs font-bold text-slate-800">3. Attendance Marking (7x3)</span>
              <button class="text-[11px] font-bold text-emerald-600 hover:underline poster-interact-btn" data-role="student" data-tab="attendance">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              ${this.weeklyAttComp.render()}
            </div>
          </div>

          <div class="glass-card p-4 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span class="text-xs font-bold text-slate-800">5. Menu Management (Staff)</span>
              <button class="text-[11px] font-bold text-teal-600 hover:underline poster-interact-btn" data-role="staff" data-tab="menu">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              ${this.staffMenuComp.render()}
            </div>
          </div>

          <div class="glass-card p-4 border-2 border-emerald-500/40 shadow-lg bg-emerald-50/20">
            <div class="flex items-center justify-between pb-2 border-b border-emerald-200 mb-3">
              <span class="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <span>6. AI Recommendation</span>
                <span class="text-[9px] font-black bg-emerald-200 px-1 rounded">Core Engine</span>
              </span>
              <button class="text-[11px] font-bold text-emerald-700 hover:underline poster-interact-btn" data-role="staff" data-tab="recommendation">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-emerald-200 bg-white p-2">
              ${this.staffRecComp.render()}
            </div>
          </div>

          <div class="glass-card p-4 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span class="text-xs font-bold text-slate-800">7. Kitchen View (Staff)</span>
              <button class="text-[11px] font-bold text-teal-600 hover:underline poster-interact-btn" data-role="staff" data-tab="kitchen">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              ${this.kitchenComp.render()}
            </div>
          </div>

          <div class="glass-card p-4 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span class="text-xs font-bold text-slate-800">8. Waste Tracking (Staff)</span>
              <button class="text-[11px] font-bold text-teal-600 hover:underline poster-interact-btn" data-role="staff" data-tab="waste">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              ${this.wasteComp.render()}
            </div>
          </div>

          <div class="glass-card p-4 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span class="text-xs font-bold text-slate-800">9. Reports & Dashboard</span>
              <button class="text-[11px] font-bold text-teal-600 hover:underline poster-interact-btn" data-role="staff" data-tab="reports">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              ${this.reportsComp.render()}
            </div>
          </div>

          <div class="glass-card p-4 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span class="text-xs font-bold text-slate-800">10. Student Profile</span>
              <button class="text-[11px] font-bold text-emerald-600 hover:underline poster-interact-btn" data-role="student" data-tab="profile">Open Live Screen ➔</button>
            </div>
            <div class="h-[480px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              ${this.studentProfileComp.render()}
            </div>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('.poster-interact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-role');
        const tab = btn.getAttribute('data-tab');
        this.currentRole = role;
        if (role === 'student' && tab) this.activeStudentTab = tab;
        if (role === 'staff' && tab) this.activeStaffTab = tab;
        this.setViewMode('desktop');
      });
    });
  }
}
