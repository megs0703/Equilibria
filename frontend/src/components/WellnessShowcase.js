import React from 'react';

const WellnessShowcase = () => {
  return (
    <div className="min-h-screen wellness-gradient p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="heading-display text-5xl md:text-6xl">
            Equilibria
          </h1>
          <p className="text-xl text-earth-600 font-light max-w-2xl mx-auto">
            Your wellness journey begins with balance, nurtured by nature's wisdom
          </p>
        </div>

        {/* Typography Showcase */}
        <div className="card">
          <h2 className="heading-display text-3xl mb-6">Typography & Colors</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-wellness">Playfair Display Headings</h3>
              <h1 className="text-4xl">Heading 1</h1>
              <h2 className="text-3xl">Heading 2</h2>
              <h3 className="text-2xl">Heading 3</h3>
              <p className="text-earth-600">Inter body text for readability and modern feel</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sage-500 rounded-full"></div>
                <span className="text-wellness">Sage Green</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-forest-600 rounded-full"></div>
                <span className="text-wellness">Forest Green</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-terracotta-500 rounded-full"></div>
                <span className="text-accent">Terracotta</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-clay-500 rounded-full"></div>
                <span className="text-accent">Clay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Button Showcase */}
        <div className="card">
          <h2 className="heading-display text-3xl mb-6">Buttons & Components</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="btn-primary">Primary Action</button>
            <button className="btn-secondary">Secondary Action</button>
            <button className="btn-outline">Outline Button</button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-wellness font-medium">Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-wellness font-medium">Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter your name"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-16 h-16 accent-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">🏃</span>
            </div>
            <h3 className="heading-display text-xl mb-3">Personalized Workouts</h3>
            <p className="text-earth-600">AI-powered exercise recommendations tailored to your goals and preferences</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-sage-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">🥗</span>
            </div>
            <h3 className="heading-display text-xl mb-3">Nutrition Tracking</h3>
            <p className="text-earth-600">Smart meal logging with macro tracking and personalized recommendations</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-forest-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">📊</span>
            </div>
            <h3 className="heading-display text-xl mb-3">Progress Analytics</h3>
            <p className="text-earth-600">Comprehensive tracking with insights to keep you motivated</p>
          </div>
        </div>

        {/* Gradient Showcase */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="wellness-gradient p-8 rounded-2xl">
            <h3 className="heading-display text-2xl mb-4">Wellness Gradient</h3>
            <p className="text-earth-700">Soft, natural background that promotes calm and focus</p>
          </div>
          <div className="accent-gradient p-8 rounded-2xl text-white">
            <h3 className="font-display text-2xl mb-4">Accent Gradient</h3>
            <p className="text-white/90">Warm terracotta tones for highlights and call-to-action elements</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WellnessShowcase;