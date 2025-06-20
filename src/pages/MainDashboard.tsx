import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Shield,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Target,
  Zap,
  Eye,
  Database,
  Filter,
  Calendar,
  Download,
  FileText,
  Bell,
  Settings,
  MoreHorizontal
} from 'lucide-react';

import StatCard from '../components/ui/StatCard';
import DonutChart from '../components/charts/DonutChart';
import CustomAreaChart from '../components/charts/AreaChart';
import CustomBarChart from '../components/charts/BarChart';
import ProgressChart from '../components/charts/ProgressChart';

const MainDashboard: React.FC = () => {
  const [selectedTenant, setSelectedTenant] = useState('All Tenants');
  const [timeRange, setTimeRange] = useState('Last 30 days');

  // Modern stats cards with clean design
  const statsCards = [
    { 
      title: 'Applications', 
      value: 153, 
      icon: Server, 
      color: 'from-blue-500 to-blue-600', 
      bgColor: 'bg-slate-800/50', 
      textColor: 'text-blue-400'
    },
    { 
      title: 'Infrastructure IPs', 
      value: 0, 
      icon: Database, 
      color: 'from-green-500 to-green-600', 
      bgColor: 'bg-slate-800/50', 
      textColor: 'text-green-400'
    },
    { 
      title: 'Total Vulnerabilities', 
      value: 159, 
      icon: AlertTriangle, 
      color: 'from-red-500 to-red-600', 
      bgColor: 'bg-slate-800/50', 
      textColor: 'text-red-400'
    },
    { 
      title: 'Remediated', 
      value: 4, 
      icon: CheckCircle, 
      color: 'from-emerald-500 to-emerald-600', 
      bgColor: 'bg-slate-800/50', 
      textColor: 'text-emerald-400'
    },
    { 
      title: 'Exceptions', 
      value: 8, 
      icon: Clock, 
      color: 'from-amber-500 to-amber-600', 
      bgColor: 'bg-slate-800/50', 
      textColor: 'text-amber-400'
    }
  ];

  const vulnerabilityStatusData = [
    { name: 'Open', value: 48, color: '#ef4444' },
    { name: 'Re Open', value: 25, color: '#f97316' },
    { name: 'Closed', value: 67, color: '#22c55e' },
    { name: 'On Hold', value: 4, color: '#3b82f6' }
  ];

  const riskRatingData = [
    { name: 'Apr', Critical: 45, High: 35, Medium: 25, Low: 15, Informational: 8 },
    { name: 'May', Critical: 42, High: 32, Medium: 28, Low: 18, Informational: 10 },
    { name: 'Jun', Critical: 38, High: 30, Medium: 30, Low: 20, Informational: 12 },
    { name: 'Jul', Critical: 35, High: 28, Medium: 32, Low: 22, Informational: 15 }
  ];

  const exploitabilityData = [
    { label: 'Easily Exploitable', value: 30.5, color: '#ef4444', icon: <Zap size={16} className="text-red-400" /> },
    { label: 'Network Exploitable', value: 30.6, color: '#f97316', icon: <Activity size={16} className="text-orange-400" /> },
    { label: 'Public Exploit Available', value: 23.2, color: '#eab308', icon: <Eye size={16} className="text-yellow-400" /> },
    { label: 'High Lateral Movement', value: 23.1, color: '#22c55e', icon: <Target size={16} className="text-green-400" /> }
  ];

  const inventoryStatusData = [
    { name: 'App Assessed', value: 40, color: '#ef4444' },
    { name: 'App Not Assessed', value: 20, color: '#f97316' },
    { name: 'IPs Assessed', value: 30, color: '#eab308' },
    { name: 'IPs Not Assessed', value: 10, color: '#3b82f6' }
  ];

  const vulnerabilityAgeData = [
    { name: 'Critical', '0-30 days': 2, '31-90 days': 4, '90+ days': 1 },
    { name: 'High', '0-30 days': 6, '31-90 days': 8, '90+ days': 3 },
    { name: 'Medium', '0-30 days': 10, '31-90 days': 12, '90+ days': 6 },
    { name: 'Low', '0-30 days': 14, '31-90 days': 16, '90+ days': 8 }
  ];

  const monthlyTrendsData = [
    { name: 'Jan', Open: 2, Closed: 1, Exception: 1 },
    { name: 'Feb', Open: 1, Closed: 2, Exception: 0 },
    { name: 'Mar', Open: 32, Closed: 28, Exception: 2 },
    { name: 'Apr', Open: 24, Closed: 20, Exception: 1 },
    { name: 'May', Open: 16, Closed: 14, Exception: 1 },
    { name: 'Jun', Open: 6, Closed: 8, Exception: 0 }
  ];

  const criticalVulnData = [
    { name: 'webApplication', june: 1, trend: 'up' },
    { name: 'mobileApplication', june: 0, trend: 'neutral' },
    { name: 'ApiServer', june: 0, trend: 'neutral' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className="text-red-400" />;
      case 'down': return <TrendingDown size={14} className="text-green-400" />;
      default: return <Minus size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Modern Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-80 pl-10 pr-4 py-2.5 bg-slate-700/50 text-white rounded-lg border border-slate-600/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all duration-200 text-sm"
                />
              </div>
              
              <select
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
                className="px-4 py-2.5 bg-slate-700/50 text-white rounded-lg border border-slate-600/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all duration-200 text-sm"
              >
                <option value="All Tenants">Select Tenant</option>
                <option value="Production">Production</option>
                <option value="Staging">Staging</option>
                <option value="Development">Development</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                <Bell size={18} />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                <Settings size={18} />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-5 gap-4">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 hover:bg-slate-800/70 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon size={16} className="text-white" />
                </div>
                <span className={`text-xs font-medium ${stat.textColor}`}>{stat.title}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Vulnerability Status */}
          <div className="col-span-4">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Vulnerability Status</h3>
                <button className="p-1 text-slate-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <DonutChart
                data={vulnerabilityStatusData}
                title=""
                centerValue="144"
                centerLabel="Total"
              />
            </div>
          </div>

          {/* Vulnerable Items by Risk Rating */}
          <div className="col-span-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Vulnerable Items by Risk Rating</h3>
                <div className="flex items-center gap-2">
                  <select className="px-3 py-1.5 bg-slate-700/50 text-white rounded-md border border-slate-600/50 text-sm">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              <CustomAreaChart
                data={riskRatingData}
                title=""
                areas={[
                  { dataKey: 'Critical', color: '#ef4444', name: 'Critical' },
                  { dataKey: 'High', color: '#f97316', name: 'High' },
                  { dataKey: 'Medium', color: '#eab308', name: 'Medium' },
                  { dataKey: 'Low', color: '#22c55e', name: 'Low' },
                  { dataKey: 'Informational', color: '#3b82f6', name: 'Informational' }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* Exploitability */}
          <div className="col-span-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Exploitability</h3>
                <button className="p-1 text-slate-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ProgressChart
                data={exploitabilityData}
                title=""
              />
            </div>
          </div>

          {/* Inventory Status */}
          <div className="col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Inventory Status</h3>
                <button className="p-1 text-slate-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <DonutChart
                data={inventoryStatusData}
                title=""
                centerValue="100"
                centerLabel="Total"
              />
            </div>
          </div>

          {/* Critical Items by Assignment Group */}
          <div className="col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Critical / High Vulnerable Items</h3>
                <button className="p-1 text-slate-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="text-xs text-slate-400 mb-4">by Assignment Group</div>
              
              <div className="overflow-hidden rounded-lg border border-slate-700/50">
                <table className="w-full text-sm">
                  <thead className="bg-slate-700/30">
                    <tr className="text-slate-400">
                      <th className="text-left py-2 px-3 font-medium">Name</th>
                      <th className="text-center py-2 px-3 font-medium">June</th>
                      <th className="text-center py-2 px-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {criticalVulnData.map((item, index) => (
                      <tr key={index} className="text-slate-300 hover:bg-slate-700/20 transition-colors duration-200">
                        <td className="py-2 px-3 text-xs">{item.name}</td>
                        <td className="text-center py-2 px-3 text-xs font-medium">{item.june}</td>
                        <td className="text-center py-2 px-3">{getTrendIcon(item.trend)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* Remediation Target Status */}
          <div className="col-span-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Closed Vulnerable Items by Remediation Target Status</h3>
                <button className="p-1 text-slate-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Overdue Critical / High Vulnerable Items', value: 85, color: '#ef4444' },
                  { label: 'by Assignment Group', value: 65, color: '#f97316' },
                  { label: 'Medium Priority Items', value: 45, color: '#eab308' },
                  { label: 'Low Priority Completed', value: 25, color: '#22c55e' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300 text-xs">{item.label}</span>
                      <span className="text-white font-medium text-xs">{item.value}%</span>
                    </div>
                    <div className="w-full bg-slate-700/30 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overdue Critical Items */}
          <div className="col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Overdue Critical / High Vulnerable Items</h3>
                <button className="p-1 text-slate-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="text-xs text-slate-400 mb-4">by Assignment Group</div>
              
              <div className="overflow-hidden rounded-lg border border-slate-700/50">
                <table className="w-full text-sm">
                  <thead className="bg-slate-700/30">
                    <tr className="text-slate-400">
                      <th className="text-left py-2 px-3 font-medium">Name</th>
                      <th className="text-center py-2 px-3 font-medium">June</th>
                      <th className="text-center py-2 px-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {criticalVulnData.map((item, index) => (
                      <tr key={index} className="text-slate-300 hover:bg-slate-700/20 transition-colors duration-200">
                        <td className="py-2 px-3 text-xs">{item.name}</td>
                        <td className="text-center py-2 px-3 text-xs font-medium">{item.june}</td>
                        <td className="text-center py-2 px-3">{getTrendIcon(item.trend)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Vulnerable Items by Age */}
          <div className="col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Vulnerable Items by Age</h3>
                <button className="p-1 text-slate-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <CustomBarChart
                data={vulnerabilityAgeData}
                title=""
                bars={[
                  { dataKey: '0-30 days', color: '#22c55e', name: '0-30 days' },
                  { dataKey: '31-90 days', color: '#eab308', name: '31-90 days' },
                  { dataKey: '90+ days', color: '#ef4444', name: '90+ days' }
                ]}
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Bottom Chart */}
        <div className="grid grid-cols-1">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Open and Closed Vulnerable Items</h3>
              <button className="p-1 text-slate-400 hover:text-white">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <CustomBarChart
              data={monthlyTrendsData}
              title=""
              bars={[
                { dataKey: 'Open', color: '#ef4444', name: 'Open' },
                { dataKey: 'Closed', color: '#3b82f6', name: 'Closed' },
                { dataKey: 'Exception', color: '#22c55e', name: 'Exception' }
              ]}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 p-6 text-center text-slate-500 text-xs border-t border-slate-700/50">
        <p>© 2025 Secure&. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainDashboard;