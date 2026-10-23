import React, { useState } from 'react';
import { BALI_DESTINATIONS } from '../data/baliDestinations';
import { BaliDestination, BaliRegion, DestinationCategory } from '../types';
import { formatIDR, formatForeign, SUPPORTED_CURRENCIES } from '../data/currenciesData';
import { PolengRibbon, FrangipaniIcon, CandiBentarIcon } from './BalineseMotifs';

interface AuthenticBaliExplorerProps {
  selectedCurrency: string;
  onAddToBudget: (amount: number, destinationName: string) => void;
  addedDestinations: string[];
}

export const AuthenticBaliExplorer: React.FC<AuthenticBaliExplorerProps> = ({
  selectedCurrency,
  onAddToBudget,
  addedDestinations,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<BaliRegion>('All Regions');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalDest, setActiveModalDest] = useState<BaliDestination | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getRate = (code: string): number => {
    return SUPPORTED_CURRENCIES.find((c) => c.code === code)?.rateToIdr || 16250;
  };
  const foreignRate = getRate(selectedCurrency);

  const regions: BaliRegion[] = [
    'All Regions',
    'Ubud & Gianyar',
    'South Bali & Bukit',
    'Canggu, Seminyak & West',
    'North & Bedugul',
    'East Bali & Karangasem',
  ];

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'temple', label: 'Sacred Temples' },
    { id: 'waterfall', label: 'Waterfalls' },
    { id: 'beach', label: 'Beaches & Swells' },
    { id: 'nature', label: 'Rice Terraces' },
    { id: 'culture', label: 'Village Heritage' },
  ];

  const filteredDestinations = BALI_DESTINATIONS.filter((item) => {
    const matchesRegion = selectedRegion === 'All Regions' || item.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.balineseName && item.balineseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesRegion && matchesCategory && matchesSearch;
  });

  const handleAddDestination = (dest: BaliDestination) => {
    // Add entrance fee + modest parking/travel allowance (e.g. 50,000 IDR)
    const cost = dest.entranceFeeIDR + dest.parkingFeeIDR;
    onAddToBudget(cost, dest.name);
    setToastMessage(`Added ${dest.name} (+${formatIDR(cost)}) to your Trip Budget!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2620] text-white px-4 py-3 rounded-xl shadow-xl border border-[#C86432] text-xs font-medium flex items-center gap-2 animate-bounce">
          <span>⛩️</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DEC8] pb-4">
        <div>
          <h2 className="bali-page-title">
            Authentic Bali Places &amp; Explorer
          </h2>
          <p className="bali-subtitle mt-0.5">
            Curated sacred temples, hidden jungle waterfalls, UNESCO rice terraces, and village sanctuaries with exact entrance fees.
          </p>
        </div>

        <div className="text-xs text-[#8C7A6B] font-medium bg-[#FAF0E6] text-[#C86432] px-3 py-1.5 rounded-lg border border-[#E8DEC8] self-start sm:self-auto font-mono">
          {filteredDestinations.length} Places Found
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E3D6C1] shadow-xs overflow-hidden">
        <PolengRibbon height={5} />
        <div className="p-5 space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, region, or keyword (e.g. 'Melukat', 'Tegallalang', 'Uluwatu', 'Kecak')..."
            className="w-full bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl pl-4 pr-10 py-2.5 text-sm text-[#2D2620] placeholder-[#A39282] focus:ring-2 focus:ring-[#B85324] focus:border-[#B85324] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-[#A39282] hover:text-[#2D2620] text-sm cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Region Segmented Filter */}
        <div>
          <span className="bali-form-label block mb-2">
            Region Selector
          </span>
          <div className="flex flex-wrap gap-1.5">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-[#B85324] text-white shadow-2xs font-semibold'
                    : 'bg-[#FAF7F2] text-[#6B5D52] hover:bg-[#F3ECE2] border border-[#E8DEC8]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="pt-2 border-t border-[#F0E6D8] flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2D2620] text-white font-medium'
                  : 'bg-[#FAF6EE] text-[#736357] hover:text-[#2D2620] border border-[#DDD0BC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        </div>
      </div>

      {/* Destinations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => {
          const isAdded = addedDestinations.includes(dest.name);
          const convertedFee = dest.entranceFeeIDR / foreignRate;

          return (
            <article
              key={dest.id}
              className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Destination Image */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/home-header-bali.webp';
                    }}
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-black/75 text-amber-300 backdrop-blur-xs">
                      {dest.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-mono backdrop-blur-xs">
                    ★ {dest.rating} ({dest.reviewsCount})
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#8C7A6B] mb-1">
                    <span>{dest.region}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{dest.category}</span>
                  </div>

                  <h3 className="font-serif-bali text-lg font-bold text-[#2D2620] group-hover:text-[#C86432] transition-colors leading-snug">
                    {dest.name}
                  </h3>

                  {dest.balineseName && (
                    <p className="text-[11px] font-medium text-[#8C7A6B] italic mb-2">
                      {dest.balineseName}
                    </p>
                  )}

                  <p className="text-xs text-[#6B5D52] line-clamp-2 leading-relaxed mb-4">
                    {dest.shortDesc}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1 mb-4 text-[11px] text-[#736357]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600">✓</span>
                      <span className="truncate">{dest.highlights[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600">✓</span>
                      <span className="truncate">{dest.highlights[1]}</span>
                    </div>
                  </div>

                  {/* Ticket Price & Travel Time Box */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-[#8C7A6B] uppercase font-semibold block">Official Entry</span>
                      <span className="font-bold text-[#C86432] font-mono tabular-nums text-sm">
                        {dest.entranceFeeIDR === 0 ? 'Free Entry' : formatIDR(dest.entranceFeeIDR)}
                      </span>
                      {dest.entranceFeeIDR > 0 && (
                        <span className="text-[11px] text-[#8C7A6B] block font-mono">
                          ≈ {formatForeign(convertedFee, selectedCurrency)}
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#8C7A6B] uppercase font-semibold block">Drive Time</span>
                      <span className="text-xs text-[#2D2620] font-medium block">
                        ~{dest.travelTimeFromUbudMinutes}m from Ubud
                      </span>
                      <span className="text-[11px] text-[#8C7A6B] block">
                        ~{dest.travelTimeFromKutaMinutes}m from Kuta
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-[#F5EFE6] mt-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveModalDest(dest)}
                  className="py-2 px-3 text-xs font-semibold rounded-lg bg-[#FAF7F2] text-[#4A3F35] border border-[#DDD0BC] hover:bg-[#F3ECE2] transition-colors cursor-pointer text-center"
                >
                  Local Tips & Food
                </button>

                <button
                  type="button"
                  onClick={() => handleAddDestination(dest)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#C86432] text-white hover:bg-[#B35222] shadow-2xs'
                  }`}
                >
                  {isAdded ? '✓ In Budget' : '+ Add to Budget'}
                </button>
              </div>

            </article>
          );
        })}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E8DEC8] p-8">
          <span className="text-3xl block mb-2">🌴</span>
          <h3 className="font-serif-bali text-lg font-bold text-[#2D2620]">No destinations found</h3>
          <p className="text-xs text-[#736357] mt-1">
            Try adjusting your search keywords or select &quot;All Regions&quot;.
          </p>
        </div>
      )}

      {/* Destination Detail & Cultural Etiquette Modal */}
      {activeModalDest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8DEC8] shadow-2xl p-6 sm:p-8">
            
            <div className="flex items-start justify-between gap-4 border-b border-[#F0E6D8] pb-4 mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C86432]">
                  {activeModalDest.region} · {activeModalDest.category}
                </span>
                <h3 className="font-serif-bali text-2xl font-bold text-[#2D2620] mt-0.5">
                  {activeModalDest.name}
                </h3>
                {activeModalDest.balineseName && (
                  <p className="text-xs text-[#8C7A6B] italic">
                    {activeModalDest.balineseName}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveModalDest(null)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#6B5D52] hover:bg-[#F0E6D8] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#4A3F35]">
              <p className="leading-relaxed text-sm text-[#382F27]">
                {activeModalDest.fullDesc}
              </p>

              {/* Highlights */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC8]">
                <span className="font-bold text-[#2D2620] uppercase text-[11px] tracking-wider block mb-2">
                  Key Authentic Highlights:
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-xs text-[#6B5D52]">
                  {activeModalDest.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Cultural Etiquette */}
              <div className="bg-[#FFF9F2] p-4 rounded-xl border border-[#F0DFCD] text-xs">
                <span className="font-bold text-[#A75424] flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
                  <span>🙏</span> Sacred Etiquette & Dress Code:
                </span>
                <p className="text-[#6E4830] leading-relaxed">
                  {activeModalDest.etiquetteTips}
                </p>
              </div>

              {/* Best Timing & Local Food Recommendation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#E8DEC8]">
                  <span className="font-bold text-[#2D2620] block mb-1">
                    ⏰ Best Time to Visit:
                  </span>
                  <span className="text-[#6B5D52]">{activeModalDest.bestTime}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E8DEC8]">
                  <span className="font-bold text-[#2D2620] block mb-1">
                    🍲 Nearby Authentic Warung:
                  </span>
                  <span className="text-[#6B5D52]">{activeModalDest.nearbyFood}</span>
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C7A6B] block">Entrance Fee</span>
                  <span className="font-bold text-[#C86432] font-mono text-base">
                    {formatIDR(activeModalDest.entranceFeeIDR)} (~{formatForeign(activeModalDest.entranceFeeIDR / foreignRate, selectedCurrency)})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleAddDestination(activeModalDest);
                    setActiveModalDest(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#C86432] text-white font-semibold text-xs hover:bg-[#B35222] transition-colors cursor-pointer shadow-sm"
                >
                  + Add to Trip Budget
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
