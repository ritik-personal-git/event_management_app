import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const MyRegistrations = () => {
  const { isAuthenticated, authLoading } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // =========================
  // Fetch User Registrations
  // =========================
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/my-registrations`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch registrations");
        }

        setRegistrations(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && isAuthenticated) {
      fetchRegistrations();
    }
  }, [API_URL, isAuthenticated, authLoading]);

  // =========================
  // Cancel Registration
  // =========================
  const handleCancel = async (id) => {
    try {
      setCancellingId(id);

      const res = await fetch(`${API_URL}/api/events/${id}/unregister`, {
        method:'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Cancellation failed");
      }

      setRegistrations((prev) =>
        prev.filter((reg) => reg._id !== id)
      );

      toast.success("Registration cancelled");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCancellingId(null);
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            My Registrations
          </h1>
          <p className="text-gray-300">
            View and manage your event registrations
          </p>
        </motion.div>

        {registrations.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center text-gray-300">
            You haven’t registered for any events yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {registrations.map((registration) => {
              const event = registration;

              return (
                <motion.div
                  key={registration._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl overflow-hidden"
                >
                  {/* Event Image */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-semibold text-white">
                      {event.title}
                    </h2>

                    <p className="text-gray-300 text-sm">
                      📍 {event.venue}
                    </p>

                    <p className="text-gray-300 text-sm">
                      📅 {new Date(event.date).toLocaleDateString()}
                    </p>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Status:
                      </span>
                      <span
  className={`font-medium ${
    registration.status === 'completed'
      ? 'text-red-400'
      : 'text-green-400'
  }`}
>
  {registration.status === 'completed'
    ? 'Completed'
    : 'Upcoming'}
</span>

                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Payment:
                      </span>
                      <span
                        className={`font-medium ${
                          registration.paymentStatus === "paid"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {registration.paymentStatus}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleCancel(registration._id)
                      }
                      disabled={cancellingId === registration._id}
                      className={`w-full mt-4 py-2 rounded-lg font-medium transition ${
                        cancellingId === registration._id
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {cancellingId === registration._id
                        ? "Cancelling..."
                        : "Cancel Registration"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;
