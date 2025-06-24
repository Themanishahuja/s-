import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  Users, 
  Key, 
  Settings,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Filter,
  Download,
  Upload
} from 'lucide-react';

interface Role {
  id: number;
  name: string;
  allowedPaths: string[];
  description?: string;
  userCount?: number;
  createdAt?: string;
  lastModified?: string;
}

interface RolesPageProps {
  onAddRole: () => void;
}

const RolesPage: React.FC<RolesPageProps> = ({ onAddRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const roles: Role[] = [
    {
      id: 1,
      name: 'Tester',
      allowedPaths: ['Dashboard', 'Vulnerability Data', 'Reports', 'All Tasks'],
      description: 'Quality assurance and testing role with limited access',
      userCount: 5,
      createdAt: '2024-01-15',
      lastModified: '2024-12-20'
    },
    {
      id: 2,
      name: 'Frontend Developer',
      allowedPaths: ['Vulnerability Data', 'Dashboard', 'Exceptions', 'All Tenants'],
      description: 'Frontend development team with UI/UX access',
      userCount: 8,
      createdAt: '2024-01-10',
      lastModified: '2024-12-18'
    },
    {
      id: 3,
      name: 'Backend Developer',
      allowedPaths: [
        'Vulnerability Data', 'Scheduling Assessment', 'Users', 'Application Vulnerability',
        'Infrastructure Vulnerability', 'Exceptions', 'Reports', 'Remediation', 'Dashboard',
        'Asset Inventory', 'All Tenants', 'All Tasks', 'Third Party Integrations', 'Partners', 'Role'
      ],
      description: 'Backend development team with comprehensive system access',
      userCount: 12,
      createdAt: '2024-01-08',
      lastModified: '2024-12-19'
    },
    {
      id: 4,
      name: 'Manager',
      allowedPaths: [
        'Dashboard', 'Scheduling Assessment', 'Vulnerability Data', 'Exceptions', 'Reports',
        'Remediation', 'Asset Inventory', 'All Tenants', 'All Tasks', 'Third Party Integrations',
        'Role', 'Partners'
      ],
      description: 'Management role with oversight and reporting capabilities',
      userCount: 3,
      createdAt: '2024-01-05',
      lastModified: '2024-12-20'
    }
  ];

  const getPathColor = (path: string) => {
    const colors = [
      'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'bg-green-500/20 text-green-400 border-green-500/30',
      'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'bg-red-500/20 text-red-400 border-red-500/30',
      'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'bg-teal-500/20 text-teal-400 border-teal-500/30'
    ];
    return colors[path.length % colors.length];
  };

  const handleSelectRole = (roleId: number, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, roleId]);
    } else {
      setSelectedRoles(selectedRoles.filter(id => id !== roleId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRoles(roles.map(role => role.id));
    } else {
      setSelectedRoles([]);
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.allowedPaths.some(path => path.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Role Management</h1>
              <p className="text-slate-400 text-sm">Manage user roles and permissions across the platform</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200 border border-slate-600/50">
                <Download size={18} />
                Export
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200 border border-slate-600/50">
                <Upload size={18} />
                Import
              </button>
              
              <button 
                onClick={onAddRole}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus size={18} />
                Add Role
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                <Shield size={16} className="text-white" />
              </div>
              <span className="text-xs font-medium text-blue-400">Total Roles</span>
            </div>
            <div className="text-2xl font-bold text-white">{roles.length}</div>
            <div className="text-xs text-slate-400 mt-1">Active roles</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                <Users size={16} className="text-white" />
              </div>
              <span className="text-xs font-medium text-green-400">Total Users</span>
            </div>
            <div className="text-2xl font-bold text-white">{roles.reduce((acc, role) => acc + (role.userCount || 0), 0)}</div>
            <div className="text-xs text-slate-400 mt-1">Assigned users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                <Key size={16} className="text-white" />
              </div>
              <span className="text-xs font-medium text-purple-400">Permissions</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {Array.from(new Set(roles.flatMap(role => role.allowedPaths))).length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Unique permissions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
                <Settings size={16} className="text-white" />
              </div>
              <span className="text-xs font-medium text-orange-400">Last Updated</span>
            </div>
            <div className="text-2xl font-bold text-white">Today</div>
            <div className="text-xs text-slate-400 mt-1">Recent changes</div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search roles, permissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 text-white rounded-lg border border-slate-600/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all duration-200 text-sm"
              />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200 border border-slate-600/50 text-sm">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Roles Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/30 border-b border-slate-700/50">
                <tr className="text-left text-slate-300">
                  <th className="px-6 py-4 font-medium text-sm">
                    <input
                      type="checkbox"
                      checked={selectedRoles.length === roles.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                    />
                  </th>
                  <th className="px-6 py-4 font-medium text-sm">Role</th>
                  <th className="px-6 py-4 font-medium text-sm">Allowed Paths</th>
                  <th className="px-6 py-4 font-medium text-sm text-center">Users</th>
                  <th className="px-6 py-4 font-medium text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filteredRoles.map((role, index) => (
                  <motion.tr
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-slate-300 hover:bg-slate-700/20 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role.id)}
                        onChange={(e) => handleSelectRole(role.id, e.target.checked)}
                        className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-white text-sm">{role.name}</div>
                        {role.description && (
                          <div className="text-xs text-slate-400 mt-1 max-w-xs truncate">
                            {role.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-2xl">
                        {role.allowedPaths.slice(0, 6).map((path, pathIndex) => (
                          <span
                            key={pathIndex}
                            className={`px-2 py-1 rounded text-xs font-medium border ${getPathColor(path)}`}
                          >
                            {path}
                          </span>
                        ))}
                        {role.allowedPaths.length > 6 && (
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded text-xs border border-slate-600/50">
                            +{role.allowedPaths.length - 6} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                        {role.userCount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                          title="Edit Role"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                          title="Delete Role"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                          title="More Options"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50 bg-slate-700/20">
            <div className="text-sm text-slate-400">
              Showing {filteredRoles.length} of {roles.length} roles
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200 border border-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                <span className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  Page {currentPage}
                </span>
              </div>
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex items-center gap-1 px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200 border border-slate-600/50 text-sm"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
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

export default RolesPage;