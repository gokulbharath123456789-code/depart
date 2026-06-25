import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'processing' | 'shipped';
  items: any[];
}

const ManageOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
    const storedOrders = localStorage.getItem('all_orders') || '[]';
    setOrders(JSON.parse(storedOrders));
  }, [user?.isAdmin, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />

      <div className="flex-1">
        <div className="bg-white shadow-sm sticky top-0 z-10 p-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Manage Orders</h1>
        </div>

        <div className="p-6 md:p-8">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md p-12 text-center"
            >
              <p className="text-slate-600 text-lg">No orders yet</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Items</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {orders.map((order) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.02)' }}
                        className="transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-900">#{order.id.slice(0, 8)}</td>
                        <td className="px-6 py-4 text-slate-600">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-slate-600">{order.items?.length || 0} items</td>
                        <td className="px-6 py-4 font-semibold text-slate-900">₹{order.total}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
