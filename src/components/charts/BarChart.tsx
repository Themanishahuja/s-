import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface BarChartProps {
  data: Array<{
    name: string;
    [key: string]: any;
  }>;
  title: string;
  bars: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  height?: number;
}

const CustomBarChart: React.FC<BarChartProps> = ({ data, title, bars, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl backdrop-blur-sm">
          <p className="text-white font-medium mb-2 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
          
          {bars.map((bar, index) => (
            <Bar
              key={index}
              dataKey={bar.dataKey}
              fill={bar.color}
              name={bar.name}
              radius={[2, 2, 0, 0]}
              animationDuration={1000}
              animationBegin={index * 200}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;