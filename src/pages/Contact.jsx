import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-montserrat" data-aos="fade-up">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 font-raleway" data-aos="fade-up" data-aos-delay="100">
            We'd love to hear from you. Send us a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8" data-aos="fade-right">
            <h2 className="text-2xl font-bold text-white mb-6 font-montserrat">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Message</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary"
              >
                Send Message
              </motion.button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8" data-aos="fade-left">
            {/* Contact Details */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-montserrat">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Address</h3>
                    <p className="text-gray-300">Mithibai College<br />Vile Parle<br />Mumbai</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-3 rounded-lg">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a href="mailto:mahabriarman@gmail.com" className="text-primary-400 hover:text-primary-300">
                      mahabriarman@gmail.com
                    </a>
                    <br />
                    <a href="mailto:mahabriarman+support@gmail.com" className="text-primary-400 hover:text-primary-300">
                      mahabriarman+support@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-3 rounded-lg">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <a href="tel:+919876543210" className="text-primary-400 hover:text-primary-300">
                    🤫+91 9529873656
                    </a>
                    <br />
                    <a href="tel:+919876543211" className="text-primary-400 hover:text-primary-300">
                    🤫+91 9529873656
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                     className="bg-white/10 p-3 rounded-lg hover:bg-blue-600 transition-colors">
                    <FaFacebook className="text-white text-xl" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                     className="bg-white/10 p-3 rounded-lg hover:bg-sky-500 transition-colors">
                    <FaTwitter className="text-white text-xl" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                     className="bg-white/10 p-3 rounded-lg hover:bg-pink-600 transition-colors">
                    <FaInstagram className="text-white text-xl" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                     className="bg-white/10 p-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <FaLinkedin className="text-white text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="glass rounded-2xl p-2 overflow-hidden">
            
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.108528382179!2d72.8348553751888!3d19.10289425112767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c856a7d54355%3A0xd8481ebbaccd8149!2sMithibai%20College%20of%20Arts%2C%20Chauhan%20Institute%20of%20Science%20and%20Amrutben%20Jivanlal%20College%20of%20Commerce%20and%20Economics!5e0!3m2!1sen!2sin!4v1771138795368!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Animation */}
            <div className="text-center">
              <lottie-player
                src="https://assets3.lottiefiles.com/packages/lf20_u25cckyh.json"
                background="transparent"
                speed="1"
                style={{ width: '200px', height: '200px', margin: '0 auto' }}
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
