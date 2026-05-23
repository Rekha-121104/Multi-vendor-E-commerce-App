import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold text-slate-900">
          MultiVendor Shop
        </Link>
        <nav className="flex flex-wrap gap-3 text-sm text-slate-700">
          <NavLink to="/products" className="hover:text-slate-900">Products</NavLink>
          <NavLink to="/cart" className="hover:text-slate-900">Cart</NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className="hover:text-slate-900">Profile</NavLink>
              <NavLink to="/orders" className="hover:text-slate-900">Orders</NavLink>
              <NavLink to="/wishlist" className="hover:text-slate-900">Wishlist</NavLink>
              {user.role === 'vendor' && (
                <>
                  <NavLink to="/vendor/dashboard" className="hover:text-slate-900">Vendor</NavLink>
                  <NavLink to="/vendor/add-product" className="hover:text-slate-900">Add Product</NavLink>
                  <NavLink to="/vendor/manage-products" className="hover:text-slate-900">Manage Products</NavLink>
                </>
              )}
              {user.role === 'admin' && <NavLink to="/admin/dashboard" className="hover:text-slate-900">Admin</NavLink>}
              <button onClick={logout} className="rounded-md bg-slate-900 px-3 py-2 text-white hover:bg-slate-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-slate-900">Login</NavLink>
              <NavLink to="/register" className="hover:text-slate-900">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
