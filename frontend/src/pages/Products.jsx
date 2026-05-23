import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = searchParams.toString();
        const { data } = await api.get(`/products?${query}`);
        setProducts(data.products);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ search });
  };

  return (
    <div>
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSearch}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
          <button className="rounded-2xl bg-slate-900 px-6 py-3 text-white hover:bg-slate-700">Search</button>
        </form>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`} className="rounded-3xl bg-white p-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition">
              <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.title} className="h-56 w-full rounded-3xl object-cover" />
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="text-slate-600 line-clamp-2">{product.description}</p>
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
  );
};

export default Products;
