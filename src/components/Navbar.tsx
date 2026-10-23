import React from 'react';
import { SUPPORTED_CURRENCIES } from '../data/currenciesData';
import { PolengRibbon, FrangipaniIcon } from './BalineseMotifs';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCurrency: string;
  setSelectedCurrency: (code: string) => void;
  onOpenTips: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCurrency,
  setSelectedCurrency,
  onOpenTips,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 h-16 sm:h-18">
          
          {/* Zone 1: Brand with PENGGILAS Logo & App Icon */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('currency')}
              className="text-left flex items-center gap-2 sm:gap-2.5 group cursor-pointer focus:outline-none shrink-0"
              title="Bali Travel Calculator by PENGGILAS"
            >
              <img
                src="/images/bali-app-icon.png"
                alt="Bali Travel Calculator"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-contain shadow-xs border border-[#E8DEC8] bg-[#2A231C] p-0.5 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="font-serif-bali text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#2D2620] group-hover:text-[#C86432] transition-colors whitespace-nowrap shrink-0">
                  BALI TRAVEL
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-[#8C7A6B] -mt-0.5 sm:-mt-1 flex items-center gap-1">
                  <span>PENGGILAS</span>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="italic text-[#C86432] hidden sm:inline">Think Right</span>
                </span>
              </div>
            </button>

            {/* PENGGILAS Brand Pill / Logo Badge (Large screens) */}
            <button
              onClick={onOpenSettings}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E0D4C0] hover:border-[#C86432] shadow-2xs hover:shadow-xs transition-all cursor-pointer group shrink-0"
              title="Creator: PENGGILAS — Think Right, Know Why"
            >
              <img
                src="/images/PENGGILAS_logo_transparent.webp"
                alt="PENGGILAS"
                className="h-4.5 w-auto object-contain group-hover:opacity-90"
              />
            </button>
          </div>

          {/* Zone 2: Desktop & Tablet Nav links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-medium text-[#6B5D52]">
            <button
              onClick={() => setActiveTab('currency')}
              className={`hover:text-[#C86432] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'currency' ? 'text-[#C86432] border-b-2 border-[#C86432] font-semibold' : ''
              }`}
            >
              Currency
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`hover:text-[#C86432] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'budget' ? 'text-[#C86432] border-b-2 border-[#C86432] font-semibold' : ''
              }`}
            >
              Trip Budget
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`hover:text-[#C86432] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'explorer' ? 'text-[#C86432] border-b-2 border-[#C86432] font-semibold' : ''
              }`}
            >
              Authentic Places
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`hover:text-[#C86432] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'routes' ? 'text-[#C86432] border-b-2 border-[#C86432] font-semibold' : ''
              }`}
            >
              Scooter &amp; Routes
            </button>
            <button
              onClick={() => setActiveTab('split')}
              className={`hover:text-[#C86432] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'split' ? 'text-[#C86432] border-b-2 border-[#C86432] font-semibold' : ''
              }`}
            >
              Split Bill
            </button>
          </nav>

          {/* Zone 3: Currency Selector + Cheatsheet + Settings */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Currency Selector */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-white border border-[#DDD0BC] rounded-lg px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-[#2D2620] shadow-2xs hover:border-[#C86432] focus:ring-1 focus:ring-[#C86432] focus:outline-none cursor-pointer transition-colors max-w-28 sm:max-w-none"
                aria-label="Select home currency"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Bali Cheatsheet button */}
            <button
              onClick={onOpenTips}
              className="hidden sm:flex px-2.5 sm:px-3 py-1.5 text-xs font-medium text-white bg-[#B85324] hover:bg-[#9E4219] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer items-center gap-1.5 border border-[#9E4219]"
            >
              <FrangipaniIcon size={14} />
              <span>Bali Cheatsheet</span>
            </button>

            {/* Mobile Cheatsheet Quick Icon */}
            <button
              onClick={onOpenTips}
              className="sm:hidden w-8 h-8 rounded-lg bg-[#FAF0E6] text-[#B85324] border border-[#E8DEC8] flex items-center justify-center text-xs font-bold cursor-pointer"
              title="Bali Cheatsheet & Tips"
              aria-label="Bali Cheatsheet"
            >
              <FrangipaniIcon size={16} />
            </button>

            {/* Settings & Creator Modal Trigger */}
            <button
              onClick={onOpenSettings}
              className="w-8 h-8 rounded-lg bg-white border border-[#DDD0BC] hover:border-[#B85324] hover:bg-[#FAF0E6] text-[#6B5D52] hover:text-[#B85324] flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0"
              title="Settings & About Creator PENGGILAS"
              aria-label="Settings and About Creator"
            >
              <span className="text-sm">⚙️</span>
            </button>
          </div>

        </div>
      </div>
      <PolengRibbon height={3} />
    </header>
  );
};
