import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Film, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState('Titanium Architecture');

  if (!isOpen) return null;

  const chapters = [
    { title: 'Titanium Architecture', timestamp: '0:15', desc: 'Precision CNC machining of Grade 5 alloy' },
    { title: 'Quantum X Silicon', timestamp: '0:45', desc: '3nm transistor density & hardware Ray Tracing' },
    { title: 'Photonic Camera Engine', timestamp: '1:20', desc: '5x Periscope prism and 8K Spatial Video' },
    { title: 'Display & ProMotion', timestamp: '1:50', desc: '3000 nits peak outdoor brightness' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 sm:px-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-sm tracking-wide font-sans">Aura 16 Pro — Official Industrial Launch Film</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-16/9 bg-neutral-950 flex items-center justify-center overflow-hidden group">
          {/* Animated Ambient Light / Video Frame Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/30 via-neutral-950 to-sky-950/30 animate-pulse" />
          
          <img
            src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1600&auto=format&fit=crop"
            alt="Aura 16 Pro Film"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Center Play Overlay Controls */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-2xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>

            <div className="mt-4 text-center px-4">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold block">
                Chapter: {activeChapter}
              </span>
              <p className="text-sm font-light text-neutral-200 mt-1 max-w-md">
                Experience the precision engineering behind the Grade 5 Titanium enclosure.
              </p>
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent p-4 sm:p-6 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-mono text-neutral-400 text-[11px]">01:42 / 02:30</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-neutral-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>4K HDR Spatial Master</span>
            </div>
          </div>
        </div>

        {/* Chapters Strip */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-3">
          {chapters.map((ch) => (
            <button
              key={ch.title}
              onClick={() => setActiveChapter(ch.title)}
              className={`text-left p-3 rounded-xl border transition-all ${
                activeChapter === ch.title
                  ? 'bg-neutral-800 border-amber-500/80 text-white shadow-md'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                <span>{ch.timestamp}</span>
                {activeChapter === ch.title && <CheckCircle2 className="w-3 h-3 text-amber-400" />}
              </div>
              <div className="font-bold text-xs text-white line-clamp-1">{ch.title}</div>
              <div className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{ch.desc}</div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
