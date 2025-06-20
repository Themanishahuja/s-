import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  ExternalLink,
  Shield,
  Database,
  Activity,
  Zap,
  Globe,
  Lock,
  Eye,
  FileText,
  Server,
  Cloud
} from 'lucide-react';
import IntegrationCard from '../components/integrations/IntegrationCard';
import IntegrationModal from '../components/integrations/IntegrationModal';

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'connected' | 'disconnected' | 'pending' | 'error';
  category: 'Security' | 'Project Management' | 'Monitoring' | 'Cloud';
  lastSync?: string;
  version?: string;
  color: string;
  features: string[];
}

const ThirdPartyConfigPage: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const integrations: Integration[] = [
    {
      id: 'jira',
      name: 'Jira',
      description: 'Connect with Atlassian Jira for issue tracking and project management',
      icon: FileText,
      status: 'connected',
      category: 'Project Management',
      lastSync: '2 minutes ago',
      version: 'v8.20.0',
      color: 'from-blue-500 to-blue-600',
      features: ['Issue Tracking', 'Project Management', 'Workflow Automation', 'Reporting']
    },
    {
      id: 'defendly',
      name: 'Defendly',
      description: 'Advanced threat detection and security monitoring platform',
      icon: Shield,
      status: 'connected',
      category: 'Security',
      lastSync: '5 minutes ago',
      version: 'v2.1.4',
      color: 'from-red-500 to-red-600',
      features: ['Threat Detection', 'Real-time Monitoring', 'Incident Response', 'Analytics']
    },
    {
      id: 'splunk',
      name: 'Splunk',
      description: 'Data platform for security, IT and DevOps teams',
      icon: Database,
      status: 'pending',
      category: 'Monitoring',
      version: 'v9.0.2',
      color: 'from-green-500 to-green-600',
      features: ['Log Analysis', 'SIEM', 'Machine Learning', 'Dashboards']
    },
    {
      id: 'aws',
      name: 'AWS Security Hub',
      description: 'Centralized security findings from AWS security services',
      icon: Cloud,
      status: 'disconnected',
      category: 'Cloud',
      version: 'Latest',
      color: 'from-orange-500 to-orange-600',
      features: ['Security Findings', 'Compliance', 'Multi-Account', 'Automation']
    },
    {
      id: 'crowdstrike',
      name: 'CrowdStrike',
      description: 'Cloud-native endpoint protection platform',
      icon: Eye,
      status: 'connected',
      category: 'Security',
      lastSync: '1 hour ago',
      version: 'v6.45.0',
      color: 'from-purple-500 to-purple-600',
      features: ['Endpoint Protection', 'Threat Intelligence', 'Incident Response', 'Forensics']
    },
    {
      id: 'servicenow',
      name: 'ServiceNow',
      description: 'IT service management and security operations platform',
      icon: Server,
      status: 'error',
      category: 'Project Management',
      version: 'v2023.1',
      color: 'from-indigo-500 to-indigo-600',
      features: ['ITSM', 'Security Operations', 'Workflow', 'Automation']
    },
    {
      id: 'qualys',
      name: 'Qualys',
      description: 'Vulnerability management and compliance platform',
      icon: Activity,
      status: 'disconnected',
      category: 'Security',
      version: 'v4.22.0',
      color: 'from-teal-500 to-teal-600',
      features: ['Vulnerability Scanning', 'Compliance', 'Asset Discovery', 'Reporting']
    },
    {
      id: 'elastic',
      name: 'Elastic Security',
      description: 'Search-powered security analytics platform',
      icon: Zap,
      status: 'connected',
      category: 'Monitoring',
      lastSync: '30 minutes ago',
      version: 'v8.11.0',
      color: 'from-yellow-500 to-yellow-600',
      features: ['SIEM', 'Endpoint Security', 'Threat Hunting', 'Machine Learning']
    }
  ];

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

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(integrations.map(i => i.category)))];

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const pendingCount = integrations.filter(i => i.status === 'pending').length;
  const errorCount = integrations.filter(i => i.status === 'error').length;

  return (
    <div className="h-full flex flex-col">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Third Party Integrations</h1>
            <p className="text-gray-400 mt-1">Connect and manage your security tools and platforms</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus size={18} />
            Add Integration
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-4 border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total Integrations</p>
                <p className="text-2xl font-bold text-white">{integrations.length}</p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Globe size={20} className="text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-4 border border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Connected</p>
                <p className="text-2xl font-bold text-white">{connectedCount}</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle size={20} className="text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-xl p-4 border border-yellow-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-white">{pendingCount}</p>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock size={20} className="text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-xl p-4 border border-red-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Issues</p>
                <p className="text-2xl font-bold text-white">{errorCount}</p>
              </div>
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertCircle size={20} className="text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConfigure={() => handleConfigureIntegration(integration)}
            />
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Globe size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No integrations found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Integration Configuration Modal */}
      <IntegrationModal
        integration={selectedIntegration}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedIntegration(null);
        }}
      />

      <footer className="mt-auto p-4 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>© 2025 Secure&. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ThirdPartyConfigPage;