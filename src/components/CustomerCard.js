import React from 'react';
import { Mail, Calendar, User, Eye, Phone, MessageSquare } from 'lucide-react';
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
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200/80 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 truncate">{customer.name}</h3>
            </div>
            <StatusBadge status={customer.status} />
          </div>
          <Link
            to={`/customers/${customer._id}`}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg ml-3 flex-shrink-0"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </Link>
        </div>

        <div className="space-y-3">
          {customer.email && (
            <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <a
                href={`mailto:${customer.email}`}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium truncate flex-1 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {customer.email}
              </a>
            </div>
          )}
          <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <Phone className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <a
                href={`tel:${customer.phone}`}
                className="text-sm text-slate-700 hover:text-blue-600 hover:underline font-medium truncate transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {customer.phone}
              </a>
              <a
                href={`sms:${customer.phone}`}
                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all flex-shrink-0"
                title="Send SMS"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50">
            <div className="p-1.5 bg-amber-100 rounded-lg">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-sm text-slate-600 font-medium">{formatDate(customer.visitTime)}</span>
          </div>
          {customer.note && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-700">Note: </span>
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

