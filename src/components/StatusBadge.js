import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'new': {
        gradient: 'from-emerald-500 to-green-600',
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        label: 'New'
      },
      'noresponse': {
        gradient: 'from-amber-500 to-orange-600',
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        label: 'No Response'
      },
      'cancelled': {
        gradient: 'from-red-500 to-rose-600',
        bg: 'bg-red-100',
        text: 'text-red-700',
        label: 'Cancelled'
      },
      'buyed': {
        gradient: 'from-blue-500 to-indigo-600',
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        label: 'Converted'
      }
    };
    return configs[status] || configs['new'];
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${config.bg} ${config.text} border border-white/50`}
    >
      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient} mr-2`}></span>
      {config.label}
    </span>
  );
};

export default StatusBadge;

