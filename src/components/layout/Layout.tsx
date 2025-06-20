import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  setCurrentPage?: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="flex h-screen bg-[#0e0e12] text-white overflow-hidden">
      <div className="h-full">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Admin" userInitial="A" />
        
        <main className="flex-1 overflow-auto relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Ambient light effects */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/10 rounded-full filter blur-[120px]"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;