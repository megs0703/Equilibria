import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser, isAuthenticated, initialized, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: [],
    injuries: [],
    preferences: {
      workoutType: '',
      proteinIntake: '',
      calorieGoal: '',
      waterGoal: ''
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        gender: user.gender || '',
        height: user.height || '',
        weight: user.weight || '',
        fitnessGoals: user.fitnessGoals || [],
        injuries: user.injuries || [],
        preferences: {
          workoutType: user.preferences?.workoutType || 'home',
          proteinIntake: user.preferences?.proteinIntake || '',
          calorieGoal: user.preferences?.calorieGoal || '',
          waterGoal: user.preferences?.waterGoal || 8
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    
    setPasswordLoading(true);
    try {
      await api.put('/user/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Password changed successfully!');
    } catch (error) {
      setPasswordError(error.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Update profile
      const profileResponse = await api.put('/user/profile', {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        fitnessGoals: formData.fitnessGoals,
        injuries: formData.injuries
      });

      // Update preferences
      await api.put('/user/preferences', {
        workoutType: formData.preferences.workoutType,
        proteinIntake: parseFloat(formData.preferences.proteinIntake) || null,
        calorieGoal: parseFloat(formData.preferences.calorieGoal) || null,
        waterGoal: parseFloat(formData.preferences.waterGoal) || 8
      });

      // Update user in context
      updateUser(profileResponse.data.user);
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return 0;
    return (formData.weight / ((formData.height / 100) ** 2)).toFixed(1);
  };

  const calculateProteinGoal = () => {
    if (!formData.weight) return 0;
    return Math.round(formData.weight * 1.8);
  };

  const calculateCalorieGoal = () => {
    if (!formData.weight) return 0;
    return Math.round(formData.weight * 30);
  };

  const formatJoinDate = () => {
    if (!user?.createdAt) return 'Recently';
    return new Date(user.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-lime-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: '#487800'}}></div>
          <h2 className="text-xl font-medium" style={{color: '#487800'}}>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-lime-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{color: '#487800'}}>Please log in to view your profile</h2>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-3 rounded-lg font-bold text-white"
            style={{backgroundColor: '#487800'}}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-lime-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-2 relative" style={{borderColor: '#487800'}}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-display text-4xl font-semibold" style={{color: '#487800'}}>
                My Profile
              </h1>
              <p className="text-stone-600 mt-2 text-lg font-medium">Manage your personal information and preferences</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 rounded-lg text-base font-bold transition-all hover:opacity-80"
                style={{color: '#487800'}}
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
        
        {/* Profile Icon - Absolute Top Right Corner */}
        <button 
          onClick={() => navigate('/profile')}
          className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
          style={{backgroundColor: '#487800'}}
        >
          👤
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border-2 p-8 mb-8"
          style={{borderColor: '#48780030'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl mr-6 shadow-lg" style={{backgroundColor: '#487800'}}>
                👤
              </div>
              <div>
                <h2 className="heading-display text-3xl font-bold" style={{color: '#487800'}}>{formData.name}</h2>
                <p className="text-stone-600 text-lg">{formData.email}</p>
                <p className="text-stone-500">Member since {formatJoinDate()}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 border-2 hover:opacity-80"
                style={{borderColor: '#487800', color: '#487800', backgroundColor: 'rgba(72, 120, 0, 0.1)'}}
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 border-2 hover:opacity-80"
                style={{borderColor: '#487800', color: '#487800', backgroundColor: 'rgba(72, 120, 0, 0.1)'}}
              >
                Logout
              </button>
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl bg-gray-500 text-white"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={loading}
                className="px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                style={{backgroundColor: '#487800', color: 'white'}}
              >
                {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Edit Profile')}
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </motion.div>

        {/* Personal Information */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border-2 p-8 mb-8"
          style={{borderColor: '#48780030'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="heading-display text-2xl font-bold mb-6" style={{color: '#487800'}}>Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                />
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.name}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Email</label>
              <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                <span className="text-stone-800 font-medium">{formData.email}</span>
                <p className="text-xs text-stone-500 mt-1">Email cannot be changed</p>
              </div>
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Age</label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="13"
                  max="120"
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                />
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.age} years old</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Physical Stats */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border-2 p-8 mb-8"
          style={{borderColor: '#48780030'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="heading-display text-2xl font-bold mb-6" style={{color: '#487800'}}>Physical Stats</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Height (cm)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  min="100"
                  max="250"
                  step="0.1"
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                />
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.height} cm</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Weight (kg)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="30"
                  max="300"
                  step="0.1"
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                />
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.weight} kg</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Fitness Information */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border-2 p-8 mb-8"
          style={{borderColor: '#48780030'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="heading-display text-2xl font-bold mb-6" style={{color: '#487800'}}>Fitness Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Fitness Goals</label>
              {isEditing ? (
                <textarea
                  name="fitnessGoals"
                  value={formData.fitnessGoals.join(', ')}
                  onChange={(e) => handleArrayChange('fitnessGoals', e.target.value)}
                  placeholder="e.g., Weight Loss, Muscle Gain, Endurance"
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 h-20"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                />
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.fitnessGoals.length > 0 ? formData.fitnessGoals.join(', ') : 'Not specified'}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Workout Preference</label>
              {isEditing ? (
                <select
                  name="preferences.workoutType"
                  value={formData.preferences.workoutType}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                >
                  <option value="home">Home Workouts</option>
                  <option value="gym">Gym Workouts</option>
                  <option value="both">Both</option>
                </select>
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.preferences.workoutType.charAt(0).toUpperCase() + formData.preferences.workoutType.slice(1)}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Daily Protein Goal (g)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="preferences.proteinIntake"
                  value={formData.preferences.proteinIntake}
                  onChange={handleInputChange}
                  placeholder={`Recommended: ${calculateProteinGoal()}g`}
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                />
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.preferences.proteinIntake || calculateProteinGoal()}g</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-2">Daily Calorie Goal</label>
              {isEditing ? (
                <input
                  type="number"
                  name="preferences.calorieGoal"
                  value={formData.preferences.calorieGoal}
                  onChange={handleInputChange}
                  placeholder={`Recommended: ${calculateCalorieGoal()} kcal`}
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
                />
              ) : (
                <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                  <span className="text-stone-800 font-medium">{formData.preferences.calorieGoal || calculateCalorieGoal()} kcal</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Health Information */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border-2 p-8 mb-8"
          style={{borderColor: '#48780030'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="heading-display text-2xl font-bold mb-6" style={{color: '#487800'}}>Health Information</h3>
          <div>
            <label className="block text-stone-700 font-semibold mb-2">Injuries or Health Concerns</label>
            {isEditing ? (
              <textarea
                name="injuries"
                value={formData.injuries.join(', ')}
                onChange={(e) => handleArrayChange('injuries', e.target.value)}
                placeholder="e.g., Knee injury, Lower back pain (separate with commas)"
                className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 h-24"
                style={{borderColor: '#48780040', backgroundColor: '#48780010'}}
              />
            ) : (
              <div className="p-4 rounded-xl border-2" style={{borderColor: '#48780020', backgroundColor: '#48780010'}}>
                <span className="text-stone-800 font-medium">{formData.injuries.length > 0 ? formData.injuries.join(', ') : 'None reported'}</span>
              </div>
            )}
            <p className="text-stone-500 text-sm mt-2">This helps us suggest exercises that are safe for you</p>
          </div>
        </motion.div>

        {/* BMI Calculator */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border-2 p-8"
          style={{borderColor: '#48780030'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="heading-display text-2xl font-bold mb-6" style={{color: '#487800'}}>Health Metrics</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-bold text-stone-700 mb-2">BMI</h4>
              <p className="text-3xl font-black mb-2" style={{color: '#487800'}}>
                {calculateBMI()}
              </p>
              <p className="text-stone-600">Normal Range</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-stone-700 mb-2">Daily Protein Goal</h4>
              <p className="text-3xl font-black mb-2" style={{color: '#487800'}}>
                {calculateProteinGoal()}g
              </p>
              <p className="text-stone-600">Based on your goal</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-stone-700 mb-2">Daily Calories</h4>
              <p className="text-3xl font-black mb-2" style={{color: '#487800'}}>
                {calculateCalorieGoal()}kcal
              </p>
              <p className="text-stone-600">Estimated needs</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{color: '#487800'}}>Change Password</h3>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040'}}
                  required
                />
              </div>
              
              <div>
                <label className="block text-stone-700 font-semibold mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040'}}
                  minLength="6"
                  required
                />
              </div>
              
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{borderColor: '#48780040'}}
                  minLength="6"
                  required
                />
              </div>
              
              {passwordError && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {passwordError}
                </div>
              )}
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordError('');
                  }}
                  className="flex-1 px-4 py-3 rounded-lg font-bold bg-gray-500 text-white hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50"
                  style={{backgroundColor: '#487800'}}
                >
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;