import React, { useState, useEffect } from 'react';
import { X, Search, HelpCircle, BookOpen, Paintbrush, Users, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fontSizeFactor: number;
}

interface FAQItem {
  id: string;
  category: 'general' | 'craft' | 'play';
  question: string;
  answer: string;
  extendedTips?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'cost',
    category: 'general',
    question: 'Is wargaming too expensive for a casual hobby?',
    answer: 'Absolutely not. While tournament players spend thousands, casual players and mature hobbyists can enjoy this hobby for a fraction of that cost. By focusing on Combat Patrol matches (which only require a single pre-set box of models) and utilizing ordinary kitchen alternatives instead of expensive branded hobby tools, you can easily establish a complete setup for under $150.',
    extendedTips: [
      'Avoid premium branded paint-waters or model-holders; pill bottles, tack, and old jars work perfectly.',
      'Construct a "wet palette" for pennies using a shallow plastic food container, a wet paper towel, and baking parchment.',
      'Stick to our budget roster plan, which targets maximum play value per dollar.'
    ]
  },
  {
    id: 'skills',
    category: 'craft',
    question: 'I have shaky hands and fading vision. Can I still paint minatures?',
    answer: 'Yes, and in fact, wargaming is fantastic for exercising fine motor skills and cognitive flexibility! Precision manual skills are not required. With techniques like "drybrushing" and "washes," the shape of the miniature does the hard work for you. By applying a metallic base coat and brushing a dark liquid shade (wash) into the recesses, you get immediate professional-looking depth without needing single-millimeter brush strokes.',
    extendedTips: [
      'Invest in a hands-free desktop magnifying lamp with a warm circular light—this reduces eye strain completely.',
      'Mount your model to a soda cap using sticky putty so your entire hand can grip the cylinder easily.',
      'Brace your elbows firmly on your table and press your palms together to stabilize any hand tremors.'
    ]
  },
  {
    id: 'age',
    category: 'general',
    question: 'Am I too old to start? Are gaming groups welcoming to over-50 wargamers?',
    answer: 'The tabletop miniatures hobby is actually filled with mature adults! Many veteran players are in their 40s, 50s, and 60s who started in the 80s and 90s. Mature hobbyists are highly valued in community groups for their patience, respect for narrative play, and interest in sharing rich stories rather than ruthless rule-bending competition.',
    extendedTips: [
      'Start by dropping by a local Maryland store on a quiet Saturday morning to chat with the clerk and casual hobbyists.',
      'Check out "narrative play" leagues (such as Crusade campaigns) where story elements outweigh tournament math.',
      'Introduce yourself on Maryland gaming Discord servers—it is a deeply supportive, polite community.'
    ]
  },
  {
    id: 'rules',
    category: 'play',
    question: 'Do I have to memorize massive rules booklets before I can play?',
    answer: 'No! The fully detailed Warhammer rulebook is huge, but you do not need to memorize it. The game is designed to be learned incrementally. Start with Basic Core Rules (about 10 pages) or play "Combat Patrol" which uses streamlined rulesets and specific model datasheets. Most veterans are incredibly happy to walk you through a practice turn step-by-step.',
    extendedTips: [
      'Play your first matches with "open cards" on both sides, explaining decisions to each other.',
      'Use handy helper sheets or reference cards for key phases instead of flipping through binders.',
      'Remember, tabletop gaming is a social contract—having fun and telling a story is more important than memorizing minutiae!'
    ]
  },
  {
    id: 'necron-reason',
    category: 'general',
    question: 'Why are Necrons recommended for senior wargamers?',
    answer: 'Necrons are the absolute ideal dynasty for senior hobbyists. Structurally, they are made of gleaming ancient metal, meaning they can be painted beautifully using a simple drybrushing silver paint routine (no organic eyes or tiny clothes to paint). Logistically, they are highly robust plastic figures with thick legs, unlike fragile spindly factions. Mechanically, their "Reanimation Protocols" mean dead models come back to life—ideal and forgiving for beginners learning strategy!',
    extendedTips: [
      'You can paint an entire squad of Necron Warriors in under an hour with just silver base coat plus dark wash.',
      'They do not look messy if your lines are slightly uneven—alien battle damage actually adds character!',
      'Their rules are straightforward, allowing you to focus on tactical positioning and fun conversations.'
    ]
  },
  {
    id: 'combat-patrol',
    category: 'play',
    question: 'What is "Combat Patrol" and why is it the standard beginner advice?',
    answer: 'Combat Patrol is a specific, self-contained way to play Warhammer 40,000. Instead of collecting and custom-building a massive army list, both players simply buy a single, pre-balanced "Combat Patrol" box from their chosen faction. The rules, models, and point values are pre-calculated to ensure a perfectly fair game right out of the box, with zero roster calculation stress.',
    extendedTips: [
      'It levels the playing field so a veteran with a massive collection cannot overwhelm your starter set.',
      'It speeds up game time—a typical game takes about 1 hour instead of 3 hours, reducing physical fatigue.',
      'Our custom Roster Planner incorporates these units to let you easily build and expand.'
    ]
  }
];

