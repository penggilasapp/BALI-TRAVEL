import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CurrencyConverter } from './components/CurrencyConverter';
import { TripBudgetCalculator } from './components/TripBudgetCalculator';
import { AuthenticBaliExplorer } from './components/AuthenticBaliExplorer';
import { RouteFuelCalculator } from './components/RouteFuelCalculator';
import { SplitCostCalculator } from './components/SplitCostCalculator';
import { BaliTravelTipsModal } from './components/BaliTravelTipsModal';
import { SettingsAboutModal } from './components/SettingsAboutModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { TriHitaKaranaBanner } from './components/BalineseMotifs';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('currency');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [addedDestinationsCost, setAddedDestinationsCost] = useState<number>(0);
  const [addedDestinations, setAddedDestinations] = useState<string[]>([]);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0);

  const handleAddToBudget = (amount: number, destinationName: string) => {
    if (!addedDestinations.includes(destinationName)) {
      setAddedDestinations((prev) => [...prev, destinationName]);
      setAddedDestinationsCost((prev) => prev + amount);
    }
  };

  const handleClearAddedDestinations = () => {
    setAddedDestinations([]);
    setAddedDestinationsCost(0);
  };

  const handleResetApp = () => {
    setSelectedCurrency('USD');
    setAddedDestinations([]);
    setAddedDestinationsCost(0);
    setActiveTab('currency');
    setResetKey((prev) => prev + 1);
  };

  return (
    <div key={resetKey} className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2D2620] pb-20 md:pb-0">
      
      {/* Top Navigation Bar with PENGGILAS branding & app icon */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        onOpenTips={() => setIsTipsModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        
        {/* Hero Section Banner with PENGGILAS creator badge */}
        <HeroBanner
          onSelectTab={setActiveTab}
          selectedCurrency={selectedCurrency}
          onOpenSettings={() => setIsSettingsOpen(true)}
          activeTab={activeTab}
        />

        {/* Tab Content Container */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          
          <div key={activeTab} className="animate-fade-in-up">
            {/* CURRENCY CONVERTER TAB */}
            {activeTab === 'currency' && (
              <CurrencyConverter
                initialForeignCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            )}

            {/* TRIP BUDGET CALCULATOR TAB */}
            {activeTab === 'budget' && (
              <TripBudgetCalculator
                selectedCurrency={selectedCurrency}
                addedDestinationsCost={addedDestinationsCost}
                onClearAddedDestinations={handleClearAddedDestinations}
                onNavigateToExplorer={() => setActiveTab('explorer')}
              />
            )}

            {/* AUTHENTIC BALI EXPLORER TAB */}
            {activeTab === 'explorer' && (
              <AuthenticBaliExplorer
                selectedCurrency={selectedCurrency}
                onAddToBudget={handleAddToBudget}
                addedDestinations={addedDestinations}
              />
            )}

            {/* SCOOTER ROUTES & FUEL ESTIMATOR TAB */}
            {activeTab === 'routes' && (
              <RouteFuelCalculator
                selectedCurrency={selectedCurrency}
              />
            )}

            {/* SPLIT BILL / GROUP COST TAB */}
            {activeTab === 'split' && (
              <SplitCostCalculator
                selectedCurrency={selectedCurrency}
              />
            )}
          </div>

          {/* Traditional Balinese Cultural Philosophy Banner */}
          <div className="mt-12 sm:mt-16">
            <TriHitaKaranaBanner />
          </div>

        </main>

      </div>

      {/* Cheatsheet & Tips Modal */}
      <BaliTravelTipsModal
        isOpen={isTipsModalOpen}
        onClose={() => setIsTipsModalOpen(false)}
      />

      {/* PENGGILAS Settings & About Modal */}
      <SettingsAboutModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetApp={handleResetApp}
      />

      {/* Thumb-friendly mobile phone bottom navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Footer with PENGGILAS Logo & Bali Artwork */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenTips={() => setIsTipsModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

    </div>
  );
}
