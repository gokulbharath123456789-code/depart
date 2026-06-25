import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Calendar, DollarSign, ArrowLeft, Truck, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'delivered' | 'processing' | 'shipped';
}

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem(`orders_${user?.id}`) || '[]';
    setOrders(JSON.parse(storedOrders));
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your orders</p>
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Delivered
          </span>
        );
      case 'shipped':
        return (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Truck className="w-4 h-4" />
            Shipped
          </span>
        );
      default:
        return (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
            Processing
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">
            {orders.length === 0
              ? 'No orders yet'
              : `You have ${orders.length} order${orders.length !== 1 ? 's' : ''}`}
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-12 text-center"
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              Start shopping and place your first order!
            </p>
            <Link
              to="/"
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Order #{order.id}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        ₹{order.total}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-green-600">₹{order.total}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
