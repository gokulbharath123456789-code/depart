import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { cart, addToCart, updateQuantity } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
                  {product.discount}% OFF
                </div>
              )}
              <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 fill-green-600 text-green-600" />
                  <span className="font-semibold text-green-700">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-600">(128 reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <span className="text-gray-600 font-medium">Unit: </span>
                <span className="text-gray-900 font-semibold">{product.unit}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  {quantity > 0 && (
                    <>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDecrement}
                        className="bg-green-100 hover:bg-green-200 text-green-600 p-3 rounded-xl transition-colors"
                      >
                        <Minus className="w-6 h-6" />
                      </motion.button>
                      <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                    </>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={quantity > 0 ? handleIncrement : handleAddToCart}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center gap-2"
                  >
                    {quantity > 0 ? (
                      <Plus className="w-6 h-6" />
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-3 mb-8">
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:text-green-600 transition-colors">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:text-green-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-lg mb-3">Product Details</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Fresh and high-quality product</li>
                  <li>Carefully sourced from trusted vendors</li>
                  <li>Delivered fresh to your doorstep</li>
                  <li>100% quality guaranteed</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
