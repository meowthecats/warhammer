import React, { useState } from 'react';
import { 
  Heart, 
  BookOpen, 
  Wrench, 
  Layers, 
  Paintbrush, 
  MapPin, 
  Sparkles, 
  Minus, 
  Plus, 
  Compass, 
  Award,
  HelpCircle
} from 'lucide-react';

import WelcomeAcademy from './components/WelcomeAcademy';
import NecronLore from './components/NecronLore';
import HobbyTools from './components/HobbyTools';
import NecronListBuilder from './components/NecronListBuilder';
import PaintingGuide from './components/PaintingGuide';
import LocalStores from './components/LocalStores';
import HobbyFAQ from './components/HobbyFAQ';

type AppTab = 'academy' | 'lore' | 'tools' | 'builder' | 'paint' | 'stores';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('academy');
  const [fontSizeFactor, setFontSizeFactor] = useState<number>(1.0); // 1.0 = standard, 1.15 = large, 1.3 = X-large
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);

  // Adjust scale togglers
  const increaseFont = () => {
    setFontSizeFactor((curr) => Math.min(1.3, curr + 0.15));
  };

  const decreaseFont = () => {
    setFontSizeFactor((curr) => Math.max(1.0, curr - 0.15));
  };

  return (
    <div className="min-h-screen bg-editorial-cream font-serif text-editorial-charcoal flex flex-col p-3 sm:p-6 selection:bg-editorial-forest/15 selection:text-editorial-forest">
      
      {/* Editorial Outer Frame Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto bg-editorial-cream border-4 sm:border-8 border-editorial-forest flex flex-col relative overflow-hidden shadow-2xl">
        
        {/* Top Header Runner Strip */}
        <div className="bg-editorial-forest py-2 px-4 border-b border-editorial-charcoal text-center flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#e2e8e3] font-bold">
            Volume 01 // Issue 01 // The Ageless Miniature Hobbyist
          </span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#7da481] font-mono">
            ESTABLISHED IN THE ERA INDOMITUS // PRIORITY DISPATCH 40.01.24
          </span>
        </div>

        {/* Main Content Padding Wrap */}
        <div className="flex-1 p-4 sm:p-8 flex flex-col space-y-8">
          
          {/* Navigation / Header Module */}
          <header className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b-2 border-editorial-charcoal">
            <div className="space-y-2 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-editorial-moss block">
                SPECIAL SECTION // THE SAGE CHRONICLE
              </span>
              <h1 className="text-5xl sm:text-7xl font-sans tracking-tighter uppercase font-black text-editorial-charcoal leading-none">
                NECHRONICLE.
              </h1>
              <p className="text-sm text-editorial-moss italic leading-relaxed font-serif pt-1">
                A highly comprehensive, low-dexterity guide for mature enthusiasts aged 50 and over. Designed for entering the Warhammer 40,000 hobby with limited time, modest physical strain, and budget-smart resources. Featuring the noble undying Necron dynasty.
              </p>
            </div>

            {/* Control Panel Area: Sizing & FAQ Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-stretch lg:self-auto">
              {/* Primary FAQ Trigger */}
              <button
                onClick={() => setIsFaqOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-editorial-forest hover:bg-opacity-90 active:translate-y-px transition-all text-editorial-cream border-2 border-editorial-charcoal text-xs font-sans uppercase tracking-[0.1em] font-bold rounded shadow-sm hover:shadow-md cursor-pointer"
                title="Open common beginner tabletop Questions & Answers"
                id="header-faq-trigger"
              >
                <HelpCircle size={14} className="shrink-0 text-[#e2e8e3]" />
                <span>Hobby FAQ Guide</span>
              </button>

              {/* Sizing Controller Option for optimal viewing comfort */}
              <div className="flex items-center justify-between sm:justify-start gap-4 bg-editorial-paper border border-editorial-clay p-2 rounded shadow-sm">
                <span className="text-[10px] font-sans uppercase tracking-wider font-bold text-editorial-moss">
                  Print Scale:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decreaseFont}
                    disabled={fontSizeFactor <= 1.0}
                    className="p-1 px-2 bg-editorial-cream hover:bg-editorial-clay border border-editorial-charcoal text-editorial-charcoal disabled:opacity-30 cursor-pointer text-xs font-bold font-sans rounded"
                    title="Smaller print style"
                  >
                    A-
                  </button>
                  <span className="text-xs font-mono font-bold text-editorial-forest w-12 text-center">
                    {fontSizeFactor === 1.0 ? '100%' : fontSizeFactor === 1.15 ? '115%' : '130%'}
                  </span>
                  <button
                    onClick={increaseFont}
                    disabled={fontSizeFactor >= 1.3}
                    className="p-1 px-2 bg-editorial-cream hover:bg-editorial-clay border border-editorial-charcoal text-editorial-charcoal disabled:opacity-30 cursor-pointer text-xs font-bold font-sans rounded"
                    title="Larger print style"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Dynamic Desktop/Mobile Menu Tabs Bar */}
          <div className="w-full">
            <nav className="flex flex-wrap gap-2 p-1.5 bg-editorial-paper border border-editorial-clay rounded-lg">
              <button
                onClick={() => setActiveTab('academy')}
                className={`flex items-center gap-2 py-2 px-3 sm:px-4 text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer rounded ${
                  activeTab === 'academy'
                    ? 'bg-editorial-forest text-editorial-cream'
                    : 'text-editorial-moss hover:bg-editorial-clay hover:text-editorial-charcoal'
                }`}
              >
                <Heart size={13} /> Academy
              </button>
              
              <button
                onClick={() => setActiveTab('lore')}
                className={`flex items-center gap-2 py-2 px-3 sm:px-4 text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer rounded ${
                  activeTab === 'lore'
                    ? 'bg-editorial-forest text-editorial-cream'
                    : 'text-editorial-moss hover:bg-editorial-clay hover:text-editorial-charcoal'
                }`}
              >
                <BookOpen size={13} /> Dynasty Lore
              </button>

              <button
                onClick={() => setActiveTab('tools')}
                className={`flex items-center gap-2 py-2 px-3 sm:px-4 text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer rounded ${
                  activeTab === 'tools'
                    ? 'bg-editorial-forest text-editorial-cream'
                    : 'text-editorial-moss hover:bg-editorial-clay hover:text-editorial-charcoal'
                }`}
              >
                <Wrench size={13} /> Budget Supplies
              </button>

              <button
                onClick={() => setActiveTab('builder')}
                className={`flex items-center gap-2 py-2 px-3 sm:px-4 text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer rounded ${
                  activeTab === 'builder'
                    ? 'bg-editorial-forest text-editorial-cream'
                    : 'text-editorial-moss hover:bg-editorial-clay hover:text-editorial-charcoal'
                }`}
              >
                <Layers size={13} /> Roster Planner
              </button>

              <button
                onClick={() => setActiveTab('paint')}
                className={`flex items-center gap-2 py-2 px-3 sm:px-4 text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer rounded ${
                  activeTab === 'paint'
                    ? 'bg-editorial-forest text-editorial-cream'
                    : 'text-editorial-moss hover:bg-editorial-clay hover:text-editorial-charcoal'
                }`}
              >
                <Paintbrush size={13} /> Painting School
              </button>

              <button
                onClick={() => setActiveTab('stores')}
                className={`flex items-center gap-2 py-2 px-3 sm:px-4 text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer rounded ${
                  activeTab === 'stores'
                    ? 'bg-editorial-forest text-editorial-cream'
                    : 'text-editorial-moss hover:bg-editorial-clay hover:text-editorial-charcoal'
                }`}
              >
                <MapPin size={13} /> Store Finder
              </button>
            </nav>
          </div>

          {/* Tab content hub */}
          <main className="flex-1 font-serif">
            {activeTab === 'academy' && <WelcomeAcademy fontSizeFactor={fontSizeFactor} onOpenFaq={() => setIsFaqOpen(true)} />}
            {activeTab === 'lore' && <NecronLore fontSizeFactor={fontSizeFactor} />}
            {activeTab === 'tools' && <HobbyTools fontSizeFactor={fontSizeFactor} />}
            {activeTab === 'builder' && <NecronListBuilder fontSizeFactor={fontSizeFactor} />}
            {activeTab === 'paint' && <PaintingGuide fontSizeFactor={fontSizeFactor} />}
            {activeTab === 'stores' && <LocalStores fontSizeFactor={fontSizeFactor} />}
          </main>

          {/* Footer Area */}
          <footer className="border-t-2 border-editorial-charcoal pt-6 mt-12 pb-4 flex flex-col md:flex-row items-center justify-between text-editorial-moss text-xs gap-4 font-sans uppercase tracking-[0.16em]">
            <div>
              <span>&copy; {new Date().getFullYear()} Silver Tide Editorial. All rights reserved.</span>
            </div>
            <div className="flex gap-4">
              <span>Maryland Community Hub</span>
              <span>•</span>
              <span>The Undying Dynasty</span>
            </div>
          </footer>

          {/* Global Accessible Handbooks FAQs */}
          <HobbyFAQ 
            isOpen={isFaqOpen} 
            onClose={() => setIsFaqOpen(false)} 
            fontSizeFactor={fontSizeFactor} 
          />
          
        </div>
      </div>
    </div>
  );
}
