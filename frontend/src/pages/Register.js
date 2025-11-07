import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: [],
    injuries: [],
  });

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register({
      ...formData,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
    });
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const fitnessGoalOptions = [
    'weight_loss',
    'weight_gain', 
    'muscle_gain',
    'endurance',
    'general_fitness'
  ];

  const commonInjuries = [
    'knee_injury',
    'back_pain',
    'shoulder_injury',
    'ankle_injury',
    'wrist_injury'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900">
            Join Equilibria
          </h1>
          <p className="mt-2 text-neutral-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min="13"
                  max="120"
                  className="input-field"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  required
                  className="input-field"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  required
                  min="100"
                  max="250"
                  className="input-field"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  required
                  min="30"
                  max="300"
                  className="input-field"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Fitness Goals */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Fitness Goals (select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {fitnessGoalOptions.map((goal) => (
                  <label key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      name="fitnessGoals"
                      value={goal}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">
                      {goal.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Injuries */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Current Injuries or Limitations (optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {commonInjuries.map((injury) => (
                  <label key={injury} className="flex items-center">
                    <input
                      type="checkbox"
                      name="injuries"
                      value={injury}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">
                      {injury.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;