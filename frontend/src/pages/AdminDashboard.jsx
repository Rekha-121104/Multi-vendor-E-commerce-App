import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : stats ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Users</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.usersCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Vendors</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.vendorsCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Products</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.productsCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Sales</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">${stats.totalSales.toFixed(2)}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboard;
