import React from 'react';
import { DashboardCardProps } from '../../types';

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon: Icon,
  bgColor,
  onClick 
}) => {
  const IconComponent = Icon ? React.createElement(Icon, { 
    size: 24, 
    className: "text-white opacity-90" 
  }) : null;

  return (
    <button
      onClick={onClick}
      className={`relative group overflow-hidden rounded-xl p-6 transition-all duration-300
                  bg-gradient-to-br ${bgColor} backdrop-blur-md
                  border border-white/10 hover:border-white/20
                  shadow-lg hover:shadow-xl
                  transform hover:-translate-y-1`}
    >
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 bg-white/10 p-3 rounded-full">
            {IconComponent}
          </div>
          <h3 className="text-white font-medium">{title}</h3>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                      opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 group-hover:duration-200"></div>
    </button>
  );
};

export default DashboardCard;