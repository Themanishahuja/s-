import React from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import { User } from '../../types';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400 text-sm">
            <th className="px-6 py-4 font-medium">S No.</th>
            <th className="px-6 py-4 font-medium">Full Name</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Phone</th>
            <th className="px-6 py-4 font-medium">Role</th>
            <th className="px-6 py-4 font-medium">Approval Status</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {users.map((user) => (
            <tr key={user.id} className="text-gray-300 hover:bg-gray-800/50 transition-colors duration-200">
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.fullName}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  user.approvalStatus === 'Approved' 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {user.approvalStatus}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-200">
                  Deactivate
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <Trash2 size={18} className="text-gray-400 hover:text-red-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;