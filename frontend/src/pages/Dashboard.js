import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI, nutritionAPI, waterAPI } from '../utils/api';
import { motion } from 'framer-motion';
import {
  FireIcon,
  BeakerIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [stats, setStats] = useState({
    todayCalories: 0,
    calorieGoal: 2000,
    waterIntake: 0,
    waterGoal: 8,
    proteinIntake: 0,
    proteinGoal: 150,
  });
  const [workoutMode, setWorkoutMode] = useState(user?.preferences?.workoutType || 'home');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [nutritionRes, waterRes] = await Promise.all([
        nutritionAPI.getTodayLog(),
        waterAPI.getTodayLog(),
      ]);

      setStats(prev => ({
        ...prev,
        todayCalories: nutritionRes.data.totalCalories || 0,
        waterIntake: waterRes.data.glasses || 0,
        waterGoal: waterRes.data.goal || 8,
        proteinIntake: nutritionRes.data.totalProtein || 0,
      }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const addWater = async () => {
    try {
      await waterAPI.addIntake(1);
      fetchDashboardData();
    } catch (error) {
      console.error('Error adding water:', error);
    }
  };

  const handleModeToggle = async (mode) => {
    try {
      setWorkoutMode(mode);
      await userAPI.updatePreferences({
        workoutType: mode,
        proteinIntake: stats.proteinGoal,
        calorieGoal: stats.calorieGoal,
        waterGoal: stats.waterGoal,
      });
      updateUser({ preferences: { ...user.preferences, workoutType: mode } });
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = 'Good morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
    if (hour >= 17) timeGreeting = 'Good evening';

    const genderSpecific = user?.gender === 'female' 
      ? 'Ready to balance strength and wellness today?'
      : user?.gender === 'male'
      ? 'Time to build strength and endurance!'
      : 'Ready to achieve your fitness goals?';

    return { timeGreeting, genderSpecific };
  };

  const { timeGreeting, genderSpecific } = getPersonalizedGreeting();

  const StatCard = ({ title, value, goal, icon: Icon, color, unit = '' }) => {
    const percentage = goal ? Math.min((value / goal) * 100, 100) : 0;
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900">
              {value}{unit}
            </p>
            <p className="text-sm text-neutral-600">
              of {goal}{unit}
            </p>
          </div>
        </div>
        <h3 className="font-medium text-neutral-700 mb-2">{title}</h3>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              color.replace('bg-', 'bg-').replace('-500', '-600')
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          {percentage.toFixed(0)}% complete
        </p>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-2">
              {timeGreeting}, {user?.name}!
            </h1>
            <p className="text-primary-100 mb-4 text-sm sm:text-base">{genderSpecific}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="bg-white/20 px-2 py-1 rounded-full">
                {user?.role?.replace('_', ' ').toUpperCase()}
              </span>
              <span className="bg-white/20 px-2 py-1 rounded-full">
                {user?.gender?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:text-right">
            <p className="text-primary-100 text-xs sm:text-sm mb-2">Current Mode</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleModeToggle('home')}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-colors ${
                  workoutMode === 'home'
                    ? 'bg-white text-primary-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleModeToggle('gym')}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-colors ${
                  workoutMode === 'gym'
                    ? 'bg-white text-primary-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Gym
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard
          title="Calories Today"
          value={stats.todayCalories}
          goal={stats.calorieGoal}
          icon={FireIcon}
          color="bg-red-500"
        />
        <StatCard
          title="Water Intake"
          value={stats.waterIntake}
          goal={stats.waterGoal}
          icon={BeakerIcon}
          color="bg-blue-500"
          unit=" glasses"
        />
        <StatCard
          title="Protein Intake"
          value={stats.proteinIntake}
          goal={stats.proteinGoal}
          icon={ChartBarIcon}
          color="bg-green-500"
          unit="g"
        />
        <StatCard
          title="Workout Mode"
          value={workoutMode === 'gym' ? 'Gym' : 'Home'}
          goal={null}
          icon={CogIcon}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-lg sm:text-xl font-serif font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button 
            onClick={() => window.location.href = '/nutrition'}
            className="btn-primary text-center py-3 sm:py-4 text-sm sm:text-base"
          >
            Log Meal
          </button>
          <button 
            onClick={addWater}
            className="btn-secondary text-center py-3 sm:py-4 text-sm sm:text-base"
          >
            Add Water
          </button>
          <button 
            onClick={() => window.location.href = '/workouts'}
            className="btn-primary text-center py-3 sm:py-4 text-sm sm:text-base"
          >
            Start Workout
          </button>
          <button 
            onClick={() => window.location.href = '/progress'}
            className="btn-secondary text-center py-3 sm:py-4 text-sm sm:text-base"
          >
            View Progress
          </button>
        </div>
      </motion.div>

      {/* Today's Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-lg sm:text-xl font-serif font-semibold mb-4">
          Today's Recommendations
        </h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-primary-50 rounded-lg">
            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
            <p className="text-sm">
              {user?.gender === 'female' 
                ? 'Consider adding yoga or pilates to your routine for flexibility'
                : 'Focus on compound movements for maximum muscle engagement'
              }
            </p>
          </div>
          <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
            <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
            <p className="text-sm">
              Aim for {Math.round(user?.weight * 1.6)}g of protein today based on your weight
            </p>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <p className="text-sm">
              Stay hydrated! You're {((stats.waterIntake / stats.waterGoal) * 100).toFixed(0)}% 
              towards your daily water goal
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;