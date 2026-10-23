import React from 'react';

interface SettingsAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetApp: () => void;
}

export const SettingsAboutModal: React.FC<SettingsAboutModalProps> = ({
  isOpen,
  onClose,
  onResetApp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-lg w-full overflow-hidden border border-[#E8DEC8] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DEC8] bg-[#FAF5ED]">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">⚙️</span>
            <h2 className="font-serif-bali text-xl font-bold text-[#2D2620]">
              Settings &amp; Creator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DDD0BC] text-[#6B5D52] hover:bg-[#F0E6D8] flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs text-[#4A3F35]">
          
          {/* Reset Action (from original Android app) */}
          <div className="p-4 rounded-xl bg-white border border-[#E8DEC8] shadow-2xs flex items-center justify-between gap-4">
            <div>
              <span className="font-bold text-sm text-[#2D2620] block">
                Reset Calculator Inputs
              </span>
              <p className="text-[#736357] text-xs mt-0.5">
                Restore currency, trip budget, and route inputs to default Bali traveler settings.
              </p>
            </div>
            <button
              onClick={() => {
                onResetApp();
                onClose();
              }}
              className="px-3.5 py-2 rounded-lg bg-[#FAF0E6] text-[#C86432] hover:bg-[#C86432] hover:text-white border border-[#E8DEC8] text-xs font-semibold whitespace-nowrap cursor-pointer transition-all shadow-2xs"
            >
              ↻ Reset
            </button>
          </div>

          {/* About Creator: PENGGILAS */}
          <section className="p-6 rounded-2xl bg-white border border-[#E8DEC8] shadow-2xs text-center space-y-4">
            
            {/* PENGGILAS Official Logo */}
            <div className="py-2 flex justify-center">
              <img
                src="/images/PENGGILAS_logo_transparent.webp"
                alt="PENGGILAS — Think Right, Know Why"
                className="max-h-14 w-auto object-contain hover:scale-105 transition-transform"
              />
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C86432] block">
                Created &amp; Designed By
              </span>
              <h3 className="font-serif-bali text-xl font-bold text-[#2D2620]">
                PENGGILAS
              </h3>
              <p className="text-[#8C7A6B] text-xs italic font-medium mt-0.5">
                &quot;Think Right, Know Why&quot;
              </p>
            </div>

            <div className="text-[#6B5D52] text-xs leading-relaxed max-w-sm mx-auto space-y-2 border-t border-b border-[#F0E6D8] py-3 text-left">
              <p>
                <strong>Bali Travel Calculator</strong> was created by <strong>PENGGILAS</strong> to empower travelers with simple, practical, and authentic tools for exploring the Island of the Gods.
              </p>
              <p className="text-[11px] text-[#8C7A6B]">
                Calculate real-time currency conversions, estimate customized trip budgets, compute scooter travel time &amp; fuel costs, split group bills, and discover authentic Balinese local recommendations.
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8C7A6B] pt-1">
              <span>Creator: <strong>PENGGILAS</strong></span>
              <span className="px-2 py-0.5 rounded bg-[#FAF0E6] text-[#C86432] font-semibold">
                Version 2.0 (Bali Edition)
              </span>
            </div>

          </section>

        </div>

        {/* Footer Close */}
        <div className="px-6 py-4 border-t border-[#E8DEC8] bg-[#FAF5ED] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2D2620] hover:bg-[#423932] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
