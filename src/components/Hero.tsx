import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-24">
      {/* Animated blur blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="blur-blob-lg bg-green-400 top-20 right-10"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="blur-blob-lg bg-emerald-400 bottom-32 left-10"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="badge-primary inline-flex gap-2">
              <Zap className="w-4 h-4" />
              Instant Delivery Available
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-gradient-light">Fresh Grocery</span>
            <br />
            <span className="text-gradient">Delivered Fast</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 mb-8 leading-relaxed max-w-md"
          >
            Experience premium grocery shopping with 30-minute delivery, hand-picked fresh produce, and exclusive deals every day.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
            <Link
              to="/categories"
              className="premium-btn-primary inline-flex items-center gap-2 group"
            >
              Start Shopping
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
            <button className="premium-btn-secondary">
              Explore Categories
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-3 gap-6"
          >
            {[
              { value: '10M+', label: 'Orders' },
              { value: '2.5M+', label: 'Users' },
              { value: '30min', label: 'Delivery' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-96 md:h-full flex items-center justify-center"
        >
          {/* Main floating card */}
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 z-20"
          >
            <div className="glass-card p-8 w-80 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/6941705/pexels-photo-6941705.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fresh produce"
                className="rounded-2xl w-full h-64 object-cover mb-4"
              />
              <div>
                <p className="font-semibold text-slate-900">Organic Tomatoes</p>
                <p className="text-sm text-slate-600">Fresh & Juicy</p>
                <p className="text-2xl font-bold text-gradient mt-2">₹45</p>
              </div>
            </div>
          </motion.div>

          {/* Secondary floating card */}
          <motion.div
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-20 right-0 z-10"
          >
            <div className="glass-card p-6 w-72">
              <p className="text-sm text-slate-600 mb-2">Best Seller</p>
              <p className="font-semibold text-slate-900 mb-1">Banana Bunch</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-gradient">₹30</span>
                <span className="badge-discount">20% OFF</span>
              </div>
            </div>
          </motion.div>

          {/* Tertiary floating card */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute top-32 left-0 z-10"
          >
            <div className="glass-card p-6 w-64">
              <p className="font-semibold text-slate-900 mb-2">🥕 Fresh Carrots</p>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-slate-600">(2.5K)</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">Premium quality</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
