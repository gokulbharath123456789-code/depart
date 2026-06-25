import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Leaf, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartCount = getCartCount();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-card border-0 shadow-2xl m-3 rounded-full md:rounded-2xl md:m-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg shadow-lg"
            >
              <Leaf className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-gradient hidden sm:inline">FreshMart</span>
          </Link>

          {/* Desktop Search */}
          <motion.form
            className="hidden md:flex flex-1 max-w-md mx-8"
            animate={isSearchFocused ? { scale: 1.05 } : { scale: 1 }}
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search fresh items..."
                className="input-premium w-full shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </motion.form>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'Categories', path: '/categories' },
              { label: 'Deals', path: '/deals' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-slate-600 hover:text-green-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Link to="/cart" className="relative group">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200"
              >
                <ShoppingCart className="w-6 h-6 text-slate-700" />
              </motion.button>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg glow-red"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Profile / Login */}
            {user ? (
              <ProfileDropdown />
            ) : (
              <Link
                to="/login"
                className="hidden md:flex premium-btn-primary px-4 py-2 text-sm"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/50 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/30"
            >
              <div className="py-6 space-y-3 px-4">
                {/* Mobile Search */}
                <form className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="input-premium w-full"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </form>

                {/* Mobile Nav Links */}
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Categories', path: '/categories' },
                  { label: 'Deals', path: '/deals' },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-slate-700 hover:bg-white/50 rounded-xl transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Login */}
                {!user && (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full premium-btn-primary flex items-center justify-center gap-2 font-semibold mt-6"
                  >
                    Login
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
