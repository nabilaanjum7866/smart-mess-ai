// SMARTMESS AI - Simulated Dataset of 85+ Hostel Students
// 7-day attendance across 3 meals (Breakfast, Lunch, Dinner)

export const REASONS = [
  'Outside food',
  'Class / Academic',
  'Personal work',
  'Not feeling well',
  'Travel / Leave',
  'Other'
];

// Base primary student: Ayesha Khan
export const PRIMARY_STUDENT = {
  id: 'std_2025',
  rollNo: 'BT2025',
  name: 'Ayesha Khan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  department: 'Computer Science',
  year: '3rd Year (B.Tech)',
  hostel: 'Ganga Girls Hostel',
  block: 'Block A',
  room: '204',
  phone: '+91 98765 43210',
  email: 'ayesha@hostel.edu',
  dietPreference: 'Vegetarian',
  savedWasteKg: 14.8,
  streakDays: 12
};

const FIRST_NAMES = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Advaith', 'Kabir', 'Ananya', 'Diya', 'Gauri', 'Isha',
  'Kavya', 'Khushi', 'Mira', 'Navya', 'Pooja', 'Priya', 'Riya', 'Saanvi', 'Sara', 'Tanvi',
  'Rahul', 'Rohan', 'Sneha', 'Fatima', 'Vikram', 'Neha', 'Karan', 'Meera', 'Rishi', 'Shreya'
];

const LAST_NAMES = [
  'Sharma', 'Verma', 'Gupta', 'Malhotra', 'Bhatia', 'Patel', 'Reddy', 'Nair', 'Singh', 'Kumar',
  'Mehta', 'Joshi', 'Chopra', 'Rao', 'Iyer', 'Deshmukh', 'Saxena', 'Pandey', 'Mishra', 'Choudhury'
];

const DEPTS = [
  'Computer Science', 'Information Technology', 'Electronics & Comm.', 
  'Mechanical Engg.', 'Electrical Engg.', 'Civil Engg.', 'Biotechnology'
];

const BLOCKS = ['Block A', 'Block B', 'Block C'];

// Generate 85 realistic students
export function generateStudents() {
  const students = [{ ...PRIMARY_STUDENT }];
  let rollCounter = 2001;

  for (let i = 1; i < 85; i++) {
    if (rollCounter === 2025) rollCounter++; // Skip Ayesha's roll
    const fname = FIRST_NAMES[i % FIRST_NAMES.length];
    const lname = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const dept = DEPTS[i % DEPTS.length];
    const block = BLOCKS[i % BLOCKS.length];
    const room = `${(i % 3) + 1}0${(i % 30) + 1}`;
    const yearNum = (i % 4) + 1;

    students.push({
      id: `std_${rollCounter}`,
      rollNo: `BT${rollCounter}`,
      name: `${fname} ${lname}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fname}${lname}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
      department: dept,
      year: `${yearNum}${yearNum === 1 ? 'st' : yearNum === 2 ? 'nd' : yearNum === 3 ? 'rd' : 'th'} Year`,
      hostel: block === 'Block A' ? 'Ganga Hostel' : block === 'Block B' ? 'Yamuna Hostel' : 'Kaveri Hostel',
      block: block,
      room: room,
      phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}@hostel.edu`,
      dietPreference: i % 5 === 0 ? 'Vegan' : i % 3 === 0 ? 'Non-Vegetarian' : 'Vegetarian',
      savedWasteKg: Number((8 + (i % 12) * 1.2).toFixed(1)),
      streakDays: (i % 15) + 3
    });

    rollCounter++;
  }

  return students;
}

// 7 Days definition (Monday 14 Apr to Sunday 20 Apr 2025)
export const DAYS_OF_WEEK = [
  { id: 'mon', name: 'Mon', fullDate: '14 Apr', dayNumber: 14, label: 'Mon 14 Apr' },
  { id: 'tue', name: 'Tue', fullDate: '15 Apr', dayNumber: 15, label: 'Tue 15 Apr', isToday: true },
  { id: 'wed', name: 'Wed', fullDate: '16 Apr', dayNumber: 16, label: 'Wed 16 Apr' },
  { id: 'thu', name: 'Thu', fullDate: '17 Apr', dayNumber: 17, label: 'Thu 17 Apr' },
  { id: 'fri', name: 'Fri', fullDate: '18 Apr', dayNumber: 18, label: 'Fri 18 Apr' },
  { id: 'sat', name: 'Sat', fullDate: '19 Apr', dayNumber: 19, label: 'Sat 19 Apr' },
  { id: 'sun', name: 'Sun', fullDate: '20 Apr', dayNumber: 20, label: 'Sun 20 Apr' }
];

