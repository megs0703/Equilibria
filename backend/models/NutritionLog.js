const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'grams' },
  calories: { type: Number, required: true },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  isJunkFood: { type: Boolean, default: false }
});

const nutritionLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  meals: {
    breakfast: [mealSchema],
    lunch: [mealSchema],
    dinner: [mealSchema],
    snacks: [mealSchema]
  },
  totalCalories: { type: Number, default: 0 },
  totalProtein: { type: Number, default: 0 },
  totalCarbs: { type: Number, default: 0 },
  totalFats: { type: Number, default: 0 },
  waterIntake: { type: Number, default: 0 } // glasses of water
}, {
  timestamps: true
});

nutritionLogSchema.pre('save', function(next) {
  let totalCal = 0, totalProt = 0, totalCarb = 0, totalFat = 0;
  
  Object.values(this.meals).forEach(mealArray => {
    mealArray.forEach(meal => {
      totalCal += meal.calories;
      totalProt += meal.protein;
      totalCarb += meal.carbs;
      totalFat += meal.fats;
    });
  });
  
  this.totalCalories = totalCal;
  this.totalProtein = totalProt;
  this.totalCarbs = totalCarb;
  this.totalFats = totalFat;
  
  next();
});

module.exports = mongoose.model('NutritionLog', nutritionLogSchema);