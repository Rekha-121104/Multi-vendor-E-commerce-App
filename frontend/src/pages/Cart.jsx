import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const updateQty = (productId, delta) => {
    const updated = cart.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (productId) => {
    const filtered = cart.filter((item) => item.productId !== productId);
    setCart(filtered);
    localStorage.setItem('cart', JSON.stringify(filtered));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-slate-700">Your cart is empty.</p>
          <Link to="/products" className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            {cart.map((item) => (
              <div key={item.productId} className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.image || 'https://via.placeholder.com/120'} alt={item.title} className="h-24 w-24 rounded-3xl object-cover" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                    <p className="text-slate-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQty(item.productId, -1)} className="rounded-2xl border border-slate-200 px-3 py-2">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.productId, 1)} className="rounded-2xl border border-slate-200 px-3 py-2">+</button>
                  <button onClick={() => removeItem(item.productId)} className="rounded-2xl bg-red-500 px-3 py-2 text-white hover:bg-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">Order summary</h2>
              <div className="flex items-center justify-between text-slate-700">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
