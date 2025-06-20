import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  textColor, 
  trend,
  subtitle 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl p-6 border border-gray-700/50 ${bgColor} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`}></div>
      
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${color} opacity-20 blur-xl rounded-2xl`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className={`text-sm font-medium ${textColor} mb-1 opacity-90`}>{title}</p>
            {subtitle && (
              <p className="text-xs text-gray-400">{subtitle}</p>
            )}
          </div>
          
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
            <Icon size={24} className="text-white drop-shadow-sm" />
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-3xl font-bold text-white mb-1"
            >
              {value}
            </motion.div>
            
            {trend && (
              <div className={`flex items-center gap-1 text-sm ${
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                <span>{trend.isPositive ? '↗' : '↘'}</span>
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 hover:opacity-20 transition-opacity duration-300`}></div>
      </div>
    </motion.div>
  );
};

export default StatCard;