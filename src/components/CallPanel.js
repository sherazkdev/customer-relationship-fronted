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
    message: '',
    callTime: new Date().toISOString().slice(0, 16)
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
        message: formData.message,
        callTime: formData.callTime
      });
      
      setCalls(prev => [newCall, ...prev]);
      setFormData({ status: 'noresponse', message: '', callTime: new Date().toISOString().slice(0, 16) });
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
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-8 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Call History</h3>
            <p className="text-slate-600 text-sm mt-1">Track and manage customer calls</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Add Call Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-400"
            >
              <option value="noresponse">No Response</option>
              <option value="cancelled">Cancelled</option>
              <option value="buyed">Buyed</option>
            </select>
          </div>
          <div>
            <label htmlFor="callTime" className="block text-sm font-semibold text-slate-700 mb-2">
              Call Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="callTime"
              name="callTime"
              value={formData.callTime}
              onChange={(e) => setFormData(prev => ({ ...prev, callTime: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-400"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-400"
              placeholder="Enter call message..."
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
              className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200/80 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <StatusBadge status={call.status} />
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(call.callTime)}</span>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">{call.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CallPanel;

