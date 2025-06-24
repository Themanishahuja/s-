import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  X,
  Shield,
  Database,
  Activity,
  Scan,
  ClipboardList,
  BarChart3,
  Factory,
  PieChart,
  UserCog,
  Settings
} from 'lucide-react';

interface Permission {
  view: boolean;
  create: boolean;
  modify: boolean;
  delete: boolean;
}

interface Module {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  permissions: Permission;
}

interface AddRolePageProps {
  onBack: () => void;
}

const AddRolePage: React.FC<AddRolePageProps> = ({ onBack }) => {
  const [roleName, setRoleName] = useState('');
  const [roleType, setRoleType] = useState('admin');
  const [description, setDescription] = useState('');
  
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: PieChart,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'tvm',
      name: 'TVM',
      icon: Shield,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'asm',
      name: 'ASM',
      icon: Scan,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'asset-inventory',
      name: 'Asset Inventory',
      icon: Database,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'ai-va',
      name: 'AI-VA',
      icon: Activity,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'grc',
      name: 'GRC',
      icon: ClipboardList,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'tprm',
      name: 'TPRM',
      icon: BarChart3,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'remediation-factory',
      name: 'Remediation Factory',
      icon: Factory,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: PieChart,
      permissions: { view: false, create: false, modify: false, delete: false }
    },
    {
      id: 'administration',
      name: 'Administration',
      icon: UserCog,
      permissions: { view: false, create: false, modify: false, delete: false }
    }
  ]);

  const updatePermission = (moduleId: string, permissionType: keyof Permission, value: boolean) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            permissions: {
              ...module.permissions,
              [permissionType]: value
            }
          }
        : module
    ));
  };

  const selectAllForModule = (moduleId: string, value: boolean) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            permissions: {
              view: value,
              create: value,
              modify: value,
              delete: value
            }
          }
        : module
    ));
  };

  const selectAllForPermission = (permissionType: keyof Permission, value: boolean) => {
    setModules(modules.map(module => ({
      ...module,
      permissions: {
        ...module.permissions,
        [permissionType]: value
      }
    })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Role created:', {
      roleName,
      roleType,
      description,
      modules: modules.filter(module => 
        Object.values(module.permissions).some(permission => permission)
      )
    });
  };

  const isAllSelected = (permissionType: keyof Permission) => {
    return modules.every(module => module.permissions[permissionType]);
  };

  const isModuleFullySelected = (module: Module) => {
    return Object.values(module.permissions).every(permission => permission);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Add New Role</h1>
                <p className="text-slate-400 text-sm">Create a new role with specific permissions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200 border border-slate-600/50"
              >
                <X size={18} />
                Cancel
              </button>
              
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save size={18} />
                Save Role
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Basic Information */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Role Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Role Name *
                </label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Enter role name"
                  className="w-full px-4 py-2.5 bg-slate-700/50 text-white rounded-lg border border-slate-600/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Role Type *
                </label>
                <select
                  value={roleType}
                  onChange={(e) => setRoleType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-700/50 text-white rounded-lg border border-slate-600/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all duration-200"
                >
                  <option value="admin">Admin</option>
                  <option value="partner">Partner</option>
                  <option value="tenant">Tenant</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Role description"
                  className="w-full px-4 py-2.5 bg-slate-700/50 text-white rounded-lg border border-slate-600/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Permissions Matrix */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Module Permissions</h3>
              <div className="text-sm text-slate-400">
                Showing {modules.length} of {modules.length} modules
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-slate-700/50">
              <table className="w-full">
                <thead className="bg-slate-700/30 border-b border-slate-700/50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-slate-300 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-slate-400" />
                        Module
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-slate-300 text-sm">
                      <div className="flex flex-col items-center gap-2">
                        <span>View</span>
                        <input
                          type="checkbox"
                          checked={isAllSelected('view')}
                          onChange={(e) => selectAllForPermission('view', e.target.checked)}
                          className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                        />
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-slate-300 text-sm">
                      <div className="flex flex-col items-center gap-2">
                        <span>Create</span>
                        <input
                          type="checkbox"
                          checked={isAllSelected('create')}
                          onChange={(e) => selectAllForPermission('create', e.target.checked)}
                          className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                        />
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-slate-300 text-sm">
                      <div className="flex flex-col items-center gap-2">
                        <span>Modify</span>
                        <input
                          type="checkbox"
                          checked={isAllSelected('modify')}
                          onChange={(e) => selectAllForPermission('modify', e.target.checked)}
                          className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                        />
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-slate-300 text-sm">
                      <div className="flex flex-col items-center gap-2">
                        <span>Delete</span>
                        <input
                          type="checkbox"
                          checked={isAllSelected('delete')}
                          onChange={(e) => selectAllForPermission('delete', e.target.checked)}
                          className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {modules.map((module, index) => {
                    const IconComponent = module.icon;
                    return (
                      <motion.tr
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="text-slate-300 hover:bg-slate-700/20 transition-colors duration-200"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isModuleFullySelected(module)}
                              onChange={(e) => selectAllForModule(module.id, e.target.checked)}
                              className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                            />
                            <div className="p-2 rounded-lg bg-slate-700/50">
                              <IconComponent size={16} className="text-slate-400" />
                            </div>
                            <span className="font-medium text-white">{module.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="checkbox"
                            checked={module.permissions.view}
                            onChange={(e) => updatePermission(module.id, 'view', e.target.checked)}
                            className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                          />
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="checkbox"
                            checked={module.permissions.create}
                            onChange={(e) => updatePermission(module.id, 'create', e.target.checked)}
                            className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                          />
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="checkbox"
                            checked={module.permissions.modify}
                            onChange={(e) => updatePermission(module.id, 'modify', e.target.checked)}
                            className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                          />
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="checkbox"
                            checked={module.permissions.delete}
                            onChange={(e) => updatePermission(module.id, 'delete', e.target.checked)}
                            className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Summary */}
            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Selected Modules: {modules.filter(m => Object.values(m.permissions).some(p => p)).length} of {modules.length}
                </span>
                <span className="text-slate-400">
                  Total Permissions: {modules.reduce((acc, m) => acc + Object.values(m.permissions).filter(p => p).length, 0)}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 p-6 text-center text-slate-500 text-xs border-t border-slate-700/50">
        <p>© 2025 Secure&. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AddRolePage;