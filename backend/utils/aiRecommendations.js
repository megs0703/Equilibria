// AI/ML recommendation engine for personalized suggestions

const getPersonalizedWorkoutRecommendations = (user, goal, workoutHistory = []) => {
  const { gender, age, weight, height, injuries, preferences } = user;
  const bmi = weight / Math.pow(height / 100, 2);
  
  let recommendations = [];
  
  // Gender-based recommendations
  if (gender === 'female') {
    recommendations = [
      { name: 'Glute Bridges', sets: 3, reps: '15-20', targetMuscles: ['glutes'], priority: 'high' },
      { name: 'Squats', sets: 3, reps: '12-15', targetMuscles: ['legs', 'glutes'], priority: 'high' },
      { name: 'Planks', sets: 3, reps: '30-45 seconds', targetMuscles: ['core'], priority: 'medium' },
      { name: 'Push-ups (modified)', sets: 3, reps: '8-12', targetMuscles: ['chest', 'arms'], priority: 'medium' }
    ];
    
    if (goal === 'weight_loss') {
      recommendations.push(
        { name: 'High Knees', sets: 3, reps: '30 seconds', targetMuscles: ['cardio'], priority: 'high' },
        { name: 'Mountain Climbers', sets: 3, reps: '20', targetMuscles: ['cardio', 'core'], priority: 'high' }
      );
    }
  } else if (gender === 'male') {
    recommendations = [
      { name: 'Push-ups', sets: 3, reps: '12-20', targetMuscles: ['chest', 'triceps'], priority: 'high' },
      { name: 'Pull-ups', sets: 3, reps: '6-12', targetMuscles: ['back', 'biceps'], priority: 'high' },
      { name: 'Squats', sets: 3, reps: '15-20', targetMuscles: ['legs'], priority: 'high' },
      { name: 'Deadlifts', sets: 3, reps: '8-12', targetMuscles: ['back', 'legs'], priority: 'medium' }
    ];
    
    if (goal === 'muscle_gain') {
      recommendations.push(
        { name: 'Bench Press', sets: 4, reps: '8-10', targetMuscles: ['chest'], priority: 'high' },
        { name: 'Overhead Press', sets: 3, reps: '8-12', targetMuscles: ['shoulders'], priority: 'medium' }
      );
    }
  }
  
  // Age-based adjustments
  if (age > 50) {
    recommendations = recommendations.map(ex => ({
      ...ex,
      sets: Math.max(2, ex.sets - 1),
      reps: ex.reps.includes('seconds') ? ex.reps : ex.reps.split('-').map(r => Math.max(5, parseInt(r) - 2)).join('-')
    }));
  }
  
  // BMI-based adjustments
  if (bmi > 30) {
    recommendations = recommendations.filter(ex => !ex.targetMuscles.includes('cardio') || ex.name.includes('Low Impact'));
    recommendations.unshift(
      { name: 'Walking', sets: 1, reps: '20-30 minutes', targetMuscles: ['cardio'], priority: 'high' },
      { name: 'Chair Exercises', sets: 3, reps: '10-15', targetMuscles: ['full_body'], priority: 'medium' }
    );
  }
  
  // Filter out exercises that conflict with injuries
  if (injuries && injuries.length > 0) {
    recommendations = recommendations.filter(exercise => {
      return !injuries.some(injury => {
        if (injury.includes('knee') && exercise.targetMuscles.includes('legs')) return true;
        if (injury.includes('back') && exercise.targetMuscles.includes('back')) return true;
        if (injury.includes('shoulder') && exercise.targetMuscles.includes('shoulders')) return true;
        return false;
      });
    });
  }
  
  // Sort by priority and return top recommendations
  return recommendations
    .sort((a, b) => (a.priority === 'high' ? -1 : 1))
    .slice(0, 8);
};

