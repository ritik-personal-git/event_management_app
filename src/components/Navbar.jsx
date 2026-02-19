import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaCalendarAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = user?.role === 'admin';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
  
    // Admin Only
    ...(isAdmin
      ? [
          { name: 'Create Event', path: '/create-event' },
          { name: 'Manage Events', path: '/manage-events' },
        ]
      : []),
  
    // Normal User Only
    ...(!isAdmin && isAuthenticated
      ? [{ name: 'Your Registrations', path: '/my-registrations' }]
      : []),
  
    { name: 'Promotion', path: '/promotion' },
    { name: 'Contact', path: '/contact' },
  ];
  

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
    setShowProfileMenu(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold font-montserrat text-white">
              Mithi<span className="text-primary-400">Verse</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* User Profile or Login */}
            {isAuthenticated ? (
              <div className="relative ml-4">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:scale-105 transition-transform"
                >
                  <FaUser />
                  <span>{user?.name || 'User'}</span>
                </button>
                
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 glass-dark rounded-lg shadow-xl overflow-hidden"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === '/login'
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-dark"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile User Profile or Login */}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 text-white font-semibold flex items-center space-x-2">
                  <FaUser />
                  <span>{user?.name || 'User'}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  location.pathname === '/login'
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
