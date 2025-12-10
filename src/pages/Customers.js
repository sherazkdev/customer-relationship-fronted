import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomerList from '../components/CustomerList';

const Customers = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
              <p className="text-slate-600 mt-1">Manage customer visits and calls</p>
            </div>
          </div>
        </div>
        <Link
          to="/customers/new"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Customer</span>
        </Link>
      </div>

      <CustomerList />
    </div>
  );
};

export default Customers;

