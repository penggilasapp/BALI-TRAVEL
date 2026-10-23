import React, { useState } from 'react';
import { TravelStyle, TravelBudgetState } from '../types';
import { SUPPORTED_CURRENCIES, formatIDR, formatForeign } from '../data/currenciesData';
import imgRiceTerrace from '../assets/images/bali_jatiluwih_rice_1792778272264.jpg';
import { PolengRibbon, FrangipaniIcon, CandiBentarIcon } from './BalineseMotifs';

interface TripBudgetCalculatorProps {
  selectedCurrency: string;
  addedDestinationsCost: number;
  onClearAddedDestinations?: () => void;
  onNavigateToExplorer?: () => void;
}

export const TripBudgetCalculator: React.FC<TripBudgetCalculatorProps> = ({
  selectedCurrency,
  addedDestinationsCost,
  onClearAddedDestinations,
  onNavigateToExplorer,
}) => {
  const [budget, setBudget] = useState<TravelBudgetState>({
    days: 7,
    travelers: 2,
    style: 'comfort',
    accommodationIdrPerDay: 850000,
    foodIdrPerDay: 400000,
    transportIdrPerDay: 150000,
    activitiesIdrPerDay: 200000,
    wellnessIdrPerDay: 100000,
    shoppingIdrPerDay: 100000,
    includeTouristLevy: true,
    emergencyBufferPercent: 10,
    selectedCurrency: selectedCurrency,
    addedDestinationsCost: addedDestinationsCost,
  });

  const [copied, setCopied] = useState<boolean>(false);

  const parsePositiveInt = (raw: string): number => {
    // Strip leading zeroes before digits (e.g. "05000" -> "5000")
    const cleaned = raw.replace(/^0+(?=\d)/, '');
    if (!cleaned) return 0;
    const num = parseInt(cleaned, 10);
    return isNaN(num) ? 0 : Math.max(0, num);
  };

  const getRate = (code: string): number => {
    return SUPPORTED_CURRENCIES.find((c) => c.code === code)?.rateToIdr || 16250;
  };

  const handleStylePreset = (style: TravelStyle) => {
    switch (style) {
      case 'backpacker':
        setBudget((prev) => ({
          ...prev,
          style,
          accommodationIdrPerDay: 250000, // Homestay/Hostel private room
          foodIdrPerDay: 150000, // Warung Nasi Campur
          transportIdrPerDay: 80000, // Shared scooter
          activitiesIdrPerDay: 75000,
          wellnessIdrPerDay: 30000,
          shoppingIdrPerDay: 40000,
        }));
        break;
      case 'comfort':
        setBudget((prev) => ({
          ...prev,
          style,
          accommodationIdrPerDay: 850000, // Boutique villa / 4-star hotel
          foodIdrPerDay: 400000, // Mix of cafes and authentic warungs
          transportIdrPerDay: 180000, // Scooter or day drivers split
          activitiesIdrPerDay: 200000, // Temples, waterfalls, surfing
          wellnessIdrPerDay: 120000, // Balinese massages & yoga
          shoppingIdrPerDay: 100000,
        }));
        break;
      case 'luxury':
        setBudget((prev) => ({
          ...prev,
          style,
          accommodationIdrPerDay: 2800000, // 5-star jungle or clifftop resort / private pool villa
          foodIdrPerDay: 1100000, // Fine dining & upscale beach clubs
          transportIdrPerDay: 700000, // Full-day dedicated private driver & Alphard
          activitiesIdrPerDay: 500000, // Speedboats, private helicopter, guided trekking
          wellnessIdrPerDay: 450000, // Luxury spa packages
          shoppingIdrPerDay: 350000,
        }));
        break;
      case 'nomad':
        setBudget((prev) => ({
          ...prev,
          style,
          accommodationIdrPerDay: 450000, // Monthly rate villa / guesthouse in Pererenan/Ubud
          foodIdrPerDay: 250000, // Healthy poke bowls, smoothies, local warungs
          transportIdrPerDay: 85000, // Monthly NMax scooter rental
          activitiesIdrPerDay: 90000, // Coworking day pass & weekend beach trips
          wellnessIdrPerDay: 80000, // Yoga gym membership
          shoppingIdrPerDay: 50000,
        }));
        break;
    }
  };

  // Calculations
  const dailyBasePerDay =
    budget.accommodationIdrPerDay +
    budget.foodIdrPerDay +
    budget.transportIdrPerDay +
    budget.activitiesIdrPerDay +
    budget.wellnessIdrPerDay +
    budget.shoppingIdrPerDay;

  const totalBaseExpenses = dailyBasePerDay * budget.days;
  const touristLevyTotal = budget.includeTouristLevy ? 150000 * budget.travelers : 0;
  const destinationsCost = addedDestinationsCost;

  const subtotalBeforeBuffer = totalBaseExpenses + touristLevyTotal + destinationsCost;
  const bufferAmount = (subtotalBeforeBuffer * budget.emergencyBufferPercent) / 100;
  const grandTotalIDR = subtotalBeforeBuffer + bufferAmount;

  const costPerPersonIDR = grandTotalIDR / budget.travelers;
  const costPerPersonPerDayIDR = costPerPersonIDR / budget.days;

  const foreignRate = getRate(selectedCurrency);
  const grandTotalForeign = grandTotalIDR / foreignRate;
  const costPerPersonForeign = costPerPersonIDR / foreignRate;
  const costPerPersonPerDayForeign = costPerPersonPerDayIDR / foreignRate;

  // Percentage allocation for chart
  const stayPct = Math.round(((budget.accommodationIdrPerDay * budget.days) / grandTotalIDR) * 100) || 0;
  const foodPct = Math.round(((budget.foodIdrPerDay * budget.days) / grandTotalIDR) * 100) || 0;
  const transportPct = Math.round(((budget.transportIdrPerDay * budget.days) / grandTotalIDR) * 100) || 0;
  const activitiesPct = Math.round((((budget.activitiesIdrPerDay * budget.days) + destinationsCost) / grandTotalIDR) * 100) || 0;
  const otherPct = Math.max(0, 100 - (stayPct + foodPct + transportPct + activitiesPct));

  const handleCopySummary = () => {
    const text = `🌴 Bali Trip Budget Summary
----------------------------------------
Duration: ${budget.days} Days · ${budget.travelers} Traveler(s)
Style: ${budget.style.toUpperCase()}
Total Estimated Budget: ${formatIDR(grandTotalIDR)} (~${formatForeign(grandTotalForeign, selectedCurrency)})
Cost Per Person: ${formatIDR(costPerPersonIDR)} (~${formatForeign(costPerPersonForeign, selectedCurrency)})
Daily Cost Per Person: ${formatIDR(costPerPersonPerDayIDR)} (~${formatForeign(costPerPersonPerDayForeign, selectedCurrency)}/day)

Breakdown:
• Accommodation: ${formatIDR(budget.accommodationIdrPerDay * budget.days)} (${stayPct}%)
• Dining & Food: ${formatIDR(budget.foodIdrPerDay * budget.days)} (${foodPct}%)
• Transport: ${formatIDR(budget.transportIdrPerDay * budget.days)} (${transportPct}%)
• Activities & Sights: ${formatIDR(budget.activitiesIdrPerDay * budget.days + destinationsCost)} (${activitiesPct}%)
• Shopping & Wellness: ${formatIDR((budget.wellnessIdrPerDay + budget.shoppingIdrPerDay) * budget.days)}
• Contingency Buffer (${budget.emergencyBufferPercent}%): ${formatIDR(bufferAmount)}
----------------------------------------
Calculated with Bali Travel Calculator`;

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
            Automatic Trip Budget Estimator
          </h2>
          <p className="bali-subtitle mt-0.5">
            Plan your total Bali holiday budget with realistic accommodation, food, transport, and leisure expenses.
          </p>
        </div>

        <button
          onClick={handleCopySummary}
          className="self-start sm:self-auto px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF0E6] text-[#C86432] border border-[#E8DEC8] hover:bg-[#C86432] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <span>{copied ? '✓ Copied Plan!' : '📋 Copy Summary'}</span>
        </button>
      </div>

      {/* Visual Cultural Banner: Jatiluwih UNESCO Rice Terraces */}
      <div className="relative rounded-2xl overflow-hidden border border-[#E3D6C1] shadow-xs bg-[#221B15]">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden">
          <img
            src={imgRiceTerrace}
            alt="Jatiluwih UNESCO Terraced Rice Terraces in Tabanan Bali"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#17120E]/90 via-[#17120E]/50 to-transparent flex flex-col justify-center p-6 sm:p-8 text-white max-w-xl">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F3C48C] mb-1">
              <FrangipaniIcon size={14} />
              <span>Subak Living &amp; Island Budgeting</span>
            </div>
            <h3 className="font-serif-bali text-xl sm:text-2xl font-bold text-white mb-1.5">
              Balanced Travel for Every Journey
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed font-light">
              Just as the ancient Balinese Subak irrigation system allocates water in perfect equilibrium, calculate and balance your holiday expenses across lodging, dining, and sacred exploration.
            </p>
          </div>
        </div>
        <PolengRibbon height={4} />
      </div>

      {/* Travel Style Selector */}
      <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 sm:p-6 shadow-xs overflow-hidden">
        <label className="bali-form-label block mb-3">
          1. Choose Your Bali Travel Style (Auto-Presets Expenses)
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => handleStylePreset('backpacker')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
              budget.style === 'backpacker'
                ? 'border-[#B85324] bg-[#FAF0E6] shadow-xs ring-1 ring-[#B85324]'
                : 'border-[#E8DEC8] bg-[#FAF7F2] hover:bg-white hover:border-[#DDD0BC]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">🎒</span>
              {budget.style === 'backpacker' && (
                <span className="text-[10px] font-bold text-[#B85324] bg-white border border-[#E8DEC8] px-1.5 py-0.5 rounded-md">Selected</span>
              )}
            </div>
            <span className="font-bold text-sm block text-[#2D2620]">Pengelana (Backpacker)</span>
            <span className="text-[11px] text-[#B85324] font-mono font-bold block mt-0.5">
              ~Rp 500k/day
            </span>
            <span className="text-[11px] text-[#736357] block leading-tight mt-1">
              Homestays, local warungs, shared scooter
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleStylePreset('comfort')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
              budget.style === 'comfort'
                ? 'border-[#B85324] bg-[#FAF0E6] shadow-xs ring-1 ring-[#B85324]'
                : 'border-[#E8DEC8] bg-[#FAF7F2] hover:bg-white hover:border-[#DDD0BC]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">✨</span>
              {budget.style === 'comfort' && (
                <span className="text-[10px] font-bold text-[#B85324] bg-white border border-[#E8DEC8] px-1.5 py-0.5 rounded-md">Selected</span>
              )}
            </div>
            <span className="font-bold text-sm block text-[#2D2620]">Wisatawan (Smart Casual)</span>
            <span className="text-[11px] text-[#B85324] font-mono font-bold block mt-0.5">
              ~Rp 1.45M/day
            </span>
            <span className="text-[11px] text-[#736357] block leading-tight mt-1">
              Boutique villas, trendy cafes, day tours
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleStylePreset('luxury')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
              budget.style === 'luxury'
                ? 'border-[#B85324] bg-[#FAF0E6] shadow-xs ring-1 ring-[#B85324]'
                : 'border-[#E8DEC8] bg-[#FAF7F2] hover:bg-white hover:border-[#DDD0BC]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">🍸</span>
              {budget.style === 'luxury' && (
                <span className="text-[10px] font-bold text-[#B85324] bg-white border border-[#E8DEC8] px-1.5 py-0.5 rounded-md">Selected</span>
              )}
            </div>
            <span className="font-bold text-sm block text-[#2D2620]">Puri Raja (Luxury Island)</span>
            <span className="text-[11px] text-[#B85324] font-mono font-bold block mt-0.5">
              ~Rp 4.5M+/day
            </span>
            <span className="text-[11px] text-[#736357] block leading-tight mt-1">
              5-Star resorts, fine dining, private driver
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleStylePreset('nomad')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
              budget.style === 'nomad'
                ? 'border-[#B85324] bg-[#FAF0E6] shadow-xs ring-1 ring-[#B85324]'
                : 'border-[#E8DEC8] bg-[#FAF7F2] hover:bg-white hover:border-[#DDD0BC]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">💻</span>
              {budget.style === 'nomad' && (
                <span className="text-[10px] font-bold text-[#B85324] bg-white border border-[#E8DEC8] px-1.5 py-0.5 rounded-md">Selected</span>
              )}
            </div>
            <span className="font-bold text-sm block text-[#2D2620]">Kembara (Island Nomad)</span>
            <span className="text-[11px] text-[#B85324] font-mono font-bold block mt-0.5">
              ~Rp 950k/day
            </span>
            <span className="text-[11px] text-[#736357] block leading-tight mt-1">
              Monthly co-living, coworking cafes, scooter
            </span>
          </button>
        </div>
      </div>

      {/* Main Form & Live Result Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sliders and Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-white rounded-2xl border border-[#E8DEC8] p-6 shadow-xs">
          
          <div className="border-b border-[#F0E6D8] pb-4">
            <h3 className="bali-section-title">
              2. Trip Duration &amp; Party Size
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#736357] mb-1">
                  <span className="bali-form-label">Duration</span>
                  <span className="text-[#C86432] font-mono font-bold">{budget.days} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="45"
                  value={budget.days}
                  onChange={(e) => setBudget({ ...budget, days: parseInt(e.target.value) || 1 })}
                  className="w-full accent-[#C86432] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#736357] mb-1">
                  <span className="bali-form-label">Travelers</span>
                  <span className="text-[#C86432] font-mono font-bold">{budget.travelers} Person(s)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={budget.travelers}
                  onChange={(e) => setBudget({ ...budget, travelers: parseInt(e.target.value) || 1 })}
                  className="w-full accent-[#C86432] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Daily Categories Inputs */}
          <div>
            <h3 className="bali-section-title mb-4">
              3. Daily Budget Items (per group/day in IDR)
            </h3>

            <div className="space-y-4 text-xs">
              
              {/* Accommodation */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-[#2D2620] flex items-center gap-1.5">
                    <span>🏡</span> Accommodation (Hotel / Villa)
                  </span>
                  <span className="font-mono font-bold text-[#C86432]">
                    {formatIDR(budget.accommodationIdrPerDay)}/night
                  </span>
                </div>
                <input
                  type="number"
                  step="50000"
                  min="0"
                  value={budget.accommodationIdrPerDay === 0 ? '' : budget.accommodationIdrPerDay}
                  placeholder="0"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setBudget({ ...budget, accommodationIdrPerDay: parsePositiveInt(e.target.value) })}
                  className="w-full bg-white border border-[#DDD0BC] rounded-lg px-3 py-1.5 font-mono text-sm text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
                />
                <span className="text-[11px] text-[#8C7A6B] mt-1 block">
                  Typical: Homestay Rp 250k–350k · Boutique Villa Rp 750k–1.5M · Luxury Resort Rp 2.5M+
                </span>
              </div>

              {/* Food */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-[#2D2620] flex items-center gap-1.5">
                    <span>🍛</span> Dining & Drinks (Total per day)
                  </span>
                  <span className="font-mono font-bold text-[#C86432]">
                    {formatIDR(budget.foodIdrPerDay)}/day
                  </span>
                </div>
                <input
                  type="number"
                  step="25000"
                  min="0"
                  value={budget.foodIdrPerDay === 0 ? '' : budget.foodIdrPerDay}
                  placeholder="0"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setBudget({ ...budget, foodIdrPerDay: parsePositiveInt(e.target.value) })}
                  className="w-full bg-white border border-[#DDD0BC] rounded-lg px-3 py-1.5 font-mono text-sm text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
                />
                <span className="text-[11px] text-[#8C7A6B] mt-1 block">
                  Warung Nasi Campur Rp 30k–45k · Western Cafe meal Rp 80k–150k · Fine dining Rp 350k+
                </span>
              </div>

              {/* Transport */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-[#2D2620] flex items-center gap-1.5">
                    <span>🛵</span> Local Transport (Scooter / Driver / Grab)
                  </span>
                  <span className="font-mono font-bold text-[#C86432]">
                    {formatIDR(budget.transportIdrPerDay)}/day
                  </span>
                </div>
                <input
                  type="number"
                  step="25000"
                  min="0"
                  value={budget.transportIdrPerDay === 0 ? '' : budget.transportIdrPerDay}
                  placeholder="0"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setBudget({ ...budget, transportIdrPerDay: parsePositiveInt(e.target.value) })}
                  className="w-full bg-white border border-[#DDD0BC] rounded-lg px-3 py-1.5 font-mono text-sm text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
                />
                <span className="text-[11px] text-[#8C7A6B] mt-1 block">
                  Scooter rental Rp 100k–160k/day · Full-day private driver with petrol Rp 600k–750k/day
                </span>
              </div>

              {/* Activities */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-[#2D2620] flex items-center gap-1.5">
                    <span>🎟️</span> Sights, Temples & Surfing
                  </span>
                  <span className="font-mono font-bold text-[#C86432]">
                    {formatIDR(budget.activitiesIdrPerDay)}/day
                  </span>
                </div>
                <input
                  type="number"
                  step="25000"
                  min="0"
                  value={budget.activitiesIdrPerDay === 0 ? '' : budget.activitiesIdrPerDay}
                  placeholder="0"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setBudget({ ...budget, activitiesIdrPerDay: parsePositiveInt(e.target.value) })}
                  className="w-full bg-white border border-[#DDD0BC] rounded-lg px-3 py-1.5 font-mono text-sm text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
                />
              </div>

              {/* Spa & Shopping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                  <span className="font-semibold text-[#2D2620] block mb-1">
                    💆 Massage & Spa / Day
                  </span>
                  <input
                    type="number"
                    step="25000"
                    min="0"
                    value={budget.wellnessIdrPerDay === 0 ? '' : budget.wellnessIdrPerDay}
                    placeholder="0"
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setBudget({ ...budget, wellnessIdrPerDay: parsePositiveInt(e.target.value) })}
                    className="w-full bg-white border border-[#DDD0BC] rounded-lg px-3 py-1.5 font-mono text-sm text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                  <span className="font-semibold text-[#2D2620] block mb-1">
                    🛍️ Shopping & Gifts / Day
                  </span>
                  <input
                    type="number"
                    step="25000"
                    min="0"
                    value={budget.shoppingIdrPerDay === 0 ? '' : budget.shoppingIdrPerDay}
                    placeholder="0"
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setBudget({ ...budget, shoppingIdrPerDay: parsePositiveInt(e.target.value) })}
                    className="w-full bg-white border border-[#DDD0BC] rounded-lg px-3 py-1.5 font-mono text-sm text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
                  />
                </div>
              </div>

              {/* Tourist Levy & Emergency Buffer Toggle */}
              <div className="p-3.5 rounded-xl bg-[#FFF9F2] border border-[#F0DFCD] space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={budget.includeTouristLevy}
                    onChange={(e) => setBudget({ ...budget, includeTouristLevy: e.target.checked })}
                    className="w-4 h-4 accent-[#C86432] rounded cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#2D2620]">
                      Include Official Bali Tourist Levy (Rp 150,000 / person)
                    </span>
                    <span className="text-[#8C7A6B] block">
                      Mandatory provincial tourism contribution paid online via Love Bali.
                    </span>
                  </div>
                </label>

                <div className="flex items-center justify-between pt-1 border-t border-[#F0E6D8] text-xs">
                  <span className="font-semibold text-[#736357]">Emergency Contingency Buffer</span>
                  <div className="flex items-center gap-1.5">
                    {[5, 10, 15, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setBudget({ ...budget, emergencyBufferPercent: pct })}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                          budget.emergencyBufferPercent === pct
                            ? 'bg-[#C86432] text-white font-bold'
                            : 'bg-white border border-[#DDD0BC] text-[#736357]'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Live Results Summary Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          
          <div className="bg-[#2D2620] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-[#423932]">
            <div className="flex items-center justify-between border-b border-stone-700/80 pb-4 mb-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E8924A] font-semibold block">
                  Total Trip Budget
                </span>
                <span className="text-xs text-stone-400">
                  {budget.days} Days · {budget.travelers} Traveler{budget.travelers > 1 ? 's' : ''}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#E8924A]/20 text-[#E8924A] text-xs font-semibold capitalize">
                {budget.style} Style
              </span>
            </div>

            {/* Grand Total Big Numbers */}
            <div className="mb-6">
              <div className="text-2xl sm:text-3xl font-bold font-serif-bali text-[#FDF8F0] tracking-tight">
                {formatIDR(grandTotalIDR)}
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-[#E8924A] mt-1 tabular-nums">
                ≈ {formatForeign(grandTotalForeign, selectedCurrency)}
              </div>
            </div>

            {/* Per Person & Daily Rates */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-800/80 border border-stone-700 mb-6 text-xs font-mono tabular-nums">
              <div>
                <span className="text-stone-400 text-[11px] block font-sans">Per Person Total:</span>
                <span className="font-bold text-white block mt-0.5">{formatIDR(costPerPersonIDR)}</span>
                <span className="text-stone-400 text-[11px] block">~{formatForeign(costPerPersonForeign, selectedCurrency)}</span>
              </div>

              <div>
                <span className="text-stone-400 text-[11px] block font-sans">Daily / Person:</span>
                <span className="font-bold text-[#E8924A] block mt-0.5">{formatIDR(costPerPersonPerDayIDR)}</span>
                <span className="text-stone-400 text-[11px] block">~{formatForeign(costPerPersonPerDayForeign, selectedCurrency)}/day</span>
              </div>
            </div>

            {/* Visual Allocation Bar */}
            <div className="space-y-2 mb-6">
              <span className="text-xs text-stone-300 font-medium block">
                Estimated Expense Breakdown
              </span>
              <div className="h-2.5 rounded-full bg-stone-800 overflow-hidden flex">
                <div style={{ width: `${stayPct}%` }} className="bg-[#E8924A]" title={`Stay ${stayPct}%`}></div>
                <div style={{ width: `${foodPct}%` }} className="bg-[#4ADE80]" title={`Food ${foodPct}%`}></div>
                <div style={{ width: `${transportPct}%` }} className="bg-[#38BDF8]" title={`Transport ${transportPct}%`}></div>
                <div style={{ width: `${activitiesPct}%` }} className="bg-[#F472B6]" title={`Activities ${activitiesPct}%`}></div>
                <div style={{ width: `${otherPct}%` }} className="bg-[#A78BFA]" title={`Buffer & Misc ${otherPct}%`}></div>
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-stone-400 pt-1 font-mono">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E8924A]"></span>Stay {stayPct}%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#4ADE80]"></span>Food {foodPct}%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>Ride {transportPct}%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F472B6]"></span>Tours {activitiesPct}%</span>
              </div>
            </div>

            {/* Added Destination Badges (if any) */}
            {addedDestinationsCost > 0 && (
              <div className="p-3 rounded-xl bg-stone-800/90 border border-emerald-500/40 text-xs mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span>⛩️</span> Added from Explorer:
                  </span>
                  <button
                    onClick={onClearAddedDestinations}
                    className="text-[11px] text-stone-400 hover:text-red-400 cursor-pointer underline"
                  >
                    Reset
                  </button>
                </div>
                <div className="font-mono text-white font-bold mt-1">
                  +{formatIDR(addedDestinationsCost)} ({formatForeign(addedDestinationsCost / foreignRate, selectedCurrency)})
                </div>
              </div>
            )}

            {/* Quick Action to Explorer */}
            {onNavigateToExplorer && (
              <button
                onClick={onNavigateToExplorer}
                className="w-full py-2.5 rounded-xl bg-[#C86432] hover:bg-[#B35222] text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>⛩️ Browse Authentic Places to Visit</span>
              </button>
            )}

          </div>

          {/* Local Money Tip Note */}
          <div className="bg-[#F7EFE4] rounded-xl p-4 border border-[#E3D4C1] text-xs text-[#615245] space-y-1">
            <span className="font-bold text-[#8A421D] flex items-center gap-1">
              💡 Bali Smart Budget Tip:
            </span>
            <p>
              Tipping is not strictly mandatory in traditional Indonesian warungs, but a 5%–10% cash tip or rounding up the bill is deeply appreciated by local drivers, surf guides, and villa staff.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
