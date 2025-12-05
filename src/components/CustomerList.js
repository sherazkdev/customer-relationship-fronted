import React from 'react';
import { Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CustomerCard from './CustomerCard';
import Loader from './Loader';

const CustomerList = () => {
  const { customers, loading } = useApp();

  if (loading && customers.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers yet</h3>
        <p className="text-gray-500">Add your first customer visit to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Customer List ({customers.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {customers.map((customer) => (
          <CustomerCard key={customer._id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;

