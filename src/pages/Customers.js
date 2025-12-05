import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomerList from '../components/CustomerList';

const Customers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-600" />
            Customers
          </h1>
          <p className="text-gray-600 mt-1">Manage customer visits and calls</p>
        </div>
        <Link
          to="/customers/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Customer</span>
        </Link>
      </div>

      <CustomerList />
    </div>
  );
};

export default Customers;

