import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import { FaSearch, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [registeringEventId, setRegisteringEventId] = useState(null);
  const { isAuthenticated } = useAuth();
const API_URL = import.meta.env.VITE_API_URL;



  // =========================
  // Fetch Events from Backend
  // =========================
  const fetchEvents = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API_URL}/api/events?search=${searchTerm}`
      );

      setEvents(data.data);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [searchTerm]);

  // =========================
  // Filter Category (Client)
  // =========================
  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((event) => event.category === selectedCategory);

  // =========================
  // Register Handler
  // =========================
  const handleRegister = async (eventId) => {
    try {
      if (!isAuthenticated) {
        toast.error('Please login to register');
        return;
      }
  
      setRegisteringEventId(eventId);
  
      const res = await fetch(
        `${API_URL}/api/events/${eventId}/register`,
        {
          method: 'POST',
          credentials: 'include', // 🔥 IMPORTANT (cookie auth)
        }
      );
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
  
      toast.success('Successfully registered!');
  
      await fetchEvents(); // refresh events
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRegisteringEventId(null);
    }
  };
  
  

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Discover Events
          </h1>
          <p className="text-xl text-gray-300">
            Find and join amazing events happening around you
          </p>
        </motion.div>

        {/* Search */}
        <div className="mb-8 glass rounded-2xl p-4">
          <div className="flex items-center space-x-4">
            <FaSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 glass rounded-2xl p-4">
          <div className="flex items-center space-x-4 mb-3">
            <FaFilter className="text-primary-400 text-xl" />
            <h3 className="text-white font-semibold">Filter by Category</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {['All', 'Technical', 'Cultural', 'Sports', 'Workshop'].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-300 mb-6">
          Found{' '}
          <span className="text-primary-400 font-bold">
            {filteredEvents.length}
          </span>{' '}
          events
        </p>

        {/* Loading */}
        {loading && (
          <div className="text-center text-white py-20">
            Loading events...
          </div>
        )}

        {/* Events Grid */}
        {!loading && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
              key={event._id}
              event={event}
              onRegister={handleRegister}
              isRegistering={registeringEventId === event._id}
            />
            
            ))}
          </div>
        )}

        {/* No Events */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            No events found
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
