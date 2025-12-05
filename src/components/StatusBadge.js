import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'new': {
        bg: 'bg-green-100',
        text: 'text-green-700',
        label: 'New'
      },
      'noresponse': {
        bg: 'bg-green-100',
        text: 'text-green-700',
        label: 'No Response'
      },
      'cancelled': {
        bg: 'bg-red-100',
        text: 'text-red-700',
        label: 'Cancelled'
      },
      'buyed': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        label: 'Buyed'
      }
    };
    return configs[status] || configs['new'];
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;

