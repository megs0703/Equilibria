import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [workoutMode, setWorkoutMode] = useState('home'); // 'home' or 'gym'
  
  // Mock user data - in real app this would come from context/API
  const user = {
    name: 'John Doe',
    gender: 'male',
    fitnessGoal: 'muscle-gain'
  };

  const quickStats = [
    { label: 'Water Intake', value: '6/8', unit: 'glasses', progress: 75 },
    { label: 'Calories', value: '1,850', unit: 'kcal', progress: 85 },
    { label: 'Workouts', value: '3/4', unit: 'this week', progress: 75 },
    { label: 'Sleep', value: '7.5', unit: 'hours', progress: 90 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-lime-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-2 relative" style={{borderColor: '#487800'}}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-display text-4xl font-semibold" style={{color: '#487800'}}>
                Welcome back, {user.name}
              </h1>
              <p className="text-stone-600 mt-2 text-lg font-medium">Ready to continue your wellness journey?</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Workout Mode Toggle */}
              <div className="flex rounded-xl p-1 shadow-md" style={{backgroundColor: '#48780020'}}>
                <button
                  onClick={() => setWorkoutMode('home')}
                  className={`px-6 py-3 rounded-lg text-base font-bold transition-all ${
                    workoutMode === 'home'
                      ? 'text-white shadow-lg transform scale-105'
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: workoutMode === 'home' ? '#487800' : 'transparent',
                    color: workoutMode === 'home' ? 'white' : '#487800'
                  }}
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => setWorkoutMode('gym')}
                  className={`px-6 py-3 rounded-lg text-base font-bold transition-all ${
                    workoutMode === 'gym'
                      ? 'text-white shadow-lg transform scale-105'
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: workoutMode === 'gym' ? '#487800' : 'transparent',
                    color: workoutMode === 'gym' ? 'white' : '#487800'
                  }}
                >
                  🏋️ Gym
                </button>
              </div>
              

            </div>
          </div>
        </div>
        
        {/* Profile Icon - Absolute Top Right Corner */}
        <button 
          onClick={() => navigate('/profile')}
          className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{backgroundColor: '#487800'}}
        >
          👤
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-2xl shadow-lg border-2 p-6 hover:shadow-xl transition-all duration-300"
              style={{borderColor: '#48780030'}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="text-center">
                <div className="text-3xl font-black mb-2" style={{color: '#487800'}}>{stat.value}</div>
                <div className="text-base text-stone-700 mb-3 font-semibold">{stat.label}</div>
                <div className="w-full rounded-full h-3 shadow-inner" style={{backgroundColor: '#48780020'}}>
                  <div 
                    className="h-3 rounded-full transition-all duration-700 shadow-sm"
                    style={{ 
                      width: `${stat.progress}%`,
                      background: `linear-gradient(to right, #487800, #5a9600)`
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
          {/* Workouts Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl border-2 p-8 cursor-pointer hover:shadow-2xl transition-all duration-300"
            style={{borderColor: '#48780030'}}
            onClick={() => navigate('/workouts')}
            whileHover={{ y: -6, scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mr-5 shadow-lg" style={{background: 'linear-gradient(135deg, #487800, #5a9600)'}}>
                {workoutMode === 'gym' ? '🏋️' : '🏠'}
              </div>
              <div>
                <h3 className="heading-display text-2xl font-bold" style={{color: '#487800'}}>Workouts</h3>
                <p className="text-stone-600 text-base font-semibold">{workoutMode === 'gym' ? 'Gym Plans' : 'Home Exercises'}</p>
              </div>
            </div>
            <p className="text-stone-700 mb-6 text-base font-medium leading-relaxed">
              {workoutMode === 'gym' 
                ? 'Upload and manage your gym workout plans'
                : 'Get personalized home workout suggestions'
              }
            </p>
            <div className="flex items-center font-bold text-lg" style={{color: '#487800'}}>
              <span>View Plans</span>
              <span className="ml-3 text-xl">→</span>
            </div>
          </motion.div>

          {/* Nutrition Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl border-2 border-terracotta-300 p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-terracotta-400"
            onClick={() => navigate('/nutrition')}
            whileHover={{ y: -6, scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-terracotta-600 to-terracotta-700 rounded-2xl flex items-center justify-center text-white text-2xl mr-5 shadow-lg">
                🥗
              </div>
              <div>
                <h3 className="heading-display text-2xl font-bold" style={{color: '#487800'}}>Nutrition</h3>
                <p className="text-stone-600 text-base font-semibold">Meal Tracking</p>
              </div>
            </div>
            <p className="text-stone-700 mb-6 text-base font-medium leading-relaxed">
              Log your meals and track calories, macros, and nutritional goals
            </p>
            <div className="flex items-center font-bold text-lg" style={{color: '#487800'}}>
              <span>Log Meals</span>
              <span className="ml-3 text-xl">→</span>
            </div>
          </motion.div>

          {/* Water Tracker Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl border-2 border-blue-300 p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-blue-400"
            whileHover={{ y: -6, scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white text-2xl mr-5 shadow-lg">
                💧
              </div>
              <div>
                <h3 className="heading-display text-2xl font-bold" style={{color: '#487800'}}>Water Intake</h3>
                <p className="text-stone-600 text-base font-semibold">Stay Hydrated</p>
              </div>
            </div>
            <p className="text-stone-700 mb-6 text-base font-medium leading-relaxed">
              Track your daily water consumption with smart reminders
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center font-bold text-lg" style={{color: '#487800'}}>
                <span>Add Water</span>
                <span className="ml-3 text-xl">→</span>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-xl text-base font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                + Glass
              </button>
            </div>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            className="card cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/progress')}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                📊
              </div>
              <div>
                <h3 className="heading-display text-xl" style={{color: '#487800'}}>Progress</h3>
                <p className="text-stone-500 text-sm">Analytics & Trends</p>
              </div>
            </div>
            <p className="text-stone-600 mb-4">
              View your fitness journey with detailed analytics and insights
            </p>
            <div className="flex items-center font-medium" style={{color: '#487800'}}>
              <span>View Analytics</span>
              <span className="ml-2">→</span>
            </div>
          </motion.div>



          {/* Protein Recommendation Card */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                🥩
              </div>
              <div>
                <h3 className="heading-display text-xl" style={{color: '#487800'}}>Daily Protein</h3>
                <p className="text-stone-500 text-sm">Recommendation</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#487800'}}>120g</div>
              <p className="text-stone-600 text-sm">
                Based on your {user.fitnessGoal.replace('-', ' ')} goal
              </p>
            </div>
          </motion.div>
        </div>

        {/* Today's Summary */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border-2 p-8"
          style={{borderColor: '#48780030'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h3 className="heading-display text-3xl mb-8 font-bold text-center" style={{color: '#487800'}}>Today's Summary</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-terracotta-50 to-terracotta-100 rounded-2xl p-6 border-2 border-terracotta-200">
              <div className="text-xl font-bold text-stone-800 mb-3">🔥 Calories Burned</div>
              <div className="text-4xl font-black text-terracotta-700">420</div>
            </div>
            <div className="text-center rounded-2xl p-6 border-2" style={{background: 'linear-gradient(135deg, #48780010, #48780020)', borderColor: '#48780030'}}>
              <div className="text-xl font-bold text-stone-800 mb-3">⏱️ Active Time</div>
              <div className="text-4xl font-black" style={{color: '#487800'}}>45 min</div>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-xl font-bold text-stone-800 mb-3">🎯 Goals Met</div>
              <div className="text-4xl font-black text-purple-700">3/4</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;