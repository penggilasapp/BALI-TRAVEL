import React from 'react';

interface BaliTravelTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BaliTravelTipsModal: React.FC<BaliTravelTipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E8DEC8] shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E8DEC8] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C86432] text-white flex items-center justify-center text-xl font-serif-bali font-bold shadow-xs">
              🌺
            </div>
            <div>
              <h3 className="font-serif-bali text-2xl font-bold text-[#2D2620]">
                Bali Traveler Essential Cheatsheet
              </h3>
              <p className="text-xs text-[#736357]">
                Local etiquette, money safety, and cultural customs for a respectful journey.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DDD0BC] text-[#6B5D52] hover:bg-[#F0E6D8] flex items-center justify-center text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-xs text-[#4A3F35]">
          
          {/* Section 1: Money & ATM Safety */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#C86432]">
              <span>💳</span> Money Changers &amp; ATM Withdrawal Rules
            </div>
            <ul className="space-y-2 list-disc list-inside text-[#6B5D52] leading-relaxed">
              <li>
                <strong>Authorized Money Changers Only:</strong> Never exchange money at tiny souvenir stalls advertising unrealistic rates. Only use official counters displaying the green <strong>&quot;PVA Berizin Bank Indonesia&quot;</strong> license (such as BMC Money Changer or Central Kuta).
              </li>
              <li>
                <strong>Count Twice in Plain View:</strong> Always recount all notes in front of the teller before stepping away from the counter.
              </li>
              <li>
                <strong>ATM Withdrawals:</strong> Prefer ATMs located physically inside official bank branches (BCA, Mandiri, BNI, or CIMB Niaga). Maximum single withdrawal is typically Rp 1,250,000 (in 50k notes) to Rp 2,500,000 (in 100k notes).
              </li>
            </ul>
          </div>

          {/* Section 2: Canang Sari & Temple Etiquette */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#C86432]">
              <span>⛩️</span> Sacred Temple Etiquette &amp; Flower Offerings
            </div>
            <ul className="space-y-2 list-disc list-inside text-[#6B5D52] leading-relaxed">
              <li>
                <strong>Canang Sari (Daily Offerings):</strong> You will see small square woven palm-leaf trays with flowers, incense, and rice placed on doorways and footpaths. Never step over or kick a smoking offering; simply walk mindfully around them.
              </li>
              <li>
                <strong>Temple Dress Code:</strong> Wearing a <em>Sarong</em> (covering knees) and a <em>Selendang</em> (waist sash) is mandatory for both women and men when entering temple grounds. Most temples provide them at the ticket booth.
              </li>
              <li>
                <strong>Sacred Inner Courtyards:</strong> Do not climb onto stone shrines, altars, or step higher than the presiding Hindu priest (Pedanda).
              </li>
              <li>
                <strong>Menstruation Customs:</strong> According to traditional Balinese Hindu rules, women experiencing menstruation are politely requested not to enter temple sanctums.
              </li>
            </ul>
          </div>

          {/* Section 3: Official Bali Tourist Levy */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#C86432]">
              <span>🏛️</span> Official Bali Tourist Levy (Rp 150,000)
            </div>
            <p className="text-[#6B5D52] leading-relaxed">
              The Bali Provincial Government requires all international tourists to contribute <strong>Rp 150,000 (approx. $9.50 USD / A$14)</strong> per entry. This fund is legally dedicated to preserving Balinese cultural heritage, temple maintenance, and environmental cleanup. Pay securely prior to arrival via the official government Love Bali portal or at designated airport counters.
            </p>
          </div>

          {/* Section 4: Balinese Language Cheat Sheet */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#C86432]">
              <span>🗣️</span> Basic Balinese Phrases to Win Smiles
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
                <strong className="text-[#2D2620] block font-serif-bali">Om Swastyastu</strong>
                <span className="text-[11px] text-[#8C7A6B]">Formal Balinese greeting / hello (with palms together at chest)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
                <strong className="text-[#2D2620] block font-serif-bali">Matur Suksma (or Suksma)</strong>
                <span className="text-[11px] text-[#8C7A6B]">Thank you very much (locals love hearing this!)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
                <strong className="text-[#2D2620] block font-serif-bali">Suksma Mewali</strong>
                <span className="text-[11px] text-[#8C7A6B]">You are welcome (polite reply to thank you)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
                <strong className="text-[#2D2620] block font-serif-bali">Rahajeng Semeng</strong>
                <span className="text-[11px] text-[#8C7A6B]">Good morning in Balinese</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Close Button */}
        <div className="mt-6 pt-4 border-t border-[#E8DEC8] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#C86432] text-white text-xs font-semibold hover:bg-[#B35222] transition-colors cursor-pointer shadow-sm"
          >
            Close Cheatsheet
          </button>
        </div>

      </div>
    </div>
  );
};
