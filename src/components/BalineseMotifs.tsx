import React from 'react';

/**
 * Traditional Balinese Poleng (Kain Poleng) Checkered Ribbon.
 * In Balinese Hindu philosophy, Kain Poleng represents "Rwa Bhineda" —
 * the essential harmony and dynamic balance between opposing cosmic forces
 * (light and dark, joy and sorrow, day and night).
 */
export const PolengRibbon: React.FC<{ className?: string; height?: number }> = ({
  className = '',
  height = 6,
}) => {
  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
      title="Balinese Kain Poleng Motif (Rwa Bhineda - Universal Balance)"
    >
      <svg
        width="100%"
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-full"
      >
        <defs>
          <pattern
            id="poleng-pattern"
            width="16"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* Cell 1: Dark volcanic stone */}
            <rect x="0" y="0" width="8" height={height / 2} fill="#1E1712" />
            {/* Cell 2: Off-white alabaster */}
            <rect x="8" y="0" width="8" height={height / 2} fill="#FAF6EE" />
            {/* Cell 3: Off-white alabaster */}
            <rect x="0" y={height / 2} width="8" height={height / 2} fill="#FAF6EE" />
            {/* Cell 4: Dark volcanic stone */}
            <rect x="8" y={height / 2} width="8" height={height / 2} fill="#1E1712" />
            {/* Saffron gold border stitch */}
            <line x1="0" y1="0" x2="16" y2="0" stroke="#D97724" strokeWidth="0.8" opacity="0.8" />
            <line x1="0" y1={height} x2="16" y2={height} stroke="#D97724" strokeWidth="0.8" opacity="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#poleng-pattern)" />
      </svg>
    </div>
  );
};

/**
 * Frangipani / Bunga Jepun Icon (The sacred temple flower of Bali).
 * Symbolizes devotion, purity, and sacred daily offerings (Canang Sari).
 */
export const FrangipaniIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5',
  size = 20,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 5 Petals of Bunga Jepun / Plumeria */}
      <g transform="translate(20, 20)">
        {[0, 72, 144, 216, 288].map((angle, index) => (
          <path
            key={index}
            d="M0 -4 C -6 -11, -8 -18, 0 -22 C 8 -18, 6 -11, 0 -4 Z"
            fill="#FFFDF7"
            stroke="#EBDAC4"
            strokeWidth="0.75"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Golden-marigold inner petal radiant gradient */}
        {[0, 72, 144, 216, 288].map((angle, index) => (
          <path
            key={`inner-${index}`}
            d="M0 -2 C -3 -6, -4 -10, 0 -13 C 4 -10, 3 -6, 0 -2 Z"
            fill="#F59E0B"
            opacity="0.9"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Core Center Pip */}
        <circle cx="0" cy="0" r="2.8" fill="#D97706" />
        <circle cx="0" cy="0" r="1.4" fill="#B45309" />
      </g>
    </svg>
  );
};

/**
 * Candi Bentar (Balinese Split Temple Gateway) Architectural Silhouette.
 * The split gateway marks the sacred threshold between the outer worldly realm
 * (Jaba) and the sanctified inner temple courtyard (Jeroan).
 */
export const CandiBentarIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-6 h-6',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left Tower */}
      <path d="M4 28H14V5C14 5 12 7 11 9H9C9 9 7 11 6 13H5C4 16 4 28 4 28Z" />
      <path d="M11 9H13V11H11Z" />
      <path d="M8 14H10V16H8Z" />
      {/* Right Tower */}
      <path d="M28 28H18V5C18 5 20 7 21 9H23C23 9 25 11 26 13H27C28 16 28 28 28 28Z" />
      <path d="M19 9H21V11H19Z" />
      <path d="M22 14H24V16H22Z" />
      {/* Threshold Base */}
      <rect x="2" y="27" width="28" height="2" rx="0.5" />
    </svg>
  );
};

/**
 * Balinese Carved Lotus & Floral Hairline Divider
 */
export const BalineseDivider: React.FC<{ label?: string; className?: string }> = ({
  label,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center justify-center my-6 ${className}`}>
      <div className="grow border-t border-[#E3D6C1]"></div>
      <div className="shrink-0 px-4 flex items-center gap-2">
        <FrangipaniIcon size={16} />
        {label && (
          <span className="font-serif-bali text-xs font-semibold uppercase tracking-widest text-[#8C6E54]">
            {label}
          </span>
        )}
        <FrangipaniIcon size={16} />
      </div>
      <div className="grow border-t border-[#E3D6C1]"></div>
    </div>
  );
};

/**
 * Tri Hita Karana Philosophy Strip:
 * The three ancient Balinese principles for holistic well-being and balance.
 */
export const TriHitaKaranaBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2B2118] via-[#3A2D22] to-[#2B2118] text-stone-200 border border-[#E3D6C1]/30 shadow-sm p-4 sm:p-5 ${className}`}
    >
      <PolengRibbon height={4} className="absolute top-0 left-0 right-0 opacity-80" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FrangipaniIcon size={18} />
            <span className="font-serif-bali text-sm sm:text-base font-bold text-[#F3C48C] tracking-wide">
              Tri Hita Karana · Balinese Philosophy of Living
            </span>
          </div>
          <p className="text-xs text-stone-300 font-light max-w-xl leading-relaxed">
            The guiding principle of life across Bali: maintaining perpetual harmony with the spiritual (Parahyangan), society (Pawongan), and nature (Palemahan).
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full md:w-auto text-[11px] font-medium shrink-0">
          <div className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-center">
            <span className="text-[#E8924A] block font-bold">Parahyangan</span>
            <span className="text-stone-400 text-[10px]">Spirit &amp; Temples</span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-center">
            <span className="text-[#E8924A] block font-bold">Pawongan</span>
            <span className="text-stone-400 text-[10px]">Community Harmony</span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-center">
            <span className="text-[#E8924A] block font-bold">Palemahan</span>
            <span className="text-stone-400 text-[10px]">Sacred Nature</span>
          </div>
        </div>
      </div>
      
      <PolengRibbon height={4} className="absolute bottom-0 left-0 right-0 opacity-80" />
    </div>
  );
};
