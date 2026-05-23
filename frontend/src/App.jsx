import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import VendorDashboard from './pages/VendorDashboard';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/vendor/dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
            <Route path="/vendor/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
            <Route path="/vendor/manage-products" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
