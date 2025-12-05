import axios from 'axios';

const API_BASE_URL = process.env.VITE_SERVER_URL || "https://customer-relationship-backend.vercel.app";
console.log(API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth APIs
export const login = async (credentials) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`);
    console.log(response)
    return response.data;
  } catch(e) {
    console.log(e);
  }
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data.data;
};

export const registerUser = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

// Employee APIs (admin only)
export const getEmployees = async () => {
  const response = await api.get('/employees');
  return response.data.data;
};

export const addEmployee = async (payload) => {
  const response = await api.post('/employees', payload);
  return response.data.data;
};

// Customer APIs
export const getCustomers = async () => {
  const response = await api.get('/customers');
  return response.data.data;
};

export const getCustomer = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data.data;
};

export const addCustomer = async (customerData) => {
  const response = await api.post('/customers', customerData);
  return response.data.data;
};

export const updateCustomerStatus = async (id, status) => {
  const response = await api.patch(`/customers/${id}`, { status });
  return response.data.data;
};

// Call APIs
export const getCalls = async (customerId) => {
  const response = await api.get(`/calls/${customerId}`);
  return response.data.data;
};

export const addCall = async (callData) => {
  const response = await api.post('/calls', callData);
  return response.data.data;
};

export default api;

