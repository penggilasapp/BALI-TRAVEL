import React, { useState, useEffect } from 'react';
import { SUPPORTED_CURRENCIES, formatIDR, formatForeign, fetchLiveExchangeRates } from '../data/currenciesData';
import imgSacredSpring from '../assets/images/bali_sacred_spring_1792755427650.jpg';
import { PolengRibbon, FrangipaniIcon, CandiBentarIcon } from './BalineseMotifs';

interface CurrencyConverterProps {
  initialForeignCurrency?: string;
  onCurrencyChange?: (code: string) => void;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  initialForeignCurrency = 'USD',
  onCurrencyChange,
}) => {
  const [fromCode, setFromCode] = useState<string>(initialForeignCurrency);
  const [toCode, setToCode] = useState<string>('IDR');
  const [amount, setAmount] = useState<string>('100');
  const [liveRates, setLiveRates] = useState<Record<string, number>>({});
  const [rateSource, setRateSource] = useState<string>('Loading rates...');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    fetchLiveExchangeRates().then((res) => {
      if (mounted) {
        setLiveRates(res.rates);
        setRateSource(res.source);
        setIsLive(res.isLive);
        setLastUpdated(res.lastUpdated);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const getRate = (code: string): number => {
    return liveRates[code] || SUPPORTED_CURRENCIES.find((c) => c.code === code)?.rateToIdr || 1;
  };

  // Convert fromCode to toCode
  const numAmount = parseFloat(amount) || 0;
  
  // Calculate value in IDR first
  const valueInIDR = fromCode === 'IDR' ? numAmount : numAmount * getRate(fromCode);
  
  // Then convert IDR to toCode
  const convertedResult = toCode === 'IDR' ? valueInIDR : valueInIDR / getRate(toCode);

  const exchangeRateUnit = fromCode === 'IDR' 
    ? (1 / getRate(toCode)).toFixed(6) 
    : toCode === 'IDR' 
      ? getRate(fromCode).toLocaleString('en-US') 
      : (getRate(fromCode) / getRate(toCode)).toFixed(4);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
    if (toCode !== 'IDR' && onCurrencyChange) {
      onCurrencyChange(toCode);
    }
  };

  const handleFromChange = (code: string) => {
    setFromCode(code);
    if (code !== 'IDR' && onCurrencyChange) {
      onCurrencyChange(code);
    }
  };

  // Bali Expense Presets
  const presets = [
    { label: 'Warung Nasi Campur', idr: 35000, icon: '🍛' },
    { label: 'Fresh Coconut / Drink', idr: 40000, icon: '🥥' },
    { label: 'Temple Entrance Ticket', idr: 50000, icon: '🎟️' },
    { label: 'Daily Scooter Rental', idr: 150000, icon: '🛵' },
    { label: '1-Hour Balinese Massage', idr: 150000, icon: '💆' },
    { label: 'Bali Tourist Levy', idr: 150000, icon: '🏛️' },
    { label: 'Private Surf Lesson (2h)', idr: 350000, icon: '🏄' },
    { label: 'Private Driver Full Day', idr: 650000, icon: '🚗' },
    { label: 'Boutique Private Villa/Night', idr: 1500000, icon: '🏡' },
  ];

  const cheatSheetAmounts = [20000, 50000, 100000, 250000, 500000, 1000000, 2500000, 5000000];
  const targetForeign = fromCode === 'IDR' ? toCode : fromCode;

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DEC8] pb-4">
        <div>
          <h2 className="bali-page-title">
            Bali Currency Converter
          </h2>
          <p className="bali-subtitle mt-0.5">
            Instant exchange rates for Indonesian Rupiah (IDR) and major global currencies.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#8C7A6B] bg-[#F5EFE6] px-3 py-1.5 rounded-lg border border-[#E3D6C1] self-start sm:self-auto font-mono tabular-nums">
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          <span>{rateSource}</span>
          {lastUpdated && <span className="text-[#A39282]">· {lastUpdated}</span>}
        </div>
      </div>

      {/* Visual Cultural Banner: Sacred Spring & Temple Commerce */}
      <div className="relative rounded-2xl overflow-hidden border border-[#E3D6C1] shadow-xs bg-[#221B15]">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden">
          <img
            src={imgSacredSpring}
            alt="Tirta Empul Sacred Water Spring in Bali"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#17120E]/90 via-[#17120E]/50 to-transparent flex flex-col justify-center p-6 sm:p-8 text-white max-w-xl">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F3C48C] mb-1">
              <FrangipaniIcon size={14} />
              <span>Sacred Commerce &amp; Travel Finance</span>
            </div>
            <h3 className="font-serif-bali text-xl sm:text-2xl font-bold text-white mb-1.5">
              Rupiah Mastery for Island Travelers
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed font-light">
              Cash remains essential across Bali for sacred temple entry, local warungs, and beach parking. Calculate exact live conversions before visiting money changers.
            </p>
          </div>
        </div>
        <PolengRibbon height={4} />
      </div>

      {/* Main Conversion Card */}
      <div className="bg-white rounded-2xl border border-[#E3D6C1] shadow-xs overflow-hidden">
        <PolengRibbon height={5} />
        <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-end">
          
          {/* FROM INPUT */}
          <div className="space-y-2">
            <label htmlFor="currency-amount" className="bali-form-label block">
              Amount to Convert
            </label>
            <div className="relative">
              <input
                id="currency-amount"
                type="number"
                min="0"
                step="any"
                value={amount}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  let cleaned = e.target.value;
                  // Strip leading zeroes if followed by digits, e.g. "05000" -> "5000"
                  if (/^0\d/.test(cleaned)) {
                    cleaned = cleaned.replace(/^0+(?=\d)/, '');
                  }
                  setAmount(cleaned);
                }}
                placeholder="0"
                className="w-full bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl px-4 py-3 text-xl font-bold text-[#2D2620] focus:ring-2 focus:ring-[#C86432] focus:border-[#C86432] focus:outline-none transition-all tabular-nums"
              />
            </div>
            
            <div className="pt-1">
              <select
                value={fromCode}
                onChange={(e) => handleFromChange(e.target.value)}
                className="w-full bg-white border border-[#DDD0BC] rounded-lg px-3 py-2 text-sm font-medium text-[#2D2620] hover:border-[#C86432] focus:ring-1 focus:ring-[#C86432] focus:outline-none cursor-pointer transition-colors"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SWAP BUTTON */}
          <div className="flex justify-center md:pb-2">
            <button
              onClick={handleSwap}
              type="button"
              className="w-11 h-11 rounded-full bg-[#FAF0E6] text-[#C86432] border border-[#E8DEC8] hover:bg-[#C86432] hover:text-white transition-all shadow-2xs flex items-center justify-center cursor-pointer hover:rotate-180 transform duration-300"
              title="Swap currencies"
              aria-label="Swap currencies"
            >
              ⇄
            </button>
          </div>

          {/* TO RESULT */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="bali-form-label">
                Converted Output
              </span>
              <span className="text-xs text-[#8C7A6B] font-mono tabular-nums">
                1 {fromCode} = {exchangeRateUnit} {toCode}
              </span>
            </div>

            <div className="w-full bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl px-4 py-3 flex items-center min-h-13">
              <span className="text-xl sm:text-2xl font-bold text-[#C86432] tabular-nums truncate">
                {toCode === 'IDR' 
                  ? formatIDR(convertedResult)
                  : formatForeign(convertedResult, toCode)}
              </span>
            </div>

            <div className="pt-1">
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full bg-white border border-[#DDD0BC] rounded-lg px-3 py-2 text-sm font-medium text-[#2D2620] hover:border-[#C86432] focus:ring-1 focus:ring-[#C86432] focus:outline-none cursor-pointer transition-colors"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Quick Bali Expense Shortcuts */}
        <div className="mt-8 pt-6 border-t border-[#F0E6D8]">
          <p className="bali-form-label mb-3">
            Quick Bali Price Presets (Click to Convert)
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => {
              const foreignValue = (preset.idr / getRate(targetForeign)).toFixed(targetForeign === 'JPY' ? 0 : 2);
              const currSymbol = SUPPORTED_CURRENCIES.find((c) => c.code === targetForeign)?.symbol || '$';
              return (
                <button
                  key={preset.label}
                  onClick={() => {
                    setFromCode('IDR');
                    setToCode(targetForeign);
                    setAmount(preset.idr.toString());
                  }}
                  className="px-3 py-2 rounded-lg bg-[#FAF6F0] hover:bg-[#F3ECE2] border border-[#E8DEC8] text-xs text-[#4A3F35] font-medium transition-all text-left flex items-center gap-2 cursor-pointer shadow-2xs hover:border-[#C86432]"
                >
                  <span>{preset.icon}</span>
                  <div>
                    <span className="font-semibold block">{preset.label}</span>
                    <span className="text-[11px] text-[#736357] font-mono tabular-nums">
                      Rp {preset.idr.toLocaleString('id-ID')} ≈ {currSymbol}{foreignValue}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        </div>
      </div>

      {/* Two Column Section: Pocket Cheat Sheet & Indonesian Banknotes Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cheat Sheet Table for Market Bargaining */}
        <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="bali-section-title">
              Pocket Bargaining Cheat Sheet
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#FAF0E6] text-[#C86432]">
              In {targetForeign}
            </span>
          </div>
          <p className="text-xs text-[#736357] mb-4">
            Handy conversion table when shopping at Ubud Art Market, beach stalls, or souvenir boutiques.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono tabular-nums">
              <thead>
                <tr className="border-b border-[#E8DEC8] text-[#8C7A6B]">
                  <th className="py-2 font-semibold">IDR (Rupiah)</th>
                  <th className="py-2 font-semibold">Rough Meaning</th>
                  <th className="py-2 font-semibold text-right">{targetForeign} Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3ECE2]">
                {cheatSheetAmounts.map((amt) => {
                  const converted = amt / getRate(targetForeign);
                  let meaning = 'Small snack / parking';
                  if (amt === 50000) meaning = 'Coconut / Entry ticket';
                  if (amt === 100000) meaning = 'Casual dinner for one';
                  if (amt === 250000) meaning = 'Nice cafe meal for two';
                  if (amt === 500000) meaning = 'Day driver or beach club';
                  if (amt === 1000000) meaning = 'Mid-tier hotel night';
                  if (amt === 2500000) meaning = 'Luxury villa night';
                  if (amt === 5000000) meaning = 'Weekly villa / flight';

                  return (
                    <tr key={amt} className="hover:bg-[#FAF6F0] transition-colors">
                      <td className="py-2.5 font-bold text-[#2D2620]">
                        Rp {amt.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 text-[#736357] font-sans">
                        {meaning}
                      </td>
                      <td className="py-2.5 font-bold text-[#C86432] text-right">
                        {formatForeign(converted, targetForeign)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rupiah Banknotes Safety Guide */}
        <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="bali-section-title mb-1">
              Bali Cash &amp; Banknotes Guide
            </h3>
            <p className="text-xs text-[#736357] mb-4">
              Indonesian Rupiah banknotes have many zeros. Distinguish them easily by their official colors:
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-red-50/70 border border-red-200">
                <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  100k
                </span>
                <div className="text-xs">
                  <span className="font-bold text-red-950">Rp 100,000 (Red Note)</span>
                  <p className="text-red-800 text-[11px]">Largest common note. Accepted by all supermarkets, villas & restaurants.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  50k
                </span>
                <div className="text-xs">
                  <span className="font-bold text-blue-950">Rp 50,000 (Blue Note)</span>
                  <p className="text-blue-800 text-[11px]">Ideal for temple admissions, warungs, and beach loungers.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  20k
                </span>
                <div className="text-xs">
                  <span className="font-bold text-emerald-950">Rp 20,000 (Green Note)</span>
                  <p className="text-emerald-800 text-[11px]">Best for local iced tea (Es Teh), snacks, and small tips.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-50/70 border border-purple-200">
                <span className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  10k
                </span>
                <div className="text-xs">
                  <span className="font-bold text-purple-950">Rp 10,000 / 5,000 / 2,000</span>
                  <p className="text-purple-800 text-[11px]">Keep several Rp 2,000 / Rp 5,000 notes for scooter parking at beaches & temples.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0E6D8] text-[11px] text-[#736357] flex items-center gap-2">
            <span className="text-amber-600 font-bold">⚠️ Money Changer Rule:</span>
            <span>Always look for the green official <strong>Bank Indonesia &quot;PVA Berizin&quot;</strong> logo to avoid commission tricks.</span>
          </div>
        </div>

      </div>

      {/* Balinese Cash & Temple Punia Etiquette Card */}
      <div className="bg-[#FAF6EE] rounded-2xl border border-[#E3D6C1] p-5 sm:p-6 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2">
          <FrangipaniIcon size={20} />
          <h4 className="font-serif-bali text-sm sm:text-base font-bold text-[#2D2620]">
            Balinese Punia &amp; Cash Customs
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#6B5A4D]">
          <div className="bg-white p-3.5 rounded-xl border border-[#E8DEC8]">
            <strong className="text-[#2D2620] block mb-1">Right Hand Custom (Tangan Kanan)</strong>
            <span>Always pass banknotes and cards with your right hand. In Balinese culture, using the left hand alone to give or receive money is considered impolite.</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E8DEC8]">
            <strong className="text-[#2D2620] block mb-1">Temple Punia (Donation Boxes)</strong>
            <span>When entering sacred temples, small voluntary contributions (Kotak Punia) help maintain the shrines. Clean, unwrinkled Rp 20,000–50,000 notes are appreciated.</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E8DEC8]">
            <strong className="text-[#2D2620] block mb-1">Respect for Canang Sari</strong>
            <span>Daily floral offerings sit on sidewalks and shop thresholds. Never step over or onto a Canang Sari, especially when counting or paying cash.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
