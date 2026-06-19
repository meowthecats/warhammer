import React, { useState } from 'react';
import { DollarSign, CheckSquare, Square, Info, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { HobbyTool } from '../types';

interface Props {
  fontSizeFactor: number;
}

const DEFAULT_TOOLS: HobbyTool[] = [
  {
    id: '1',
    name: 'Generic Sprue Cutters / Clippers',
    category: 'tool',
    estimatedCost: 6,
    description: 'Precision pliers used to clip plastic parts cleanly off their sprues.',
    budgetAlternative: 'Buy a basic double-cut wire helper at a local hardware store or Amazon instead of the official $35 Citadel brand.',
    purpose: 'Model extraction',
    essential: true,
  },
  {
    id: '2',
    name: 'Standard Utility/Hobby Knife',
    category: 'tool',
    estimatedCost: 4,
    description: 'Simple razor pen knife used to shave away mold lines and clean plastic connections.',
    budgetAlternative: 'Standard generic utility knife from a dollar store or hardware outlet works identically.',
    purpose: 'Cleaning component seams',
    essential: true,
  },
  {
    id: '3',
    name: 'Tamiya Extra Thin Cement',
    category: 'tool',
    estimatedCost: 7,
    description: 'A liquid cement that chemically melts the plastic joints, fusing them together permanently. Extremely easy to brush-apply without messy residue.',
    budgetAlternative: 'Generic Super Glue (Cyanoacrylate) works too, but liquid plastic cement is much safer and more forgiving for shaky fingers.',
    purpose: 'Assembling miniature joints cleanly',
    essential: true,
  },
  {
    id: '4',
    name: 'Rust-Oleum Flat Black Primer Spray',
    category: 'primer',
    estimatedCost: 6,
    description: 'A flat matte spray paint applied to raw plastic so subsequent paint layers adhere correctly.',
    budgetAlternative: 'Use Rust-Oleum Primer rather than official $22 Citadel Chaos Black. Safe, robust, and provides a textured surface.',
    purpose: 'Establishing base coat adhesion',
    essential: true,
  },
  {
    id: '5',
    name: '#2 Synthetic Detail Paint Brush',
    category: 'tool',
    estimatedCost: 3,
    description: 'A standard brush with a fine point used for metallics and trims. Lasts longer with metallic paints than expensive natural hair.',
    budgetAlternative: 'A cheap pack of synthetic water-color brush rounds from Michaels or Joann ($4 for a pack of five).',
    purpose: 'All-around painting',
    essential: true,
  },
  {
    id: '6',
    name: 'Medium Synthetic Flat Brush (Drybrush)',
    category: 'tool',
    estimatedCost: 2,
    description: 'A broad flat brush with stiff bristles used to dusting metallic paint across raised surfaces.',
    budgetAlternative: 'A generic flat cosmetics brush or old makeup powder brush. Soft makeup brushes actually work incredibly well for drybrushing!',
    purpose: 'Rapid Necron weathering and metallics',
    essential: true,
  },
  {
    id: '7',
    name: 'Vallejo Model Color Metal Color: Gunmetal',
    category: 'paint',
    estimatedCost: 4.5,
    description: 'Rich dark metallic paint that is fluid, pigmented, and covers beautifully in one or two coats.',
    budgetAlternative: 'Citadel Leadbelcher ($4.75), but Vallejo bottles hold 40% more paint and utilize a dropper bottle preventing drying.',
    purpose: 'Core body metal coat',
    essential: true,
  },
  {
    id: '8',
    name: 'Army Painter Wash: Dark Tone (Thinned Black)',
    category: 'paint',
    estimatedCost: 4,
    description: 'Highly thinned ink wash that streams into lines, detailing gaps and panel splits automatically.',
    budgetAlternative: 'Mix standard black acrylic paint 1:10 with water and a tiny drop of dishwashing soap (to break surface tension).',
    purpose: 'Instant metallic shading and shadows',
    essential: true,
  },
  {
    id: '9',
    name: 'Citadel technical Paint: Tesseract Glow',
    category: 'paint',
    estimatedCost: 4.75,
    description: 'Bright lime-neon wash applied over light areas to create an instant green glowing plasma effect.',
    budgetAlternative: 'Paint a spot flat white, then coat with a cheap yellow/green neon marker or thin neon hobby paint ($1.50).',
    purpose: 'Weapon chambers and glowing eyes',
    essential: true,
  },
  {
    id: '10',
    name: 'Vallejo Glorious Gold / Brass Trim',
    category: 'paint',
    estimatedCost: 4.5,
    description: 'Rich warm metallic bronze or gold, used for ancient royal decorations and glyphs on Necron shoulder pads.',
    budgetAlternative: 'Optional detail. Can bypass entirely to save cash or use standard steel metallics.',
    purpose: 'Royal glyphs and decoration accents',
    essential: false,
  },
  {
    id: '11',
    name: 'Homemade Wet Palette Materials',
    category: 'tool',
    estimatedCost: 0,
    description: 'A setup using a damp paper towel and baking parchment in a flat lid. Keeps acrylic paints moist and wet for up to 4 days, preventing waste.',
    budgetAlternative: 'Completely free using household kitchen materials. Avoid buying a $20 hobby wet palette!',
    purpose: 'Conserves paint flow on desk',
    essential: true,
  },
];

export default function HobbyTools({ fontSizeFactor }: Props) {
  const [tools, setTools] = useState<HobbyTool[]>(DEFAULT_TOOLS);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    DEFAULT_TOOLS.filter((t) => t.essential).map((t) => t.id)
  );
  const [activeFilter, setActiveFilter] = useState<'all' | 'essential' | 'non-essential'>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'tool' | 'paint' | 'primer'>('all');

  const toggleProduct = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    setSelectedIds(tools.map((t) => t.id));
  };

  const selectEssentialsOnly = () => {
    setSelectedIds(tools.filter((t) => t.essential).map((t) => t.id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  // Filter tools
  const filteredTools = tools.filter((tool) => {
    const matchesEssential =
      activeFilter === 'all' ||
      (activeFilter === 'essential' && tool.essential) ||
      (activeFilter === 'non-essential' && !tool.essential);

    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;

    return matchesEssential && matchesCategory;
  });

  const totalCost = tools
    .filter((t) => selectedIds.includes(t.id))
    .reduce((val, t) => val + t.estimatedCost, 0);

  const potentialRetailWithoutBudget = selectedIds.length * 15; // Rough estimate of branded premium pricing
  const totalSavings = Math.max(0, potentialRetailWithoutBudget - totalCost);

  return (
    <div className="space-y-8 animate-fade-in text-editorial-charcoal">
      {/* Budget Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-editorial-paper border-2 border-editorial-charcoal p-6 rounded shadow-sm">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-2xl font-serif font-bold text-editorial-charcoal flex items-center gap-2">
            <DollarSign className="text-editorial-forest" />
            Budget Paint-Set & Hobby Supplies Planner
          </h3>
          <p className="text-editorial-charcoal font-serif text-sm leading-relaxed" style={{ fontSize: `${0.95 * fontSizeFactor}rem` }}>
            Traditional hobby retailers steer beginners toward heavy, overpriced branded starter bundles ($70 to $120+). Under our guide, we utilize high-quality Vallejo dropper paints and easy-to-source home alternatives. Use this tool to plan your absolute shopping list expenses.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={selectEssentialsOnly}
              className="px-3 py-2 bg-editorial-forest hover:bg-opacity-90 text-xs text-editorial-cream rounded font-sans uppercase tracking-wider font-bold transition cursor-pointer"
            >
              Select Core Essentials Only (Under $40)
            </button>
            <button
              onClick={selectAll}
              className="px-3 py-2 bg-editorial-cream hover:bg-editorial-clay border-2 border-editorial-charcoal text-xs text-editorial-charcoal rounded font-sans uppercase tracking-wider font-bold transition cursor-pointer"
            >
              Select All (Full Outfit)
            </button>
            <button
              onClick={deselectAll}
              className="px-3 py-2 bg-editorial-clay hover:opacity-80 text-xs text-editorial-charcoal rounded font-sans uppercase tracking-wider font-bold transition cursor-pointer"
            >
              Reset List
            </button>
          </div>
        </div>

        <div className="bg-editorial-cream p-5 rounded border-2 border-editorial-charcoal flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] text-editorial-moss font-sans uppercase tracking-wider block font-bold">Estimated Setup Investment</span>
            <div className="text-4xl font-extrabold text-editorial-forest tracking-tight mt-1 flex items-baseline font-sans">
              ${totalCost.toFixed(2)}
              <span className="text-xs text-editorial-moss font-normal font-serif ml-2">USD total</span>
            </div>
          </div>

          <div className="border-t-2 border-editorial-clay pt-3 font-sans">
            <div className="flex justify-between text-xs text-editorial-charcoal">
              <span>Selected items:</span>
              <span className="font-bold text-editorial-charcoal">{selectedIds.length}</span>
            </div>
            <div className="flex justify-between text-xs text-editorial-forest mt-1 font-bold">
              <span>Over-branded savings:</span>
              <span>~${totalSavings.toFixed(0)} saved!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b-2 border-editorial-charcoal pb-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-editorial-moss font-sans uppercase tracking-wider font-bold mr-2 flex items-center gap-1">
            <Filter size={12} /> Filter items:
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 text-xs rounded border-2 font-sans uppercase tracking-wider font-bold transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-editorial-forest text-editorial-cream border-editorial-charcoal'
                : 'bg-editorial-cream text-editorial-charcoal border-editorial-clay hover:bg-editorial-paper'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveFilter('essential')}
            className={`px-3 py-1 text-xs rounded border-2 font-sans uppercase tracking-wider font-bold transition cursor-pointer ${
              activeFilter === 'essential'
                ? 'bg-editorial-forest text-editorial-cream border-editorial-charcoal'
                : 'bg-editorial-cream text-editorial-charcoal border-editorial-clay hover:bg-editorial-paper'
            }`}
          >
            Core Essentials
          </button>
          <button
            onClick={() => setActiveFilter('non-essential')}
            className={`px-3 py-1 text-xs rounded border-2 font-sans uppercase tracking-wider font-bold transition cursor-pointer ${
              activeFilter === 'non-essential'
                ? 'bg-editorial-forest text-editorial-cream border-editorial-charcoal'
                : 'bg-editorial-cream text-editorial-charcoal border-editorial-clay hover:bg-editorial-paper'
            }`}
          >
            Optional Touches
          </button>
        </div>

        {/* Category filtering */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto font-sans uppercase tracking-wider font-bold text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 transition cursor-pointer ${
              activeCategory === 'all'
                ? 'text-editorial-forest border-b-2 border-editorial-forest'
                : 'text-editorial-moss hover:text-editorial-charcoal'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('tool')}
            className={`px-2.5 py-1 transition cursor-pointer ${
              activeCategory === 'tool'
                ? 'text-editorial-forest border-b-2 border-editorial-forest'
                : 'text-editorial-moss hover:text-editorial-charcoal'
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => setActiveCategory('primer')}
            className={`px-2.5 py-1 transition cursor-pointer ${
              activeCategory === 'primer'
                ? 'text-editorial-forest border-b-2 border-editorial-forest'
                : 'text-editorial-moss hover:text-editorial-charcoal'
            }`}
          >
            Primers
          </button>
          <button
            onClick={() => setActiveCategory('paint')}
            className={`px-2.5 py-1 transition cursor-pointer ${
              activeCategory === 'paint'
                ? 'text-editorial-forest border-b-2 border-editorial-forest'
                : 'text-editorial-moss hover:text-editorial-charcoal'
            }`}
          >
            Paints
          </button>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTools.map((tool) => {
          const isSelected = selectedIds.includes(tool.id);
          return (
            <div
              key={tool.id}
              onClick={() => toggleProduct(tool.id)}
              className={`p-5 rounded border-2 transition-all cursor-pointer select-none relative ${
                isSelected
                  ? 'bg-editorial-paper border-editorial-charcoal shadow-sm'
                  : 'bg-editorial-cream/40 border-editorial-clay opacity-80 hover:opacity-100 hover:border-editorial-charcoal'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 transition-colors ${isSelected ? 'text-editorial-forest' : 'text-editorial-moss'}`}>
                  {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className={`text-[9px] uppercase tracking-wider font-sans px-2 py-0.5 rounded font-bold ${
                        tool.essential 
                          ? 'bg-editorial-forest text-editorial-cream' 
                          : 'bg-editorial-clay text-editorial-charcoal'
                        }`}
                      >
                        {tool.essential ? 'Essential Core' : 'Optional'}
                      </span>
                      <h4 className="font-sans font-bold text-editorial-charcoal text-sm sm:text-base mt-2">{tool.name}</h4>
                    </div>
                    <div className="text-editorial-forest font-sans font-bold text-sm">
                      {tool.estimatedCost === 0 ? 'FREE' : `$${tool.estimatedCost.toFixed(2)}`}
                    </div>
                  </div>

                  <p className="text-xs text-editorial-moss font-serif leading-relaxed" style={{ fontSize: `${0.85 * fontSizeFactor}rem` }}>
                    {tool.description}
                  </p>

                  <div className="border-t border-editorial-clay pt-2 text-[11px] text-editorial-charcoal">
                    <span className="text-editorial-forest font-bold font-sans uppercase tracking-wider block mb-1">50+ Budget Smart-Alternative:</span>{' '}
                    <span className="italic font-serif text-editorial-moss">{tool.budgetAlternative}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Free Household Alternatives Panel */}
      <div className="bg-editorial-paper border-2 border-editorial-charcoal rounded p-6 space-y-3">
        <h4 className="text-md font-sans uppercase tracking-wider font-bold text-editorial-forest flex items-center gap-2">
          <Sparkles size={16} /> Free Kitchen-Alternative Hacks (Do not buy these!)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-editorial-charcoal font-serif" style={{ fontSize: `${0.9 * fontSizeFactor}rem` }}>
          <div className="p-3 bg-editorial-cream border border-editorial-clay rounded">
            <strong className="text-editorial-charcoal font-sans uppercase tracking-wider text-xs block mb-1">Miniature Water Mug:</strong> Avoid $10 fancy Citadel water split-pots. Standard wide soup mugs, jam jars, or disposable yogurt cups are equally robust and won't wobble.
          </div>
          <div className="p-3 bg-editorial-cream border border-editorial-clay rounded">
            <strong className="text-editorial-charcoal font-sans uppercase tracking-wider text-xs block mb-1">Paint Palette:</strong> Plastic takeaway lids or a piece of domestic tin-foil work brilliantly. Or, set up the **Homemade Wet Palette** (included above for free!).
          </div>
          <div className="p-3 bg-editorial-cream border border-editorial-clay rounded">
            <strong className="text-editorial-charcoal font-sans uppercase tracking-wider text-xs block mb-1">Ergonomic Handles:</strong> A bottle-cap or empty medicine bottle wrapped with a blob of poster putty behaves identically to a $25 specialized Citadel model holder.
          </div>
          <div className="p-3 bg-editorial-cream border border-editorial-clay rounded">
            <strong className="text-editorial-charcoal font-sans uppercase tracking-wider text-xs block mb-1">Basing Textures:</strong> Garden dirt and sifted river sand. Put the dirt in the oven at 200°F (93°C) for 15 minutes to sterilize, mix with Elmer's glue, and you have free high-quality concrete/mud bases!
          </div>
        </div>
      </div>
    </div>
  );
}
