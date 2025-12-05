import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Users, PhoneCall, CheckCircle2 } from 'lucide-react';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { customers, loading } = useApp();

  const stats = useMemo(() => {
    const total = customers.length;
    const newCount = customers.filter((c) => c.status === 'new' || c.status === 'noresponse').length;
    const buyed = customers.filter((c) => c.status === 'buyed').length;
    const cancelled = customers.filter((c) => c.status === 'cancelled').length;
    return { total, newCount, buyed, cancelled };
  }, [customers]);

  if (loading && customers.length === 0) {
    return <div className="flex justify-center py-10"><Loader size="lg" /></div>;
  }

  const cards = [
    { label: 'Total Customers', value: stats.total, icon: Users, color: 'bg-blue-500' },
    { label: 'New / No Response', value: stats.newCount, icon: PhoneCall, color: 'bg-green-500' },
    { label: 'Buyed', value: stats.buyed, icon: CheckCircle2, color: 'bg-blue-600' },
    { label: 'Cancelled', value: stats.cancelled, icon: LayoutDashboard, color: 'bg-red-500' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <LayoutDashboard className="w-6 h-6 mr-2 text-blue-600" />
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Overview of your customer pipeline</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
              </div>
              <div className={`${color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

