import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/users/profile');
        const productIds = data.wishlist || [];
        if (productIds.length > 0) {
          const items = await Promise.all(productIds.map(async (id) => {
            const { data: product } = await api.get(`/products/${id}`);
            return product;
          }));
          setWishlist(items);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">My Wishlist</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : wishlist.length === 0 ? (
        <p className="text-slate-700">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`} className="rounded-3xl border border-slate-200 p-4 hover:shadow-md">
              <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.title} className="h-48 w-full rounded-3xl object-cover" />
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-slate-900">{product.title}</h2>
                <p className="mt-2 text-slate-600">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
