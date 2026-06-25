import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await login('demo@example.com', 'password123');
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

      <div className="relative max-w-md mx-auto px-4 flex items-center justify-center">
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

          {/* Main Card */}
          <motion.div variants={itemVariants} className="glass-card p-8 md:p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Welcome Back
              </h1>
              <p className="text-slate-600 text-lg">Sign in to your premium experience</p>
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
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
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

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="premium-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white/50 backdrop-blur-md text-slate-500 text-sm">
                  Or try demo
                </span>
              </div>
            </motion.div>

            {/* Demo Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="premium-btn-secondary w-full disabled:opacity-50"
            >
              Demo Account
            </motion.button>

            {/* Sign Up */}
            <motion.p variants={itemVariants} className="text-center text-slate-600 mt-8">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Create one
              </Link>
            </motion.p>
          </motion.div>

          {/* Info */}
          <motion.div
            variants={itemVariants}
            className="mt-8 glass-card p-5 border-green-500/50"
          >
            <p className="text-sm text-slate-700">
              <strong className="text-green-600">Demo:</strong> demo@example.com (password: password123)
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
