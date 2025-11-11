import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const result = await login(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
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
              Welcome back to your wellness journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-stone-700 font-medium mb-3 text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-stone-50 text-stone-700 placeholder-stone-400 text-base"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-3 text-base">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-stone-50 text-stone-700 placeholder-stone-400 text-base"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="text-center mt-8">
            <p className="text-stone-500">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-sage-600 hover:text-sage-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;