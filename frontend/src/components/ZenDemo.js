import React from 'react';
import ZenLanding from './ZenLanding';

const ZenDemo = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ZenLanding />
      
      {/* Content Section with Cards */}
      <div className="bg-cream-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-display text-4xl text-sage-700 mb-4">
              Find Your Balance
            </h2>
            <p className="subtitle text-stone-600 text-lg max-w-2xl mx-auto">
              Discover personalized wellness solutions designed for your unique journey
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card text-center">
              <div className="w-16 h-16 bg-sage-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-cream-100 text-2xl">🧘</span>
              </div>
              <h3 className="heading-display text-xl text-sage-700 mb-4">Mindful Movement</h3>
              <p className="text-stone-600 leading-relaxed">
                Personalized workout plans that honor your body's needs and limitations
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-terracotta-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-cream-100 text-2xl">🌱</span>
              </div>
              <h3 className="heading-display text-xl text-sage-700 mb-4">Nourishing Nutrition</h3>
              <p className="text-stone-600 leading-relaxed">
                Gentle guidance for sustainable eating habits that fuel your wellness
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-sage-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-cream-100 text-2xl">📊</span>
              </div>
              <h3 className="heading-display text-xl text-sage-700 mb-4">Peaceful Progress</h3>
              <p className="text-stone-600 leading-relaxed">
                Track your journey with compassionate insights and gentle accountability
              </p>
            </div>
          </div>

          {/* Demo Form */}
          <div className="max-w-md mx-auto">
            <div className="card">
              <h3 className="heading-display text-2xl text-sage-700 mb-6 text-center">
                Begin Your Journey
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-stone-700 font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="input-field" 
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter your name"
                  />
                </div>
                <button className="btn-primary w-full mt-6">
                  Start Your Wellness Journey
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ZenDemo;