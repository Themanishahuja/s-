import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  centerValue?: string;
  centerLabel?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, title, centerValue, centerLabel }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl backdrop-blur-sm">
          <p className="text-white font-medium text-sm">{payload[0].name}</p>
          <p className="text-blue-400 text-sm">
            Value: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-slate-300 truncate">{entry.value}</span>
          <span className="text-xs font-medium text-white ml-auto">
            {data.find(d => d.name === entry.value)?.value}
          </span>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      )}
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:brightness-110 transition-all duration-300"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {centerValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{centerValue}</div>
              {centerLabel && <div className="text-xs text-slate-400">{centerLabel}</div>}
            </div>
          </div>
        )}
      </div>
      
      <CustomLegend payload={data.map(d => ({ value: d.name, color: d.color }))} />
    </div>
  );
};

export default DonutChart;