import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/orders/my-orders');
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">My Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-700">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Order #{order._id.slice(-6)}</h2>
                  <p className="text-slate-600">Status: {order.orderStatus}</p>
                </div>
                <div className="text-slate-700">
                  <p>Total: ${order.totalAmount.toFixed(2)}</p>
                  <p>Payment: {order.paymentStatus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
