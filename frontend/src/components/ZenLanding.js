import React from 'react';
import { motion } from 'framer-motion';

const ZenLanding = () => {
  return (
    <div className="hero-section">
      {/* Subtle background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-cream-100/20 blur-xl"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 rounded-full bg-cream-100/15 blur-lg"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-cream-100/10 blur-md"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        
        {/* Main heading */}
        <motion.h1 
          className="heading-display text-6xl md:text-7xl lg:text-8xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Equilibria
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="subtitle text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Balance your fitness and nutrition journey with personalized guidance
        </motion.p>

        {/* Action buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button className="btn-primary min-w-[160px]">
            Get Started
          </button>
          <button className="btn-secondary min-w-[160px]">
            Sign In
          </button>
        </motion.div>

        {/* Zen stones visual element (CSS-only) */}
        <motion.div 
          className="absolute bottom-20 right-20 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Bottom stone */}
            <div className="w-20 h-12 bg-cream-100/30 rounded-full blur-sm"></div>
            {/* Middle stone */}
            <div className="w-16 h-10 bg-cream-100/25 rounded-full blur-sm -mt-4 ml-2"></div>
            {/* Top stone */}
            <div className="w-12 h-8 bg-cream-100/20 rounded-full blur-sm -mt-3 ml-2"></div>
          </div>
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sage-800/20 to-transparent"></div>
    </div>
  );
};

export default ZenLanding;