// SMARTMESS AI - Mess Administration, Menus, Kitchen, & Waste Data

export const DEFAULT_WEEKLY_MENU = {
  mon: {
    breakfast: {
      items: 'Poha, Mint Chutney, Boiled Eggs / Banana, Tea/Coffee',
      calories: '380 kcal',
      isVeg: true,
      special: 'Fresh Mint Poha'
    },
    lunch: {
      items: 'Roti, Rajma Masala, Steamed Rice, Cucumber Salad, Curd',
      calories: '650 kcal',
      isVeg: true,
      special: 'Punjabi Rajma'
    },
    dinner: {
      items: 'Chapati, Mixed Veg Korma, Dal Tadka, Jeera Rice, Gulab Jamun',
      calories: '580 kcal',
      isVeg: true,
      special: 'Gulab Jamun Feast'
    }
  },
  tue: {
    breakfast: {
      items: 'Idli, Sambar, Coconut Chutney',
      calories: '340 kcal',
      isVeg: true,
      special: 'Traditional South Indian'
    },
    lunch: {
      items: 'Rice, Dal, Veg Curry, Fresh Salad',
      calories: '620 kcal',
      isVeg: true,
      special: 'Chef Signature Curry'
    },
    dinner: {
      items: 'Chapati, Matar Paneer, Veg Pulao, Raita',
      calories: '680 kcal',
      isVeg: true,
      special: 'Paneer Delight'
    }
  },
  wed: {
    breakfast: {
      items: 'Aloo Paratha, Butter, Curd, Pickle, Tea',
      calories: '420 kcal',
      isVeg: true,
      special: 'Stuffed Parathas'
    },
    lunch: {
      items: 'Roti, Chana Masala, Jeera Rice, Onion Salad, Buttermilk',
      calories: '640 kcal',
      isVeg: true,
      special: 'Amritsari Chana'
    },
    dinner: {
      items: 'Poori, Dum Aloo, Moong Dal Khichdi, Papad',
      calories: '610 kcal',
      isVeg: true,
      special: 'Comfort Khichdi & Dum Aloo'
    }
  },
  thu: {
    breakfast: {
      items: 'Upma, Sambar, Tomato Chutney, Fruits, Coffee',
      calories: '320 kcal',
      isVeg: true,
      special: 'Rava Veggie Upma'
    },
    lunch: {
      items: 'Roti, Bhindi Masala, Dal Fry, Steamed Rice, Beetroot Salad',
      calories: '590 kcal',
      isVeg: true,
      special: 'Crispy Bhindi Fry'
    },
    dinner: {
      items: 'Chapati, Egg Curry / Malai Kofta, Peas Pulao, Kheer',
      calories: '690 kcal',
      isVeg: false,
      special: 'Chef Special Dessert'
    }
  },
  fri: {
    breakfast: {
      items: 'Bread Omelette / Veg Cutlet, Jam, Cornflakes with Milk, Tea',
      calories: '390 kcal',
      isVeg: false,
      special: 'Continental Breakfast'
    },
    lunch: {
      items: 'Roti, Kadhi Pakora, Steamed Rice, Aloo Gobi, Boondi Raita',
      calories: '660 kcal',
      isVeg: true,
      special: 'Homestyle Kadhi'
    },
    dinner: {
      items: 'Tandoori Roti, Dal Makhani, Veg Biryani, Mirchi Ka Salan',
      calories: '710 kcal',
      isVeg: true,
      special: 'Royal Biryani Night'
    }
  },
  sat: {
    breakfast: {
      items: 'Masala Dosa, Potato Masala, Sambar, Chutney, Filter Coffee',
      calories: '410 kcal',
      isVeg: true,
      special: 'Crispy Weekend Dosa'
    },
    lunch: {
      items: 'Lemon Rice, Curd Rice, Potato Fry, Papad, Pickle',
      calories: '580 kcal',
      isVeg: true,
      special: 'South Indian Platter'
    },
    dinner: {
      items: 'Pav Bhaji, Extra Buttered Pav, Onion Lemon Salad, Ice Cream',
      calories: '670 kcal',
      isVeg: true,
      special: 'Mumbai Street Pav Bhaji'
    }
  },
  sun: {
    breakfast: {
      items: 'Poori, Chole, Halwa, Sweet Lassi',
      calories: '510 kcal',
      isVeg: true,
      special: 'Sunday Special Brunch'
    },
    lunch: {
      items: 'Hyderabadi Veg/Chicken Biryani, Raita, Salan, Sweet Paan',
      calories: '750 kcal',
      isVeg: false,
      special: 'Grand Sunday Biryani'
    },
    dinner: {
      items: 'Phulka Roti, Sev Tamatar, Yellow Moong Dal, Steamed Rice',
      calories: '540 kcal',
      isVeg: true,
      special: 'Light Sunday Dinner'
    }
  }
};

