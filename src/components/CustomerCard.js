import React from 'react';
import { Mail, Calendar, User, Eye, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const CustomerCard = ({ customer }) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
            </div>
            <StatusBadge status={customer.status} />
          </div>
          <Link
            to={`/customers/${customer._id}`}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </Link>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formatDate(customer.visitTime)}</span>
          </div>
          {customer.note && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Note: </span>
                {customer.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;

