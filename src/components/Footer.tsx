import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', path: '/' },
        { label: 'Categories', path: '/categories' },
        { label: 'Deals', path: '/deals' },
        { label: 'About Us', path: '/about' },
      ],
    },
    {
      title: 'Categories',
      links: [
        { label: 'Fruits & Vegetables', path: '/category/fruits-vegetables' },
        { label: 'Dairy & Bakery', path: '/category/dairy-bakery' },
        { label: 'Snacks & Munchies', path: '/category/snacks-munchies' },
        { label: 'Beverages', path: '/category/cold-drinks-juices' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Refund Policy', path: '/refund' },
      ],
    },
  ];

  return (
    <footer className="gradient-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 blur-blob-lg bg-green-500 opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">FreshMart</span>
            </Link>
            <p className="text-slate-300 leading-relaxed text-sm">
              Premium fresh groceries delivered to your doorstep. Your trusted partner in quality food and essential supplies.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-md hover:bg-green-600 p-3 rounded-lg transition-all duration-300 glow-green"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="font-bold text-lg mb-6 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li
                    key={link.path}
                    whileHover={{ x: 4 }}
                    className="transition-all duration-200"
                  >
                    <Link
                      to={link.path}
                      className="text-slate-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-bold text-lg text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-slate-300 text-sm">123 Market Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">+91 1234567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">support@freshmart.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-6 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10"
            >
              <p className="text-sm text-slate-300 mb-3">Get exclusive deals</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-green-400 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg hover:shadow-lg hover:shadow-green-600/50 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm text-center md:text-left">
              &copy; 2025 FreshMart. All rights reserved. Built with premium design.
            </p>
            <div className="flex gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-slate-400 hover:text-green-400 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