// Part 3 - Item 1: Detailed meal-level leftover tracking for today (Tuesday 15 Apr 2025)
// Breakfast: Prepared: 70, Consumed: 62, Leftover: 8
// Lunch:     Prepared: 75, Consumed: 63, Leftover: 12
// Dinner:    Prepared: 65, Consumed: 59, Leftover: 6
// Total Waste: 26 portions | Waste %: 11.8% (on 220 basis) or 12.4% (on 210 basis)
export const DEFAULT_MEAL_WASTE = {
  breakfast: { prepared: 70, consumed: 62, leftover: 8 },
  lunch:     { prepared: 75, consumed: 63, leftover: 12 },
  dinner:    { prepared: 65, consumed: 59, leftover: 6 }
};

// Previous leftovers from yesterday (Part 2 - Item 1)
export const DEFAULT_LEFTOVERS = {
  breakfast: 5,
  lunch: 3,
  dinner: 4
};

// Kitchen preparation status for today
export const DEFAULT_KITCHEN_STATUS = {
  breakfast: {
    meal: 'Breakfast',
    recommended: 70,
    status: 'Ready',
    preparedPortions: 70,
    chefNotes: 'Hot sambar & idlis ready in warming trays'
  },
  lunch: {
    meal: 'Lunch',
    recommended: 75,
    status: 'In Progress',
    preparedPortions: 75,
    chefNotes: 'Dal simmering, rice steaming currently'
  },
  dinner: {
    meal: 'Dinner',
    recommended: 65,
    status: 'Pending',
    preparedPortions: 65,
    chefNotes: 'Paneer & dough prep scheduled for 5:30 PM'
  }
};

// Special event modifiers for AI Recommendation
export const SPECIAL_EVENTS = [
  { id: 'normal', name: 'Normal Day', multiplier: 1.00, badge: 'Standard', desc: 'Typical hostel weekday routine' },
  { id: 'weekend', name: 'Weekend', multiplier: 0.75, badge: 'Weekend', desc: 'Many students eat out or visit home (-25%)' },
  { id: 'holiday', name: 'Holiday', multiplier: 0.65, badge: 'Low Turnout', desc: 'Extended weekend / declared holiday (-35%)' },
  { id: 'festival', name: 'Festival', multiplier: 1.15, badge: 'High Feast', desc: 'Special celebration feast in mess (+15%)' },
  { id: 'college_event', name: 'College Event / Fest', multiplier: 0.80, badge: 'Events Ongoing', desc: 'Students engaged in campus stalls/fests (-20%)' },
  { id: 'exam', name: 'Exam Period', multiplier: 1.10, badge: 'Maximum Stay', desc: 'Students stay in hostel studying (+10%)' }
];

// Historical Daily Reports Data (For reports & analytics)
export const DEFAULT_DAILY_REPORT = {
  date: 'Tue, 15 Apr 2025',
  foodPrepared: 220,
  foodConsumed: 194, // 220 - 26 leftovers
  leftovers: 26,
  wastePercentage: 11.8,
  estimatedCostPerPortion: 42, // ₹42 per portion
  wasteTrend: [
    { day: 'Mon', date: '14 Apr', wastePct: 8.2, prepared: 215, consumed: 197, leftovers: 18, bfLeft: 5, lunchLeft: 8, dinnerLeft: 5 },
    { day: 'Tue', date: '15 Apr', wastePct: 11.8, prepared: 220, consumed: 194, leftovers: 26, bfLeft: 8, lunchLeft: 12, dinnerLeft: 6, isToday: true },
    { day: 'Wed', date: '16 Apr', wastePct: 7.4, prepared: 210, consumed: 194, leftovers: 16, bfLeft: 4, lunchLeft: 7, dinnerLeft: 5 },
    { day: 'Thu', date: '17 Apr', wastePct: 9.1, prepared: 218, consumed: 198, leftovers: 20, bfLeft: 6, lunchLeft: 9, dinnerLeft: 5 },
    { day: 'Fri', date: '18 Apr', wastePct: 13.6, prepared: 225, consumed: 194, leftovers: 31, bfLeft: 7, lunchLeft: 14, dinnerLeft: 10 },
    { day: 'Sat', date: '19 Apr', wastePct: 6.8, prepared: 180, consumed: 168, leftovers: 12, bfLeft: 4, lunchLeft: 5, dinnerLeft: 3 },
    { day: 'Sun', date: '20 Apr', wastePct: 10.4, prepared: 195, consumed: 175, leftovers: 20, bfLeft: 6, lunchLeft: 8, dinnerLeft: 6 }
  ]
};
