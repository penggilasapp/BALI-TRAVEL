import React from 'react';
import { PolengRibbon, FrangipaniIcon, CandiBentarIcon } from './BalineseMotifs';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenTips: () => void;
  onOpenSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenTips, onOpenSettings }) => {
  return (
    <footer className="mt-16 bg-[#171310] text-stone-300 border-t border-stone-800">
      <PolengRibbon height={5} />
      
      {/* Authentic Footer Artwork Banner ("Good Trips Happier Days") */}
      <div className="relative w-full overflow-hidden bg-stone-900 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <img
            src="/images/home-footer-bali.webp"
            alt="Bali coastal illustration with Good Trips Happier Days"
            className="w-full max-h-52 object-contain mx-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: PENGGILAS Creator & Brand */}
          <div className="md:col-span-2 space-y-4">
            
            {/* PENGGILAS Brand Block */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenSettings}
                className="bg-white p-2 rounded-xl border border-stone-700 shadow-sm hover:scale-105 transition-transform cursor-pointer"
                title="PENGGILAS — Think Right, Know Why"
              >
                <img
                  src="/images/PENGGILAS_logo_transparent.webp"
                  alt="PENGGILAS — Think Right, Know Why"
                  className="h-7 w-auto object-contain"
                />
              </button>

              <div>
                <span className="font-serif-bali text-lg font-bold text-white tracking-tight block">
                  BALI TRAVEL CALCULATOR
                </span>
                <span className="text-xs text-[#E8924A] font-medium tracking-wide">
                  Created by PENGGILAS
                </span>
              </div>
            </div>
            
            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              Designed and developed by <strong>PENGGILAS</strong> (<em>Think Right, Know Why</em>). Dedicated to empowering travelers with transparent, automatic travel cost estimations and authentic Balinese cultural insights.
            </p>

            <div className="text-[11px] text-[#E8924A] font-serif-bali italic">
              &quot;Tri Hita Karana — Living in sacred harmony with fellow humans, nature, and the divine.&quot;
            </div>
          </div>

          {/* Col 2: Island Tools */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-white text-[11px] block">
              Travel Calculators
            </span>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('currency')}
                  className="hover:text-[#E8924A] transition-colors cursor-pointer"
                >
                  Live Currency Converter (IDR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('budget')}
                  className="hover:text-[#E8924A] transition-colors cursor-pointer"
                >
                  Automated Trip Budget Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('routes')}
                  className="hover:text-[#E8924A] transition-colors cursor-pointer"
                >
                  Scooter Routes &amp; Petrol Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('split')}
                  className="hover:text-[#E8924A] transition-colors cursor-pointer"
                >
                  Group Bill &amp; Beach Club Split
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Exploration & Creator Info */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-white text-[11px] block">
              Island Discovery &amp; About
            </span>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('explorer')}
                  className="hover:text-[#E8924A] transition-colors cursor-pointer"
                >
                  Authentic Places &amp; Hidden Gems
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTips}
                  className="hover:text-[#E8924A] transition-colors cursor-pointer"
                >
                  Temple Etiquette &amp; Sarong Rules
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSettings}
                  className="hover:text-[#E8924A] transition-colors cursor-pointer font-semibold text-stone-300"
                >
                  About PENGGILAS &amp; Reset App ⚙️
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTips}
                  className="hover:text-[#E8924A] transition-colors cursor-pointer text-left"
                >
                  Official Bali Tourist Levy Info (Rp 150.000)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal / Copyright & Creator Credit */}
        <div className="mt-10 pt-6 border-t border-stone-800 text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Bali Travel Calculator.</span>
            <span>·</span>
            <span className="text-stone-400">Design &amp; Concept by <strong>PENGGILAS</strong></span>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <FrangipaniIcon size={14} />
            <span className="text-[#F3C48C] font-serif-bali font-semibold">Matur Suksma</span>
            <span>·</span>
            <span>Safe Travels across Bali</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
