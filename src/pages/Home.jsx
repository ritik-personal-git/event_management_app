import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import { FaRocket, FaChartLine, FaUsers, FaBullhorn } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';


const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const { isAuthenticated } = useAuth();
  const [registeringEventId, setRegisteringEventId] = useState(null);
  
  
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
          credentials: 'include',
        }
      );
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
  
      toast.success('Successfully registered!');
  
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRegisteringEventId(null);
    }
  };
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events`);
        
        
        const events = response.data.data; // <-- FIX HERE
  
        const now = new Date();
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);
  
        const upcomingEvents = events
          .filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate >= now && eventDate <= next7Days;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
  
        setFeaturedEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  


  const features = [
    {
      icon: FaRocket,
      title: 'Easy Event Creation',
      description:
        'Create stunning events in minutes with our intuitive interface',
    },
    {
      icon: FaChartLine,
      title: 'Real-time Analytics',
      description:
        'Track registrations, engagement, and revenue in real-time',
    },
    {
      icon: FaUsers,
      title: 'Attendee Management',
      description:
        'Manage attendees, tickets, and check-ins effortlessly',
    },
    {
      icon: FaBullhorn,
      title: 'Powerful Promotion',
      description:
        'Reach your audience with integrated marketing tools',
    },
  ];

  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
              Why Choose EventHub?
            </h2>
            <p className="text-xl text-gray-300 font-raleway">
              Everything you need to create memorable events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="bg-gradient-to-br from-primary-600 to-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-montserrat">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
              Upcoming This Week
            </h2>
            <p className="text-xl text-gray-300 font-raleway">
              Don’t miss these exciting events
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-300">Loading events...</div>
          ) : featuredEvents.length === 0 ? (
            <div className="text-center text-gray-400">
              No events scheduled for this week.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredEvents.map((event) => (
               <EventCard
               key={event._id}
               event={event}
               onRegister={handleRegister}
               isRegistering={registeringEventId === event._id}
             />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                View All Events
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Ready to Create Your Event?
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-raleway">
              Join thousands of organizers who trust EventHub
            </p>
            <Link to="/create-event">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
