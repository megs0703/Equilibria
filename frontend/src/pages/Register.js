import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: [],
    injuries: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="heading-display text-4xl text-sage-700 mb-3">
              Equilibria
            </h1>
            <p className="text-stone-500 text-lg">
              Begin your journey to balance
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-medium mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 bg-stone-50 text-stone-700 text-sm"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-2 text-sm">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 bg-stone-50 text-stone-700 text-sm"
                  placeholder="25"
                  min="13"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 bg-stone-50 text-stone-700 text-sm"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 bg-stone-50 text-stone-700 text-sm"
                placeholder="••••••••"
                minLength="6"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-stone-700 font-medium mb-2 text-sm">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white text-stone-700 text-sm"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-2 text-sm">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 bg-stone-50 text-stone-700 text-sm"
                  placeholder="175"
                  min="100"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-2 text-sm">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 bg-stone-50 text-stone-700 text-sm"
                  placeholder="70"
                  min="30"
                  step="0.1"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-sage-600 hover:bg-sage-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 text-base mt-8"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="text-center mt-8">
            <p className="text-stone-500">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-sage-600 hover:text-sage-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;