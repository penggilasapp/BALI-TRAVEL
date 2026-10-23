import React, { useState } from 'react';
import { BALI_ROUTES } from '../data/baliRoutes';
import { formatIDR, formatForeign, SUPPORTED_CURRENCIES } from '../data/currenciesData';
import imgScooterRoad from '../assets/images/bali_scooter_highway_1792778274790.jpg';
import { PolengRibbon, FrangipaniIcon, CandiBentarIcon } from './BalineseMotifs';

interface RouteFuelCalculatorProps {
  selectedCurrency: string;
}

export const RouteFuelCalculator: React.FC<RouteFuelCalculatorProps> = ({ selectedCurrency }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(BALI_ROUTES[0].id);
  const [customDistance, setCustomDistance] = useState<number>(BALI_ROUTES[0].distanceKm);
  const [vehicleType, setVehicleType] = useState<'scooter_light' | 'scooter_maxi' | 'car'>('scooter_light');
  const [fuelType, setFuelType] = useState<number>(13000); // Pertamax Rp 13,000 / L
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(true);
  const [speedKmh, setSpeedKmh] = useState<number>(35); // Bali average scooter speed

  const getRate = (code: string): number => {
    return SUPPORTED_CURRENCIES.find((c) => c.code === code)?.rateToIdr || 16250;
  };
  const foreignRate = getRate(selectedCurrency);

  const selectedRoute = BALI_ROUTES.find((r) => r.id === selectedRouteId) || BALI_ROUTES[0];

  const handleRouteChange = (routeId: string) => {
    setSelectedRouteId(routeId);
    const r = BALI_ROUTES.find((x) => x.id === routeId);
    if (r) {
      setCustomDistance(r.distanceKm);
    }
  };

  // Efficiency km/L
  let efficiencyKmL = 40;
  let vehicleName = 'Honda Vario / Scoopy (125cc Scooter)';
  if (vehicleType === 'scooter_maxi') {
    efficiencyKmL = 32;
    vehicleName = 'Yamaha NMax / Honda PCX (155cc Maxi Scooter)';
  } else if (vehicleType === 'car') {
    efficiencyKmL = 12;
    vehicleName = 'Toyota Avanza / Private Driver Car';
  }

  const effectiveDistance = isRoundTrip ? customDistance * 2 : customDistance;
  const fuelLitersRequired = effectiveDistance / efficiencyKmL;
  const estimatedFuelCostIDR = fuelLitersRequired * fuelType;
  const estimatedFuelCostForeign = estimatedFuelCostIDR / foreignRate;

  // Travel time
  const estimatedTimeHours = effectiveDistance / speedKmh;
  const totalMinutes = Math.round(estimatedTimeHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DEC8] pb-4">
        <div>
          <h2 className="bali-page-title">
            Bali Scooter Routes &amp; Fuel Estimator
          </h2>
          <p className="bali-subtitle mt-0.5">
            Calculate fuel consumption, petrol costs, and realistic travel times factoring in famous Bali shortcut traffic.
          </p>
        </div>
        <div className="text-xs text-[#8C7A6B] bg-[#FAF0E6] text-[#C86432] px-3.5 py-1.5 rounded-lg border border-[#E8DEC8] self-start sm:self-auto font-mono font-medium">
          Official Pertamax: Rp 13,000 / L
        </div>
      </div>

      {/* Visual Scooter Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-[#E3D6C1] shadow-xs bg-[#221B15]">
        <PolengRibbon height={5} />
        <div className="relative h-44 sm:h-56 md:h-64 w-full">
          <img
            src={imgScooterRoad}
            alt="Scenic scooter ride through Bali rice terraces"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#17120E]/90 via-[#17120E]/50 to-transparent flex flex-col justify-center p-6 sm:p-8 text-white max-w-lg">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F3C48C] mb-1">
              <FrangipaniIcon size={14} />
              <span>Island Mobility &amp; Banjar Courtesy</span>
            </div>
            <h3 className="font-serif-bali text-xl sm:text-2xl font-bold text-white mb-1.5">
              Explore Bali with Freedom
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed font-light">
              Scooters are the fastest way to navigate narrow village shortcuts between Canggu, Seminyak, and Ubud. Calculate realistic fuel budgets and respect local community ways.
            </p>
          </div>
        </div>
        <PolengRibbon height={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Route Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-white rounded-2xl border border-[#E8DEC8] p-6 shadow-xs">
          
          {/* Route Presets */}
          <div>
            <label className="bali-form-label block mb-2">
              Popular Bali Transit Corridor
            </label>
            <select
              value={selectedRouteId}
              onChange={(e) => handleRouteChange(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#2D2620] hover:border-[#C86432] focus:ring-1 focus:ring-[#C86432] focus:outline-none cursor-pointer transition-colors"
            >
              {BALI_ROUTES.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.origin} → {route.destination} ({route.distanceKm} km)
                </option>
              ))}
            </select>

            {/* Route notes */}
            <div className="mt-2.5 p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8DEC8] text-xs text-[#6B5D52] space-y-1.5">
              <p className="leading-relaxed">
                <strong className="text-[#2D2620]">Traffic Condition:</strong> {selectedRoute.trafficNote}
              </p>
              <p className="text-[#8C7A6B] text-[11px] leading-relaxed">
                <strong className="text-[#736357]">Scenic Views:</strong> {selectedRoute.scenicHighlights}
              </p>
            </div>
          </div>

          {/* Distance Input & Round Trip Switch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F0E6D8]">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#736357] mb-1">
                <span>One-Way Distance</span>
                <span className="font-mono text-[#C86432] font-bold">{customDistance} km</span>
              </div>
              <input
                type="number"
                min="0"
                max="500"
                step="any"
                value={customDistance === 0 ? '' : customDistance}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/^0+(?=\d)/, '');
                  if (cleaned === '') {
                    setCustomDistance(0);
                  } else {
                    const num = parseFloat(cleaned);
                    setCustomDistance(isNaN(num) ? 0 : Math.max(0, num));
                  }
                }}
                placeholder="0"
                className="w-full bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl px-3 py-2 text-sm font-mono text-[#2D2620] focus:ring-1 focus:ring-[#C86432] focus:outline-none"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF7F2] border border-[#DDD0BC] cursor-pointer hover:bg-[#F3ECE2] transition-colors">
                <input
                  type="checkbox"
                  checked={isRoundTrip}
                  onChange={(e) => setIsRoundTrip(e.target.checked)}
                  className="w-4 h-4 accent-[#C86432] rounded cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#2D2620]">Calculate Round-Trip (x2)</span>
                  <span className="text-[#8C7A6B] block text-[11px] font-mono">Total: {effectiveDistance} km</span>
                </div>
              </label>
            </div>
          </div>

          {/* Vehicle Type Selector */}
          <div className="pt-2 border-t border-[#F0E6D8]">
            <label className="bali-form-label block mb-2.5">
              Vehicle Type &amp; Efficiency
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  setVehicleType('scooter_light');
                  setSpeedKmh(35);
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  vehicleType === 'scooter_light'
                    ? 'border-[#C86432] bg-[#FAF0E6] shadow-2xs'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] hover:bg-white'
                }`}
              >
                <span className="text-base block mb-0.5">🛵</span>
                <span className="font-bold block text-[#2D2620]">125cc Scooter</span>
                <span className="text-[#8C7A6B] text-[11px] block mt-0.5">Vario / Scoopy (~40 km/L)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVehicleType('scooter_maxi');
                  setSpeedKmh(38);
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  vehicleType === 'scooter_maxi'
                    ? 'border-[#C86432] bg-[#FAF0E6] shadow-2xs'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] hover:bg-white'
                }`}
              >
                <span className="text-base block mb-0.5">🏍️</span>
                <span className="font-bold block text-[#2D2620]">155cc Maxi Scooter</span>
                <span className="text-[#8C7A6B] text-[11px] block mt-0.5">NMax / PCX (~32 km/L)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVehicleType('car');
                  setSpeedKmh(25);
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  vehicleType === 'car'
                    ? 'border-[#C86432] bg-[#FAF0E6] shadow-2xs'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] hover:bg-white'
                }`}
              >
                <span className="text-base block mb-0.5">🚗</span>
                <span className="font-bold block text-[#2D2620]">Car / Driver</span>
                <span className="text-[#8C7A6B] text-[11px] block mt-0.5">Avanza / Innova (~12 km/L)</span>
              </button>
            </div>
          </div>

          {/* Indonesian Petrol Grade Selection */}
          <div className="pt-2 border-t border-[#F0E6D8]">
            <label className="bali-form-label block mb-2">
              Indonesian Pertamina Fuel Grade
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFuelType(10000)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  fuelType === 10000
                    ? 'border-[#C86432] bg-[#FAF0E6] font-bold text-[#C86432]'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                }`}
              >
                <span className="block font-semibold">Pertalite (RON 90)</span>
                <span className="text-[11px] font-mono">Rp 10,000 / L</span>
              </button>

              <button
                type="button"
                onClick={() => setFuelType(13000)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  fuelType === 13000
                    ? 'border-[#C86432] bg-[#FAF0E6] font-bold text-[#C86432]'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                }`}
              >
                <span className="block font-semibold">Pertamax (RON 92)</span>
                <span className="text-[11px] font-mono">Rp 13,000 / L</span>
              </button>

              <button
                type="button"
                onClick={() => setFuelType(14400)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  fuelType === 14400
                    ? 'border-[#C86432] bg-[#FAF0E6] font-bold text-[#C86432]'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3F35]'
                }`}
              >
                <span className="block font-semibold">Pertamax Turbo (98)</span>
                <span className="text-[11px] font-mono">Rp 14,400 / L</span>
              </button>
            </div>
            <span className="text-[11px] text-[#8C7A6B] mt-1.5 block">
              Tip: Blue Pertamina petrol stations (SPBU) are official and cheaper than street &quot;Pertamini&quot; glass bottle vendors.
            </span>
          </div>

        </div>

        {/* Right Column: Calculations & Comparison (5 cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          
          <div className="bg-[#2D2620] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-[#423932]">
            <div className="flex items-center justify-between border-b border-stone-700/80 pb-3 mb-5">
              <span className="text-xs uppercase tracking-widest text-[#E8924A] font-semibold">
                Estimated Trip Fuel &amp; Duration
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {effectiveDistance} km Total
              </span>
            </div>

            {/* Fuel Cost Big Numbers */}
            <div className="mb-6">
              <span className="text-stone-400 text-xs block mb-0.5">Estimated Fuel Cost</span>
              <div className="text-2xl sm:text-3xl font-bold font-serif-bali text-[#FDF8F0] tracking-tight">
                {formatIDR(estimatedFuelCostIDR)}
              </div>
              <div className="text-lg font-bold font-mono text-[#E8924A] mt-0.5 tabular-nums">
                ≈ {formatForeign(estimatedFuelCostForeign, selectedCurrency)}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-800/80 border border-stone-700 mb-6 text-xs font-mono tabular-nums">
              <div>
                <span className="text-stone-400 text-[11px] block font-sans">Fuel Needed:</span>
                <span className="font-bold text-white text-base block mt-0.5">
                  {fuelLitersRequired.toFixed(2)} Liters
                </span>
                <span className="text-stone-400 text-[11px] block font-sans">
                  ~{(fuelLitersRequired / 4).toFixed(1)} full tank(s)
                </span>
              </div>

              <div>
                <span className="text-stone-400 text-[11px] block font-sans">Estimated Time:</span>
                <span className="font-bold text-[#E8924A] text-base block mt-0.5">
                  {hours > 0 ? `${hours}h ` : ''}{minutes}m
                </span>
                <span className="text-stone-400 text-[11px] block font-sans">
                  @ ~{speedKmh} km/h avg
                </span>
              </div>
            </div>

            {/* Scooter vs Car Travel Time Benchmark */}
            <div className="space-y-2 border-t border-stone-700 pt-4 text-xs">
              <span className="font-semibold text-stone-200 block">
                Bali Traffic Reality Comparison:
              </span>
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5"><span>🛵</span> Scooter on this route:</span>
                <span className="font-mono text-emerald-400 font-bold">~{selectedRoute.scooterMinutes * (isRoundTrip ? 2 : 1)} mins</span>
              </div>
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5"><span>🚗</span> Car / Taxi on this route:</span>
                <span className="font-mono text-amber-400 font-bold">~{selectedRoute.carMinutes * (isRoundTrip ? 2 : 1)} mins</span>
              </div>
              <span className="text-[11px] text-stone-400 block pt-1 leading-relaxed">
                Note: Narrow alleys &amp; shortcuts in Canggu, Berawa, and Ubud center frequently stall car traffic by 30–50 minutes.
              </span>
            </div>

          </div>

          {/* Bali Scooter Safety & Legal Checklist */}
          <div className="bg-white rounded-2xl border border-[#E8DEC8] p-5 shadow-xs text-xs text-[#4A3F35] space-y-3">
            <h3 className="font-serif-bali text-sm font-bold text-[#2D2620] flex items-center gap-1.5">
              <FrangipaniIcon size={16} />
              <span>Bali Riding &amp; Village Etiquette</span>
            </h3>
            <ul className="space-y-2 list-disc list-inside text-[#6B5D52] text-[11px] leading-relaxed">
              <li><strong>Temple Processions (Ngaben &amp; Melasti):</strong> If you meet a Balinese Hindu ceremonial procession, stop your scooter, turn off your engine, and wait patiently. Never cut through worshippers.</li>
              <li><strong>Watch for Road Offerings (Canang Sari):</strong> Look out for small square coconut leaf offerings placed on street curbs and village intersections. Steer gently around them.</li>
              <li><strong>International Driving Permit (IDP 1949):</strong> Always carry your physical IDP and home motorcycle license to comply with Indonesian traffic regulations.</li>
              <li><strong>Helmet Law:</strong> Helmets with fastened chin straps are mandatory for both driver and passenger.</li>
              <li><strong>Canggu Shortcut Caution:</strong> Slow down at single-lane rice field shortcuts; yielding right-of-way prevents sliding into paddies.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
