import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import categories from '../data/categories.json';

const CategoryGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 blur-blob-lg bg-green-300 opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-block mb-4">
            <span className="badge-primary">EXPLORE</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-light">Shop by</span>{' '}
            <span className="text-gradient">Category</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our curated collection of fresh, premium products organized by category
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link to={`/category/${category.slug}`} className="group block h-full">
                <motion.div
                  whileHover={{ y: -12, scale: 1.05 }}
                  className="premium-card-hover overflow-hidden h-full flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-full text-xs font-semibold"
                    >
                      {Math.floor(Math.random() * 20) + 10} products
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h3 className="font-semibold text-slate-900 text-lg md:text-xl group-hover:text-gradient transition-colors duration-300 line-clamp-2">
                      {category.name}
                    </h3>

                    {/* Arrow Icon */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-green-600 font-semibold mt-4 group-hover:text-green-700 transition-colors"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-slate-600 mb-6">Can't find what you're looking for?</p>
          <Link to="/categories" className="premium-btn-primary inline-flex items-center gap-2">
            View All Categories
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;
