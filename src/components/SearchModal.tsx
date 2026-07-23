import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Smartphone, Headphones, Shield, Sparkles } from 'lucide-react';
import { PHONE_MODELS, ACCESSORIES } from '../data/products';
import { PhoneModel, Accessory } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhone: (phone: PhoneModel) => void;
  onSelectAccessory: (accessory: Accessory) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPhone,
  onSelectAccessory
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPhones = PHONE_MODELS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.chip.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAccessories = ACCESSORIES.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.tagline.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-neutral-950/60 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-100 flex items-center gap-3 bg-neutral-50/50">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, titanium accessories, specs (e.g. '16 Pro', 'Spatial', 'Titanium')..."
            className="w-full text-sm bg-transparent outline-hidden text-neutral-900 placeholder:text-neutral-400 font-sans"
            autoFocus
            id="search-input-field"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-neutral-700 font-medium"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 rounded-lg transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="px-4 py-3 bg-neutral-100/50 border-b border-neutral-100 text-xs flex items-center gap-2 overflow-x-auto">
            <span className="text-neutral-400 font-mono text-[10px] uppercase tracking-wider shrink-0">Popular:</span>
            {['16 Pro Max', 'Natural Titanium', 'Earbuds', 'MagSafe Case', 'Customizer'].map((chip) => (
              <button
                key={chip}
                onClick={() => setQuery(chip)}
                className="bg-white border border-neutral-200 text-neutral-700 px-2.5 py-1 rounded-full text-xs hover:border-neutral-900 hover:text-neutral-900 transition-colors shrink-0 flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Search Results List */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Phones Section */}
          {filteredPhones.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2.5 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-neutral-600" />
                Smartphones ({filteredPhones.length})
              </div>
              <div className="space-y-2">
                {filteredPhones.map((phone) => (
                  <button
                    key={phone.id}
                    onClick={() => {
                      onSelectPhone(phone);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50/80 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 overflow-hidden shrink-0 flex items-center justify-center p-1 border border-neutral-200">
                        <img
                          src={phone.finishes[0].imageAngleFront}
                          alt={phone.name}
                          className="object-cover h-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-neutral-900 group-hover:text-neutral-950 flex items-center gap-2">
                          {phone.name}
                          {phone.badge && (
                            <span className="text-[10px] bg-neutral-900 text-white px-1.5 py-0.5 rounded-sm font-normal">
                              {phone.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 line-clamp-1">{phone.tagline}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-xs font-bold text-neutral-900">From ${phone.startingPrice}</div>
                      <div className="text-[10px] text-neutral-400 flex items-center justify-end gap-1 group-hover:text-neutral-900">
                        Explore <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Accessories Section */}
          {filteredAccessories.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2.5 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-neutral-600" />
                Accessories ({filteredAccessories.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredAccessories.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => {
                      onSelectAccessory(acc);
                      onClose();
                    }}
                    className="text-left p-3 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200 p-1">
                      <img
                        src={acc.image}
                        alt={acc.name}
                        className="object-cover h-full w-full rounded-xs"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs text-neutral-900 truncate group-hover:text-neutral-950">
                        {acc.name}
                      </div>
                      <div className="font-mono text-[11px] font-bold text-neutral-700">${acc.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPhones.length === 0 && filteredAccessories.length === 0 && (
            <div className="py-12 text-center text-neutral-400 space-y-2">
              <Shield className="w-8 h-8 mx-auto text-neutral-300" />
              <div className="text-sm font-medium text-neutral-700">No matching products found</div>
              <p className="text-xs text-neutral-400">Try searching for "16 Pro", "Titanium", "Audio" or "Wallet".</p>
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="p-3 bg-neutral-100/80 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between font-mono">
          <span>Aura Store Search System v3.2</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
