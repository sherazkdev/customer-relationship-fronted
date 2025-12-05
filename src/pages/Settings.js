import React from 'react';
import { Settings as SettingsIcon, Database, Server, Info } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <SettingsIcon className="w-6 h-6 mr-2 text-blue-600" />
          Settings
        </h1>
        <p className="text-gray-600 mt-1">Manage your application settings</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Database</h2>
          </div>
          <p className="text-gray-600">MongoDB connection settings</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Server className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Server</h2>
          </div>
          <p className="text-gray-600">Backend API configuration</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">About</h2>
          </div>
          <p className="text-gray-600">Customer Tracking System v1.0.0</p>
          <p className="text-sm text-gray-500 mt-2">Built with MERN Stack</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

