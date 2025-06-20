import React from 'react';
import Avatar from '../ui/Avatar';

interface HeaderProps {
  userName: string;
  userInitial: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userInitial }) => {
  return (
    <header className="px-6 py-4 flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Hello, {userName}
        </h1>
        <p className="text-gray-400 mt-1">
          Welcome to risk operations center
        </p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
            3
          </div>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </div>
        
        <Avatar initial={userInitial} />
      </div>
    </header>
  );
};

export default Header;