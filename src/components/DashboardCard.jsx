import { motion } from 'framer-motion';

const DashboardCard = ({ icon: Icon, title, value, color, trend }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass rounded-2xl p-6 shadow-xl"
      data-aos="zoom-in"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
          {trend && (
            <p className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`p-4 rounded-full bg-gradient-to-br ${color}`}>
          <Icon className="text-white text-3xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
