import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const cart = useMemo(() => JSON.parse(localStorage.getItem('cart')) || [], []);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const orderItems = cart.map((item) => ({
        product: item.productId,
        name: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));
      await api.post('/orders', { orderItems, shippingAddress, paymentMethod, totalAmount: total, paymentResult: { status: 'paid' } });
      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
      <div className="space-y-4">
        <p className="text-slate-700">Logged in as {user?.name}</p>
        <p className="text-slate-700">Order total: ${total.toFixed(2)}</p>
      </div>
      <form className="space-y-5" onSubmit={handlePlaceOrder}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Shipping address</label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Payment method</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200">
            <option value="Stripe">Stripe</option>
            <option value="Razorpay">Razorpay</option>
          </select>
        </div>
        {message && <p className="rounded-xl bg-red-100 p-3 text-sm text-red-700">{message}</p>}
        <button disabled={loading} className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
