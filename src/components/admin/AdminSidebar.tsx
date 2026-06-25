import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Package, ShoppingBag, Settings, Leaf } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: BarChart3, path: '/admin', id: 'dashboard' },
    { label: 'Products', icon: Package, path: '/admin/products', id: 'products' },
    { label: 'Orders', icon: ShoppingBag, path: '/admin/orders', id: 'orders' },
    { label: 'Settings', icon: Settings, path: '/admin/settings', id: 'settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl"
    >
      <div className="p-6 border-b border-slate-700">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">FreshMart</span>
        </Link>
        <p className="text-sm text-slate-400 mt-2">Admin Panel</p>
      </div>

      <nav className="px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className="relative"
            >
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-2">Admin Mode Active</p>
          <p className="text-sm font-semibold text-green-400">Welcome back!</p>
        </div>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
