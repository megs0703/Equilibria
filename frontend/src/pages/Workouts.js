import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { workoutAPI } from '../utils/api';
import { motion } from 'framer-motion';
import { PlusIcon, HomeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const Workouts = () => {
  const { user } = useAuth();
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('muscle_gain');

  useEffect(() => {
    fetchWorkouts();
    fetchSuggestions();
  }, [selectedGoal]);

  const fetchWorkouts = async () => {
    try {
      const response = await workoutAPI.getPlans();
      setWorkoutPlans(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await workoutAPI.getSuggestions(selectedGoal);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const createWorkoutFromSuggestion = async (exercises) => {
    try {
      const workoutData = {
        name: `${user.preferences.workoutType} Workout - ${selectedGoal}`,
        type: user.preferences.workoutType,
        goal: selectedGoal,
        exercises: exercises
      };
      
      await workoutAPI.createPlan(workoutData);
      fetchWorkouts();
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold">Workouts</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="input-field text-sm sm:text-base"
          >
            <option value="muscle_gain">Muscle Gain</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="endurance">Endurance</option>
            <option value="weight_gain">Weight Gain</option>
          </select>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center justify-center text-sm sm:text-base"
          >
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="hidden sm:inline">Create Plan</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>

      {/* Mode Indicator */}
      <div className="card bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="flex items-center">
          {user.preferences.workoutType === 'home' ? (
            <HomeIcon className="w-8 h-8 mr-3" />
          ) : (
            <BuildingOfficeIcon className="w-8 h-8 mr-3" />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {user.preferences.workoutType === 'home' ? 'Home Workouts' : 'Gym Workouts'}
            </h2>
            <p className="text-primary-100">
              Personalized for {user.gender} • Goal: {selectedGoal.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Workouts */}
      <div className="card">
        <h2 className="text-xl font-serif font-semibold mb-4">Suggested Exercises</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {suggestions.map((exercise, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="border border-neutral-200 rounded-lg p-4"
            >
              <h3 className="font-semibold">{exercise.name}</h3>
              <p className="text-sm text-neutral-600 mb-2">
                {exercise.sets} sets × {exercise.reps}
              </p>
              {exercise.targetMuscles && (
                <div className="flex flex-wrap gap-1">
                  {exercise.targetMuscles.map((muscle, i) => (
                    <span key={i} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                      {muscle}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        {suggestions.length > 0 && (
          <button
            onClick={() => createWorkoutFromSuggestion(suggestions)}
            className="btn-secondary mt-4"
          >
            Create Workout from Suggestions
          </button>
        )}
      </div>

      {/* My Workout Plans */}
      <div className="card">
        <h2 className="text-xl font-serif font-semibold mb-4">My Workout Plans</h2>
        {workoutPlans.length === 0 ? (
          <p className="text-neutral-600">No workout plans yet. Create your first plan!</p>
        ) : (
          <div className="space-y-4">
            {workoutPlans.map((plan) => (
              <div key={plan._id} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{plan.name}</h3>
                  <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs">
                    {plan.type}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  Goal: {plan.goal.replace('_', ' ')} • {plan.exercises.length} exercises
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plan.exercises.slice(0, 4).map((exercise, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium">{exercise.name}</span>
                      <span className="text-neutral-500 ml-2">
                        {exercise.sets}×{exercise.reps}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;