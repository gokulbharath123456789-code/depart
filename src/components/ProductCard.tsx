import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    image: string;
    rating: number;
    unit: string;
    inStock: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4 }}
      className="premium-card group overflow-hidden"
    >
      {/* Image Section */}
      <Link to={`/product/${product.id}`} className="block relative">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-4 left-4 badge-discount z-10"
          >
            {product.discount}% OFF
          </motion.div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md hover:bg-white rounded-full p-3 transition-all duration-300 shadow-lg"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-300 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'
            }`}
          />
        </motion.button>

        {/* Image Container */}
        <div className="relative w-full h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton animate-shimmer" />
          )}
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center"
          >
            <Link
              to={`/product/${product.id}`}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300 shadow-lg"
            >
              <Eye className="w-5 h-5" />
              Quick View
            </Link>
          </motion.div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-slate-900 text-lg line-clamp-2 group-hover:text-gradient transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-600 font-medium">({product.rating})</span>
        </div>

        {/* Unit */}
        <p className="text-sm text-slate-500">{product.unit}</p>

        {/* Price */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-2xl font-bold text-gradient">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-slate-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Section */}
        {quantity === 0 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="premium-btn-primary w-full flex items-center justify-center gap-2 mt-4"
          >
            <Plus className="w-5 h-5" />
            Add to Cart
          </motion.button>
        ) : (
          <div className="flex items-center gap-2 bg-green-50 rounded-xl p-2 mt-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDecrement}
              className="bg-white hover:bg-green-100 text-green-600 p-2 rounded-lg transition-all duration-200 flex-1"
            >
              <Minus className="w-5 h-5" />
            </motion.button>
            <span className="text-lg font-bold text-slate-900 min-w-[2rem] text-center">
              {quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleIncrement}
              className="bg-white hover:bg-green-100 text-green-600 p-2 rounded-lg transition-all duration-200 flex-1"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
