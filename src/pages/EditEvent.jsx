import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, authLoading } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    capacity: '',
    price: '',
    category: 'Technical',
    image: '',
  });

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
  // Fetch Event By ID
  // =========================
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/${id}`, {
          credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch event');
        }

        const event = data.data;

        setFormData({
          title: event.title || '',
          description: event.description || '',
          date: event.date
            ? event.date.substring(0, 10)
            : '',
          venue: event.venue || '',
          capacity: event.capacity || '',
          price: event.price || 0,
          category: event.category || 'Technical',
          image: event.image || '',
        });
      } catch (error) {
        toast.error(error.message);
        navigate('/manage-events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, API_URL, navigate]);

  // =========================
  // Handle Input Change
  // =========================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // Handle Update
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          capacity: Number(formData.capacity),
          price: Number(formData.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Update failed');
      }

      toast.success('Event updated successfully');
      navigate('/manage-events');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Edit Event
          </h1>
          <p className="text-gray-300">
            Update event details below
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {/* Title */}
          <InputField
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full bg-white/10 text-white p-3 rounded-lg focus:outline-none"
            />
          </div>

          {/* Date */}
          <InputField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          {/* Venue */}
          <InputField
            label="Venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />

          {/* Capacity */}
          <InputField
            label="Capacity"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />

          {/* Price */}
          <InputField
            label="Price (₹)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          {/* Category */}
          <div>
            <label className="block text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-white/10 text-white p-3 rounded-lg focus:outline-none"
            >
              <option>Technical</option>
              <option>Cultural</option>
              <option>Sports</option>
              <option>Workshop</option>
            </select>
          </div>

          {/* Image URL */}
          <InputField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={updating}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              updating
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:scale-105'
            }`}
          >
            {updating ? 'Updating...' : 'Update Event'}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full bg-white/10 text-white p-3 rounded-lg focus:outline-none"
    />
  </div>
);

export default EditEvent;
