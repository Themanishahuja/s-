import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface AreaChartProps {
  data: Array<{
    name: string;
    [key: string]: any;
  }>;
  title: string;
  areas: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
}

const CustomAreaChart: React.FC<AreaChartProps> = ({ data, title, areas }) => {
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
      
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {areas.map((area, index) => (
              <linearGradient key={index} id={`gradient-${area.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={area.color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={area.color} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
          
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
            iconType="circle"
          />
          
          {areas.map((area, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={area.dataKey}
              stroke={area.color}
              strokeWidth={2}
              fill={`url(#gradient-${area.dataKey})`}
              name={area.name}
              animationDuration={1500}
              animationBegin={index * 200}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaChart;