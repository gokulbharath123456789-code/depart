import { motion } from 'framer-motion';
import { Truck, Leaf, Shield, Clock } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your orders delivered in 15 minutes',
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    id: 2,
    icon: Leaf,
    title: 'Fresh Products',
    description: '100% fresh and organic products',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
  },
  {
    id: 3,
    icon: Shield,
    title: 'Secure Payments',
    description: 'Multiple secure payment options',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    id: 4,
    icon: Clock,
    title: '24/7 Support',
    description: 'Round the clock customer support',
    color: 'text-orange-600',
    bg: 'bg-orange-100',
  },
];

const TrustSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg">
            We provide the best shopping experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`${feature.bg} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
