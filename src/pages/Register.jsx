import { useState ,useEffect} from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register,isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      setLoading(true);

      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
     
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
              Join EventHub
            </h2>
            <p className="text-gray-300 mt-2">
              Create an account to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white font-semibold mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Enter your name"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400 disabled:opacity-60"
                />
              </div>
            </div>

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
                  disabled={loading}
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
                  disabled={loading}
                  placeholder="Enter your password"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Confirm your password"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400 disabled:opacity-60"
                />
              </div>
            </div>

            <motion.button
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg py-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Back to Home */}
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

export default Register;
