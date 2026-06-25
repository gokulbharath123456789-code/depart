import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, CreditCard as Edit2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import products from '../../data/products.json';

const ManageProducts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allProducts] = useState(products);

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />

      <div className="flex-1">
        <div className="bg-white shadow-sm sticky top-0 z-10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">Manage Products</h1>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        <div className="p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.02)' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <span className="font-medium text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{product.category}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">₹{product.price}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          In Stock
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
