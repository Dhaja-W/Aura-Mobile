import React, { useState } from 'react';
import { Globe, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 font-sans text-xs pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter Box */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 font-semibold uppercase">
              <Sparkles className="w-3 h-3" /> Aura Craft Priority Access
            </div>
            <h3 className="text-xl font-bold text-white">Be first to know about limited titanium releases.</h3>
            <p className="text-xs text-neutral-400">Receive private launch invites, firmware previews, and priority allocations.</p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2">
            {isSubscribed ? (
              <div className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-4 py-2.5 rounded-full text-xs font-mono font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Subscribed! Welcome to Aura Priority.
              </div>
            ) : (
              <div className="flex w-full md:w-80 bg-neutral-950 border border-neutral-800 rounded-full p-1 focus-within:border-neutral-500">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent px-3 text-xs text-white placeholder:text-neutral-500 outline-hidden font-mono"
                />
                <button
                  type="submit"
                  className="bg-white text-neutral-950 font-bold px-4 py-2 rounded-full text-xs hover:bg-neutral-200 transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 4 Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 border-t border-neutral-900">
          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-4">Shop & Explore</div>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('top-models')} className="hover:text-white transition-colors">
                  Aura 16 Pro Max
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('top-models')} className="hover:text-white transition-colors">
                  Aura 16 Pro
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('top-models')} className="hover:text-white transition-colors">
                  Aura Fold Ultra
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('top-models')} className="hover:text-white transition-colors">
                  Aura Studio Ceramic Edition
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('accessories')} className="hover:text-white transition-colors">
                  Spatial Audio Earbuds
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-4">AuraCare & Support</div>
            <ul className="space-y-2.5">
              <li><a href="#customizer" className="hover:text-white transition-colors">Order Status & Tracking</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">AuraCare Protection Plan</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">Aura Trade-in Valuation</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">Financing & 0% Monthly Plan</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">Genius Support Concierge</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-4">Craft & Innovation</div>
            <ul className="space-y-2.5">
              <li><button onClick={() => onNavigate('tech-specs')} className="hover:text-white transition-colors">Grade 5 Titanium Story</button></li>
              <li><button onClick={() => onNavigate('tech-specs')} className="hover:text-white transition-colors">Quantum X1 Silicon Lab</button></li>
              <li><button onClick={() => onNavigate('reviews')} className="hover:text-white transition-colors">Design Awards 2026</button></li>
              <li><a href="#tech-specs" className="hover:text-white transition-colors">Carbon Neutrality 2030</a></li>
              <li><a href="#tech-specs" className="hover:text-white transition-colors">Press & Media Assets</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-4">Aura World</div>
            <div className="space-y-3">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-white font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2-Year Warranty Standard</span>
                </div>
                <p className="text-[10px] text-neutral-400">Every device includes global replacement coverage.</p>
              </div>

              <div className="flex items-center gap-2 text-neutral-400 text-xs">
                <Globe className="w-4 h-4 text-neutral-500" />
                <span>United States (English)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>
            Copyright © 2026 Aura Mobile Technologies Inc. All rights reserved. Powered by StackUnleash.
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Sales</a>
            <span>•</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">Legal Notices</a>
            <span>•</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">Site Map</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
