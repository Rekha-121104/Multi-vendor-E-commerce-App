import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.productId === product._id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ productId: product._id, title: product.title, price: product.price, image: product.images?.[0], quantity: qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : product ? (
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <img src={product.images?.[0] || 'https://via.placeholder.com/600'} alt={product.title} className="h-[420px] w-full rounded-3xl object-cover" />
            <div className="mt-6 space-y-4">
              <h1 className="text-3xl font-semibold text-slate-900">{product.title}</h1>
              <p className="text-slate-600">{product.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-slate-900">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">Category: {product.category}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">Stock: {product.stock}</span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-slate-900">
                <span className="text-3xl font-semibold">${product.price.toFixed(2)}</span>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <button onClick={handleAddToCart} className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
