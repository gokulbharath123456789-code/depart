import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/categories" element={<Home />} />
                <Route path="/deals" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
