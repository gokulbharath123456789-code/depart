import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, AlertCircle, Check, Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Background blobs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="blur-blob-lg bg-green-400 top-10 left-0 opacity-20"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="blur-blob-lg bg-emerald-400 bottom-20 right-0 opacity-20"
      />

      <div className="relative max-w-md mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <motion.div
                whileHover={{ rotate: 12 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg shadow-lg"
              >
                <Leaf className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold text-gradient">FreshMart</span>
            </Link>
          </motion.div>

          {/* Card */}
          <motion.div variants={itemVariants} className="glass-card p-8 md:p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Create Account
              </h1>
              <p className="text-slate-600 text-lg">Join our premium shopping community</p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50/80 backdrop-blur-md border border-red-200/50 rounded-xl p-4 mb-6 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 mb-8">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="input-premium w-full pl-12"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-premium w-full pl-12"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-premium w-full pl-12"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-premium w-full pl-12"
                    required
                  />
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="premium-btn-primary w-full flex items-center justify-center gap-2 mt-8 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Account'}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </form>

            {/* Requirements */}
            <motion.div variants={itemVariants} className="bg-green-50/50 backdrop-blur-md rounded-xl p-5 mb-8 space-y-3 border border-green-200/30">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-slate-700">At least 6 characters</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-slate-700">Passwords must match</span>
              </div>
            </motion.div>

            {/* Sign In Link */}
            <motion.p variants={itemVariants} className="text-center text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
