import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaImage, FaTicketAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    price: '',
    date: '',
    time: '',
    venue: '',
    capacity: '',
    image: '',
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl font-semibold">
        Access Denied
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedDate = new Date(formData.date);
  
    if (selectedDate < new Date()) {
      toast.error('Cannot create event in the past');
      return;
    }
  
    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          capacity: Number(formData.capacity),
          price: Number(formData.price),
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create event');
      }
  
      toast.success('Event created successfully!');
      navigate('/events');
    } catch (err) {
      toast.error(err.message);
    }
  };
  

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto">

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6"
        >

          {/* Title */}
          <input
            type="text"
            name="title"
            required
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />

          {/* Description */}
          <textarea
            name="description"
            required
            rows="4"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          >
            <option value="Technical">Technical</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Workshop">Workshop</option>
          </select>

          {/* Price */}
          <div className="flex items-center">
            <FaTicketAlt className="mr-2 text-indigo-400" />
            <input
              type="number"
              name="price"
              required
              min="0"
              placeholder="Price (0 for Free)"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            />
          </div>

          {/* Date & Time */}
          <input
  type="date"
  name="date"
  required
  min={new Date().toISOString().split('T')[0]}
  value={formData.date}
  onChange={handleChange}
  className="w-full p-3 rounded-lg bg-white/20 text-white"
/>


          <input
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />

          {/* Venue */}
          <input
            type="text"
            name="venue"
            required
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />

          {/* Capacity */}
          <input
            type="number"
            name="capacity"
            required
            min="1"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />

          {/* Image */}
          <input
            type="url"
            name="image"
            required
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 py-3 rounded-xl text-white font-semibold"
          >
            Create Event
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateEvent;
