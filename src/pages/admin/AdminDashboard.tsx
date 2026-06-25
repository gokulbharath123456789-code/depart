import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Package, Users, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import products from '../../data/products.json';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }

    const orders = JSON.parse(localStorage.getItem('all_orders') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalUsers: users.length + 1,
      totalRevenue,
    });
  }, [user?.isAdmin, navigate]);

  if (!user?.isAdmin) {
    return null;
  }

  const statCards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Total Revenue',
      value: `₹${stats.totalRevenue}`,
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <div className="flex-1">
        <div className="bg-white shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Exit Admin
          </button>
        </div>

        <div className="p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/admin/products')}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4 hover:border-blue-300 transition-colors text-left"
              >
                <p className="font-semibold text-blue-900">Manage Products</p>
                <p className="text-sm text-blue-700">Add, edit, or delete products</p>
              </button>
              <button
                onClick={() => navigate('/admin/orders')}
                className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4 hover:border-green-300 transition-colors text-left"
              >
                <p className="font-semibold text-green-900">Manage Orders</p>
                <p className="text-sm text-green-700">View and update orders</p>
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-4 hover:border-purple-300 transition-colors text-left"
              >
                <p className="font-semibold text-purple-900">View Store</p>
                <p className="text-sm text-purple-700">Visit the main store</p>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
