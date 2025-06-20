import React, { useState } from 'react';
import Logo from '../ui/Logo';
import { NavItem } from '../../types';
import { navItems } from '../../utils/constants';
import { 
  LayoutDashboard, 
  Server, 
  BarChart3, 
  Bell, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  currentPage?: string;
  setCurrentPage?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage = 'dashboard', setCurrentPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (title: string) => {
    switch (title) {
      case 'Dashboard': return <LayoutDashboard size={20} />;
      case 'Infrastructure Vulnerability': return <Server size={20} />;
      case 'Analytics': return <BarChart3 size={20} />;
      case 'Alerts': return <Bell size={20} />;
      case 'Settings': return <Settings size={20} />;
      default: return <LayoutDashboard size={20} />;
    }
  };

  const getPageKey = (title: string) => {
    switch (title) {
      case 'Dashboard': return 'dashboard';
      case 'Infrastructure Vulnerability': return 'infrastructure-vulnerability';
      case 'Analytics': return 'analytics';
      case 'Alerts': return 'alerts';
      case 'Settings': return 'settings';
      default: return 'dashboard';
    }
  };

  return (
    <aside 
      className={`h-full flex flex-col py-6 px-4 bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-md border-r border-gray-800/50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="px-2 mb-8">
        <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          {isExpanded && <Logo />}
        </div>
        {!isExpanded && (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S&</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        {isExpanded && (
          <h2 className="text-2xl font-bold text-white leading-tight px-2 mb-8">
            AI-Powered<br />VROC
          </h2>
        )}
        
        <nav className="mt-8">
          <ul className="space-y-2">
            {navItems.map((item: NavItem, index) => {
              const pageKey = getPageKey(item.title);
              const isActive = currentPage === pageKey;
              
              return (
                <li key={index}>
                  <button 
                    onClick={() => setCurrentPage && setCurrentPage(pageKey)}
                    className={`w-full flex items-center py-3 px-3 rounded-lg transition-all duration-200 group
                                ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                    title={!isExpanded ? item.title : ''}
                  >
                    <div className="w-5 h-5 flex-shrink-0">
                      {getIcon(item.title)}
                    </div>
                    <span className={`ml-3 transition-all duration-300 ${
                      isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}>
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      <div className="mt-auto">
        <div className={`p-4 rounded-lg bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/30 transition-all duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          {isExpanded && (
            <>
              <h3 className="font-medium text-blue-400">Security Status</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-white">Systems Secure</span>
              </div>
            </>
          )}
        </div>
        {!isExpanded && (
          <div className="flex justify-center">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;