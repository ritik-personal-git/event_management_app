import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated, authLoading } = useAuth();

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      toast.success('Logged in successfully!');
      // 🚫 NO navigate here anymore
    } catch (error) {
      toast.error('Invalid credentials');
      setLoading(false); // only reset on failure
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 shadow-2xl"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-full mb-4">
              <FaUser className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-white font-montserrat">
              Welcome Back!
            </h2>
            <p className="text-gray-300 mt-2">
              Login to manage your events
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading || authLoading}
                  placeholder="Enter your email"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading || authLoading}
                  placeholder="Enter your password"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400 disabled:opacity-60"
                />
              </div>
            </div>

            <motion.button
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={loading || authLoading}
              className="w-full btn-primary text-lg py-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {(loading || authLoading) && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading || authLoading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-400 hover:text-primary-300 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-gray-400 hover:text-white text-sm">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
