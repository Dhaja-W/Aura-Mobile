import React, { useState } from 'react';
import { Smartphone, Check, Cpu, Camera, Layers, ArrowRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { PHONE_MODELS } from '../data/products';
import { PhoneModel, ColorOption } from '../types';

interface TopModelsProps {
  onSelectModel: (model: PhoneModel) => void;
  onCompareModels: (selectedIds: string[]) => void;
  currency: string;
}

export const TopModels: React.FC<TopModelsProps> = ({
  onSelectModel,
  onCompareModels,
  currency
}) => {
  const [selectedFinishes, setSelectedFinishes] = useState<Record<string, ColorOption>>({
    'aura-16-pro-max': PHONE_MODELS[0].finishes[0],
    'aura-16-pro': PHONE_MODELS[1].finishes[0],
    'aura-fold-ultra': PHONE_MODELS[2].finishes[0],
    'aura-studio-ceramic': PHONE_MODELS[3].finishes[0],
  });

  const [comparedModelIds, setComparedModelIds] = useState<string[]>([]);

  const handleFinishChange = (modelId: string, finish: ColorOption) => {
    setSelectedFinishes((prev) => ({ ...prev, [modelId]: finish }));
  };

  const toggleCompare = (id: string) => {
    setComparedModelIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };
  const sym = currencySymbols[currency] || '$';

  return (
    <section id="top-models" className="py-20 lg:py-28 bg-neutral-50/50 border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-2 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-neutral-800" />
              <span>Flagship Collection</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight font-sans">
              Top Selling Models.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-xl">
              Engineered with precision. Choose the titanium architecture built for your lifestyle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedModelIds.length > 0 && (
              <button
                onClick={() => onCompareModels(comparedModelIds)}
                className="bg-neutral-900 text-white font-medium text-xs px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md hover:bg-neutral-800 transition-all animate-bounce-subtle"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Compare Selected ({comparedModelIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHONE_MODELS.map((model) => {
            const activeFinish = selectedFinishes[model.id] || model.finishes[0];
            const isCompared = comparedModelIds.includes(model.id);

            return (
              <div
                key={model.id}
                className="bg-white border border-neutral-200/90 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Badge & Compare Checkbox */}
                <div className="flex items-center justify-between mb-4">
                  {model.badge ? (
                    <span className="bg-neutral-950 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                      {model.badge}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-neutral-400">Aura Series</span>
                  )}

                  <label className="inline-flex items-center gap-1.5 text-xs text-neutral-500 cursor-pointer select-none hover:text-neutral-900">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => toggleCompare(model.id)}
                      className="w-4 h-4 accent-neutral-900 rounded cursor-pointer"
                    />
                    <span className="text-[11px] font-mono">Compare</span>
                  </label>
                </div>

                {/* Product Image Frame */}
                <div className="relative aspect-4/3 my-2 flex items-center justify-center bg-neutral-50 rounded-2xl p-4 overflow-hidden group-hover:bg-neutral-100/50 transition-colors">
                  <img
                    src={activeFinish.imageAngle3D}
                    alt={model.name}
                    className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Color Swatches */}
                <div className="my-4 flex items-center justify-center gap-2">
                  {model.finishes.map((finish) => {
                    const isSelected = activeFinish.id === finish.id;
                    return (
                      <button
                        key={finish.id}
                        onClick={() => handleFinishChange(model.id, finish)}
                        className={`w-5 h-5 rounded-full transition-all ${
                          isSelected ? 'ring-2 ring-neutral-950 ring-offset-1 scale-110' : 'hover:scale-105 opacity-80'
                        }`}
                        style={{ backgroundColor: finish.hex }}
                        title={finish.name}
                      />
                    );
                  })}
                </div>

                {/* Text Specs */}
                <div className="space-y-3 pt-2 border-t border-neutral-100">
                  <div>
                    <h3 className="font-extrabold text-lg text-neutral-950 group-hover:text-neutral-800 transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{model.tagline}</p>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-neutral-600 font-sans">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{model.displaySize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{model.chip}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{model.camera}</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-neutral-400 font-mono">From</div>
                      <div className="text-base font-black text-neutral-950 font-mono">
                        {sym}{model.startingPrice}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectModel(model)}
                      className="bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs px-4 py-2.5 rounded-full transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                      id={`buy-model-${model.id}`}
                    >
                      <span>Configure</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Sticky Comparison Bar when 2+ models selected */}
        {comparedModelIds.length >= 2 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-950 text-white px-6 py-3.5 rounded-full shadow-2xl border border-neutral-800 flex items-center gap-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-mono">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{comparedModelIds.length} models selected for comparison</span>
            </div>
            <button
              onClick={() => onCompareModels(comparedModelIds)}
              className="bg-white text-neutral-950 text-xs font-bold px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors"
            >
              Open Spec Matrix &rarr;
            </button>
            <button
              onClick={() => setComparedModelIds([])}
              className="text-xs text-neutral-400 hover:text-white underline ml-1"
            >
              Clear
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
