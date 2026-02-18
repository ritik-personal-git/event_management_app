import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070)',
          filter: 'brightness(0.4)',
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-transparent to-blue-900/50" />
      
      {/* Content - Centered */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-montserrat">
            Create <span className="gradient-text">Unforgettable</span>
            <br />
            Events That Inspire
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-raleway">
            The ultimate platform for organizing, managing, and promoting events that leave lasting impressions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link to="/create-event">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <span>Create Event</span>
                <FaArrowRight />
              </motion.button>
            </Link>
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <FaPlay />
                <span>Explore Events</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
