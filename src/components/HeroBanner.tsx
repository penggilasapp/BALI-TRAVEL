import React from 'react';
import { PolengRibbon, FrangipaniIcon, CandiBentarIcon } from './BalineseMotifs';

interface HeroBannerProps {
  onSelectTab: (tab: string) => void;
  selectedCurrency: string;
  onOpenSettings?: () => void;
  activeTab?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectTab,
  selectedCurrency,
  onOpenSettings,
  activeTab = 'currency',
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 md:pt-10 md:pb-12 bg-linear-to-b from-[#FAF4EA] via-[#F6EFE5] to-[#F1E7D8] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Authentic Bali Header Artwork & PENGGILAS branding */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E3D6C1] bg-[#221B15]">
          {/* Sacred Balinese Kain Poleng Ribbon at Top */}
          <PolengRibbon height={5} />

          <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden">
            <img
              src="/images/home-header-bali.webp"
              alt="Bali tropical landscape with Balinese temple and palm trees"
              className="w-full h-full object-cover object-center opacity-90 hover:scale-102 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/src/assets/images/bali_uluwatu_cliff_1792755426566.jpg';
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1A140F]/95 via-[#1A140F]/60 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-10 text-white">
              
              {/* Creator & Balinese Header Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/95 text-[#1F1914] hover:bg-white shadow-xs backdrop-blur-xs transition-all cursor-pointer group border border-white/50"
                  title="PENGGILAS — Think Right, Know Why"
                >
                  <img
                    src="/images/PENGGILAS_logo_transparent.webp"
                    alt="PENGGILAS"
                    className="h-4 sm:h-5 w-auto object-contain"
                  />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B85324]">
                    Creator
                  </span>
                </button>

                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#F3C48C]">
                  <FrangipaniIcon size={14} />
                  <span>Om Swastyastu</span>
                  <span aria-hidden="true" className="text-stone-400">·</span>
                  <span className="hidden sm:inline text-stone-200 font-normal">Island of the Gods</span>
                  <span aria-hidden="true" className="hidden sm:inline text-stone-400">·</span>
                  <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#E8924A] font-mono">
                    <CandiBentarIcon size={13} />
                    <span>Bali Cultural Suite</span>
                  </span>
                </div>
              </div>

              <h1 className="font-serif-bali text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
                Bali Travel Calculator &amp; Explorer
              </h1>

              <p className="text-xs sm:text-sm text-stone-200 max-w-2xl font-light leading-relaxed">
                Simple, practical tools for your Bali journey created by <strong>PENGGILAS</strong>. Convert currency in real time, calculate personalized trip budgets, estimate scooter transit across village shortcuts, and uncover sacred Balinese sanctuaries.
              </p>

            </div>
          </div>

          {/* Quick Rates Bar with Poleng Divider */}
          <div className="bg-[#1C1611] text-stone-300 px-6 py-3 border-t border-[#382B21] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#E8924A] font-medium">
              <FrangipaniIcon size={15} />
              <span>Bali Benchmark Exchange (1 Unit = IDR):</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono tabular-nums text-stone-300">
              <span>🇺🇸 $1 USD = <strong className="text-white">Rp 16,250</strong></span>
              <span>🇦🇺 A$1 AUD = <strong className="text-white">Rp 10,720</strong></span>
              <span>🇪🇺 €1 EUR = <strong className="text-white">Rp 17,650</strong></span>
              <span>🇬🇧 £1 GBP = <strong className="text-white">Rp 21,100</strong></span>
              <span>🇸🇬 S$1 SGD = <strong className="text-white">Rp 12,580</strong></span>
            </div>
          </div>

          {/* Bottom Poleng Accent Ribbon */}
          <PolengRibbon height={4} />
        </div>

        {/* 5 Core Feature Cards Grid with Active Highlights & High Legibility */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mt-6">
          
          {/* Card 1: Currency Converter */}
          <button
            onClick={() => onSelectTab('currency')}
            className={`group text-left p-4.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeTab === 'currency'
                ? 'bg-white border-[#B85324] shadow-md ring-2 ring-[#B85324]/20'
                : 'bg-white border-[#E8DEC8] hover:border-[#B85324] shadow-2xs hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF0E6] text-[#B85324] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform border border-[#E8DEC8]">
                  💱
                </div>
                {activeTab === 'currency' ? (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#B85324] bg-[#FAF0E6] px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                    Selected
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8C7A6B]">01</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-[#2D2620] group-hover:text-[#B85324] transition-colors leading-tight">
                Currency Converter
              </h3>
              <p className="text-xs text-[#736357] mt-1.5 line-clamp-2 leading-relaxed">
                Instant IDR exchange rates with Bali tourist expense presets.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#B85324] mt-3 block group-hover:translate-x-0.5 transition-transform">
              Open Converter →
            </span>
          </button>

          {/* Card 2: Trip Budget */}
          <button
            onClick={() => onSelectTab('budget')}
            className={`group text-left p-4.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeTab === 'budget'
                ? 'bg-white border-[#B85324] shadow-md ring-2 ring-[#B85324]/20'
                : 'bg-white border-[#E8DEC8] hover:border-[#B85324] shadow-2xs hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF0E6] text-[#2F5C3E] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform border border-[#E8DEC8]">
                  🌴
                </div>
                {activeTab === 'budget' ? (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#B85324] bg-[#FAF0E6] px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                    Selected
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8C7A6B]">02</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-[#2D2620] group-hover:text-[#B85324] transition-colors leading-tight">
                Trip Budget Estimator
              </h3>
              <p className="text-xs text-[#736357] mt-1.5 line-clamp-2 leading-relaxed">
                Automatic daily &amp; total spending for villas, warungs, tours &amp; massage.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#B85324] mt-3 block group-hover:translate-x-0.5 transition-transform">
              Plan Budget →
            </span>
          </button>

          {/* Card 3: Authentic Places */}
          <button
            onClick={() => onSelectTab('explorer')}
            className={`group text-left p-4.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeTab === 'explorer'
                ? 'bg-white border-[#B85324] shadow-md ring-2 ring-[#B85324]/20'
                : 'bg-white border-[#E8DEC8] hover:border-[#B85324] shadow-2xs hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF0E6] text-[#D97706] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform border border-[#E8DEC8]">
                  ⛩️
                </div>
                {activeTab === 'explorer' ? (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#B85324] bg-[#FAF0E6] px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                    Selected
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8C7A6B]">03</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-[#2D2620] group-hover:text-[#B85324] transition-colors leading-tight">
                Authentic Explorer
              </h3>
              <p className="text-xs text-[#736357] mt-1.5 line-clamp-2 leading-relaxed">
                Handpicked sacred temples, waterfalls &amp; secluded beaches with fees.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#B85324] mt-3 block group-hover:translate-x-0.5 transition-transform">
              Explore Spots →
            </span>
          </button>

          {/* Card 4: Scooter & Fuel */}
          <button
            onClick={() => onSelectTab('routes')}
            className={`group text-left p-4.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeTab === 'routes'
                ? 'bg-white border-[#B85324] shadow-md ring-2 ring-[#B85324]/20'
                : 'bg-white border-[#E8DEC8] hover:border-[#B85324] shadow-2xs hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF0E6] text-[#2563EB] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform border border-[#E8DEC8]">
                  🛵
                </div>
                {activeTab === 'routes' ? (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#B85324] bg-[#FAF0E6] px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                    Selected
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8C7A6B]">04</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-[#2D2620] group-hover:text-[#B85324] transition-colors leading-tight">
                Scooter &amp; Fuel
              </h3>
              <p className="text-xs text-[#736357] mt-1.5 line-clamp-2 leading-relaxed">
                Travel time &amp; fuel cost calculator factoring Bali traffic realities.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#B85324] mt-3 block group-hover:translate-x-0.5 transition-transform">
              Calculate Route →
            </span>
          </button>

          {/* Card 5: Split Cost */}
          <button
            onClick={() => onSelectTab('split')}
            className={`group text-left p-4.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between col-span-2 sm:col-span-1 ${
              activeTab === 'split'
                ? 'bg-white border-[#B85324] shadow-md ring-2 ring-[#B85324]/20'
                : 'bg-white border-[#E8DEC8] hover:border-[#B85324] shadow-2xs hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF0E6] text-[#9D174D] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform border border-[#E8DEC8]">
                  👥
                </div>
                {activeTab === 'split' ? (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#B85324] bg-[#FAF0E6] px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                    Selected
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8C7A6B]">05</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-[#2D2620] group-hover:text-[#B85324] transition-colors leading-tight">
                Split Group Bill
              </h3>
              <p className="text-xs text-[#736357] mt-1.5 line-clamp-2 leading-relaxed">
                Divide villa, driver &amp; dinner bills with Bali 10%+11% tax &amp; service.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#B85324] mt-3 block group-hover:translate-x-0.5 transition-transform">
              Split Bill →
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};
