import React from 'react';
import { 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  ExternalLink,
  Zap
} from 'lucide-react';
import { Integration } from '../../pages/ThirdPartyConfigPage';

interface IntegrationCardProps {
  integration: Integration;
  onConfigure: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, onConfigure }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-400" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-400" />;
      default:
        return <AlertCircle size={16} className="text-gray-400" />;
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

  const IconComponent = integration.icon;

  return (
    <div className="group relative bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${integration.color} shadow-lg`}>
              <IconComponent size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{integration.name}</h3>
              <span className="text-xs text-gray-400">{integration.version}</span>
            </div>
          </div>
          
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(integration.status)}`}>
            {getStatusIcon(integration.status)}
            <span className="capitalize">{integration.status}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {integration.description}
        </p>

        {/* Category & Last Sync */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
            {integration.category}
          </span>
          {integration.lastSync && (
            <span className="text-xs text-gray-500">
              Synced {integration.lastSync}
            </span>
          )}
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {integration.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded text-xs">
                {feature}
              </span>
            ))}
            {integration.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded text-xs">
                +{integration.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onConfigure}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Settings size={16} />
            Configure
          </button>
          
          {integration.status === 'connected' && (
            <button className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200">
              <ExternalLink size={16} />
            </button>
          )}
          
          {integration.status === 'connected' && (
            <button className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-green-400 transition-colors duration-200">
              <Zap size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
    </div>
  );
};

export default IntegrationCard;