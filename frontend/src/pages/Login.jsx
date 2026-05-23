import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-3xl font-semibold text-slate-900">Login</h1>
      {error && <p className="mb-4 rounded-xl bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      <form className="space-y-5" onSubmit={handleSubmit}>
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
        <button disabled={loading} className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-600">
        New here? <Link to="/register" className="text-slate-900 hover:underline">Create account</Link>
      </p>
    </div>
  );
};

export default Login;
