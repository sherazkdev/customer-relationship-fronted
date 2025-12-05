import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, FileText, User } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <p className="text-gray-600">Customer Detail</p>
          </div>
        </div>
        <StatusBadge status={customer.status} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-gray-900 font-medium">{customer.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900 font-medium">{customer.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900 font-medium">{customer.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Visit Time</p>
              <p className="text-gray-900 font-medium">{formatDate(customer.visitTime)}</p>
            </div>
          </div>
        </div>
        {customer.note && (
          <div className="mt-4 flex items-start space-x-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Notes</p>
              <p className="text-gray-900">{customer.note}</p>
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

