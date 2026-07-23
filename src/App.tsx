import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TopModels } from './components/TopModels';
import { Configurator } from './components/Configurator';
import { AccessoriesCarousel } from './components/AccessoriesCarousel';
import { FeatureShowcase } from './components/FeatureShowcase';
import { SpecComparisonModal } from './components/SpecComparisonModal';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';
import { CartItem, PhoneModel, Accessory } from './types';
import { PHONE_MODELS } from './data/products';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<string>('USD');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [comparedModelIds, setComparedModelIds] = useState<string[]>([]);
  
  // Model state passed into customizer
  const [activeConfigModel, setActiveConfigModel] = useState<PhoneModel>(PHONE_MODELS[0]);

  // Scroll navigation helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === newItem.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [newItem, ...prev];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quick Select Phone from grid or search
  const handleSelectModelFromGrid = (model: PhoneModel) => {
    setActiveConfigModel(model);
    handleNavigate('customizer');
  };

  const handleSelectAccessoryFromSearch = (accessory: Accessory) => {
    handleNavigate('accessories');
  };

  const handleOpenCompareModal = (ids: string[]) => {
    setComparedModelIds(ids);
    setIsCompareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
      
      {/* Top Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Layout Sections */}
      <main id="main-content">
        
        {/* Hero Section */}
        <Hero
          onConfigureNow={() => handleNavigate('customizer')}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onSelectModel={(id) => {
            const m = PHONE_MODELS.find((p) => p.id === id) || PHONE_MODELS[0];
            handleSelectModelFromGrid(m);
          }}
        />

        {/* Top Selling Models Grid */}
        <TopModels
          onSelectModel={handleSelectModelFromGrid}
          onCompareModels={handleOpenCompareModal}
          currency={currency}
        />

        {/* Build Your Aura Configurator Studio */}
        <Configurator
          initialModel={activeConfigModel}
          onAddToCart={handleAddToCart}
          currency={currency}
        />

        {/* Accessories Carousel */}
        <AccessoriesCarousel
          onAddToCart={handleAddToCart}
          currency={currency}
        />

        {/* Feature Showcase (Titanium, Silicon, Camera, Spatial Audio) */}
        <FeatureShowcase />

        {/* Reviews and Press Accolades */}
        <ReviewsSection />

      </main>

      {/* Apple-style Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPhone={handleSelectModelFromGrid}
        onSelectAccessory={handleSelectAccessoryFromSearch}
      />

      {/* Launch Film Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Technical Spec Comparison Table Modal */}
      <SpecComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedModelIds={comparedModelIds}
        onSelectModel={handleSelectModelFromGrid}
        currency={currency}
      />

    </div>
  );
}
