import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = ({ onComplete }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoal: '',
    injuries: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data
    console.log('Profile data:', formData);
    
    // Call onComplete if provided, otherwise navigate to dashboard
    if (onComplete) {
      onComplete(formData);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card">
          {/* Header */}
          <div className="mb-8">
            <h1 className="heading-display text-3xl text-sage-700 mb-3">
              Complete Your Profile
            </h1>
            <p className="text-stone-600 text-lg">
              Tell us about yourself to personalize your experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name and Age Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="25"
                  min="13"
                  max="120"
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="input-field appearance-none bg-white"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Height and Weight Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="175"
                  min="100"
                  max="250"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="70"
                  min="30"
                  max="300"
                  step="0.1"
                  required
                />
              </div>
            </div>

            {/* Fitness Goal */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Fitness Goal
              </label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleInputChange}
                className="input-field appearance-none bg-white"
                required
              >
                <option value="">Select your goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="weight-gain">Weight Gain</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="maintain-weight">Maintain Weight</option>
                <option value="improve-fitness">Improve Overall Fitness</option>
                <option value="increase-strength">Increase Strength</option>
                <option value="improve-endurance">Improve Endurance</option>
              </select>
            </div>

            {/* Injuries */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Injuries or Health Concerns (optional)
              </label>
              <textarea
                name="injuries"
                value={formData.injuries}
                onChange={handleInputChange}
                className="input-field min-h-[100px] resize-none"
                placeholder="e.g., knee injury, back pain (separate with commas)"
                rows="4"
              />
              <p className="text-stone-500 text-sm mt-2">
                This helps us suggest exercises that are safe for you
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="btn-primary w-full mt-8 py-4 text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Complete Profile
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;