import React from 'react';
import { X, Check, ArrowRight, Smartphone, Sparkles } from 'lucide-react';
import { PHONE_MODELS } from '../data/products';
import { PhoneModel } from '../types';

interface SpecComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModelIds?: string[];
  onSelectModel: (model: PhoneModel) => void;
  currency: string;
}

export const SpecComparisonModal: React.FC<SpecComparisonModalProps> = ({
  isOpen,
  onClose,
  selectedModelIds = [],
  onSelectModel,
  currency
}) => {
  if (!isOpen) return null;

  const modelsToCompare = selectedModelIds.length > 0
    ? PHONE_MODELS.filter((m) => selectedModelIds.includes(m.id))
    : PHONE_MODELS;

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };
  const sym = currencySymbols[currency] || '$';

  const rows = [
    { label: 'Display & Resolution', key: 'displaySize' },
    { label: 'Processor Chipset', key: 'chip' },
    { label: 'Camera & Zoom Optics', key: 'camera' },
    { label: 'Battery Life Performance', key: 'batteryLife' },
    { label: 'Enclosure Material & Weight', key: 'weight' },
    { label: 'Starting Base Storage', valueFn: (m: PhoneModel) => m.storageOptions[0].size },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div
        className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-lg font-sans">Aura Flagship Technical Comparison Matrix</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="py-4 px-4 font-mono text-xs uppercase text-neutral-400 w-1/5">Specification</th>
                {modelsToCompare.map((model) => (
                  <th key={model.id} className="py-4 px-4 text-center align-top">
                    <div className="w-20 h-20 mx-auto mb-2 bg-neutral-50 rounded-xl p-2 border border-neutral-200 flex items-center justify-center">
                      <img
                        src={model.finishes[0].imageAngleFront}
                        alt={model.name}
                        className="max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="font-extrabold text-sm text-neutral-950">{model.name}</div>
                    <div className="font-mono text-xs text-neutral-500 font-bold mt-0.5">From {sym}{model.startingPrice}</div>
                    <button
                      onClick={() => {
                        onSelectModel(model);
                        onClose();
                      }}
                      className="mt-3 bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-2xs"
                    >
                      <span>Configure</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100 text-xs text-neutral-700">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-neutral-900 bg-neutral-50/50">{row.label}</td>
                  {modelsToCompare.map((model) => {
                    const val = row.valueFn ? row.valueFn(model) : (model as any)[row.key];
                    return (
                      <td key={model.id} className="py-4 px-4 text-center font-medium leading-relaxed">
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr className="bg-neutral-50/80">
                <td className="py-4 px-4 font-mono font-bold text-neutral-900">MagSafe & Fast Wireless Charging</td>
                {modelsToCompare.map((model) => (
                  <td key={model.id} className="py-4 px-4 text-center font-semibold text-emerald-600">
                    <Check className="w-4 h-4 mx-auto text-emerald-600" />
                    <span className="text-[10px] text-neutral-500 block">Qi2 25W Fast Charge</span>
                  </td>
                ))}
              </tr>

              <tr className="bg-neutral-50/80">
                <td className="py-4 px-4 font-mono font-bold text-neutral-900">Free Custom Laser Engraving</td>
                {modelsToCompare.map((model) => (
                  <td key={model.id} className="py-4 px-4 text-center font-semibold text-emerald-600">
                    <Check className="w-4 h-4 mx-auto text-emerald-600" />
                    <span className="text-[10px] text-neutral-500 block">Available at checkout</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>All models come with 2-Year AuraCare Warranty and 14-day return window.</span>
          </div>
          <button onClick={onClose} className="font-bold text-neutral-900 underline">
            Close Table
          </button>
        </div>

      </div>
    </div>
  );
};
