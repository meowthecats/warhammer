import React, { useState } from 'react';
import { Layers, HelpCircle, Flame, Plus, Minus, Info, Clipboard, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { NecronUnit } from '../types';

interface Props {
  fontSizeFactor: number;
}

const NECRON_CATALOG: NecronUnit[] = [
  {
    id: 'combat_patrol',
    name: 'Combat Patrol: Necrons (Boxed Set)',
    type: 'commander', // special flag for bundle
    points: 440,
    estimatedCostUSD: 160,
    estimatedBuildTimeHours: 12,
    estimatedPaintTimeHours: 8,
    difficultyRating: 2,
    description: 'The ultimate gateway box. Contains 1 Overlord, 10 Necron Warriors, 3 Canoptek Scarab Swarms, 3 Skorpekh Destroyers (with 1 Plasmacyte), and 1 massive Canoptek Doomstalker.',
    whyChosen50Plus: 'Reduces raw box expenses by 40% compared to buying models separate. All models are modern "push-fit" or spacious assemblies.',
    tacticalTip: 'Immediately lets you play in specialized "Combat Patrol" format games at Rockville and Frederick stores without needing to write complex charts.',
  },
  {
    id: 'warriors',
    name: 'Necron Warriors (10-model squad with 3 Scarabs)',
    type: 'battleline',
    points: 100,
    estimatedCostUSD: 50,
    estimatedBuildTimeHours: 4,
    estimatedPaintTimeHours: 3,
    difficultyRating: 1,
    description: 'The backbone skeleton infantry of the undying empire, armed with Gauss flayers or Gauss reapers. The squad package also contains 3 Canoptek Scarab Swarms for free.',
    whyChosen50Plus: 'Virtually unbreakable models. Very low difficulty. Perfect to learn the "Silver Tide" wash and drybrush paint scheme.',
    tacticalTip: 'Pair them with your Overlord to get high reanimation roll benefits. Walk them onto central gold objectives and stay put!',
  },
  {
    id: 'warden',
    name: 'Royal Warden',
    type: 'commander',
    points: 40,
    estimatedCostUSD: 35,
    estimatedBuildTimeHours: 1,
    estimatedPaintTimeHours: 1.5,
    difficultyRating: 2,
    description: 'A decorated lieutenant that commands frontline battle ranks with direct authority.',
    whyChosen50Plus: 'A singular stout plastic sprue. Easy to hold, and features a regal cloak that ofers fun brass/gold accent practice.',
    tacticalTip: 'Attach him to your 10 Warriors. His "Adaptive Strategy" lets your infantry shoot, fall back, and shoot again. Immensely powerful for 40 points.',
  },
  {
    id: 'heavy_destroyer',
    name: 'Lokhust Heavy Destroyer (1 model)',
    type: 'heavy_support',
    points: 50,
    estimatedCostUSD: 35,
    estimatedBuildTimeHours: 2,
    estimatedPaintTimeHours: 2,
    difficultyRating: 1,
    description: 'A hover-tank cybernetic floating platform armed with a devastating long-range anti-tank Gauss Destructor.',
    whyChosen50Plus: 'The model represents a giant hover-hull. No individual tiny skinny legs to assemble or break—solid, heavy, high-vibe plastic.',
    tacticalTip: 'Keep this unit in the back ranks behind cover. Sights any giant enemy tanks/monsters and snipes them with a single heavy bolt from 36 inches!',
  },
  {
    id: 'skorpekhs',
    name: 'Skorpekh Destroyers (3-model melee squad)',
    type: 'elite',
    points: 90,
    estimatedCostUSD: 60,
    estimatedBuildTimeHours: 3.5,
    estimatedPaintTimeHours: 3,
    difficultyRating: 3,
    description: 'Insectoid three-legged bladesmen that slice through enemy forces in frantic close quarters.',
    whyChosen50Plus: 'Large, dynamic metallic weapons which are fun to paint with a simple silver run and a neon blade wash.',
    tacticalTip: 'Hide them from enemy shooting. Once the enemy gets close, charge out and use their hyperphase blades to shred infantry units clean.',
  },
  {
    id: 'doomstalker',
    name: 'Canoptek Doomstalker (1 model)',
    type: 'heavy_support',
    points: 145,
    estimatedCostUSD: 50,
    estimatedBuildTimeHours: 3,
    estimatedPaintTimeHours: 2.5,
    difficultyRating: 2,
    description: 'A sentinel walker standing on four high towering legs, carrying a lethal Doomsday Blaster linked directly to its core.',
    whyChosen50Plus: 'Towers over the field but is made of large, flat armor plates that are perfect for quick drybrushing or applying larger decals.',
    tacticalTip: 'Possesses the "Sentinel Jarvis" firing rule. Can shoot at enemy units that charge your nearby infantry, protecting your ranks.',
  },
];

export default function NecronListBuilder({ fontSizeFactor }: Props) {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({
    combat_patrol: 1,
    heavy_destroyer: 1,
    warriors: 0,
    warden: 0,
    skorpekhs: 0,
    doomstalker: 0,
  });
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const updateQuantity = (id: string, delta: number) => {
    const current = selectedQuantities[id] || 0;
    const nextVal = Math.max(0, current + delta);
    setSelectedQuantities({
      ...selectedQuantities,
      [id]: nextVal,
    });
  };

  const loadPreset = (presetName: 'combat_patrol_only' | '500_skirmish' | '750_dynasty') => {
    if (presetName === 'combat_patrol_only') {
      setSelectedQuantities({
        combat_patrol: 1,
        heavy_destroyer: 0,
        warriors: 0,
        warden: 0,
        skorpekhs: 0,
        doomstalker: 0,
      });
    } else if (presetName === '500_skirmish') {
      setSelectedQuantities({
        combat_patrol: 0,
        heavy_destroyer: 1,
        warriors: 1,
        warden: 1,
        skorpekhs: 1,
        doomstalker: 0,
      });
    } else if (presetName === '750_dynasty') {
      setSelectedQuantities({
        combat_patrol: 1,
        heavy_destroyer: 2,
        warriors: 1,
        warden: 1,
        skorpekhs: 0,
        doomstalker: 0,
      });
    }
  };

  // Calculations
  let totalPoints = 0;
  let totalCostUSD = 0;
  let totalBuildHours = 0;
  let totalPaintHours = 0;
  let selectedUnitsCount = 0;

  NECRON_CATALOG.forEach((unit) => {
    const qty = selectedQuantities[unit.id] || 0;
    if (qty > 0) {
      totalPoints += unit.points * qty;
      totalCostUSD += unit.estimatedCostUSD * qty;
      totalBuildHours += unit.estimatedBuildTimeHours * qty;
      totalPaintHours += unit.estimatedPaintTimeHours * qty;
      selectedUnitsCount += qty;
    }
  });

  // Independent gaming store average 15% discount
  const indyStorePrice = totalCostUSD * 0.85;
  const savingsAmount = totalCostUSD * 0.15;

  const triggerExport = () => {
    let text = `Undying Dynasty - Roster Ledger:\n`;
    NECRON_CATALOG.forEach((u) => {
      const q = selectedQuantities[u.id] || 0;
      if (q > 0) text += `- ${q}x ${u.name} (${u.points * q} pts)\n`;
    });
    text += `Total Points: ${totalPoints} | Est. Cost: $${indyStorePrice.toFixed(2)}`;
    
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => {
      setCopiedNotification(false);
    }, 2800);
  };

  return (
    <div className="space-y-8 animate-fade-in text-editorial-charcoal">
      {/* Intro section */}
      <div className="border-2 border-editorial-charcoal bg-editorial-paper p-6 rounded shadow-sm">
        <h3 className="text-2xl font-serif font-bold text-editorial-charcoal flex items-center gap-2 mb-2">
          <Layers className="text-editorial-forest" />
          Necron Point-Buy Starter List Planner
        </h3>
        <p className="text-editorial-charcoal font-serif text-sm leading-relaxed" style={{ fontSize: `${0.95 * fontSizeFactor}rem` }}>
          In Warhammer 40k, battles are fought based on matched army point totals. A standard small game (Incursion style) is **500 points**, while club games are often **1,000 or 2,000 points**. 
          Use this interactive selector to organize your optimal shopping list, track build/paint efforts, and review age-friendly difficulty ratings.
        </p>

        {/* Preset selections */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t-2 border-editorial-clay font-sans font-bold text-xs">
          <span className="text-editorial-moss mr-2 uppercase tracking-wider block">Starter Templates:</span>
          <button
            onClick={() => loadPreset('combat_patrol_only')}
            className="px-3 py-1.5 bg-editorial-cream hover:bg-editorial-clay border border-editorial-charcoal text-editorial-charcoal text-xs rounded transition cursor-pointer"
          >
            Combat Patrol Box (440 pts)
          </button>
          <button
            onClick={() => loadPreset('500_skirmish')}
            className="px-3 py-1.5 bg-editorial-cream hover:bg-editorial-clay border border-editorial-charcoal text-editorial-charcoal text-xs rounded transition cursor-pointer"
          >
            Custom 500-Point Roster
          </button>
          <button
            onClick={() => loadPreset('750_dynasty')}
            className="px-3 py-1.5 bg-editorial-cream hover:bg-editorial-clay border border-editorial-charcoal text-editorial-charcoal text-xs rounded transition cursor-pointer"
          >
            750-Point Shield Phalanx
          </button>
        </div>
      </div>

      {/* Roster & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unit Selector */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-wider font-sans font-bold text-editorial-moss flex items-center gap-2">
            <Plus size={14} className="text-editorial-forest" /> CATALOG OF STARTER UNITS
          </h4>

          <div className="space-y-4">
            {NECRON_CATALOG.map((unit) => {
              const qty = selectedQuantities[unit.id] || 0;
              return (
                <div
                  key={unit.id}
                  className={`p-5 rounded border-2 transition-all ${
                    qty > 0
                      ? 'bg-editorial-paper border-editorial-charcoal shadow-sm'
                      : 'bg-editorial-cream/40 border-editorial-clay hover:border-editorial-charcoal'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 font-sans font-bold rounded bg-editorial-forest text-editorial-cream">
                          {unit.points} Points
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider bg-editorial-clay text-editorial-charcoal">
                          {unit.type.replace('_', ' ')}
                        </span>
                        {/* Shaky hands friendly rating */}
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-editorial-cream border border-editorial-clay text-editorial-forest font-bold">
                          HAND EASE: {6 - unit.difficultyRating}/5
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-editorial-charcoal text-base sm:text-lg mt-1">{unit.name}</h5>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 bg-editorial-cream px-3 py-1 rounded border border-editorial-charcoal self-end sm:self-auto shadow-sm">
                      <button
                        onClick={() => updateQuantity(unit.id, -1)}
                        className="text-editorial-charcoal hover:bg-editorial-clay p-1.5 rounded transition cursor-pointer disabled:opacity-25"
                        disabled={qty === 0}
                        aria-label={`Reduce ${unit.name} quantity`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-sans font-bold text-editorial-forest w-4 text-center">{qty}</span>
                      <button
                        onClick={() => updateQuantity(unit.id, 1)}
                        className="text-editorial-charcoal hover:bg-editorial-clay p-1.5 rounded transition cursor-pointer"
                        aria-label={`Increase ${unit.name} quantity`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-editorial-moss font-serif mt-2 leading-relaxed" style={{ fontSize: `${0.85 * fontSizeFactor}rem` }}>
                    {unit.description}
                  </p>

                  {qty > 0 && (
                    <div className="mt-3 pt-3 border-t border-editorial-clay grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] sm:text-xs">
                      <div className="text-editorial-charcoal bg-editorial-cream/50 p-2.5 rounded border border-editorial-clay">
                        <span className="text-editorial-forest font-sans uppercase tracking-wider font-bold block mb-1">Why Great for 50+:</span>
                        <p className="font-serif text-editorial-moss">{unit.whyChosen50Plus}</p>
                      </div>
                      <div className="text-editorial-charcoal bg-editorial-cream/50 p-2.5 rounded border border-editorial-clay font-sans">
                        <span className="text-editorial-forest uppercase tracking-wider font-bold block mb-1">Beginners Combat Hack:</span>
                        <p className="font-serif text-editorial-moss">{unit.tacticalTip}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* List Summary & Pricing (Right Sidebar) */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-wider font-sans font-bold text-editorial-moss">
            ROSTER LEDGER
          </h4>

          <div className="bg-editorial-paper border-2 border-editorial-charcoal p-5 rounded space-y-6 sticky top-4 shadow-sm">
            <h5 className="font-serif font-bold text-lg text-editorial-charcoal pb-3 border-b-2 border-editorial-charcoal">Army Totals Summary</h5>

            {/* Metrics list */}
            <div className="space-y-4">
              <div className="flex justify-between items-center font-sans uppercase tracking-wider text-xs">
                <span className="text-editorial-moss">Selected Boxes:</span>
                <span className="font-bold text-editorial-charcoal">{selectedUnitsCount}</span>
              </div>

              <div className="flex justify-between items-center font-sans uppercase tracking-wider text-xs">
                <span className="text-editorial-moss">Total Points:</span>
                <span className="font-bold text-base text-editorial-forest">
                  {totalPoints} / 500 pts
                </span>
              </div>

              <div className="flex justify-between items-center font-sans uppercase tracking-wider text-xs border-b border-editorial-clay pb-2">
                <span className="text-editorial-moss">MSRP Store Price:</span>
                <span className="font-bold text-editorial-charcoal">${totalCostUSD.toFixed(2)}</span>
              </div>

              {/* Independent game store tip */}
              <div className="p-3 bg-editorial-cream border border-editorial-clay rounded text-xs space-y-2">
                <div className="flex justify-between text-editorial-forest font-bold font-sans uppercase tracking-wider">
                  <span>FLGS Price (-15%):</span>
                  <span>${indyStorePrice.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-editorial-moss font-serif italic leading-relaxed">
                  *Friendly Local Game Stores in Maryland (like Dream Wizards or HobbyTown Frederick) offer a standard 10% to 15% discount on Warhammer lists over Warhammer.com! Saving you <strong>${savingsAmount.toFixed(0)}</strong>.
                </p>
              </div>

              {/* Effort estimates */}
              <div className="border-t border-editorial-clay pt-4 space-y-2 font-serif text-sm">
                <div className="flex justify-between text-editorial-charcoal">
                  <span className="flex items-center gap-1 font-sans text-xs uppercase tracking-wider font-bold text-editorial-moss">Assemble scale:</span>
                  <span>{totalBuildHours.toFixed(0)} hrs</span>
                </div>
                <div className="flex justify-between text-editorial-charcoal">
                  <span className="flex items-center gap-1 font-sans text-xs uppercase tracking-wider font-bold text-editorial-moss">Painting scale:</span>
                  <span>{totalPaintHours.toFixed(0)} hrs</span>
                </div>
                <p className="text-[10px] text-editorial-moss leading-relaxed mt-2 pt-1 border-t border-dotted border-editorial-clay">
                  At <strong>15 minutes standard pace a day</strong>, you will have this exact army completed, base-coated, and ready for retail play in exactly <strong>{((totalBuildHours + totalPaintHours) * 4).toFixed(0)} days</strong>!
                </p>
              </div>
            </div>

            {/* Formatted list export */}
            {selectedUnitsCount > 0 ? (
              <div className="border-t border-editorial-charcoal pt-4 space-y-2">
                <button
                  onClick={triggerExport}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-editorial-forest hover:bg-opacity-90 text-editorial-cream text-xs font-sans uppercase tracking-wider font-bold rounded transition cursor-pointer"
                >
                  <Clipboard size={12} /> Export Roster Details
                </button>
                {copiedNotification && (
                  <p className="text-[10px] font-sans font-bold text-center text-editorial-forest uppercase tracking-widest animate-pulse">
                    ✓ Order copied to Clipboard!
                  </p>
                )}
              </div>
            ) : (
              <div className="text-xs text-editorial-moss italic text-center p-2 font-serif">
                Toggle products above to calculate points/costs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
