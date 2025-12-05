import React from 'react';
import { UserPlus } from 'lucide-react';
import CustomerForm from '../components/CustomerForm';

const AddCustomer = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <UserPlus className="w-6 h-6 mr-2 text-blue-600" />
          Add Customer
        </h1>
        <p className="text-gray-600 mt-1">Create a new customer record</p>
      </div>
      <CustomerForm />
    </div>
  );
};

export default AddCustomer;

