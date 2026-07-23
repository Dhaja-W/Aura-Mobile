import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Film, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAPTER_VIDEOS: Record<string, string> = {
  'Titanium Architecture': 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c941ba2eac857c0e5a6a6ccf6e679b30&profile_id=139&oauth2_token_id=57447761',
  'Quantum X Silicon': 'https://player.vimeo.com/external/435674703.sd.mp4?s=7f2648fb84abed3462d7c54157790b5368a5712c&profile_id=164&oauth2_token_id=57447761',
  'Photonic Camera Engine': 'https://player.vimeo.com/external/494365795.sd.mp4?s=40428f73111f185ef3bf453af420efcb54ba34ad&profile_id=165&oauth2_token_id=57447761',
  'Display & ProMotion': 'https://player.vimeo.com/external/384761655.sd.mp4?s=3828efb0e77d0cf0c5d2c2069fa67c29e0618036&profile_id=139&oauth2_token_id=57447761',
};

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState('Titanium Architecture');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const chapters = [
    { title: 'Titanium Architecture', timestamp: '0:15', desc: 'Precision CNC machining of Grade 5 alloy' },
    { title: 'Quantum X Silicon', timestamp: '0:45', desc: '3nm transistor density & hardware Ray Tracing' },
    { title: 'Photonic Camera Engine', timestamp: '1:20', desc: '5x Periscope prism and 8K Spatial Video' },
    { title: 'Display & ProMotion', timestamp: '1:50', desc: '3000 nits peak outdoor brightness' },
  ];

  // Reset video state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setCurrentTime(0);
    }
  }, [isOpen]);

  // Sync play/pause state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle source changes when switching chapters
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [activeChapter]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

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
            className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-16/9 bg-neutral-950 flex items-center justify-center overflow-hidden group">
          {/* Animated Ambient Light / Video Frame Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/30 via-neutral-950 to-sky-950/30 animate-pulse pointer-events-none" />
          
          <video
            ref={videoRef}
            src={CHAPTER_VIDEOS[activeChapter]}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover z-0"
            loop
            playsInline
            autoPlay
            muted={isMuted}
          />

          {/* Center Play Overlay Controls (fades out when video is playing, but shows on hover) */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-3xs transition-opacity duration-300 z-10 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer pointer-events-auto"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>

            <div className="mt-4 text-center px-4 pointer-events-none select-none">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold block">
                Chapter: {activeChapter}
              </span>
              <p className="text-sm font-light text-neutral-200 mt-1 max-w-md">
                {activeChapter === 'Titanium Architecture' && 'Experience the precision engineering behind the Grade 5 Titanium enclosure.'}
                {activeChapter === 'Quantum X Silicon' && 'Discover the power of 3nm transistor architecture and ray tracing.'}
                {activeChapter === 'Photonic Camera Engine' && 'Master cinematic optics with continuous 8K HDR spatial recording.'}
                {activeChapter === 'Display & ProMotion' && 'Feast your eyes on the ultra-bright 3000 nits fluid screen.'}
              </p>
            </div>
          </div>

          {/* Timeline Scrubber */}
          <div 
            onClick={handleProgressClick}
            className={`absolute bottom-16 inset-x-4 h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all z-20 group/timeline ${
              isPlaying ? 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto' : 'opacity-100 pointer-events-auto'
            }`}
          >
            <div 
              className="h-full bg-amber-500 rounded-full relative transition-all duration-100"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover/timeline:scale-100 transition-transform" />
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent p-4 flex items-center justify-between text-white text-xs z-10 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto' : 'opacity-100 pointer-events-auto'
          }`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-mono text-neutral-400 text-[11px] select-none">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-neutral-400 select-none">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
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
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                activeChapter === ch.title
                  ? 'bg-neutral-800 border-amber-500/80 text-white shadow-md'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                <span>{ch.timestamp}</span>
                {activeChapter === ch.title && <CheckCircle2 className="w-3 h-3 text-amber-400 animate-pulse" />}
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
