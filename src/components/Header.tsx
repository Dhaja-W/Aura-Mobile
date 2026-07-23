import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Sparkles, Globe, ChevronDown, Check } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onNavigate,
  activeSection,
  currency,
  onCurrencyChange,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = [
    { code: 'USD', symbol: '$', label: 'United States (USD $)' },
    { code: 'EUR', symbol: '€', label: 'Europe (EUR €)' },
    { code: 'GBP', symbol: '£', label: 'United Kingdom (GBP £)' },
    { code: 'JPY', symbol: '¥', label: 'Japan (JPY ¥)' },
  ];

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'top-models', label: 'Phones' },
    { id: 'customizer', label: 'Customizer' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'tech-specs', label: 'Tech Specs' },
    { id: 'compare', label: 'Compare' },
    { id: 'reviews', label: 'Accolades' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-[12px] font-medium py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-neutral-800">
        <span className="inline-flex items-center gap-1.5 bg-neutral-800 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-semibold">
          <Sparkles className="w-3 h-3" /> New Release
        </span>
        <span>Aura 16 Pro Max is here. Free Express Shipping & 2-Year AuraCare Warranty on all orders.</span>
        <button 
          onClick={() => handleLinkClick('customizer')}
          className="underline hover:text-white transition-colors ml-1 font-semibold"
        >
          Configure Now &rarr;
        </button>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200/80 shadow-xs'
            : 'bg-white border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => handleLinkClick('hero')}
              className="flex items-center gap-2 group text-left focus:outline-hidden"
              id="header-logo-button"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center font-bold text-lg tracking-tighter group-hover:bg-neutral-800 transition-colors shadow-xs">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-widest text-neutral-900 text-base leading-tight uppercase font-sans">
                  AURA
                </span>
                <span className="text-[9px] tracking-widest text-neutral-400 font-mono uppercase -mt-0.5">
                  Titanium
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-neutral-950 bg-neutral-100 font-semibold shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                    }`}
                    id={`nav-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors flex items-center gap-2 text-xs"
              title="Search store (Cmd+K)"
              id="header-search-btn"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-neutral-400 font-mono text-[11px] bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">
                ⌘K
              </span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors flex items-center gap-1 border border-neutral-200/80"
                id="header-currency-selector"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <span className="hidden sm:inline font-mono font-semibold">{currency}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-neutral-400 font-semibold font-mono border-b border-neutral-100">
                    Select Currency
                  </div>
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center justify-between transition-colors"
                    >
                      <span className="text-neutral-800">{c.label}</span>
                      {currency === c.code && <Check className="w-3.5 h-3.5 text-neutral-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors flex items-center justify-center"
              title="View Shopping Bag"
              id="header-bag-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neutral-950 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
              id="header-mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-neutral-400 text-xs">&rarr;</span>
              </button>
            ))}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between px-4">
              <span className="text-xs text-neutral-500 font-mono">Currency: {currency}</span>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="text-xs text-neutral-900 font-semibold underline"
              >
                Change Currency
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
