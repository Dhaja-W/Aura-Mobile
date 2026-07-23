import React, { useState, useRef } from 'react';
import { Headphones, ChevronLeft, ChevronRight, Star, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { ACCESSORIES } from '../data/products';
import { Accessory, CartItem } from '../types';

interface AccessoriesCarouselProps {
  onAddToCart: (item: CartItem) => void;
  currency: string;
}

export const AccessoriesCarousel: React.FC<AccessoriesCarouselProps> = ({
  onAddToCart,
  currency
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Accessories' },
    { id: 'audio', label: 'Spatial Audio' },
    { id: 'cases', label: 'Cases & Wallets' },
    { id: 'power', label: 'Power & Docks' },
    { id: 'straps', label: 'Titanium Straps' },
    { id: 'lenses', label: 'Camera Lenses' },
  ];

  const filteredAccessories = selectedCategory === 'all'
    ? ACCESSORIES
    : ACCESSORIES.filter((acc) => acc.category === selectedCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAddAccessory = (acc: Accessory) => {
    const cartItem: CartItem = {
      id: `cart-acc-${acc.id}-${Date.now()}`,
      productId: acc.id,
      type: 'accessory',
      name: acc.name,
      selectedColor: acc.colors[0],
      price: acc.price,
      quantity: 1,
      image: acc.image,
    };

    onAddToCart(cartItem);
    setAddedIds((prev) => ({ ...prev, [acc.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [acc.id]: false }));
    }, 2000);
  };

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };
  const sym = currencySymbols[currency] || '$';

  return (
    <section id="accessories" className="py-20 lg:py-28 bg-white border-b border-neutral-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-2 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-neutral-900" />
              <span>Ecosystem & Accessories</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight font-sans">
              Designed for Aura.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-xl">
              Precision accessories crafted from Grade 5 titanium, full-grain Italian leather, and obsidian ceramic.
            </p>
          </div>

          {/* Carousel Scroll Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
              title="Scroll Left"
              id="acc-scroll-left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
              title="Scroll Right"
              id="acc-scroll-right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-neutral-950 text-white font-semibold shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredAccessories.map((acc) => {
            const isJustAdded = addedIds[acc.id];
            return (
              <div
                key={acc.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-2">
                  {acc.isNew ? (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono flex items-center gap-1 border border-amber-200">
                      <Sparkles className="w-2.5 h-2.5" /> New Release
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-400 capitalize">{acc.category}</span>
                  )}

                  <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-800">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{acc.rating}</span>
                  </div>
                </div>

                {/* Image Frame */}
                <div className="aspect-square bg-neutral-50 rounded-2xl p-4 my-2 flex items-center justify-center overflow-hidden group-hover:bg-neutral-100/50 transition-colors">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="max-h-48 w-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Color dots preview */}
                <div className="my-2 flex items-center gap-1.5">
                  {acc.colors.map((col, idx) => (
                    <div
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-neutral-950 group-hover:text-neutral-800 transition-colors">
                    {acc.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{acc.tagline}</p>
                </div>

                {/* Price & Add to Bag */}
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div className="font-mono font-black text-base text-neutral-950">
                    {sym}{acc.price}
                  </div>

                  <button
                    onClick={() => handleAddAccessory(acc)}
                    className={`p-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-950 hover:bg-neutral-800 text-white shadow-xs'
                    }`}
                    id={`add-acc-${acc.id}`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
