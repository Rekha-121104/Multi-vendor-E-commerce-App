import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products?limit=8');
        setProducts(data.products);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 p-10 text-white shadow-xl">
        <h1 className="text-4xl font-bold">Multi-vendor e-commerce marketplace</h1>
        <p className="mt-4 max-w-2xl text-slate-200">Browse products from trusted vendors, manage orders, and enjoy secure payments.</p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-slate-900 shadow-lg hover:bg-slate-100">
          Browse Products
        </Link>
      </div>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured products</h2>
          <Link to="/products" className="text-slate-600 hover:text-slate-900">See all</Link>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`} className="group overflow-hidden rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.title} className="h-48 w-full rounded-2xl object-cover" />
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between text-slate-900">
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{product.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
