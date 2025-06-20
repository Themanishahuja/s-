import React, { useState } from 'react';
import { Search, Download, Upload, Filter, MoreVertical, Eye, Edit, Trash2, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

interface JiraIssue {
  id: number;
  issueId: string;
  issueType: string;
  issueDescription: string;
  projectName: string;
  projectType: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  assignee: string;
  status: 'Open' | 'ReOpen' | 'Closed';
  remediatedDate: string;
  creatorName: string;
  creatorEmail: string;
}

const JiraDataPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const jiraIssues: JiraIssue[] = [
    {
      id: 1,
      issueId: '67ffa44cc301178292841db',
      issueType: 'test',
      issueDescription: 'This is only for testing',
      projectName: 'software',
      projectType: 'Online System',
      priority: 'High',
      assignee: 'unassigned',
      status: 'ReOpen',
      remediatedDate: '01 Jan 45769',
      creatorName: 'admin',
      creatorEmail: 'admin@gmail.com'
    },
    {
      id: 2,
      issueId: '67ffa44cc301178292841df',
      issueType: 'test',
      issueDescription: 'This is only for testing',
      projectName: 'software',
      projectType: 'Online System',
      priority: 'Informational',
      assignee: 'unassigned',
      status: 'Open',
      remediatedDate: '01 Jan 45771',
      creatorName: 'admin',
      creatorEmail: 'admin@gmail.com'
    },
    {
      id: 3,
      issueId: '67ffa44cc301178292841el',
      issueType: 'test',
      issueDescription: 'This is only for testing',
      projectName: 'software',
      projectType: 'Online System',
      priority: 'Medium',
      assignee: 'unassigned',
      status: 'ReOpen',
      remediatedDate: '01 Jan 45772',
      creatorName: 'admin',
      creatorEmail: 'admin@gmail.com'
    },
    {
      id: 4,
      issueId: '67ffa44cc301178292841e3',
      issueType: 'test',
      issueDescription: 'This is only for testing',
      projectName: 'software',
      projectType: 'Online System',
      priority: 'Critical',
      assignee: 'unassigned',
      status: 'Closed',
      remediatedDate: '01 Jan 45773',
      creatorName: 'admin',
      creatorEmail: 'admin@gmail.com'
    },
    {
      id: 5,
      issueId: '67ffa44cc301178292841e5',
      issueType: 'test',
      issueDescription: 'This is only for testing',
      projectName: 'software',
      projectType: 'Online System',
      priority: 'Low',
      assignee: 'unassigned',
      status: 'Open',
      remediatedDate: '01 Jan 45773',
      creatorName: 'admin',
      creatorEmail: 'admin@gmail.com'
    },
    {
      id: 6,
      issueId: '67ffa44cc301178292841e9',
      issueType: 'test',
      issueDescription: 'This is only for testing',
      projectName: 'software',
      projectType: 'Online System',
      priority: 'Medium',
      assignee: 'unassigned',
      status: 'Closed',
      remediatedDate: '01 Jan 45806',
      creatorName: 'admin',
      creatorEmail: 'admin@gmail.com'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Informational': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <Clock size={14} className="text-blue-400" />;
      case 'ReOpen': return <AlertCircle size={14} className="text-yellow-400" />;
      case 'Closed': return <CheckCircle size={14} className="text-green-400" />;
      default: return <XCircle size={14} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ReOpen': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Closed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(jiraIssues.map(issue => issue.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Jira Data Management</h1>
            <p className="text-gray-400 mt-1">Monitor and manage your Jira issues and project data</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700">
              <Download size={18} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Upload size={18} />
              Upload
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-4 border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total Issues</p>
                <p className="text-2xl font-bold text-white">{jiraIssues.length}</p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <AlertCircle size={20} className="text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-4 border border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Closed</p>
                <p className="text-2xl font-bold text-white">{jiraIssues.filter(i => i.status === 'Closed').length}</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle size={20} className="text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-xl p-4 border border-yellow-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-white">{jiraIssues.filter(i => i.status === 'ReOpen').length}</p>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock size={20} className="text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-xl p-4 border border-red-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Critical</p>
                <p className="text-2xl font-bold text-white">{jiraIssues.filter(i => i.priority === 'Critical').length}</p>
              </div>
              <div className="p-2 bg-red-500/20 rounded-lg">
                <XCircle size={20} className="text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 mb-6">
          <div className="p-4 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search issues, projects, or assignees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="reopen">ReOpen</option>
                  <option value="closed">Closed</option>
                </select>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700">
                  <Filter size={18} />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                  <th className="px-4 py-4 font-medium">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === jiraIssues.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-4 font-medium">ID</th>
                  <th className="px-4 py-4 font-medium">Issue ID</th>
                  <th className="px-4 py-4 font-medium">Type</th>
                  <th className="px-4 py-4 font-medium">Description</th>
                  <th className="px-4 py-4 font-medium">Project</th>
                  <th className="px-4 py-4 font-medium">Priority</th>
                  <th className="px-4 py-4 font-medium">Assignee</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-4 py-4 font-medium">Date</th>
                  <th className="px-4 py-4 font-medium">Creator</th>
                  <th className="px-4 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {jiraIssues.map((issue) => (
                  <tr key={issue.id} className="text-gray-300 hover:bg-gray-800/30 transition-colors duration-200">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(issue.id)}
                        onChange={(e) => handleSelectItem(issue.id, e.target.checked)}
                        className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-4 font-medium text-white">{issue.id}</td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-sm bg-gray-800 px-2 py-1 rounded">
                        {issue.issueId}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm border border-purple-500/30">
                        {issue.issueType}
                      </span>
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <div className="truncate" title={issue.issueDescription}>
                        {issue.issueDescription}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-white">{issue.projectName}</div>
                        <div className="text-sm text-gray-400">{issue.projectType}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded text-sm border ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                        {issue.assignee}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`flex items-center gap-2 px-2 py-1 rounded text-sm border ${getStatusColor(issue.status)}`}>
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">{issue.remediatedDate}</td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-white">{issue.creatorName}</div>
                        <div className="text-sm text-gray-400">{issue.creatorEmail}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200" title="View">
                          <Eye size={16} className="text-gray-400 hover:text-blue-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200" title="Edit">
                          <Edit size={16} className="text-gray-400 hover:text-yellow-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200" title="Delete">
                          <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-800">
            <div className="text-sm text-gray-400">
              Showing {jiraIssues.length} of {jiraIssues.length} results
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700">
                Previous
              </button>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Page 1
              </span>
              <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-auto p-4 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>© 2025 Secure&. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JiraDataPage;