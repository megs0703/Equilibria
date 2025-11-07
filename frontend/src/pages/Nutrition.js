import React, { useState, useEffect } from 'react';
import { nutritionAPI, waterAPI } from '../utils/api';
import { motion } from 'framer-motion';
import { PlusIcon, BeakerIcon } from '@heroicons/react/24/outline';

const Nutrition = () => {
  const [todayLog, setTodayLog] = useState({
    meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0
  });
  const [waterLog, setWaterLog] = useState({ glasses: 0, goal: 8, progress: 0 });
  const [showMealForm, setShowMealForm] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [mealForm, setMealForm] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    quantity: '',
    isJunkFood: false
  });

  useEffect(() => {
    fetchTodayData();
  }, []);

  const fetchTodayData = async () => {
    try {
      const [nutritionRes, waterRes] = await Promise.all([
        nutritionAPI.getTodayLog(),
        waterAPI.getTodayLog()
      ]);
      setTodayLog(nutritionRes.data);
      setWaterLog(waterRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addMeal = async (e) => {
    e.preventDefault();
    try {
      await nutritionAPI.addMeal({
        ...mealForm,
        mealType: selectedMealType,
        calories: parseInt(mealForm.calories),
        protein: parseInt(mealForm.protein) || 0,
        carbs: parseInt(mealForm.carbs) || 0,
        fats: parseInt(mealForm.fats) || 0,
        quantity: parseInt(mealForm.quantity)
      });
      
      setMealForm({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        quantity: '',
        isJunkFood: false
      });
      setShowMealForm(false);
      fetchTodayData();
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const addWater = async () => {
    try {
      await waterAPI.addIntake(1);
      fetchTodayData();
    } catch (error) {
      console.error('Error adding water:', error);
    }
  };

  const MacroCard = ({ title, value, goal, color, unit = 'g' }) => {
    const percentage = goal ? Math.min((value / goal) * 100, 100) : 0;
    return (
      <div className="card">
        <h3 className="font-medium text-neutral-700 mb-2">{title}</h3>
        <div className="flex items-end justify-between mb-2">
          <span className="text-2xl font-bold">{value}{unit}</span>
          {goal && <span className="text-sm text-neutral-500">/{goal}{unit}</span>}
        </div>
        {goal && (
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${color}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    );
  };

  const MealSection = ({ mealType, meals }) => (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold capitalize">{mealType}</h3>
        <button
          onClick={() => {
            setSelectedMealType(mealType);
            setShowMealForm(true);
          }}
          className="btn-primary text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add
        </button>
      </div>
      {meals.length === 0 ? (
        <p className="text-neutral-500 text-sm">No meals logged</p>
      ) : (
        <div className="space-y-2">
          {meals.map((meal, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-neutral-50 rounded">
              <div>
                <span className="font-medium">{meal.name}</span>
                {meal.isJunkFood && (
                  <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                    Junk Food
                  </span>
                )}
              </div>
              <span className="text-sm text-neutral-600">{meal.calories} cal</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold">Nutrition</h1>
        <div className="text-xs sm:text-sm text-neutral-600">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MacroCard
          title="Calories"
          value={todayLog.totalCalories}
          goal={2000}
          color="bg-red-500"
          unit=""
        />
        <MacroCard
          title="Protein"
          value={todayLog.totalProtein}
          goal={150}
          color="bg-green-500"
        />
        <MacroCard
          title="Carbs"
          value={todayLog.totalCarbs}
          goal={250}
          color="bg-blue-500"
        />
        <MacroCard
          title="Fats"
          value={todayLog.totalFats}
          goal={65}
          color="bg-yellow-500"
        />
      </div>

      {/* Water Intake */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <BeakerIcon className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Water Intake</h2>
          </div>
          <button onClick={addWater} className="btn-secondary">
            +1 Glass
          </button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{waterLog.glasses} glasses</span>
          <span className="text-sm text-neutral-500">Goal: {waterLog.goal}</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-blue-500"
            style={{ width: `${waterLog.progress}%` }}
          />
        </div>
        <p className="text-xs text-neutral-500 mt-1">{waterLog.progress.toFixed(0)}% complete</p>
      </div>

      {/* Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <MealSection mealType="breakfast" meals={todayLog.meals.breakfast} />
        <MealSection mealType="lunch" meals={todayLog.meals.lunch} />
        <MealSection mealType="dinner" meals={todayLog.meals.dinner} />
        <MealSection mealType="snacks" meals={todayLog.meals.snacks} />
      </div>

      {/* Add Meal Modal */}
      {showMealForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">
              Add {selectedMealType} meal
            </h3>
            <form onSubmit={addMeal} className="space-y-4">
              <input
                type="text"
                placeholder="Meal name"
                value={mealForm.name}
                onChange={(e) => setMealForm({...mealForm, name: e.target.value})}
                className="input-field"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Calories"
                  value={mealForm.calories}
                  onChange={(e) => setMealForm({...mealForm, calories: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity (g)"
                  value={mealForm.quantity}
                  onChange={(e) => setMealForm({...mealForm, quantity: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={mealForm.protein}
                  onChange={(e) => setMealForm({...mealForm, protein: e.target.value})}
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Carbs (g)"
                  value={mealForm.carbs}
                  onChange={(e) => setMealForm({...mealForm, carbs: e.target.value})}
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Fats (g)"
                  value={mealForm.fats}
                  onChange={(e) => setMealForm({...mealForm, fats: e.target.value})}
                  className="input-field"
                />
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={mealForm.isJunkFood}
                  onChange={(e) => setMealForm({...mealForm, isJunkFood: e.target.checked})}
                  className="mr-2"
                />
                Mark as junk food
              </label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  Add Meal
                </button>
                <button
                  type="button"
                  onClick={() => setShowMealForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Nutrition;