import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const ManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products');
        const filtered = user?.role === 'vendor'
          ? data.products.filter((product) => product.vendor?._id === user._id)
          : data.products;
        setProducts(filtered);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Manage Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-slate-700">No products found.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{product.title}</h2>
                <p className="text-slate-600">${product.price.toFixed(2)} · Stock {product.stock}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleDelete(product._id)} className="rounded-2xl bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
