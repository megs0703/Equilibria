import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import { motion } from 'framer-motion';
import { UserIcon, CogIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    fitnessGoals: user?.fitnessGoals || [],
    injuries: user?.injuries || []
  });
  const [preferencesForm, setPreferencesForm] = useState({
    workoutType: user?.preferences?.workoutType || 'home',
    calorieGoal: user?.preferences?.calorieGoal || 2000,
    proteinIntake: user?.preferences?.proteinIntake || 150,
    waterGoal: user?.preferences?.waterGoal || 8
  });
  const [loading, setLoading] = useState(false);

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userAPI.updateProfile({
        ...profileForm,
        age: parseInt(profileForm.age),
        height: parseInt(profileForm.height),
        weight: parseInt(profileForm.weight)
      });
      updateUser(response.data.user);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile');
    }
    setLoading(false);
  };

  const updatePreferences = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userAPI.updatePreferences({
        ...preferencesForm,
        calorieGoal: parseInt(preferencesForm.calorieGoal),
        proteinIntake: parseInt(preferencesForm.proteinIntake),
        waterGoal: parseInt(preferencesForm.waterGoal)
      });
      updateUser(response.data.user);
      alert('Preferences updated successfully!');
    } catch (error) {
      alert('Error updating preferences');
    }
    setLoading(false);
  };

  const handleGoalChange = (goal, checked) => {
    setProfileForm(prev => ({
      ...prev,
      fitnessGoals: checked
        ? [...prev.fitnessGoals, goal]
        : prev.fitnessGoals.filter(g => g !== goal)
    }));
  };

  const handleInjuryChange = (injury, checked) => {
    setProfileForm(prev => ({
      ...prev,
      injuries: checked
        ? [...prev.injuries, injury]
        : prev.injuries.filter(i => i !== injury)
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'preferences', name: 'Preferences', icon: CogIcon },
    { id: 'stats', name: 'Stats', icon: ChartBarIcon }
  ];

  const fitnessGoals = ['weight_loss', 'weight_gain', 'muscle_gain', 'endurance', 'general_fitness'];
  const commonInjuries = ['knee_injury', 'back_pain', 'shoulder_injury', 'ankle_injury', 'wrist_injury'];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-serif font-bold">Profile</h1>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
          <form onSubmit={updateProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={profileForm.age}
                  onChange={(e) => setProfileForm({...profileForm, age: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={profileForm.height}
                  onChange={(e) => setProfileForm({...profileForm, height: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={profileForm.weight}
                  onChange={(e) => setProfileForm({...profileForm, weight: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Fitness Goals
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {fitnessGoals.map((goal) => (
                  <label key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileForm.fitnessGoals.includes(goal)}
                      onChange={(e) => handleGoalChange(goal, e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{goal.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Injuries/Limitations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {commonInjuries.map((injury) => (
                  <label key={injury} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileForm.injuries.includes(injury)}
                      onChange={(e) => handleInjuryChange(injury, e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{injury.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-6">Preferences & Goals</h2>
          <form onSubmit={updatePreferences} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Workout Type
              </label>
              <select
                value={preferencesForm.workoutType}
                onChange={(e) => setPreferencesForm({...preferencesForm, workoutType: e.target.value})}
                className="input-field"
              >
                <option value="home">Home Workouts</option>
                <option value="gym">Gym Workouts</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Daily Calorie Goal
                </label>
                <input
                  type="number"
                  value={preferencesForm.calorieGoal}
                  onChange={(e) => setPreferencesForm({...preferencesForm, calorieGoal: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Daily Protein Goal (g)
                </label>
                <input
                  type="number"
                  value={preferencesForm.proteinIntake}
                  onChange={(e) => setPreferencesForm({...preferencesForm, proteinIntake: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Daily Water Goal (glasses)
                </label>
                <input
                  type="number"
                  value={preferencesForm.waterGoal}
                  onChange={(e) => setPreferencesForm({...preferencesForm, waterGoal: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Updating...' : 'Update Preferences'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-medium text-neutral-700">Email</h3>
                <p className="text-neutral-900">{user?.email}</p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-medium text-neutral-700">Gender</h3>
                <p className="text-neutral-900 capitalize">{user?.gender}</p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-medium text-neutral-700">Account Type</h3>
                <p className="text-neutral-900 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-medium text-neutral-700">Member Since</h3>
                <p className="text-neutral-900">
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>
            {user?.height && user?.weight && (
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-700">
                    {(user.weight / Math.pow(user.height / 100, 2)).toFixed(1)}
                  </p>
                  <p className="text-primary-600">BMI</p>
                  <p className="text-sm text-neutral-600 mt-2">
                    Based on {user.height}cm height and {user.weight}kg weight
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;