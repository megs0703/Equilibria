import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen zen-gradient relative overflow-hidden">
      {/* Greenery background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Leaf shapes */}
        <div className="absolute top-10 left-10 w-40 h-60 bg-sage-400/15 rounded-full transform rotate-45 blur-2xl"></div>
        <div className="absolute top-32 right-32 w-32 h-48 bg-forest-500/12 rounded-full transform -rotate-12 blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-48 h-32 bg-sage-300/18 rounded-full transform rotate-12 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-36 h-56 bg-forest-400/14 rounded-full transform -rotate-30 blur-xl"></div>
        
        {/* Branch-like elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-32 bg-sage-600/20 transform rotate-45 blur-sm"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-forest-700/15 transform -rotate-12 blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-28 bg-sage-500/18 transform rotate-30 blur-sm"></div>
        
        {/* Floating botanical elements */}
        <motion.div 
          className="absolute top-20 left-1/2 w-8 h-8 bg-sage-400/25 rounded-full"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-1/2 w-6 h-6 bg-forest-500/20 rounded-full"
          animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-20 w-4 h-4 bg-sage-300/30 rounded-full"
          animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Zen stones with greenery */}
        <div className="absolute top-20 right-20 w-32 h-20 bg-cream-100/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-16 w-24 h-16 bg-cream-100/8 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-12 bg-cream-100/6 rounded-full blur-md"></div>
        <div className="absolute bottom-20 right-1/4 w-20 h-14 bg-cream-100/5 rounded-full blur-lg"></div>
      </div>

      {/* Floating zen stones with greenery */}
      <motion.div 
        className="absolute bottom-20 right-20 hidden lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <div className="relative">
          {/* Small leaves around stones */}
          <div className="absolute -top-2 -left-2 w-6 h-10 bg-sage-400/30 rounded-full transform rotate-45 blur-sm"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-8 bg-forest-500/25 rounded-full transform -rotate-30 blur-sm"></div>
          
          {/* Zen stones */}
          <div className="w-24 h-14 bg-cream-100/20 rounded-full blur-sm shadow-2xl"></div>
          <div className="w-20 h-12 bg-cream-100/15 rounded-full blur-sm -mt-6 ml-3 shadow-xl"></div>
          <div className="w-16 h-10 bg-cream-100/12 rounded-full blur-sm -mt-4 ml-2 shadow-lg"></div>
          <div className="w-12 h-8 bg-cream-100/10 rounded-full blur-sm -mt-3 ml-2 shadow-md"></div>
        </div>
      </motion.div>
      
      {/* Floating leaf elements */}
      <motion.div 
        className="absolute top-1/4 left-10 hidden md:block"
        animate={{ rotate: [0, 10, -5, 0], y: [0, -5, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-12 h-20 bg-sage-400/20 rounded-full transform rotate-12 blur-sm"></div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-16 hidden md:block"
        animate={{ rotate: [0, -8, 6, 0], y: [0, 3, -4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-8 h-16 bg-forest-500/18 rounded-full transform -rotate-20 blur-sm"></div>
      </motion.div>

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="heading-display text-6xl md:text-8xl text-cream-100 mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Equilibria
          </motion.h1>
          
          <motion.p 
            className="subtitle text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Balance your fitness and nutrition journey with personalized guidance
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              onClick={() => navigate('/register')}
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 shadow-lg hover:shadow-xl text-lg min-w-[180px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button 
              onClick={() => navigate('/login')}
              className="border-2 border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-sage-700 font-medium py-4 px-8 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cream-200 focus:ring-offset-2 text-lg backdrop-blur-sm min-w-[180px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sage-800/20 to-transparent"></div>
    </div>
  );
};

export default Landing;