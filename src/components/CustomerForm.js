import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const CustomerForm = () => {
  const { createCustomer, loading } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    note: '',
    visitTime: new Date().toISOString().slice(0, 16)
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.visitTime) {
      newErrors.visitTime = 'Visit date and time is required';
    }
    
    // Email is optional, but if provided, it must be valid
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    try {
      await createCustomer(formData);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        note: '',
        visitTime: new Date().toISOString().slice(0, 16)
      });
      setErrors({});
      navigate('/customers');
    } catch (error) {
      // Error is handled in context
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-8 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Add New Customer Visit</h2>
          <p className="text-slate-600 text-sm mt-1">Fill in the customer information below</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
              placeholder="Enter customer name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="visitTime" className="block text-sm font-semibold text-slate-700 mb-2">
              Visit Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="visitTime"
              name="visitTime"
              value={formData.visitTime}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.visitTime ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            />
            {errors.visitTime && (
              <p className="mt-1 text-sm text-red-600">{errors.visitTime}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-semibold text-slate-700 mb-2">
            Note (Optional)
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-slate-400 resize-none"
            placeholder="Add any additional notes..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Add Customer</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;

