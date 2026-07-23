import React, { useState } from 'react';
import { Sparkles, Check, Shield, RefreshCw, PenTool, ShoppingBag, ArrowRight } from 'lucide-react';
import { PHONE_MODELS } from '../data/products';
import { PhoneModel, ColorOption, CartItem } from '../types';

interface ConfiguratorProps {
  initialModel?: PhoneModel;
  onAddToCart: (item: CartItem) => void;
  currency: string;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  initialModel = PHONE_MODELS[0],
  onAddToCart,
  currency
}) => {
  const [selectedModel, setSelectedModel] = useState<PhoneModel>(initialModel);
  const [selectedFinish, setSelectedFinish] = useState<ColorOption>(initialModel.finishes[0]);
  const [selectedStorage, setSelectedStorage] = useState<string>(initialModel.storageOptions[0].size);
  const [engravingText, setEngravingText] = useState<string>('');
  const [hasAuraCare, setHasAuraCare] = useState<boolean>(false);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // 3D Angle Switcher State
  const [selectedAngle, setSelectedAngle] = useState<'3D' | 'front' | 'back' | 'side'>('back');

  const getImageForAngle = () => {
    switch (selectedAngle) {
      case '3D': return selectedFinish.imageAngle3D;
      case 'front': return selectedFinish.imageAngleFront || selectedFinish.imageAngle3D;
      case 'side': return selectedFinish.imageAngleSide || selectedFinish.imageAngle3D;
      case 'back': default: return selectedFinish.imageAngleBack;
    }
  };

  // Storage price delta
  const storageOpt = selectedModel.storageOptions.find((s) => s.size === selectedStorage) || selectedModel.storageOptions[0];
  const storageDelta = storageOpt.priceDelta;

  const auraCarePrice = hasAuraCare ? 199 : 0;
  const totalPrice = selectedModel.startingPrice + storageDelta + auraCarePrice - tradeInValue;

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };
  const sym = currencySymbols[currency] || '$';

  const handleModelChange = (model: PhoneModel) => {
    setSelectedModel(model);
    setSelectedFinish(model.finishes[0]);
    setSelectedStorage(model.storageOptions[0].size);
  };

  const handleAddToCart = () => {
    const newItem: CartItem = {
      id: `cart-${selectedModel.id}-${selectedFinish.id}-${selectedStorage}-${Date.now()}`,
      productId: selectedModel.id,
      type: 'phone',
      name: selectedModel.name,
      selectedColor: selectedFinish,
      selectedStorage: selectedStorage,
      engravingText: engravingText.trim() || undefined,
      hasAuraCare,
      tradeInDiscount: tradeInValue > 0 ? tradeInValue : undefined,
      price: Math.max(1, totalPrice),
      quantity: 1,
      image: selectedFinish.imageAngle3D,
    };

    onAddToCart(newItem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <section id="customizer" className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-xs font-mono font-semibold text-neutral-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Personalization Studio</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-neutral-950 tracking-tight font-sans">
            Build Your Aura.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Select your model, titanium finish, memory capacity, and add precision laser engraving.
          </p>
        </div>

        {/* Configurator 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Live Visual Phone Preview & Engraving Canvas */}
          <div className="lg:col-span-6 sticky top-24 space-y-6">
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 shadow-inner flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden group">
              
              {/* Finish Label Top Left */}
              <div className="absolute top-6 left-6 text-xs font-mono text-neutral-500 bg-white/90 border border-neutral-200 px-3 py-1.5 rounded-full shadow-2xs backdrop-blur-md">
                <span>{selectedFinish.name}</span> • <span>{selectedStorage}</span>
              </div>

              {/* Angle Switcher Tabs (Top Right inside preview) */}
              <div className="absolute top-6 right-6 flex items-center bg-white/90 border border-neutral-200 p-1 rounded-full shadow-2xs backdrop-blur-md z-10">
                {(['back', 'front', 'side', '3D'] as const).map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setSelectedAngle(angle)}
                    className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded-full transition-all cursor-pointer ${
                      selectedAngle === angle 
                        ? 'bg-neutral-950 text-white font-bold shadow-xs' 
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    {angle}
                  </button>
                ))}
              </div>

              {/* Product Preview Image */}
              <div className="relative w-full max-w-sm aspect-3/4 flex items-center justify-center my-4">
                <img
                  src={getImageForAngle()}
                  alt={selectedModel.name}
                  className="max-h-[380px] w-auto object-contain transition-all duration-300 drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Laser Engraving Preview Overlay */}
                {engravingText && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-neutral-900/90 text-amber-100 font-mono text-[11px] font-bold px-3 py-1 rounded border border-amber-500/50 shadow-xl tracking-widest uppercase animate-pulse">
                    <PenTool className="w-2.5 h-2.5 inline mr-1 text-amber-400" />
                    "{engravingText}"
                  </div>
                )}
              </div>

              {/* Engraving Callout */}
              <div className="text-xs text-neutral-500 font-mono text-center">
                {engravingText ? 'Laser engraving applied on titanium casing' : 'Free custom laser engraving available'}
              </div>
            </div>

            {/* Quick Feature Highlights Summary */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="text-neutral-400 font-mono text-[10px] uppercase">Display</div>
                <div className="font-bold text-neutral-900 mt-0.5">{selectedModel.displaySize.split(' ')[0]}</div>
              </div>
              <div className="border-x border-neutral-100">
                <div className="text-neutral-400 font-mono text-[10px] uppercase">Neural Engine</div>
                <div className="font-bold text-neutral-900 mt-0.5">{selectedModel.chip.split(' ')[0]}</div>
              </div>
              <div>
                <div className="text-neutral-400 font-mono text-[10px] uppercase">Optical Zoom</div>
                <div className="font-bold text-neutral-900 mt-0.5">5x Telephoto</div>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer Options Form */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Step 1: Model Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <span>Step 1. Choose Model</span>
                <span className="text-neutral-950 font-mono">{selectedModel.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PHONE_MODELS.map((model) => {
                  const isSelected = selectedModel.id === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => handleModelChange(model)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                          : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-900'
                      }`}
                      id={`config-model-${model.id}`}
                    >
                      <div className="font-extrabold text-sm">{model.name}</div>
                      <div className={`text-xs mt-1 font-mono ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        From {sym}{model.startingPrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Titanium Finish Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <span>Step 2. Choose Finish</span>
                <span className="text-neutral-950 font-mono">{selectedFinish.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedModel.finishes.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-950 bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center shadow-2xs"
                        style={{ backgroundColor: finish.hex }}
                      >
                        {isSelected && <Check className="w-4 h-4 text-neutral-950" />}
                      </div>
                      <span className="text-xs font-semibold text-neutral-900 line-clamp-1">{finish.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Storage Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <span>Step 3. Storage Capacity</span>
                <span className="text-neutral-950 font-mono">{selectedStorage}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {selectedModel.storageOptions.map((opt) => {
                  const isSelected = selectedStorage === opt.size;
                  return (
                    <button
                      key={opt.size}
                      onClick={() => setSelectedStorage(opt.size)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                          : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-900'
                      }`}
                      id={`storage-opt-${opt.size}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-base">{opt.size}</span>
                        <span className={`text-xs font-mono ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {opt.priceDelta === 0 ? 'Included' : `+${sym}${opt.priceDelta}`}
                        </span>
                      </div>
                      <p className={`text-[11px] mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Personal Engraving */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-amber-500" /> Free Laser Engraving
                </span>
                <span className="text-neutral-400 font-mono">Optional</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  maxLength={18}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="e.g. A. WRIGHT 2026 or INITIA..."
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 font-mono placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950"
                  id="engraving-input-field"
                />
                <span className="absolute right-3 top-3.5 text-[10px] font-mono text-neutral-400">
                  {18 - engravingText.length} left
                </span>
              </div>
            </div>

            {/* Step 5: AuraCare Warranty Protection */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Step 5. Protection & Service
              </div>
              <button
                onClick={() => setHasAuraCare(!hasAuraCare)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                  hasAuraCare
                    ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className={`p-2 rounded-xl ${hasAuraCare ? 'bg-amber-500 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-neutral-950">AuraCare+ 2-Year Full Protection</span>
                    <span className="font-mono text-xs font-bold text-neutral-900">+{sym}199</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Unlimited accidental damage coverage, express device replacement & 24/7 priority genius tech support.
                  </p>
                </div>
              </button>
            </div>

            {/* Step 6: Trade-In Valuation Estimator */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-500" /> Aura Trade-in Program
                </span>
                <span className="text-neutral-950 font-mono">
                  {tradeInValue > 0 ? `-${sym}${tradeInValue} credit` : 'No trade-in'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 150, 350, 500].map((credit) => (
                  <button
                    key={credit}
                    onClick={() => setTradeInValue(credit)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-mono transition-all cursor-pointer ${
                      tradeInValue === credit
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    {credit === 0 ? 'None' : `-${sym}${credit}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Price & Checkout Action Bar */}
            <div className="pt-6 border-t border-neutral-200 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-neutral-500 font-mono uppercase">Total Investment</div>
                  <div className="text-3xl font-black text-neutral-950 font-mono mt-0.5">
                    {sym}{Math.max(0, totalPrice)}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Or {sym}{(totalPrice / 24).toFixed(2)}/mo for 24 months with 0% APR.
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-3 shadow-xl cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-white'
                  }`}
                  id="customizer-add-to-bag-btn"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Shopping Bag</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
