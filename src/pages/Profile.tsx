import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, ArrowLeft, CreditCard as Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your profile</p>
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-32" />

            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-8">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
                  {initials}
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  {user.isAdmin && (
                    <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                      Administrator
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Account Information</h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <User className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="text-lg font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="text-lg font-medium text-gray-900">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-blue-700 text-sm">
                    This is a demo profile page. In a real application, you could edit your information here.
                  </p>
                </div>

                <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/orders"
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <p className="font-semibold text-blue-900">Order History</p>
                <p className="text-sm text-blue-700">View your past orders</p>
              </Link>
              <Link
                to="/cart"
                className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <p className="font-semibold text-green-900">Shopping Cart</p>
                <p className="text-sm text-green-700">Continue shopping</p>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
