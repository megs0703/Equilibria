import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  return finalStatus === 'granted';
};

export const scheduleWaterReminder = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hydration Reminder 💧',
      body: 'Time to drink some water! Stay hydrated!',
      data: { type: 'water_reminder' },
    },
    trigger: {
      seconds: 2 * 60 * 60, // 2 hours
      repeats: true,
    },
  });
};

export const scheduleWorkoutReminder = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Workout Time 💪',
      body: 'Time for your daily workout! Let\'s get moving!',
      data: { type: 'workout_reminder' },
    },
    trigger: {
      hour: 18,
      minute: 0,
      repeats: true,
    },
  });
};

export const sendGoalAchievedNotification = async (goalType) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Goal Achieved! 🎉',
      body: `Congratulations! You've completed your ${goalType} goal!`,
      data: { type: 'goal_achieved', goalType },
    },
    trigger: null,
  });
};