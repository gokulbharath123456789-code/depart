import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import ProductCard from './ProductCard';
import products from '../data/products.json';

const FlashDeals = () => {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Flash Deals
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Limited time offers
              </p>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm md:text-base"
          >
            Ending Soon!
          </motion.div>
        </motion.div>

        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 min-w-max lg:min-w-0 lg:grid lg:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-72 lg:w-auto"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none lg:hidden" />
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
