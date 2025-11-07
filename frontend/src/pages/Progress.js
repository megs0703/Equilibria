import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/24/outline';
import ProgressChart from '../components/ProgressChart';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    bodyFat: '',
    mood: '',
    energyLevel: '',
    notes: ''
  });

  useEffect(() => {
    fetchProgressData();
    fetchAnalytics();
  }, []);

  const fetchProgressData = async () => {
    // Mock data for demo
    const mockData = [
      { date: '2024-01-01', weight: 70, bodyFat: 15 },
      { date: '2024-01-15', weight: 69.5, bodyFat: 14.5 },
      { date: '2024-02-01', weight: 69, bodyFat: 14 },
      { date: '2024-02-15', weight: 68.5, bodyFat: 13.5 },
    ];
    setProgressData(mockData);
  };

  const fetchAnalytics = async () => {
    // Mock analytics
    setAnalytics({
      weightTrend: { change: -1.5, percentage: -2.1, trend: 'decreasing' },
      bodyFatTrend: { change: -1.5, percentage: -10.0, trend: 'decreasing' },
      averageMood: 4.2,
      averageEnergy: 7.8,
      totalEntries: 12
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add progress entry logic
    setShowAddForm(false);
    setFormData({ weight: '', bodyFat: '', mood: '', energyLevel: '', notes: '' });
  };

  const TrendCard = ({ title, trend, icon: Icon }) => (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-neutral-700">{title}</h3>
        <Icon className={`w-5 h-5 ${trend?.trend === 'increasing' ? 'text-red-500' : 'text-green-500'}`} />
      </div>
      {trend ? (
        <div>
          <p className="text-2xl font-bold text-neutral-900">
            {trend.change > 0 ? '+' : ''}{trend.change}
          </p>
          <p className="text-sm text-neutral-600">
            {trend.percentage}% change
          </p>
        </div>
      ) : (
        <p className="text-neutral-500">No data available</p>
      )}
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold">Progress Tracking</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center justify-center text-sm sm:text-base"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="hidden sm:inline">Log Progress</span>
          <span className="sm:hidden">Log</span>
        </button>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <TrendCard
            title="Weight Change"
            trend={analytics.weightTrend}
            icon={analytics.weightTrend?.trend === 'increasing' ? TrendingUpIcon : TrendingDownIcon}
          />
          <TrendCard
            title="Body Fat Change"
            trend={analytics.bodyFatTrend}
            icon={analytics.bodyFatTrend?.trend === 'increasing' ? TrendingUpIcon : TrendingDownIcon}
          />
          <div className="card">
            <h3 className="font-medium text-neutral-700 mb-2">Average Mood</h3>
            <p className="text-2xl font-bold text-neutral-900">{analytics.averageMood}/5</p>
            <p className="text-sm text-neutral-600">Overall wellbeing</p>
          </div>
          <div className="card">
            <h3 className="font-medium text-neutral-700 mb-2">Energy Level</h3>
            <p className="text-2xl font-bold text-neutral-900">{analytics.averageEnergy}/10</p>
            <p className="text-sm text-neutral-600">Daily average</p>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="card">
          <ProgressChart
            data={progressData.map(item => ({ date: item.date, value: item.weight }))}
            title="Weight Progress (kg)"
            color="#3b82f6"
          />
        </div>
        <div className="card">
          <ProgressChart
            data={progressData.map(item => ({ date: item.date, value: item.bodyFat }))}
            title="Body Fat Progress (%)"
            color="#ef4444"
          />
        </div>
      </div>

      {/* Progress Log Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Log Progress</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className="input-field"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Body Fat (%)"
                  value={formData.bodyFat}
                  onChange={(e) => setFormData({...formData, bodyFat: e.target.value})}
                  className="input-field"
                />
              </div>
              
              <select
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
                className="input-field"
              >
                <option value="">Select mood</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="poor">Poor</option>
                <option value="terrible">Terrible</option>
              </select>

              <input
                type="number"
                min="1"
                max="10"
                placeholder="Energy Level (1-10)"
                value={formData.energyLevel}
                onChange={(e) => setFormData({...formData, energyLevel: e.target.value})}
                className="input-field"
              />

              <textarea
                placeholder="Notes (optional)"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="input-field"
                rows="3"
              />

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  Save Progress
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
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

export default Progress;