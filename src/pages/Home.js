import React from 'react';
import { Home as HomeIcon } from 'lucide-react';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';

const Home = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <HomeIcon className="w-6 h-6 mr-2 text-blue-600" />
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Track customer visits and calls</p>
      </div>

      <CustomerForm />
      <CustomerList />
    </div>
  );
};

export default Home;

