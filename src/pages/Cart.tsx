import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const total = getCartTotal();
  const deliveryFee = total > 0 ? (total > 500 ? 0 : 40) : 0;
  const finalTotal = total + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gray-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <Link
            to="/"
            className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors inline-flex items-center gap-2 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link
            to="/"
            className="text-gray-600 hover:text-green-600 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl shadow-md p-6 flex gap-6"
                >
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4">{item.unit}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-lg transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </motion.button>
                        <span className="text-xl font-bold text-gray-800 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </motion.button>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="w-full text-red-600 hover:text-red-700 font-semibold py-3 rounded-xl border-2 border-red-200 hover:border-red-300 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold text-gray-900">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {total > 0 && total < 500 && (
                  <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    Add ₹{500 - total} more for free delivery
                  </p>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-green-600">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-600 text-white font-semibold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
              >
                Proceed to Checkout
              </motion.button>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span>Easy returns within 7 days</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
