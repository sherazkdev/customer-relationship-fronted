import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, FileText, User, MessageSquare } from 'lucide-react';
import { getCustomer } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';
import CallPanel from '../components/CallPanel';
import toast from 'react-hot-toast';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const data = await getCustomer(id);
        setCustomer(data);
      } catch (err) {
        toast.error('Failed to load customer');
        navigate('/customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id, navigate]);

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

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{customer.name}</h1>
            <p className="text-slate-600 mt-1">Customer Detail</p>
          </div>
        </div>
        <StatusBadge status={customer.status} />
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Name</p>
              <p className="text-slate-900 font-bold text-lg">{customer.name}</p>
            </div>
          </div>
          {customer.email && (
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-500 mb-1">Email</p>
                <a
                  href={`mailto:${customer.email}`}
                  className="text-blue-600 hover:text-blue-700 hover:underline font-bold text-lg transition-colors inline-flex items-center space-x-2 truncate"
                >
                  <span className="truncate">{customer.email}</span>
                  <Mail className="w-4 h-4 flex-shrink-0" />
                </a>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-500 mb-1">Phone</p>
              <div className="flex items-center space-x-3">
                <a
                  href={`tel:${customer.phone}`}
                  className="text-slate-900 hover:text-blue-600 hover:underline font-bold text-lg transition-colors inline-flex items-center space-x-2"
                >
                  <span>{customer.phone}</span>
                  <Phone className="w-4 h-4 flex-shrink-0" />
                </a>
                <a
                  href={`sms:${customer.phone}`}
                  className="p-2.5 rounded-xl text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all flex-shrink-0"
                  title="Send SMS"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Visit Time</p>
              <p className="text-slate-900 font-bold text-lg">{formatDate(customer.visitTime)}</p>
            </div>
          </div>
        </div>
        {customer.note && (
          <div className="mt-6 pt-6 border-t border-slate-200 flex items-start space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-500 mb-2">Notes</p>
              <p className="text-slate-900 leading-relaxed">{customer.note}</p>
            </div>
          </div>
        )}
      </div>

      <CallPanel customerId={customer._id} />

      <div className="text-sm text-gray-500">
        <Link to="/customers" className="text-blue-600 hover:underline">Back to customers</Link>
      </div>
    </div>
  );
};

export default CustomerDetail;

