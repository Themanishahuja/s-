import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Trash2 } from 'lucide-react';
import AddUserModal from '../components/admin/AddUserModal';
import UserTable from '../components/admin/UserTable';
import { User } from '../types';

const AdminPage: React.FC = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const initialUsers: User[] = [
    {
      id: 1,
      fullName: 'Assessor',
      email: 'assessor@gmail.com',
      phone: '1234567890',
      role: 'Assessor',
      approvalStatus: 'Approved',
      status: 'Active'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">All Employees</h1>
            <p className="text-gray-400 mt-1">Manage your organization's employees</p>
          </div>
          
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} />
            Add User
          </button>
        </div>

        <div className="bg-gray-900/50 rounded-xl border border-gray-800">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <UserTable users={initialUsers} />
        </div>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />

      <footer className="mt-auto p-4 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>© 2025 Secure&. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;