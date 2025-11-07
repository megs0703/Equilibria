const EventEmitter = require('events');

class EquilibriaEventEmitter extends EventEmitter {}
const eventBus = new EquilibriaEventEmitter();

// Event types
const EVENTS = {
  USER_REGISTERED: 'user:registered',
  WORKOUT_COMPLETED: 'workout:completed',
  MEAL_LOGGED: 'meal:logged',
  WATER_ADDED: 'water:added',
  GOAL_ACHIEVED: 'goal:achieved',
  REMINDER_DUE: 'reminder:due'
};

// Event handlers
eventBus.on(EVENTS.USER_REGISTERED, (userData) => {
  console.log(`New user registered: ${userData.name} (${userData.email})`);
  // Send welcome email, setup initial recommendations, etc.
});

eventBus.on(EVENTS.WORKOUT_COMPLETED, (data) => {
  console.log(`Workout completed by user ${data.userId}: ${data.workoutName}`);
  // Update progress, suggest next workout, send congratulations
});

eventBus.on(EVENTS.MEAL_LOGGED, (data) => {
  console.log(`Meal logged by user ${data.userId}: ${data.mealName} (${data.calories} cal)`);
  // Check daily goals, suggest complementary meals
  checkDailyNutritionGoals(data.userId, data.totalCalories);
});

eventBus.on(EVENTS.WATER_ADDED, (data) => {
  console.log(`Water logged by user ${data.userId}: ${data.glasses} glasses`);
  // Check hydration goals, send encouragement
  checkHydrationGoals(data.userId, data.totalGlasses, data.goal);
});

eventBus.on(EVENTS.GOAL_ACHIEVED, (data) => {
  console.log(`Goal achieved by user ${data.userId}: ${data.goalType}`);
  // Send celebration notification, suggest new goals
});

// Helper functions
const checkDailyNutritionGoals = (userId, totalCalories) => {
  // Logic to check if user is on track with daily nutrition goals
  if (totalCalories > 0) {
    eventBus.emit('notification:send', {
      userId,
      type: 'nutrition_progress',
      message: `Great job logging your meals! You've consumed ${totalCalories} calories today.`
    });
  }
};

const checkHydrationGoals = (userId, totalGlasses, goal) => {
  const progress = (totalGlasses / goal) * 100;
  
  if (progress >= 100) {
    eventBus.emit(EVENTS.GOAL_ACHIEVED, {
      userId,
      goalType: 'daily_hydration',
      achievement: 'Daily water goal completed!'
    });
  } else if (progress >= 50 && progress < 75) {
    eventBus.emit('notification:send', {
      userId,
      type: 'hydration_reminder',
      message: `You're halfway to your water goal! ${totalGlasses}/${goal} glasses completed.`
    });
  }
};

// Notification system
eventBus.on('notification:send', (notification) => {
  console.log(`Notification for user ${notification.userId}: ${notification.message}`);
  // In a real app, this would send push notifications, emails, etc.
});

// Reminder system
const scheduleReminders = (userId, preferences) => {
  // Water reminders every 2 hours
  if (preferences.waterReminders) {
    setInterval(() => {
      eventBus.emit(EVENTS.REMINDER_DUE, {
        userId,
        type: 'water',
        message: 'Time to drink some water! Stay hydrated! 💧'
      });
    }, 2 * 60 * 60 * 1000); // 2 hours
  }
  
  // Workout reminders
  if (preferences.workoutReminders) {
    // Daily workout reminder at 6 PM
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(18, 0, 0, 0);
    
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const timeUntilReminder = reminderTime.getTime() - now.getTime();
    
    setTimeout(() => {
      eventBus.emit(EVENTS.REMINDER_DUE, {
        userId,
        type: 'workout',
        message: 'Time for your daily workout! Let\'s get moving! 💪'
      });
      
      // Set up daily recurring reminder
      setInterval(() => {
        eventBus.emit(EVENTS.REMINDER_DUE, {
          userId,
          type: 'workout',
          message: 'Time for your daily workout! Let\'s get moving! 💪'
        });
      }, 24 * 60 * 60 * 1000); // 24 hours
    }, timeUntilReminder);
  }
};

eventBus.on(EVENTS.REMINDER_DUE, (reminder) => {
  console.log(`Reminder for user ${reminder.userId}: ${reminder.message}`);
  // Send push notification or in-app notification
});

module.exports = {
  eventBus,
  EVENTS,
  scheduleReminders
};