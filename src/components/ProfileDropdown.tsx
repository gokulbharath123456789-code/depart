import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, History, LogOut, Shield as ShieldAdmin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold flex items-center justify-center hover:shadow-lg transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {initials}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30"
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl z-40 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-green-100 text-sm">{user.email}</p>
              </div>

              <div className="p-2 space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Profile</span>
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <History className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Order History</span>
                </Link>

                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border-t border-gray-200"
                  >
                    <ShieldAdmin className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Admin Panel</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors border-t border-gray-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
