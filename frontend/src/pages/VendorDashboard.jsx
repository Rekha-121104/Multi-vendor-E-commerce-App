import { Link, useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

const VendorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/vendors/dashboard');
        setDashboard(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Vendor Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : dashboard ? (
        <>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Earnings</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">${dashboard.earnings.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Products</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{dashboard.totalProducts}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Stock total</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{dashboard.totalStock}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/vendor/add-product" className="rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">
              Add Product
            </Link>
            <Link to="/vendor/manage-products" className="rounded-2xl border border-slate-900 px-5 py-3 text-slate-900 hover:bg-slate-100">
              Manage Products
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default VendorDashboard;
