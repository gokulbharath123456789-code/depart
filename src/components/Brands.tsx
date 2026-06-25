import { motion } from 'framer-motion';

const brands = [
  {
    id: 1,
    name: 'Daawat',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    id: 2,
    name: 'Tata',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 3,
    name: 'Aashirvaad',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    id: 4,
    name: 'Amul',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    id: 5,
    name: 'Britannia',
    gradient: 'from-red-400 to-pink-600',
  },
  {
    id: 6,
    name: 'Nestle',
    gradient: 'from-purple-400 to-indigo-600',
  },
];

const Brands = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Brands
          </h2>
          <p className="text-gray-600 text-lg">
            Shop from your favorite trusted brands
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${brand.gradient} rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-center justify-center h-20 md:h-24">
                <h3 className="text-white font-bold text-xl md:text-2xl text-center">
                  {brand.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
