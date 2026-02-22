import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaShare,
  FaEye,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const Promotion = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [emailList, setEmailList] = useState('');
  const [loading, setLoading] = useState(true);
  const API_URL=import.meta.env.VITE_API_URL;
  const BASE_URL =
    import.meta.env.VITE_FRONTEND_URL || window.location.origin;

  // =========================
  // Fetch Real Events
  // =========================
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events`);
        const data=response?.data?.data || [];
        setEvents(data);

        if (data.length > 0) {
          setSelectedEvent(data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // =========================
  // Selected Event Data
  // =========================
  const selectedEventData = useMemo(() => {
    return events.find((e) => e._id === selectedEvent);
  }, [selectedEvent, events]);

  const eventLink = selectedEvent
    ? `${BASE_URL}/events/${selectedEvent}`
    : '';

  // =========================
  // Social Share
  // =========================
  const shareOnSocial = (platform) => {
    if (!selectedEventData) return;

    const encodedUrl = encodeURIComponent(eventLink);
    const encodedText = encodeURIComponent(
      `Join me at ${selectedEventData.title}!`
    );

    let shareUrl = '';

    switch (platform) {
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'Twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'LinkedIn':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'Instagram':
        toast('Instagram sharing must be done manually from mobile.');
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  // =========================
  // Copy Link
  // =========================
  const copyLink = () => {
    if (!eventLink) return;

    navigator.clipboard.writeText(eventLink);
    toast.success('Event link copied!');
  };

  // =========================
  // Email Invites (Frontend Validation)
  // =========================
  const sendEmailInvites = (e) => {
    e.preventDefault();

    if (!selectedEventData) {
      toast.error('Please select an event');
      return;
    }

    const emails = emailList
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    const invalidEmails = emails.filter(
      (email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );

    if (emails.length === 0) {
      toast.error('Please enter at least one email');
      return;
    }

    if (invalidEmails.length > 0) {
      toast.error('Some email addresses are invalid');
      return;
    }

    // 🔥 Later connect to backend API
    toast.success(`Invitations prepared for ${emails.length} recipients!`);
    setEmailList('');
  };

  // =========================
  // Loading / Empty States
  // =========================
  if (loading) {
    return (
      <div className="text-white text-center pt-40">
        Loading events...
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-white text-center pt-40">
        No events available to promote.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Promote Your Event
          </h1>
          <p className="text-xl text-gray-300">
            Boost visibility and increase registrations
          </p>
        </motion.div>

        {/* Event Selector */}
        <div className="glass rounded-2xl p-6 mb-8">
          <label className="block text-white font-semibold mb-4">
            Select Event
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3"
          >
            {events.map((event) => (
              <option
                key={event._id}
                value={event._id}
                className="bg-slate-800"
              >
                {event.title}
              </option>
            ))}
          </select>
        </div>

        {/* Analytics (Placeholder for now) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass rounded-xl p-6 text-center">
            <FaEye className="mx-auto text-primary-400 text-2xl mb-2" />
            <h3 className="text-white text-xl font-bold">—</h3>
            <p className="text-gray-400 text-sm">Event Views</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <FaUsers className="mx-auto text-primary-400 text-2xl mb-2" />
            <h3 className="text-white text-xl font-bold">—</h3>
            <p className="text-gray-400 text-sm">Registrations</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <FaChartLine className="mx-auto text-primary-400 text-2xl mb-2" />
            <h3 className="text-white text-xl font-bold">—</h3>
            <p className="text-gray-400 text-sm">Conversion Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Social Share */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <FaShare className="text-primary-400 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-white">Social Media</h2>
            </div>

            <div className="space-y-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map(
                (platform) => (
                  <motion.button
                    key={platform}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => shareOnSocial(platform)}
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-lg font-semibold"
                  >
                    Share on {platform}
                  </motion.button>
                )
              )}
            </div>

            {/* Copy Link */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-4">
                {eventLink}
              </span>
              <button
                onClick={copyLink}
                className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-white"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Email Invites */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <FaEnvelope className="text-primary-400 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-white">Email Invites</h2>
            </div>

            <form onSubmit={sendEmailInvites} className="space-y-4">
              <textarea
                value={emailList}
                onChange={(e) => setEmailList(e.target.value)}
                placeholder="Enter comma separated emails"
                rows="6"
                className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary"
              >
                Send Invitations
              </motion.button>
            </form>

            {selectedEventData && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Email Preview</p>
                <p className="text-white font-semibold text-sm">
                  Subject: You're invited to {selectedEventData.title}!
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Includes event details and direct registration link.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Promotion;
