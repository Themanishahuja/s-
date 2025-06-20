import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'User'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Add New User</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Phone
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Role
            </label>
            <select
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Assessor">Assessor</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;