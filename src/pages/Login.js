import React, { useState } from 'react';
import { Lock, Mail, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // toast handled in context
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">CRM Pro Login</h1>
            <p className="text-sm text-slate-600 mt-1">Access your dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-400"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {submitting || loading ? (
              <Loader size="sm" className="text-white" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            <span>{submitting || loading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-6 text-center">
          Use your admin or employee credentials. Admins can create employees from the Employees panel.
        </p>
      </div>
    </div>
  );
};

export default Login;

