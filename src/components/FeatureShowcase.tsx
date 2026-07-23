import React, { useState } from 'react';
import { ShieldCheck, Cpu, Camera, Waves, Sparkles, CheckCircle2 } from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: 'titanium',
      icon: ShieldCheck,
      title: 'Grade 5 Titanium Architecture',
      subtitle: 'The strongest alloy used in aerospace robotics.',
      description: 'Aura 16 Pro features a forged Grade 5 titanium frame — an alloy that has one of the highest strength-to-weight ratios of any metal. The micro-blasted finish provides a refined tactile texture that resists fingerprints and corrosion.',
      stats: [
        { label: 'Weight Reduction', value: '19%' },
        { label: 'Tensile Strength', value: '1,000 MPa' },
        { label: 'Recycled Content', value: '100% Titanium' },
      ],
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      points: [
        'Precision PVD coating process for rich metallic lustre',
        'Internal thermal graphite diffusion layer',
        'Contoured edge design for ultra-smooth hand comfort'
      ]
    },
    {
      id: 'silicon',
      icon: Cpu,
      title: 'Quantum X1 3-Nanometer Silicon',
      subtitle: 'Desktop class computing in your palm.',
      description: 'Packed with 28 Billion transistors, the Quantum X1 chip features a 6-core CPU, 6-core GPU with hardware-accelerated ray tracing, and a 24-core Neural Engine capable of executing 35 Trillion operations per second.',
      stats: [
        { label: 'Transistor Count', value: '28 Billion' },
        { label: 'Ray Tracing', value: '4x Faster' },
        { label: 'Neural Speed', value: '35 TOPS' },
      ],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      points: [
        'Hardware ray tracing for photorealistic mobile gaming',
        'On-device neural LLM intelligence processing',
        '30% lower power draw at peak workloads'
      ]
    },
    {
      id: 'optics',
      icon: Camera,
      title: '48MP Photonic Optics & Periscope',
      subtitle: 'Cinema-grade optics with continuous 8K HDR spatial video.',
      description: 'A quad-pixel sensor adapts to every scene. The new 5x Telephoto camera features a tetraprism design that reflects light rays four times before reaching the sensor, delivering true optical clarity without body bulk.',
      stats: [
        { label: 'Main Sensor', value: '48MP Quad-Pixel' },
        { label: 'Telephoto Zoom', value: '5x Optical' },
        { label: 'Video Output', value: '8K Spatial 60fps' },
      ],
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
      points: [
        'Gen-2 Sensor-shift optical image stabilization',
        'Anti-reflective lens coating reduces ghosting by 80%',
        'Lossless ProRES 8K recording direct to external storage'
      ]
    },
    {
      id: 'spatial',
      icon: Waves,
      title: 'Spatial Audio & Quantum Engine',
      subtitle: '3D acoustic soundstage with dynamic head tracking.',
      description: 'Custom acoustic drivers combine with our neural spatial engine to simulate multi-speaker surround sound. Intelligent beamforming micro-arrays isolate your voice even in high-wind environments.',
      stats: [
        { label: 'Acoustic Driver', value: '11mm Custom Titanium' },
        { label: 'Noise Cancellation', value: '48dB Active ANC' },
        { label: 'Latency', value: '18ms Ultra-Low' },
      ],
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
      points: [
        'Personalized spatial audio profile matched to ear geometry',
        'Adaptive transparency mode adjusts 48,000 times per second',
        'Custom titanium hinge acoustic resonance chamber'
      ]
    }
  ];

  const current = features[activeTab];

  return (
    <section id="tech-specs" className="py-20 lg:py-28 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-xs font-mono font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Craft & Engineering</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans">
            Precision Inside & Out.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            Every millimeter engineered for performance, durability, and quiet luxury.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-white text-neutral-950 shadow-xl scale-105'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-950' : 'text-neutral-400'}`} />
                <span>{feat.title.split(' ')[0]} {feat.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Showcase Box */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              <current.icon className="w-4 h-4" />
              <span>Innovation Brief 0{activeTab + 1}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-sans">
              {current.title}
            </h3>

            <p className="text-sm font-medium text-neutral-300 font-mono">
              {current.subtitle}
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              {current.description}
            </p>

            {/* Key Points List */}
            <div className="space-y-2 pt-2">
              {current.points.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Stat Counters Trio */}
            <div className="pt-6 border-t border-neutral-800 grid grid-cols-3 gap-4">
              {current.stats.map((st, sIdx) => (
                <div key={sIdx}>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">{st.value}</div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 bg-neutral-950/80 border border-neutral-800 px-3 py-1.5 rounded-full text-[11px] font-mono text-neutral-300 backdrop-blur-md">
                8K Ultra Macro Visual Capture
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
