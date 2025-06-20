import React from 'react';
import { motion } from 'framer-motion';

interface ProgressItem {
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
}

interface ProgressChartProps {
  data: ProgressItem[];
  title: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, title }) => {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      )}
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {item.icon && (
                  <div className="p-2 rounded-lg bg-slate-700/50">
                    {item.icon}
                  </div>
                )}
                <span className="text-slate-300 font-medium text-sm">{item.label}</span>
              </div>
              <span className="text-white font-bold text-sm">{item.value}%</span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ 
                    backgroundColor: item.color,
                    boxShadow: `0 0 8px ${item.color}40`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;