import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaUserMinus,
} from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ManageEvents = () => {
  const { user, isAuthenticated, authLoading } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState(null);

  // =========================
  // Protect Route (Admin Only)
  // =========================
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        toast.error('Access denied');
        navigate('/');
      }
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  // =========================
  // Fetch All Events
  // =========================
  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/events`, {
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch events');
      }

      setEvents(data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // =========================
  // Delete Event
  // =========================
  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?'))
      return;

    try {
      const res = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Delete failed');
      }

      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // Remove User Registration (ADMIN)
  // =========================
  const handleRemoveUser = async (eventId, userId) => {
    if (!window.confirm('Remove this participant from event?')) return;

    try {
      const res = await fetch(
        `${API_URL}/api/events/${eventId}/unregister/${userId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to remove user');
      }

      toast.success('Participant removed');
      fetchEvents();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // Edit Event
  // =========================
  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  // =========================
  // Analytics
  // =========================
  const totalRevenue = events.reduce(
    (sum, event) =>
      sum +
      (event.price || 0) * (event.registeredUsers?.length || 0),
    0
  );

  const totalRegistrations = events.reduce(
    (sum, event) => sum + (event.registeredUsers?.length || 0),
    0
  );

  const avgAttendance =
    events.length > 0
      ? Math.round(totalRegistrations / events.length)
      : 0;

  if (authLoading) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Manage Events
          </h1>
          <p className="text-xl text-gray-300">
            Track and manage all your events
          </p>
        </motion.div>

        {loading && (
          <div className="text-center text-white py-20">
            Loading events...
          </div>
        )}

        {!loading && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <StatCard icon={FaCalendarAlt} title="Total Events" value={events.length} />
              <StatCard icon={FaUsers} title="Total Registrations" value={totalRegistrations} />
              <StatCard icon={FaDollarSign} title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} />
              <StatCard icon={FaChartLine} title="Avg. Attendance" value={avgAttendance} />
            </div>

            {/* Events Table */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                All Events
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-4 px-4 text-left text-gray-300">Event</th>
                      <th className="py-4 px-4 text-left text-gray-300">Date</th>
                      <th className="py-4 px-4 text-left text-gray-300">Venue</th>
                      <th className="py-4 px-4 text-left text-gray-300">Registrations</th>
                      <th className="py-4 px-4 text-left text-gray-300">Status</th>
                      <th className="py-4 px-4 text-left text-gray-300">Revenue</th>
                      <th className="py-4 px-4 text-left text-gray-300">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.map((event) => (
                      <>
                        {/* Main Row */}
                        <motion.tr
                          key={event._id}
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                          className="border-b border-white/10"
                        >
                          <td className="py-4 px-4 text-white">
                            <button
                              onClick={() =>
                                setExpandedEvent(
                                  expandedEvent === event._id ? null : event._id
                                )
                              }
                              className="flex items-center space-x-2"
                            >
                              <span>{event.title}</span>
                              {expandedEvent === event._id ? (
                                <FaChevronUp size={12} />
                              ) : (
                                <FaChevronDown size={12} />
                              )}
                            </button>
                          </td>

                          <td className="py-4 px-4 text-gray-300">
                            {format(new Date(event.date), 'PPP')}
                          </td>

                          <td className="py-4 px-4 text-gray-300">
                            {event.venue}
                          </td>

                          <td className="py-4 px-4 text-gray-300">
                            {event.registeredUsers?.length || 0}
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                event.status === 'completed'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-green-600 text-white'
                              }`}
                            >
                              {event.status === 'completed'
                                ? 'Completed'
                                : 'Upcoming'}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-green-400 font-semibold">
                            ₹
                            {(
                              (event.price || 0) *
                              (event.registeredUsers?.length || 0)
                            ).toLocaleString('en-IN')}
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(event._id)}
                                className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
                              >
                                <FaEdit />
                              </button>

                              <button
                                onClick={() => handleDelete(event._id)}
                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </motion.tr>

                        {/* Expandable Participants Section */}
                        <AnimatePresence>
                          {expandedEvent === event._id && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <td colSpan="7" className="bg-white/5 p-6">
                                <h3 className="text-white font-semibold mb-4">
                                  Participants
                                </h3>

                                {event.registeredUsers?.length === 0 ? (
                                  <p className="text-gray-400">
                                    No participants yet.
                                  </p>
                                ) : (
                                  <div className="space-y-3">
                                    {event.registeredUsers.map((user) => (
                                      <div
                                        key={user._id}
                                        className="flex justify-between items-center bg-white/10 p-3 rounded-lg"
                                      >
                                        <div>
                                          <p className="text-white font-medium">
                                            {user.name}
                                          </p>
                                          <p className="text-gray-400 text-sm">
                                            {user.email}
                                          </p>
                                        </div>

                                        <button
                                          onClick={() =>
                                            handleRemoveUser(event._id, user._id)
                                          }
                                          className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/30"
                                        >
                                          <FaUserMinus />
                                          <span>Remove</span>
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </>
                    ))}
                  </tbody>
                </table>

                {events.length === 0 && (
                  <div className="text-center text-gray-400 py-12">
                    No events found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="glass rounded-2xl p-6 text-white">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-primary-600 rounded-lg">
        <Icon />
      </div>
      <div>
        <p className="text-gray-300 text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </div>
);

export default ManageEvents;