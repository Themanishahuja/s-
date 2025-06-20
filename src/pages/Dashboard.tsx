import React from 'react';
import DashboardGrid from '../components/dashboard/DashboardGrid';

const Dashboard: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <DashboardGrid />
      </div>
      
      <footer className="p-4 text-center text-gray-500 text-sm">
        <p>© 2025 Secure&. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;