export const MEALS = [
  { id: 'breakfast', name: 'Breakfast', timing: '7:30 - 9:00', icon: 'coffee' },
  { id: 'lunch', name: 'Lunch', timing: '12:30 - 2:00', icon: 'utensils' },
  { id: 'dinner', name: 'Dinner', timing: '7:30 - 9:00', icon: 'moon' }
];

// Generate attendance records calibrated to yield exact expected attendance:
// On Tuesday 15 Apr (Today):
// Total enrolled = 80 students (or active resident count)
// Breakfast: 68 attended (12 absent)
// Lunch: 72 attended (8 absent)
// Dinner: 64 attended (16 absent)
//
// Reason distribution for absences calibrated:
// Outside food: ~30%
// Class / Academic: ~25%
// Personal work: ~18%
// Not feeling well: ~12%
// Travel / Leave: ~10%
// Other: ~5%
export function generateAttendanceMatrix(students) {
  const attendance = {};

  // Default pattern for Ayesha Khan matching Reference Image:
  // Mon: B✓, L✓, D✓
  // Tue: B✓, L✓, D✓
  // Wed: B✓, L✓, D○ (Travel/Leave)
  // Thu: B✓, L○ (Class/Academic), D✓
  // Fri: B○ (Not feeling well), L○, D○
  // Sat: B✓, L○, D○
  // Sun: B✓, L○, D○
  const ayeshaPattern = {
    mon: { breakfast: true, lunch: true, dinner: true },
    tue: { breakfast: true, lunch: true, dinner: true },
    wed: { breakfast: true, lunch: true, dinner: false, reason_dinner: 'Travel / Leave', note_dinner: 'Going home early' },
    thu: { breakfast: true, lunch: false, dinner: true, reason_lunch: 'Class / Academic', note_lunch: 'Lab exam at 1:00 PM' },
    fri: { breakfast: false, lunch: false, dinner: false, reason_breakfast: 'Not feeling well', note_breakfast: 'Mild fever', reason_lunch: 'Not feeling well', reason_dinner: 'Not feeling well' },
    sat: { breakfast: true, lunch: false, dinner: false, reason_lunch: 'Outside food', reason_dinner: 'Outside food' },
    sun: { breakfast: true, lunch: false, dinner: false, reason_lunch: 'Personal work', reason_dinner: 'Personal work' }
  };

  const reasonPool = [
    'Outside food', 'Outside food', 'Outside food', 'Outside food', 'Outside food', 'Outside food',
    'Class / Academic', 'Class / Academic', 'Class / Academic', 'Class / Academic', 'Class / Academic',
    'Personal work', 'Personal work', 'Personal work', 'Personal work',
    'Not feeling well', 'Not feeling well', 'Not feeling well',
    'Travel / Leave', 'Travel / Leave',
    'Other'
  ];

  students.forEach((student, idx) => {
    if (student.rollNo === 'BT2025') {
      attendance[student.id] = JSON.parse(JSON.stringify(ayeshaPattern));
      return;
    }

    attendance[student.id] = {};

    DAYS_OF_WEEK.forEach(day => {
      attendance[student.id][day.id] = {};

      MEALS.forEach(meal => {
        let isPresent = true;

        if (day.id === 'tue') {
          // Exactly target: 68/80 for breakfast, 72/80 for lunch, 64/80 for dinner
          // Total active pool = 80
          if (idx < 80) {
            if (meal.id === 'breakfast') {
              // 12 absentees among first 80 (indices 68 to 79)
              if (idx >= 68) isPresent = false;
            } else if (meal.id === 'lunch') {
              // 8 absentees among first 80 (indices 72 to 79)
              if (idx >= 72) isPresent = false;
            } else if (meal.id === 'dinner') {
              // 16 absentees among first 80 (indices 64 to 79)
              if (idx >= 64) isPresent = false;
            }
          }
        } else {
          // Other days: realistic 80-90% attendance
          const hash = (idx * 37 + day.dayNumber * 13 + meal.name.length * 19) % 100;
          isPresent = hash < 84;
        }

        attendance[student.id][day.id][meal.id] = isPresent;

        if (!isPresent) {
          const reasonIdx = (idx * 7 + day.dayNumber * 5 + meal.name.length * 3) % reasonPool.length;
          attendance[student.id][day.id][`reason_${meal.id}`] = reasonPool[reasonIdx];
          attendance[student.id][day.id][`note_${meal.id}`] = '';
        }
      });
    });
  });

  return attendance;
}
