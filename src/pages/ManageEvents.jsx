import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaEdit,
  FaTrash,
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
  // Edit Event
  // =========================
  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  // =========================
  // Analytics Calculations
  // =========================
  const totalRevenue = events.reduce(
    (sum, event) =>
      sum +
      (event.price || 0) *
        (event.registeredUsers?.length || 0),
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

        {/* Loading */}
        {loading && (
          <div className="text-center text-white py-20">
            Loading events...
          </div>
        )}

        {!loading && (
          <>
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <StatCard
                icon={FaCalendarAlt}
                title="Total Events"
                value={events.length}
              />
              <StatCard
                icon={FaUsers}
                title="Total Registrations"
                value={totalRegistrations}
              />
              <StatCard
                icon={FaDollarSign}
                title="Total Revenue"
                value={`₹${totalRevenue.toLocaleString('en-IN')}`}
              />
              <StatCard
                icon={FaChartLine}
                title="Avg. Attendance"
                value={avgAttendance}
              />
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
                      <th className="py-4 px-4 text-left text-gray-300">
                        Event
                      </th>
                      <th className="py-4 px-4 text-left text-gray-300">
                        Date
                      </th>
                      <th className="py-4 px-4 text-left text-gray-300">
                        Venue
                      </th>
                      <th className="py-4 px-4 text-left text-gray-300">
                        Registrations
                      </th>
                      <th className="py-4 px-4 text-left text-gray-300">
                        Revenue
                      </th>
                      <th className="py-4 px-4 text-left text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.map((event) => (
                      <motion.tr
                        key={event._id}
                        whileHover={{
                          backgroundColor:
                            'rgba(255,255,255,0.05)',
                        }}
                        className="border-b border-white/10"
                      >
                        <td className="py-4 px-4 text-white">
                          {event.title}
                        </td>
                        <td className="py-4 px-4 text-gray-300">
                          {format(
                            new Date(event.date),
                            'PPP'
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-300">
                          {event.venue}
                        </td>
                        <td className="py-4 px-4 text-gray-300">
                          {event.registeredUsers?.length || 0}
                        </td>
                        <td className="py-4 px-4 text-green-400 font-semibold">
                          ₹
                          {(
                            (event.price || 0) *
                            (event.registeredUsers
                              ?.length || 0)
                          ).toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleEdit(event._id)
                              }
                              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(event._id)
                              }
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
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

// Simple Stat Card Component
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