const getNutritionRecommendations = (user, goal, currentIntake = {}) => {
  const { gender, age, weight, height, preferences } = user;
  const bmr = calculateBMR(gender, age, weight, height);
  const tdee = bmr * 1.5; // Moderate activity level
  
  let calorieTarget = tdee;
  let proteinTarget = weight * 1.6; // g per kg
  let carbTarget = 0;
  let fatTarget = 0;
  
  // Adjust based on goal
  switch (goal) {
    case 'weight_loss':
      calorieTarget = tdee - 500; // 500 calorie deficit
      proteinTarget = weight * 1.8; // Higher protein for muscle preservation
      break;
    case 'weight_gain':
      calorieTarget = tdee + 300; // 300 calorie surplus
      break;
    case 'muscle_gain':
      calorieTarget = tdee + 200;
      proteinTarget = weight * 2.0; // Higher protein for muscle building
      break;
  }
  
  // Calculate macro distribution
  const proteinCalories = proteinTarget * 4;
  const fatCalories = calorieTarget * 0.25; // 25% from fats
  const carbCalories = calorieTarget - proteinCalories - fatCalories;
  
  carbTarget = carbCalories / 4;
  fatTarget = fatCalories / 9;
  
  return {
    calories: Math.round(calorieTarget),
    protein: Math.round(proteinTarget),
    carbs: Math.round(carbTarget),
    fats: Math.round(fatTarget),
    recommendations: generateMealSuggestions(gender, goal)
  };
};

const calculateBMR = (gender, age, weight, height) => {
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

const generateMealSuggestions = (gender, goal) => {
  const baseMeals = {
    breakfast: [
      { name: 'Oatmeal with berries', calories: 300, protein: 10, carbs: 45, fats: 8 },
      { name: 'Greek yogurt with nuts', calories: 250, protein: 20, carbs: 15, fats: 12 },
      { name: 'Scrambled eggs with toast', calories: 350, protein: 18, carbs: 25, fats: 20 }
    ],
    lunch: [
      { name: 'Grilled chicken salad', calories: 400, protein: 35, carbs: 20, fats: 18 },
      { name: 'Quinoa bowl with vegetables', calories: 450, protein: 15, carbs: 60, fats: 15 },
      { name: 'Tuna sandwich', calories: 380, protein: 25, carbs: 35, fats: 16 }
    ],
    dinner: [
      { name: 'Salmon with sweet potato', calories: 500, protein: 40, carbs: 35, fats: 22 },
      { name: 'Lean beef with rice', calories: 550, protein: 45, carbs: 40, fats: 20 },
      { name: 'Vegetable stir-fry with tofu', calories: 350, protein: 20, carbs: 30, fats: 18 }
    ]
  };
  
  // Gender-specific adjustments
  if (gender === 'female') {
    // Add iron-rich and calcium-rich options
    baseMeals.breakfast.push(
      { name: 'Spinach smoothie with protein powder', calories: 280, protein: 25, carbs: 20, fats: 10 }
    );
    baseMeals.lunch.push(
      { name: 'Lentil soup with whole grain bread', calories: 420, protein: 18, carbs: 55, fats: 12 }
    );
  }
  
  if (gender === 'male' && goal === 'muscle_gain') {
    // Higher protein options
    baseMeals.breakfast.push(
      { name: 'Protein pancakes with banana', calories: 450, protein: 30, carbs: 40, fats: 15 }
    );
    baseMeals.dinner.push(
      { name: 'Chicken breast with quinoa', calories: 600, protein: 50, carbs: 45, fats: 18 }
    );
  }
  
  return baseMeals;
};

const getWaterRecommendation = (user, activityLevel = 'moderate') => {
  const { weight, age, gender } = user;
  
  // Base water intake: 35ml per kg of body weight
  let baseIntake = weight * 35; // ml
  
  // Adjustments
  if (age > 65) baseIntake *= 0.9; // Older adults need slightly less
  if (gender === 'male') baseIntake *= 1.1; // Males typically need more
  
  // Activity level adjustments
  const activityMultipliers = {
    low: 1.0,
    moderate: 1.2,
    high: 1.5,
    very_high: 1.8
  };
  
  baseIntake *= activityMultipliers[activityLevel] || 1.2;
  
  // Convert to glasses (250ml per glass)
  const glasses = Math.round(baseIntake / 250);
  
  return {
    glasses: Math.max(6, Math.min(12, glasses)), // Between 6-12 glasses
    ml: Math.round(baseIntake),
    recommendations: [
      'Drink a glass of water upon waking',
      'Have water before each meal',
      'Keep a water bottle nearby during workouts',
      'Set hourly reminders to drink water'
    ]
  };
};

module.exports = {
  getPersonalizedWorkoutRecommendations,
  getNutritionRecommendations,
  getWaterRecommendation,
  calculateBMR
};