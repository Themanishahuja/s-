import React from 'react';
import { Shield } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Shield size={28} className="text-blue-500" />
        <div className="absolute inset-0 bg-blue-500 blur-sm opacity-50 rounded-full"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl text-blue-500">Secure<span className="text-white">&</span></span>
      </div>
    </div>
  );
};

export default Logo;