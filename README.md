# SMARTMESS AI — AI-Based Food Waste Prediction and Reduction System for Hostels

[![Hackathon Ready](https://img.shields.io/badge/Status-Hackathon%20Ready-success)](#)
[![Theme](https://img.shields.io/badge/Theme-Sustainability%20%26%20Zero%20Waste-teal)](#)
[![License](https://img.shields.io/badge/License-MIT-blue)](#)

> **"Right Food. Right Quantity. A Smarter Mess."**  
> *Less Waste. Lower Costs. Greener Tomorrow.*

SMARTMESS AI is an intelligent hostel mess food waste prediction and batch optimization platform designed to solve large-scale food overproduction in university and hostel cafeterias.

---

## 🌟 Core System Story

$$\text{Student Attendance Marked} \longrightarrow \text{AI Quantity Calculation} \longrightarrow \text{Kitchen Preparation} \longrightarrow \text{Waste Tracked} \longrightarrow \text{Continuous Feedback}$$

1. **Students Notify Attendance:** Students mark their meal intentions (Yes/No with categorized reasons) ahead of meal cutoffs.
2. **AI Predicts Batches:** The AI Recommendation Engine calculates the exact number of portions to cook using student bookings, historical consumption, previous leftovers, menu weight, and campus event factors.
3. **Kitchen Prepares Just-Enough:** Kitchen staff receive recommended batch sizes and track preparation status (Pending, In Progress, Ready).
4. **Leftovers Audited:** Post-meal leftovers are recorded, calculating daily waste percentage and feeding into next day's predictive model.

---

## 📱 Features Implemented (Matching Reference Design)

### Part 1: Student Module
- **1. Login Page:**
  - Role switcher (**Student Login** vs **Mess Staff/Admin Login**)
  - Roll number / password authentication
  - 1-click quick demo credential autofill (`BT2025` for Ayesha Khan, `STAFF01` for Chef Suresh)
- **2. Student Dashboard:**
  - Student identity card (Ayesha Khan, B.Tech, Block A, Room 204)
  - Live status for today's Breakfast, Lunch, and Dinner
  - **Easy Meal Attendance Widget:** Quick `[✓ YES]` / `[✕ NO]` buttons
  - Today's menu with nutrition and timing
  - Student food waste reduction streak and carbon savings
- **3. Attendance Marking (7 Days × 3 Meals Matrix):**
  - Complete Monday–Sunday grid across Breakfast, Lunch, Dinner
  - Interactive status toggling: Green checkmark `✓` (Present) & Red outline `○` (Not Attended)
  - Real-time attendance percentages for Breakfast (85%), Lunch (90%), Dinner (75%), and Total meals attended (18/21)
- **4. Reason for Not Attending Modal:**
  - Categorized radio options:
    - *Not feeling well*
    - *Personal work*
    - *Class / Academic*
    - *Outside food*
    - *Travel / Leave*
    - *Other*
  - Optional personal note
  - Direct sync to mess staff aggregated analytics
- **5. Hostel Weekly Menu Browser:**
  - 7-day schedule with day filter pills
  - Dish listings, estimated calories, Veg/Non-Veg badges, and Chef's specials
- **6. Student Profile & Settings:**
  - Complete profile details with contact, department, room, and diet preference
  - Circular progress rings for weekly attendance
  - Interactive "Edit Profile" modal
  - **85+ Hostel Resident Switcher:** Test how different students have distinct records and streaks

---

### Part 2: Mess Staff + Food Quantity Recommendation Module
- **1. Mess Staff Dashboard:**
  - Today's Expected Attendance: Breakfast (68 students), Lunch (72 students), Dinner (64 students)
  - Today's Menu summary
  - Previous Leftovers: Breakfast (5 portions), Lunch (3 portions), Dinner (4 portions)
  - Fast shortcuts to all management tools
- **2. Attendance Overview & Privacy-Preserved Insights:**
  - Expected student attendance bars:
    - Breakfast: `68 / 80 students` (85%)
    - Lunch: `72 / 80 students` (90%)
    - Dinner: `64 / 80 students` (80%)
  - **Aggregated Absence Reasons:**
    - Outside food: 30%
    - Class / Academic: 25%
    - Personal work: 18%
    - Not feeling well: 12%
    - Travel / Leave: 10%
    - Other: 5%
  - **Privacy Guarantee:** Individual health reasons and student names remain strictly anonymous to staff.
- **3. Menu Management (Staff):**
  - Date selector (`< Tue, 15 Apr 2025 >`)
  - Edit meals (Breakfast, Lunch, Dinner)
  - Add items, edit ingredients, adjust calories, and set Chef Specials
  - 1-click sync to all student menus
- **4. Smart Food Quantity (AI Recommendation Engine):**
  - Core predictive algorithm incorporating:
    - Expected attendance (from student check-ins)
    - Historical average consumption
    - Previous leftovers buffer
    - Campus Schedule & Special Events (Normal Day 1.0x, Weekend 0.75x, Holiday 0.65x, Festival 1.15x, College Event 0.80x, Exam Period 1.10x)
  - **AI Recommendation Targets:**
    - Breakfast: **70 portions**
    - Lunch: **75 portions**
    - Dinner: **65 portions**
  - "View Details" modal with explainable mathematical breakdown and financial/CO2 savings
- **5. Kitchen View:**
  - Preparation status tracking: Breakfast (Ready), Lunch (In Progress), Dinner (Pending)
  - Dynamic status updater for kitchen team
  - "Confirm Preparation" button
- **6. Waste Tracking:**
  - Record actual leftover portions (Breakfast: 5, Lunch: 3, Dinner: 4)
  - Closed feedback loop updating subsequent AI portion recommendations
- **7. Reports & Dashboard:**
  - Key metrics: Food Prepared (220 portions), Food Consumed (202 portions), Leftovers (26 portions), Waste Percentage (11.8%)
  - 7-Day Food Waste Trend Bar Chart (Mon–Sun) with hover metrics and historical benchmark comparison

---

## 🚀 How to Run the Application

### Option 1: 1-Click Windows Launcher
Double-click `run_app.bat` in the project root folder. It will launch the local Python web server and open your browser automatically at `http://localhost:8000`.

### Option 2: Python Command
Open terminal in the directory and run:
```bash
python server.py
```

### Option 3: Standard HTTP Server
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🎮 Demo Navigation Tips

- **View Modes:** Use the top bar switcher to toggle between:
  - 💻 **Web Dashboard Mode** (Spacious responsive desktop layout)
  - 📱 **Mobile Mockup Mode** (Renders in an iPhone frame matching the reference graphics)
  - 📋 **Poster View Mode** (Side-by-side presentation board of all screens)
- **Role Switcher:** Switch between `👩‍🎓 Student Portal` and `👨‍🍳 Mess Staff Portal` at any time with a single click.
- **Simulated Students:** On the Student Profile page, use the dropdown to switch between any of the 85+ simulated hostel students to observe diverse attendance patterns.
- **Reset Data:** Click the circular arrow icon in the top right to reset all attendance, leftovers, and menu data back to default demo state.
