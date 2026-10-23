import React, { useState } from 'react';
import { formatIDR, formatForeign, SUPPORTED_CURRENCIES } from '../data/currenciesData';
import imgTanahLot from '../assets/images/bali_tanah_lot_sea_1792778274338.jpg';
import { PolengRibbon, FrangipaniIcon, CandiBentarIcon } from './BalineseMotifs';

interface SplitCostCalculatorProps {
  selectedCurrency: string;
}

export const SplitCostCalculator: React.FC<SplitCostCalculatorProps> = ({ selectedCurrency }) => {
  const [totalBill, setTotalBill] = useState<string>('1250000');
  const [billCurrency, setBillCurrency] = useState<string>('IDR');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(4);
  const [taxServiceOption, setTaxServiceOption] = useState<number>(16); // 16% (10% PB1 + 6% service)
  const [tipOption, setTipOption] = useState<number>(5); // 5% optional tip
  const [roundUpOption, setRoundUpOption] = useState<'none' | '1000' | '10000'>('10000');
  const [billDescription, setBillDescription] = useState<string>('Beach Club Daybed & Lunch');
  const [copied, setCopied] = useState<boolean>(false);

  const getRate = (code: string): number => {
    return SUPPORTED_CURRENCIES.find((c) => c.code === code)?.rateToIdr || 16250;
  };
  const foreignRate = getRate(selectedCurrency);

  const rawAmount = parseFloat(totalBill) || 0;
  const billInIDR = billCurrency === 'IDR' ? rawAmount : rawAmount * getRate(billCurrency);

  // Calculations
  const taxServiceAmount = (billInIDR * taxServiceOption) / 100;
  const tipAmount = (billInIDR * tipOption) / 100;
  const grandTotalIDR = billInIDR + taxServiceAmount + tipAmount;

  let rawPerPerson = grandTotalIDR / (numberOfPeople || 1);

  if (roundUpOption === '1000') {
    rawPerPerson = Math.ceil(rawPerPerson / 1000) * 1000;
  } else if (roundUpOption === '10000') {
    rawPerPerson = Math.ceil(rawPerPerson / 10000) * 10000;
  }

  const finalTotalCollectedIDR = rawPerPerson * numberOfPeople;
  const extraRoundingBuffer = finalTotalCollectedIDR - grandTotalIDR;

  const perPersonForeign = rawPerPerson / foreignRate;
  const grandTotalForeign = grandTotalIDR / foreignRate;

  // Preset quick Bali bills
  const billPresets = [
    { label: 'Ubud Warung Dinner', idr: 320000, desc: 'Casual dinner with drinks' },
    { label: 'Beach Club Daybed', idr: 1500000, desc: 'Minimum spend deposit & food' },
    { label: 'Private Villa 1 Night', idr: 2400000, desc: '3-Bedroom private pool villa' },
    { label: 'Nusa Penida Boat Tour', idr: 1800000, desc: 'Private day charter & snorkeling' },
    { label: 'Jimbaran Seafood Feast', idr: 950000, desc: 'Sunset grilled fish, prawns & clams' },
  ];

  const handleCopyShareText = () => {
    const text = `🥥 Bali Bill Split: ${billDescription}
----------------------------------------
Total Bill: ${formatIDR(grandTotalIDR)} (~${formatForeign(grandTotalForeign, selectedCurrency)})
Split among: ${numberOfPeople} people
Each person pays: ${formatIDR(rawPerPerson)} (~${formatForeign(perPersonForeign, selectedCurrency)})
${roundUpOption !== 'none' ? `(Rounded up to nearest ${roundUpOption === '10000' ? 'Rp 10k' : 'Rp 1k'} for easy cash handover)` : ''}

Breakdown:
• Base subtotal: ${formatIDR(billInIDR)}
• Tax & Service (${taxServiceOption}%): ${formatIDR(taxServiceAmount)}
• Tip (${tipOption}%): ${formatIDR(tipAmount)}
----------------------------------------
Shared via Bali Travel Calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DEC8] pb-4">
        <div>
          <h2 className="bali-page-title">
            Split Cost &amp; Group Bill Calculator
          </h2>
          <p className="bali-subtitle mt-0.5">
            Fairly split villa rentals, beach club tabs, seafood dinners, or driver tours with Bali hospitality tax and rounded cash change.
          </p>
        </div>

        <button
          onClick={handleCopyShareText}
          className="self-start sm:self-auto px-4 py-2 text-xs font-semibold rounded-lg bg-[#FAF0E6] text-[#B85324] border border-[#E8DEC8] hover:bg-[#B85324] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <span>{copied ? '✓ Copied to Clipboard!' : '📤 Share to WhatsApp Group'}</span>
        </button>
      </div>

      {/* Visual Cultural Banner: Tanah Lot Sunset Dining & Fellowship */}
      <div className="relative rounded-2xl overflow-hidden border border-[#E3D6C1] shadow-xs bg-[#221B15]">
        <PolengRibbon height={5} />
        <div className="relative h-44 sm:h-52 w-full overflow-hidden">
          <img
            src={imgTanahLot}
            alt="Tanah Lot Sea Temple Sunset in Bali"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#17120E]/90 via-[#17120E]/50 to-transparent flex flex-col justify-center p-6 sm:p-8 text-white max-w-xl">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F3C48C] mb-1">
              <FrangipaniIcon size={14} />
              <span>Gotong Royong &amp; Shared Dining</span>
            </div>
            <h3 className="font-serif-bali text-xl sm:text-2xl font-bold text-white mb-1.5">
              Harmonious Group Gatherings
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed font-light">
              In Bali, &quot;Gotong Royong&quot; signifies the sacred spirit of community mutual aid and harmony. Split beach club minimum spends, seafood feasts, and villa nights transparently.
            </p>
          </div>
        </div>
        <PolengRibbon height={4} />
      </div>

      {/* Visual Context Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-[#E8DEC8] shadow-2xs flex items-center gap-3">
          <span className="text-2xl">🏡</span>
          <div>
            <strong className="text-xs text-[#2D2620] block">Private Pool Villas</strong>
            <span className="text-[11px] text-[#736357]">Split nightly stays equally</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E8DEC8] shadow-2xs flex items-center gap-3">
          <span className="text-2xl">🦐</span>
          <div>
            <strong className="text-xs text-[#2D2620] block">Jimbaran Seafood Feasts</strong>
            <span className="text-[11px] text-[#736357]">Calculate 10% PB1 tax &amp; service</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E8DEC8] shadow-2xs flex items-center gap-3">
          <span className="text-2xl">🍹</span>
          <div>
            <strong className="text-xs text-[#2D2620] block">Beach Club Daybeds</strong>
            <span className="text-[11px] text-[#736357]">Divide minimum spend deposits</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-white rounded-2xl border border-[#E8DEC8] p-6 shadow-xs">
          
          {/* Bill Purpose & Presets */}
          <div>
            <label className="bali-form-label block mb-2">
              Expense Description
            </label>
            <input
              type="text"
              value={billDescription}
              onChange={(e) => setBillDescription(e.target.value)}
              placeholder="e.g. Canggu Villa Rental, Jimbaran Seafood, Finns Beach Club"
              className="w-full bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {billPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setBillDescription(preset.label);
                    setTotalBill(preset.idr.toString());
                    setBillCurrency('IDR');
                  }}
                  className="px-2.5 py-1 rounded-md bg-[#FAF6F0] hover:bg-[#F0E6D8] border border-[#E8DEC8] text-[11px] text-[#4A3F35] font-medium transition-colors cursor-pointer"
                >
                  {preset.label} (Rp {(preset.idr / 1000).toFixed(0)}k)
                </button>
              ))}
            </div>
          </div>

          {/* Amount and Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3 pt-2 border-t border-[#F0E6D8]">
            <div>
              <label htmlFor="split-bill-amount" className="bali-form-label block mb-1">
                Total Bill Amount
              </label>
              <input
                id="split-bill-amount"
                type="number"
                min="0"
                step="any"
                value={totalBill}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  let cleaned = e.target.value;
                  if (/^0\d/.test(cleaned)) {
                    cleaned = cleaned.replace(/^0+(?=\d)/, '');
                  }
                  setTotalBill(cleaned);
                }}
                placeholder="0"
                className="w-full bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl px-4 py-2.5 text-lg font-bold font-mono text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="split-bill-currency" className="bali-form-label block mb-1">
                Bill Currency
              </label>
              <select
                id="split-bill-currency"
                value={billCurrency}
                onChange={(e) => setBillCurrency(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl px-3 py-3 text-xs font-semibold text-[#2D2620] hover:border-[#C86432] focus:outline-none cursor-pointer"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* People Count Slider */}
          <div className="pt-2 border-t border-[#F0E6D8]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#736357] mb-2">
              <span className="bali-form-label">Number of People Splitting</span>
              <span className="font-mono text-base font-bold text-[#C86432]">
                {numberOfPeople} People
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="16"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 2)}
              className="w-full accent-[#C86432] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#A39282] font-mono mt-1">
              <span>2</span>
              <span>4</span>
              <span>6</span>
              <span>8</span>
              <span>10</span>
              <span>12</span>
              <span>16</span>
            </div>
          </div>

          {/* Bali Tax & Service Charge Setting */}
          <div className="pt-2 border-t border-[#F0E6D8]">
            <div className="flex items-center justify-between mb-2">
              <label className="bali-form-label">
                Bali Hospitality Tax &amp; Service Charge
              </label>
              <span className="text-xs font-mono font-bold text-[#C86432]">
                +{taxServiceOption}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTaxServiceOption(0)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  taxServiceOption === 0
                    ? 'border-[#C86432] bg-[#FAF0E6] font-bold text-[#C86432]'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                }`}
              >
                <span>0% Nett</span>
                <span className="block text-[10px] text-[#8C7A6B]">Already included</span>
              </button>

              <button
                type="button"
                onClick={() => setTaxServiceOption(10)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  taxServiceOption === 10
                    ? 'border-[#C86432] bg-[#FAF0E6] font-bold text-[#C86432]'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                }`}
              >
                <span>10% PB1</span>
                <span className="block text-[10px] text-[#8C7A6B]">Govt Tax only</span>
              </button>

              <button
                type="button"
                onClick={() => setTaxServiceOption(16)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  taxServiceOption === 16
                    ? 'border-[#C86432] bg-[#FAF0E6] font-bold text-[#C86432]'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                }`}
              >
                <span>16% (10+6%)</span>
                <span className="block text-[10px] text-[#8C7A6B]">Standard Cafes</span>
              </button>

              <button
                type="button"
                onClick={() => setTaxServiceOption(21)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  taxServiceOption === 21
                    ? 'border-[#C86432] bg-[#FAF0E6] font-bold text-[#C86432]'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                }`}
              >
                <span>21% (10+11%)</span>
                <span className="block text-[10px] text-[#8C7A6B]">Beach Clubs/Resorts</span>
              </button>
            </div>
          </div>

          {/* Optional Tip & Cash Rounding */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F0E6D8] text-xs">
            <div>
              <label className="bali-form-label block mb-1.5">
                Optional Tip for Staff
              </label>
              <div className="flex gap-1.5">
                {[0, 5, 10, 15].map((tip) => (
                  <button
                    key={tip}
                    type="button"
                    onClick={() => setTipOption(tip)}
                    className={`flex-1 py-1.5 rounded-lg border font-mono cursor-pointer transition-colors ${
                      tipOption === tip
                        ? 'border-[#C86432] bg-[#FAF0E6] text-[#C86432] font-bold'
                        : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                    }`}
                  >
                    {tip === 0 ? 'None' : `${tip}%`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="bali-form-label block mb-1.5">
                Cash Friendly Rounding
              </label>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setRoundUpOption('none')}
                  className={`flex-1 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                    roundUpOption === 'none'
                      ? 'border-[#C86432] bg-[#FAF0E6] text-[#C86432] font-bold'
                      : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                  }`}
                >
                  Exact
                </button>
                <button
                  type="button"
                  onClick={() => setRoundUpOption('1000')}
                  className={`flex-1 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                    roundUpOption === '1000'
                      ? 'border-[#C86432] bg-[#FAF0E6] text-[#C86432] font-bold'
                      : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                  }`}
                >
                  +1k IDR
                </button>
                <button
                  type="button"
                  onClick={() => setRoundUpOption('10000')}
                  className={`flex-1 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                    roundUpOption === '10000'
                      ? 'border-[#C86432] bg-[#FAF0E6] text-[#C86432] font-bold'
                      : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                  }`}
                >
                  +10k IDR
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Split Results (5 cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          
          <div className="bg-[#2D2620] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-[#423932]">
            <div className="flex items-center justify-between border-b border-stone-700/80 pb-3 mb-5">
              <span className="text-xs uppercase tracking-widest text-[#E8924A] font-semibold">
                Amount Per Person
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {numberOfPeople} People
              </span>
            </div>

            {/* Per Person Big Number */}
            <div className="mb-6">
              <span className="text-stone-400 text-xs block mb-0.5">Each Person Pays</span>
              <div className="text-3xl sm:text-4xl font-bold font-serif-bali text-[#FDF8F0] tracking-tight">
                {formatIDR(rawPerPerson)}
              </div>
              <div className="text-lg font-bold font-mono text-[#E8924A] mt-1 tabular-nums">
                ≈ {formatForeign(perPersonForeign, selectedCurrency)}
              </div>
            </div>

            {/* Total Bill Breakdown */}
            <div className="space-y-2 border-t border-stone-700/80 pt-4 text-xs">
              <div className="flex justify-between text-stone-400 font-mono">
                <span>Base Bill:</span>
                <span className="text-white">{formatIDR(billInIDR)}</span>
              </div>

              {taxServiceOption > 0 && (
                <div className="flex justify-between text-stone-400 font-mono">
                  <span>Tax &amp; Service ({taxServiceOption}%):</span>
                  <span className="text-white">+{formatIDR(taxServiceAmount)}</span>
                </div>
              )}

              {tipOption > 0 && (
                <div className="flex justify-between text-stone-400 font-mono">
                  <span>Staff Tip ({tipOption}%):</span>
                  <span className="text-white">+{formatIDR(tipAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-300 font-bold border-t border-stone-800 pt-2 font-mono">
                <span>Total Combined:</span>
                <span className="text-[#E8924A]">{formatIDR(grandTotalIDR)}</span>
              </div>

              {roundUpOption !== 'none' && extraRoundingBuffer > 0 && (
                <div className="flex justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-800/60 font-mono">
                  <span>Small Change Rounding Buffer:</span>
                  <span className="text-emerald-400">+{formatIDR(extraRoundingBuffer)} total</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleCopyShareText}
              className="w-full mt-6 py-2.5 rounded-xl bg-[#C86432] hover:bg-[#B35222] text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{copied ? '✓ Copied!' : '📋 Copy Bill Message'}</span>
            </button>
          </div>

          {/* Quick Note about Bali Bills */}
          <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#E8DEC8] text-xs text-[#6B5D52] space-y-1">
            <span className="font-bold text-[#2D2620] flex items-center gap-1">
              🧾 Understanding Bali Restaurant Bills:
            </span>
            <p className="text-[11px] leading-relaxed">
              When menus state <strong>&quot;++&quot;</strong> (e.g. <em>&quot;150k++&quot;</em>), it means government tax (10%) and service charge (typically 5%–11%) will be added to the final receipt.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
