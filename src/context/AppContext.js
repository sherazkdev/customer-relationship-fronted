import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCustomers, addCustomer } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { token, loading: authLoading } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch all customers
  const fetchCustomers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  // Add new customer
  const createCustomer = async (customerData) => {
    setLoading(true);
    try {
      const newCustomer = await addCustomer(customerData);
      setCustomers(prev => [newCustomer, ...prev]);
      toast.success('Customer added successfully!');
      return newCustomer;
    } catch (error) {
      console.error('Error creating customer:', error);
      toast.error(error.response?.data?.message || 'Failed to add customer');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update customer in state
  const updateCustomerInState = (updatedCustomer) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer._id === updatedCustomer._id ? updatedCustomer : customer
      )
    );
  };

  // Refresh customers after call is added
  const refreshCustomers = async () => {
    await fetchCustomers();
  };

  // Load customers on mount
  useEffect(() => {
    if (!authLoading) {
      fetchCustomers();
    }
  }, [authLoading]);

  const value = {
    customers,
    loading,
    selectedCustomer,
    setSelectedCustomer,
    fetchCustomers,
    createCustomer,
    updateCustomerInState,
    refreshCustomers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

