import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { name, email, password, role, address };
    if (role === 'vendor') {
      userData.shopName = shopName;
      userData.ownerName = ownerName;
    }
    const success = await register(userData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-3xl font-semibold text-slate-900">Register</h1>
      {error && <p className="mb-4 rounded-xl bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200">
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
          {role === 'vendor' && (
            <p className="mt-2 text-sm text-slate-500">Vendor accounts are auto-approved on registration, so you can start adding products immediately.</p>
          )}
        </div>
        {role === 'vendor' && (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Shop Name</label>
              <input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Owner Name</label>
              <input
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </>
        )}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <button disabled={loading} className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-600">
        Already have an account? <Link to="/login" className="text-slate-900 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;
