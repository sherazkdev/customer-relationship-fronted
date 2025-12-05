import React, { useMemo } from 'react';
import { BarChart3, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Reports = () => {
  const { customers } = useApp();

  const stats = useMemo(() => {
    const total = customers.length;
    const newCount = customers.filter(c => c.status === 'new' || c.status === 'no-response').length;
    const buyedCount = customers.filter(c => c.status === 'buyed').length;
    const cancelledCount = customers.filter(c => c.status === 'cancelled').length;

    return {
      total,
      new: newCount,
      buyed: buyedCount,
      cancelled: cancelledCount
    };
  }, [customers]);

  const statCards = [
    {
      label: 'Total Customers',
      value: stats.total,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'New / No Response',
      value: stats.new,
      icon: AlertCircle,
      color: 'bg-green-500'
    },
    {
      label: 'Buyed',
      value: stats.buyed,
      icon: CheckCircle,
      color: 'bg-blue-500'
    },
    {
      label: 'Cancelled',
      value: stats.cancelled,
      icon: XCircle,
      color: 'bg-red-500'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
          Reports
        </h1>
        <p className="text-gray-600 mt-1">View statistics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h2>
        {stats.total === 0 ? (
          <p className="text-gray-500 text-center py-8">No data available</p>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">New / No Response</span>
                <span className="font-medium">{stats.new} ({((stats.new / stats.total) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(stats.new / stats.total) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Buyed</span>
                <span className="font-medium">{stats.buyed} ({((stats.buyed / stats.total) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(stats.buyed / stats.total) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Cancelled</span>
                <span className="font-medium">{stats.cancelled} ({((stats.cancelled / stats.total) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(stats.cancelled / stats.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;

