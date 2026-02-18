import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaTicketAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const EventCard = ({ event, onRegister, isRegistering }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image || 'https://via.placeholder.com/400'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 text-white">
        <h3 className="text-2xl font-bold mb-3">
          {event.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300">
            <FaCalendar className="mr-3 text-primary-400" />
            <span>{format(new Date(event.date), 'PPP')}</span>
          </div>

          <div className="flex items-center text-gray-300">
            <FaMapMarkerAlt className="mr-3 text-primary-400" />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center text-gray-300">
            <FaUsers className="mr-3 text-primary-400" />
            <span>
              {event.registeredUsers?.length || 0} / {event.capacity} Attendees
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaTicketAlt className="text-primary-400 mr-2" />
            <span className="text-2xl font-bold text-primary-400">
              {event.price === 0 ? 'Free' : `₹${event.price}`}
            </span>
          </div>

          <button
            disabled={isRegistering}
            onClick={() => onRegister(event._id)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
              isRegistering
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:scale-105'
            }`}
          >
            {isRegistering ? 'Registering...' : 'Register'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
