// SMARTMESS AI - Authentication Component (Student & Mess Staff)

export class AuthComponent {
  constructor(app) {
    this.app = app;
  }

  render() {
    return `
      <div class="min-h-full flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8 bg-leaf-pattern">
        <!-- Brand Header -->
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 mb-4 animate-pulse-soft">
            <svg class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900 flex items-center justify-center gap-2">
            SMARTMESS <span class="text-emerald-600 font-extrabold">AI</span>
          </h1>
          <p class="mt-1 text-xs text-slate-500 font-medium max-w-xs mx-auto">
            AI-Based Food Waste Prediction and Reduction System for Hostels
          </p>
          <div class="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Right Food. Right Quantity. A Smarter Mess.
          </div>
        </div>

        <!-- Login Card -->
        <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="glass-card p-6 sm:p-8">
            <!-- Role Toggle Tabs -->
            <div class="flex p-1 bg-slate-100 rounded-xl mb-6">
              <button id="role-btn-student" type="button" class="flex-1 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm bg-white text-emerald-700 font-bold">
                Student Login
              </button>
              <button id="role-btn-staff" type="button" class="flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-slate-500 hover:text-slate-900">
                Mess Staff / Admin
              </button>
            </div>

            <!-- Login Form -->
            <form id="login-form" class="space-y-4">
              <div>
                <label id="login-id-label" class="block text-xs font-semibold text-slate-700 mb-1">
                  Username / Roll Number
                </label>
                <div class="relative rounded-xl shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input type="text" id="login-username" required class="block w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50/50" placeholder="e.g. BT2025" value="BT2025" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div class="relative rounded-xl shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input type="password" id="login-password" required class="block w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50/50" placeholder="••••••••" value="password123" />
                </div>
              </div>

              <div class="flex items-center justify-between text-xs">
                <label class="flex items-center text-slate-600">
                  <input type="checkbox" checked class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-2" />
                  Remember me
                </label>
                <a href="#" class="font-medium text-emerald-600 hover:text-emerald-700">Need help?</a>
              </div>

              <button type="submit" id="login-submit-btn" class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all active:scale-[0.99]">
                <span>Sign In to Portal</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </form>

            <!-- Quick Demo Credentials Helpers -->
            <div class="mt-6 pt-4 border-t border-slate-100">
              <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-2">
                Quick Demo 1-Click Fill
              </p>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" id="fill-student-btn" class="text-left p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition text-xs border border-emerald-200/60">
                  <div class="font-bold flex items-center gap-1">
                    <span>👩‍🎓 Ayesha Khan</span>
                  </div>
                  <div class="text-[10px] text-emerald-600">Student (BT2025)</div>
                </button>
                <button type="button" id="fill-staff-btn" class="text-left p-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 transition text-xs border border-teal-200/60">
                  <div class="font-bold flex items-center gap-1">
                    <span>👨‍🍳 Chef Suresh</span>
                  </div>
                  <div class="text-[10px] text-teal-600">Mess Staff (STAFF01)</div>
                </button>
              </div>
            </div>

            <!-- Footer link -->
            <div class="mt-4 text-center">
              <p class="text-xs text-slate-500">
                New here? <a href="#" class="font-medium text-emerald-600 hover:underline">Contact Mess Admin</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    let currentRole = 'student';
    const studentBtn = document.getElementById('role-btn-student');
    const staffBtn = document.getElementById('role-btn-staff');
    const usernameInput = document.getElementById('login-username');
    const idLabel = document.getElementById('login-id-label');
    const form = document.getElementById('login-form');

    studentBtn?.addEventListener('click', () => {
      currentRole = 'student';
      studentBtn.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all shadow-sm bg-white text-emerald-700';
      staffBtn.className = 'flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-slate-500 hover:text-slate-900';
      idLabel.textContent = 'Username / Roll Number';
      usernameInput.placeholder = 'e.g. BT2025';
      usernameInput.value = 'BT2025';
    });

    staffBtn?.addEventListener('click', () => {
      currentRole = 'staff';
      staffBtn.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all shadow-sm bg-white text-teal-700';
      studentBtn.className = 'flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-slate-500 hover:text-slate-900';
      idLabel.textContent = 'Staff / Manager ID';
      usernameInput.placeholder = 'e.g. STAFF01';
      usernameInput.value = 'STAFF01';
    });

    document.getElementById('fill-student-btn')?.addEventListener('click', () => {
      studentBtn?.click();
    });

    document.getElementById('fill-staff-btn')?.addEventListener('click', () => {
      staffBtn?.click();
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = document.getElementById('login-password').value;

      if (!username) return;

      const submitBtn = document.getElementById('login-submit-btn');
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Signing in...</span>
      `;

      setTimeout(() => {
        if (currentRole === 'student') {
          this.app.loginAsStudent(username);
        } else {
          this.app.loginAsStaff(username);
        }
      }, 400);
    });
  }
}
