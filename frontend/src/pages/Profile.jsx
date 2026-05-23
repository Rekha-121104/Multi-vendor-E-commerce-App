import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/users/profile');
        setProfile(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">My Profile</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : profile ? (
        <div className="mt-6 space-y-4 text-slate-700">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Vendor approved:</strong> {profile.isVendorApproved ? 'Yes' : 'Pending'}</p>
          <p><strong>Address:</strong> {profile.address || 'Not provided'}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