export default function HobbyFAQ({ isOpen, onClose, fontSizeFactor }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'craft' | 'play'>('all');
  const [expandedIds, setExpandedIds] = useState<string[]>(['cost', 'skills']); // default open some helpful ones

  // Keyboard shortcut to close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_DATA.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.extendedTips && item.extendedTips.some(tip => tip.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with elegant blur */}
      <div 
        className="absolute inset-0 bg-editorial-charcoal/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        id="faq-modal-backdrop"
      />

      {/* Editorial Styled Modal Container */}
      <div 
        className="bg-editorial-cream border-4 border-editorial-forest w-full max-w-3xl max-h-[85vh] rounded shadow-2xl z-10 overflow-hidden flex flex-col transform transition-all animate-in fade-in-50 zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-modal-title"
        id="faq-modal-container"
      >
        {/* Top Header Section */}
        <div className="bg-editorial-forest text-editorial-cream p-4 flex items-center justify-between border-b-2 border-editorial-charcoal">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-editorial-cream text-editorial-forest rounded">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 id="faq-modal-title" className="text-lg sm:text-xl font-serif font-black tracking-tight uppercase leading-tight">
                Tabletop Hobby Expert FAQ
              </h2>
              <p className="text-[10px] sm:text-xs text-[#cedecf] font-sans uppercase tracking-wider font-semibold">
                Essential Sage Knowledge for Miniature Wargaming
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 text-editorial-cream hover:bg-white/10 rounded-full transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-editorial-cream"
            aria-label="Close FAQ dialog"
            id="faq-close-button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Floating helper warning details */}
        <div className="bg-editorial-paper border-b border-editorial-clay px-6 py-2 flex items-center gap-2 text-[11px] text-editorial-moss font-sans">
          <AlertCircle size={12} className="text-editorial-forest shrink-0" />
          <span>Press <kbd className="px-1.5 py-0.5 bg-editorial-cream border border-editorial-clay rounded font-mono text-[10px] shadow-xs">ESC</kbd> anytime to return to your current page safely.</span>
        </div>

        {/* Modal Search and Tag Filters */}
        <div className="p-6 pb-4 border-b border-editorial-clay bg-editorial-cream space-y-4 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-editorial-moss" />
            <input 
              type="text"
              placeholder="Search common questions, painting terms, or Maryland clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-editorial-paper border-2 border-editorial-clay rounded focus:border-editorial-charcoal focus:outline-hidden text-sm font-sans"
              id="faq-search-input"
            />
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Questions', icon: <HelpCircle size={12} /> },
              { id: 'general', label: 'Getting Started', icon: <Sparkles size={12} /> },
              { id: 'craft', label: 'Painting & Crafting', icon: <Paintbrush size={12} /> },
              { id: 'play', label: 'Rules & Community', icon: <Users size={12} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider font-bold rounded transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-editorial-forest text-editorial-cream shadow-xs'
                    : 'bg-editorial-paper text-editorial-moss border border-editorial-clay hover:border-editorial-charcoal'
                }`}
                id={`faq-tab-${tab.id}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Scrollable Content Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-editorial-paper/40">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <BookOpen size={36} className="mx-auto text-editorial-moss opacity-50" />
              <p className="font-serif italic text-editorial-moss">No answers match your search parameters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-xs font-sans font-bold uppercase tracking-wider text-editorial-forest hover:underline cursor-pointer"
                id="faq-reset-button"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedIds.includes(faq.id);
              return (
                <div 
                  key={faq.id}
                  className="bg-editorial-paper border-2 border-editorial-clay rounded hover:border-editorial-charcoal transition-all overflow-hidden"
                  id={`faq-item-card-${faq.id}`}
                >
                  {/* Clickable Header bar */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-4 flex justify-between items-center gap-4 bg-editorial-cream/10 hover:bg-editorial-cream/30 transition-colors cursor-pointer focus:outline-hidden"
                    aria-expanded={isOpen}
                    id={`faq-item-trigger-${faq.id}`}
                  >
                    <span 
                      className="font-sans font-bold text-editorial-charcoal text-sm leading-snug sm:text-base pr-2"
                      style={{ fontSize: `${1.05 * fontSizeFactor}rem` }}
                    >
                      {faq.question}
                    </span>
                    <span className="text-editorial-forest bg-editorial-cream rounded-full p-1 border border-editorial-clay shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {/* Expandable Box */}
                  {isOpen && (
                    <div 
                      className="p-4 pt-0 border-t border-editorial-clay bg-editorial-cream/20 font-serif leading-relaxed text-sm text-editorial-charcoal space-y-4"
                      id={`faq-item-body-${faq.id}`}
                    >
                      <p 
                        className="font-serif leading-relaxed text-editorial-charcoal pt-3"
                        style={{ fontSize: `${0.95 * fontSizeFactor}rem` }}
                      >
                        {faq.answer}
                      </p>

                      {faq.extendedTips && (
                        <div className="bg-editorial-paper p-3 rounded border border-editorial-clay space-y-2 mt-2">
                          <span className="text-[10px] uppercase font-sans tracking-wide font-bold text-editorial-forest block">
                            ☆ SAGE TIP SHEET & EXPERT WORKAROUNDS:
                          </span>
                          <ul className="list-disc pl-5 space-y-1.5 text-xs text-editorial-moss font-serif leading-relaxed">
                            {faq.extendedTips.map((tip, idx) => (
                              <li key={idx} style={{ fontSize: `${0.9 * fontSizeFactor}rem` }}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Section */}
        <div className="p-4 border-t border-editorial-clay bg-editorial-cream flex flex-col sm:flex-row items-center sm:justify-between gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-editorial-moss">
            <Sparkles size={14} className="text-editorial-forest" />
            <span className="font-sans font-medium uppercase tracking-wider text-[10px]">Empowering older hobbyists with smart routines.</span>
          </div>

          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 border-2 border-editorial-charcoal bg-editorial-paper hover:bg-editorial-clay text-editorial-charcoal transition-all font-sans text-xs uppercase tracking-wider font-bold rounded cursor-pointer"
            id="faq-bottom-close-button"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
