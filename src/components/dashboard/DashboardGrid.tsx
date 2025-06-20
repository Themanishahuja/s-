import React from 'react';
import DashboardCard from './DashboardCard';
import { dashboardCards } from '../../utils/constants';

const DashboardGrid: React.FC = () => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        Virtual Risk Operations Centre (VROC)
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4">
        {dashboardCards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            icon={card.icon}
            bgColor={card.bgColor}
            onClick={() => console.log(`Clicked on ${card.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardGrid;