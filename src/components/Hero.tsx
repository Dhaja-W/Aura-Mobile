import React, { useState } from 'react';
import { Play, ArrowRight, ShieldCheck, Cpu, Camera, Sparkles, Rotate3d, Check } from 'lucide-react';
import { PHONE_MODELS } from '../data/products';
import { PhoneColor, ColorOption } from '../types';

interface HeroProps {
  onConfigureNow: () => void;
  onOpenVideoModal: () => void;
  onSelectModel: (modelId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onConfigureNow,
  onOpenVideoModal,
  onSelectModel
}) => {
  const heroModel = PHONE_MODELS[0]; // Aura 16 Pro Max
  const [selectedColor, setSelectedColor] = useState<ColorOption>(heroModel.finishes[0]);
  const [currentAngle, setCurrentAngle] = useState<'3d' | 'front' | 'back' | 'side'>('3d');
  const [isRotating, setIsRotating] = useState(false);

  const angleImages = {
    '3d': selectedColor.imageAngle3D,
    'front': selectedColor.imageAngleFront,
    'back': selectedColor.imageAngleBack,
    'side': selectedColor.imageAngleSide,
  };

  const handleAngleChange = (angle: '3d' | 'front' | 'back' | 'side') => {
    setIsRotating(true);
    setCurrentAngle(angle);
    setTimeout(() => setIsRotating(false), 300);
  };

  return (
    <section id="hero" className="relative bg-white pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-neutral-100">
      
      {/* Subtle Background Radial Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial from-neutral-100/80 via-neutral-50/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Tagline */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-800 tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Next Generation Industrial Design</span>
            <span className="w-1 h-1 rounded-full bg-neutral-400" />
            <span className="font-mono text-neutral-500">2026 flagship</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-neutral-950 font-sans leading-none">
            Aura 16 Pro.
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
            Forged in Grade 5 Titanium. Driven by Quantum X1 3nm Silicon.
          </p>

          <div className="text-sm font-medium text-neutral-500 font-mono pt-1">
            From $1,199 or $49.95/mo. for 24 mo.
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onConfigureNow}
              className="bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              id="hero-buy-now-btn"
            >
              <span>Build Your Aura</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenVideoModal}
              className="bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-900 font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-200 flex items-center gap-2 shadow-2xs cursor-pointer"
              id="hero-watch-film-btn"
            >
              <div className="w-6 h-6 rounded-full bg-neutral-950 text-white flex items-center justify-center">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Watch the Launch Film</span>
            </button>
          </div>
        </div>

        {/* Massive 3D Product Showcase */}
        <div className="mt-12 lg:mt-16 relative max-w-5xl mx-auto">
          
          {/* Main Angled Phone Display Container */}
          <div className="relative bg-gradient-to-b from-neutral-50 to-white border border-neutral-200/80 rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col items-center justify-center min-h-[420px] sm:min-h-[520px] overflow-hidden group">
            
            {/* Corner Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-mono text-neutral-500 bg-white/90 border border-neutral-200 px-3 py-1.5 rounded-full backdrop-blur-md shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>3D Angle Inspection: {currentAngle.toUpperCase()}</span>
            </div>

            {/* 360 Rotation Controls Top Right */}
            <div className="absolute top-6 right-6 hidden sm:flex items-center bg-white/90 border border-neutral-200 rounded-full p-1 shadow-2xs backdrop-blur-md">
              <div className="text-[10px] font-mono font-semibold px-2 text-neutral-400 flex items-center gap-1">
                <Rotate3d className="w-3 h-3" /> View:
              </div>
              {(['3d', 'front', 'back', 'side'] as const).map((angle) => (
                <button
                  key={angle}
                  onClick={() => handleAngleChange(angle)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    currentAngle === angle
                      ? 'bg-neutral-950 text-white font-bold shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  {angle.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Product Image Frame */}
            <div className="relative w-full max-w-lg aspect-4/3 flex items-center justify-center my-4">
              <img
                src={angleImages[currentAngle]}
                alt={`Aura 16 Pro Max in ${selectedColor.name}`}
                className={`max-h-[380px] sm:max-h-[460px] w-auto object-contain transition-all duration-500 drop-shadow-2xl ${
                  isRotating ? 'scale-95 opacity-50 rotate-2' : 'scale-100 opacity-100 rotate-0'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Floating Spec Hotspots */}
              <div className="absolute bottom-2 left-4 bg-white/95 border border-neutral-200/90 rounded-2xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3 animate-bounce-subtle">
                <div className="w-9 h-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-neutral-900">Grade 5 Titanium</div>
                  <div className="text-[11px] text-neutral-500">Highest strength-to-weight ratio</div>
                </div>
              </div>

              <div className="absolute top-12 right-4 bg-white/95 border border-neutral-200/90 rounded-2xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-neutral-900">Quantum X1 Silicon</div>
                  <div className="text-[11px] text-neutral-500">35 Trillion Ops/Sec Neural Engine</div>
                </div>
              </div>
            </div>

            {/* Color Swatch Selector Bottom Bar */}
            <div className="mt-6 flex flex-col items-center gap-3 z-10">
              <div className="text-xs font-medium text-neutral-600 font-mono flex items-center gap-2">
                <span>Finish:</span>
                <span className="font-bold text-neutral-950">{selectedColor.name}</span>
                {selectedColor.badge && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                    {selectedColor.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 bg-white p-2 rounded-full border border-neutral-200 shadow-md">
                {heroModel.finishes.map((finish) => {
                  const isSelected = selectedColor.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedColor(finish)}
                      className={`relative w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-neutral-950 ring-offset-2 scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: finish.hex }}
                      title={finish.name}
                      id={`color-swatch-${finish.id}`}
                    >
                      {isSelected && (
                        <Check className={`w-4 h-4 ${finish.id === 'alpine-white' ? 'text-neutral-900' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quick Specs Trio Bar */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 hover:bg-white hover:border-neutral-300 transition-all flex items-start gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-950">48MP Photonic System</div>
                <div className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  5x Optical Telephoto zoom with continuous 8K HDR spatial video recording.
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 hover:bg-white hover:border-neutral-300 transition-all flex items-start gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-950">Quantum X1 Chip</div>
                <div className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Industry leading 3-nanometer architecture with hardware ray tracing.
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 hover:bg-white hover:border-neutral-300 transition-all flex items-start gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-950">Ceramic Shield 2.0</div>
                <div className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  4x better drop performance with anti-reflective nanocoating.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
