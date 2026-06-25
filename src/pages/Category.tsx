import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products.json';
import categories from '../data/categories.json';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = categories.find((cat) => cat.slug === slug);
  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 md:h-80 bg-gradient-to-br from-green-400 to-emerald-600 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-white/90">
              {categoryProducts.length} products available
            </p>
          </motion.div>
        </div>
      </motion.div>

      <ProductGrid products={categoryProducts} />
    </div>
  );
};

export default Category;
