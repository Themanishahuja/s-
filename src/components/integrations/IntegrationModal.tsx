import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Clock, ExternalLink, Key, Globe, User } from 'lucide-react';
import { Integration } from '../../pages/ThirdPartyConfigPage';

interface IntegrationModalProps {
  integration: Integration | null;
  isOpen: boolean;
  onClose: () => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ integration, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('config');
  const [formData, setFormData] = useState({
    domain: '',
    username: '',
    apiKey: '',
    endpoint: '',
    token: ''
  });

  if (!isOpen || !integration) return null;

  const IconComponent = integration.icon;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'pending':
        return <Clock size={20} className="text-yellow-400" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400" />;
      default:
        return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${integration.color} shadow-lg`}>
              <IconComponent size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{integration.name} Integration</h2>
              <div className="flex items-center gap-3 mt-1">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(integration.status)}`}>
                  {getStatusIcon(integration.status)}
                  <span className="capitalize">{integration.status}</span>
                </div>
                <span className="text-sm text-gray-400">{integration.version}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'config'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Configuration
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'features'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'logs'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Activity Logs
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Connection Settings</h3>
                <p className="text-gray-400 text-sm mb-4">{integration.description}</p>
              </div>

              <form className="space-y-4">
                {integration.name === 'Jira' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        <Globe size={16} className="inline mr-2" />
                        Domain
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Domain Name"
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        <User size={16} className="inline mr-2" />
                        Jira Username
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Jira Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        <Key size={16} className="inline mr-2" />
                        Jira API Key
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your Jira API Key"
                        value={formData.apiKey}
                        onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      />
                    </div>
                  </>
                )}

                {integration.name !== 'Jira' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        API Endpoint
                      </label>
                      <input
                        type="url"
                        placeholder="https://api.example.com"
                        value={formData.endpoint}
                        onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        API Token
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your API token"
                        value={formData.token}
                        onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <AlertCircle size={16} className="text-blue-400" />
                  <p className="text-sm text-blue-400">
                    Your credentials are encrypted and stored securely. We never share your data with third parties.
                  </p>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Available Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integration.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-white mb-3">Integration Benefits</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-400" />
                    Real-time data synchronization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-400" />
                    Automated workflow triggers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-400" />
                    Enhanced security monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-400" />
                    Centralized dashboard view
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { time: '2 minutes ago', action: 'Data sync completed', status: 'success' },
                  { time: '15 minutes ago', action: 'Configuration updated', status: 'info' },
                  { time: '1 hour ago', action: 'Connection established', status: 'success' },
                  { time: '2 hours ago', action: 'Authentication verified', status: 'success' },
                  { time: '1 day ago', action: 'Integration activated', status: 'success' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      log.status === 'success' ? 'bg-green-400' : 
                      log.status === 'error' ? 'bg-red-400' : 'bg-blue-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm">{log.action}</p>
                      <p className="text-gray-500 text-xs">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <ExternalLink size={16} className="text-gray-400" />
            <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">
              View Documentation
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            {activeTab === 'config' && (
              <>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200">
                  Test Connection
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Save Configuration
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;