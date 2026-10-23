import React from 'react';
import { PolengRibbon } from './BalineseMotifs';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'currency', label: 'Currency', icon: '💱' },
    { id: 'budget', label: 'Budget', icon: '🌴' },
    { id: 'explorer', label: 'Places', icon: '⛩️' },
    { id: 'routes', label: 'Scooter', icon: '🛵' },
    { id: 'split', label: 'Split', icon: '🥥' },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8DEC8] shadow-lg"
    >
      <PolengRibbon height={2} />
      <div className="flex items-center justify-around max-w-md mx-auto px-2 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer min-w-14 ${
                isActive
                  ? 'text-[#C86432] font-bold'
                  : 'text-[#8C7A6B] hover:text-[#2D2620]'
              }`}
            >
              <span className={`text-lg transition-transform ${isActive ? 'scale-110' : 'opacity-80'}`}>
                {tab.icon}
              </span>
              <span className={`text-[10px] tracking-tight mt-0.5 leading-none ${isActive ? 'font-bold text-[#C86432]' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86432] mt-1"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
