import React, { useState, useEffect, useCallback } from 'react';
import { Phone, MessageSquare, Clock, Plus, Loader2, X } from 'lucide-react';
import { getCalls, addCall } from '../services/api';
import { useApp } from '../context/AppContext';
import StatusBadge from './StatusBadge';
import toast from 'react-hot-toast';

const CallPanel = ({ customerId, onClose }) => {
  const { refreshCustomers } = useApp();
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    status: 'noresponse',
    message: ''
  });

  const fetchCalls = useCallback(async () => {
    if (!customerId) return;
    setLoading(true);
    try {
      const data = await getCalls(customerId);
      setCalls(data);
    } catch (error) {
      console.error('Error fetching calls:', error);
      toast.error('Failed to load call history');
    } finally {
      setLoading(false);
    }
  }, [customerId]);
  
  useEffect(() => {
    fetchCalls();
  }, [fetchCalls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSubmitting(true);
    try {
      const newCall = await addCall({
        customerId,
        status: formData.status,
        message: formData.message
      });
      
      setCalls(prev => [newCall, ...prev]);
      setFormData({ status: 'noresponse', message: '' });
      toast.success('Call added successfully!');
      
      // Refresh customer list to update status
      await refreshCustomers();
    } catch (error) {
      console.error('Error adding call:', error);
      toast.error(error.response?.data?.message || 'Failed to add call');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Phone className="w-5 h-5 mr-2 text-blue-600" />
          Call History
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Add Call Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="noresponse">No Response</option>
              <option value="cancelled">Cancelled</option>
              <option value="buyed">Buyed</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter call message..."
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add Call</span>
            </>
          )}
        </button>
      </form>

      {/* Call History List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        ) : calls.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No call history yet. Add your first call above.</p>
          </div>
        ) : (
          calls.map((call) => (
            <div
              key={call._id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <StatusBadge status={call.status} />
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(call.callTime)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2">{call.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CallPanel;

