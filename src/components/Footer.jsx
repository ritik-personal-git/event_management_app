import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCalendarAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="glass-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
              <span className="text-2xl font-bold font-montserrat">
                Event<span className="text-primary-400">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Creating unforgettable experiences through seamless event management and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-montserrat">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors">Browse Events</Link></li>
              <li><Link to="/create-event" className="text-gray-400 hover:text-primary-400 transition-colors">Create Event</Link></li>
              <li><Link to="/manage-events" className="text-gray-400 hover:text-primary-400 transition-colors">Manage Events</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-montserrat">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Event Planning Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-montserrat">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Mithibai college , Vile Parle , Mumbai</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <a href="mailto:mahabriarman@gmail.com" className="text-gray-400 text-sm hover:text-primary-400">mahabriarman@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 text-sm hover:text-primary-400">🤫+91 9529873656</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
