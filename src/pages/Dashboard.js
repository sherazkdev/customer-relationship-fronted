import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Users, PhoneCall, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { customers, loading } = useApp();

  const stats = useMemo(() => {
    const total = customers.length;
    const newCount = customers.filter((c) => c.status === 'new' || c.status === 'noresponse').length;
    const buyed = customers.filter((c) => c.status === 'buyed').length;
    const cancelled = customers.filter((c) => c.status === 'cancelled').length;
    const conversionRate = total > 0 ? ((buyed / total) * 100).toFixed(1) : 0;
    return { total, newCount, buyed, cancelled, conversionRate };
  }, [customers]);

  if (loading && customers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Customers',
      value: stats.total,
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100/50',
      textColor: 'text-blue-600',
    },
    {
      label: 'New / No Response',
      value: stats.newCount,
      icon: PhoneCall,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-100/50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Converted',
      value: stats.buyed,
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-100/50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Cancelled',
      value: stats.cancelled,
      icon: XCircle,
      gradient: 'from-red-500 to-rose-600',
      bgGradient: 'from-red-50 to-rose-100/50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Overview of your customer pipeline</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, value, icon: Icon, gradient, bgGradient, textColor }) => (
          <div
            key={label}
            className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm overflow-hidden group`}
          >
            {/* Decorative gradient overlay */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
                <p className={`text-4xl font-bold ${textColor} mb-1`}>{value}</p>
              </div>
              <div className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Rate Card */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm font-medium mb-2">Conversion Rate</p>
            <p className="text-5xl font-bold mb-1">{stats.conversionRate}%</p>
            <p className="text-indigo-100/80 text-sm">Successfully converted customers</p>
          </div>
          <div className="p-6 bg-white/20 backdrop-blur-sm rounded-2xl">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

