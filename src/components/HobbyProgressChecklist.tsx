import React, { useState, useEffect } from 'react';
import { ClipboardList, Plus, Trash2, RotateCcw, CheckSquare, Square, Sparkles, Check, Info, Award, Trophy, Paintbrush, Compass, Hammer, Lock, PenTool, Swords } from 'lucide-react';

interface Milestone {
  id: string;
  label: string;
  category: 'Preparation' | 'Assembly' | 'Painting' | 'Gaming';
  description: string;
  priority?: 'Low' | 'Medium' | 'High';
  isCustom?: boolean;
}

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: 'select-faction',
    label: 'Choose Your Dynasty Scheme',
    category: 'Preparation',
    description: 'Read the lore and settle on a paint scheme (like silver Nihilakh or glowing green Szarekhan).',
    priority: 'High'
  },
  {
    id: 'workspace-set',
    label: 'Set Up Safe Workspace',
    category: 'Preparation',
    description: 'Pick an area with good daylight lighting, comfortable seat height, and flat surface protection.',
    priority: 'High'
  },
  {
    id: 'assemble-first',
    label: 'Assemble first unit',
    category: 'Assembly',
    description: 'Carefully clip parts from the plastic sprue and glue your very first model (e.g. a Necron Warrior) to its base.',
    priority: 'High'
  },
  {
    id: 'prime-models',
    label: 'Prime models',
    category: 'Painting',
    description: 'Apply an even basecoat with white, grey, or black primer coat spray (such as standard Rust-Oleum flat primer).',
    priority: 'High'
  },
  {
    id: 'base-metallics',
    label: 'Apply Base Metallics',
    category: 'Painting',
    description: 'Drybrush or coat the metal frame of the miniatures with shining silver or bronze paint.',
    priority: 'Medium'
  },
  {
    id: 'apply-wash',
    label: 'Apply Liquid Shading Wash',
    category: 'Painting',
    description: 'Shover an ink wash (like Nuln Oil) into the recesses to magically define depth, bones, and joints.',
    priority: 'Medium'
  },
  {
    id: 'glow-eyes',
    label: 'Add Glowing Green Details',
    category: 'Painting',
    description: 'Touch up eyes, ribcage runes, and gun energy rods with a vivid lime green or light metallic green paint.',
    priority: 'Low'
  },
  {
    id: 'base-finishing',
    label: 'Base Miniatures & Add Sand',
    category: 'Painting',
    description: 'Coat bases with texture PVA paste or model grass sand to give your miniatures a real alien ground to stand on.',
    priority: 'Low'
  },
  {
    id: 'first-game',
    label: 'Organize/Play First Intro Round',
    category: 'Gaming',
    description: 'Drop by the local Kentlands Warhammer shop or play a simple basic rule phase turn at home.',
    priority: 'Medium'
  }
];

const priorityWeight = {
  'High': 3,
  'Medium': 2,
  'Low': 1
};

interface Props {
  fontSizeFactor: number;
}

export default function HobbyProgressChecklist({ fontSizeFactor }: Props) {
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    try {
      const saved = localStorage.getItem('hobby_milestones_list');
      if (saved) {
        const parsed = JSON.parse(saved) as Milestone[];
        // Backfill missing priorities to 'Medium'
        return parsed.map(item => ({
          ...item,
          priority: item.priority || 'Medium'
        }));
      }
      return DEFAULT_MILESTONES;
    } catch {
      return DEFAULT_MILESTONES;
    }
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hobby_milestones_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newLabel, setNewLabel] = useState('');
  const [newCategory, setNewCategory] = useState<'Preparation' | 'Assembly' | 'Painting' | 'Gaming'>('Assembly');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [isAdding, setIsAdding] = useState(false);

  // Sorting Option State persisted in local storage
  const [sortBy, setSortBy] = useState<'default' | 'priority-desc' | 'priority-asc' | 'completed' | 'active'>(() => {
    try {
      const saved = localStorage.getItem('hobby_checklist_sort');
      return (saved as any) || 'default';
    } catch {
      return 'default';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hobby_checklist_sort', sortBy);
    } catch (e) {
      console.error(e);
    }
  }, [sortBy]);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('hobby_milestones_list', JSON.stringify(milestones));
    } catch (e) {
      console.error('Failed to save milestones list to local storage', e);
    }
  }, [milestones]);

  useEffect(() => {
    try {
      localStorage.setItem('hobby_milestones_completed', JSON.stringify(completedIds));
    } catch (e) {
      console.error('Failed to save milestones completions', e);
    }
  }, [completedIds]);

  const toggleMilestone = (id: string) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleUpdatePriority = (id: string, priority: 'Low' | 'Medium' | 'High') => {
    setMilestones(prev =>
      prev.map(item =>
        item.id === id ? { ...item, priority } : item
      )
    );
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const newMilestone: Milestone = {
      id: `custom-${Date.now()}`,
      label: newLabel.trim(),
      category: newCategory,
      description: newDesc.trim() || 'Custom hobby task planned by you.',
      priority: newPriority,
      isCustom: true
    };

    setMilestones(prev => [...prev, newMilestone]);
    setNewLabel('');
    setNewDesc('');
    setNewPriority('Medium');
    setIsAdding(false);
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(item => item.id !== id));
    setCompletedIds(prev => prev.filter(x => x !== id));
  };

  const handleResetChecklist = () => {
    if (confirm('Are you sure you want to restore the standard list of wargaming milestones? Your custom items will be deleted.')) {
      setMilestones(DEFAULT_MILESTONES);
      setCompletedIds([]);
      setSortBy('default');
    }
  };

  const completedCount = milestones.filter(m => completedIds.includes(m.id)).length;
  const totalCount = milestones.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const prepTotal = milestones.filter(m => m.category === 'Preparation' && !m.isCustom).length;
  const prepDone = milestones.filter(m => m.category === 'Preparation' && !m.isCustom && completedIds.includes(m.id)).length;
  
  const assemblyTotal = milestones.filter(m => m.category === 'Assembly' && !m.isCustom).length;
  const assemblyDone = milestones.filter(m => m.category === 'Assembly' && !m.isCustom && completedIds.includes(m.id)).length;

  const paintingTotal = milestones.filter(m => m.category === 'Painting' && !m.isCustom).length;
  const paintingDone = milestones.filter(m => m.category === 'Painting' && !m.isCustom && completedIds.includes(m.id)).length;

  const gamingTotal = milestones.filter(m => m.category === 'Gaming' && !m.isCustom).length;
  const gamingDone = milestones.filter(m => m.category === 'Gaming' && !m.isCustom && completedIds.includes(m.id)).length;

  const customTotal = milestones.filter(m => m.isCustom).length;
  const customDone = milestones.filter(m => m.isCustom && completedIds.includes(m.id)).length;

  // Render-ready badges configuration list
  const badges = [
    {
      id: 'patron',
      title: 'Patron of the Dynasty',
      requirement: 'Complete all Preparation stage steps',
      current: `${prepDone}/${prepTotal}`,
      unlocked: prepTotal > 0 && prepDone === prepTotal,
      icon: Compass,
      unlockedColor: 'bg-[#fcfaf2] text-[#856404] border-amber-300 ring-1 ring-amber-300/40',
      iconBg: 'bg-amber-100 text-amber-900',
      lockedColor: 'bg-white opacity-60 text-gray-400 border-gray-200 border-dashed border-2',
      badgeLabel: 'Dynasty Founder'
    },
    {
      id: 'forge-master',
      title: 'Master of the Forge',
      requirement: 'Complete all Assembly steps',
      current: `${assemblyDone}/${assemblyTotal}`,
      unlocked: assemblyTotal > 0 && assemblyDone === assemblyTotal,
      icon: Hammer,
      unlockedColor: 'bg-[#f4fafc] text-[#0f5132] border-cyan-305 ring-1 ring-cyan-300/30',
      iconBg: 'bg-cyan-100 text-cyan-900',
      lockedColor: 'bg-white opacity-60 text-gray-400 border-gray-200 border-dashed border-2',
      badgeLabel: 'Artisan Engineer'
    },
    {
      id: 'brush-master',
      title: 'Brush Master',
      requirement: 'Complete all Painting steps',
      current: `${paintingDone}/${paintingTotal}`,
      unlocked: paintingTotal > 0 && paintingDone === paintingTotal,
      icon: Paintbrush,
      unlockedColor: 'bg-[#f3faf4] text-[#134914] border-emerald-305 ring-1 ring-emerald-300/30',
      iconBg: 'bg-emerald-100 text-emerald-950',
      lockedColor: 'bg-white opacity-60 text-gray-400 border-gray-200 border-dashed border-2',
      badgeLabel: 'Master Painter'
    },
    {
      id: 'vanguard',
      title: 'Vanguard Champion',
      requirement: 'Complete all Gaming steps',
      current: `${gamingDone}/${gamingTotal}`,
      unlocked: gamingTotal > 0 && gamingDone === gamingTotal,
      icon: Swords,
      unlockedColor: 'bg-[#faf5fc] text-[#4a154b] border-purple-300 ring-1 ring-purple-300/30',
      iconBg: 'bg-purple-100 text-purple-900',
      lockedColor: 'bg-white opacity-60 text-gray-400 border-gray-200 border-dashed border-2',
      badgeLabel: 'Tabletop Tactician'
    },
    {
      id: 'custom-architect',
      title: 'Creative Pioneer',
      requirement: 'Add and complete at least 1 custom task',
      current: `${customDone}/1`,
      unlocked: customDone >= 1,
      icon: PenTool,
      unlockedColor: 'bg-[#f5f6fa] text-[#084298] border-indigo-300 ring-1 ring-indigo-300/30',
      iconBg: 'bg-indigo-100 text-indigo-900',
      lockedColor: 'bg-white opacity-60 text-gray-400 border-gray-200 border-dashed border-2',
      badgeLabel: 'Grand Craftsman'
    },
    {
      id: 'grand-overlord',
      title: 'Grand Overlord',
      requirement: 'Complete all checklist tasks (100% completion)',
      current: `${completedCount}/${totalCount}`,
      unlocked: totalCount > 0 && completedCount === totalCount,
      icon: Trophy,
      unlockedColor: 'bg-[#fffbeb] text-amber-900 border-amber-400 ring-4 ring-amber-100/70',
      iconBg: 'bg-amber-200 text-amber-950',
      lockedColor: 'bg-white opacity-60 text-gray-400 border-gray-200 border-dashed border-2',
      badgeLabel: 'Tomb Emperor'
    }
  ];

  // Encouragement messages depending on progress percentage
  const getMotivationalMessage = () => {
    if (progressPercent === 100) {
      return "🏆 Exquisite! Your models are assembled, primed, painted, and ready. You have awoken your miniature tomb world!";
    }
    if (progressPercent >= 75) {
      return "🌟 Glorious! The glow of your dynasty shines bright. Only a couple finishing touches remain before deployment.";
    }
    if (progressPercent >= 50) {
      return "🎨 Halfway there! Your miniatures are assembled and colors are moving onto the models. Keep utilizing the shakiness-friendly routines!";
    }
    if (progressPercent >= 25) {
      return "🔨 Excellent! The base preparations are completed, and plastic components are turning into beautiful miniature armies.";
    }
    if (progressPercent > 0) {
      return "🔋 Underworld charging! You have taken your first conscious steps into the miniature tabletop universe.";
    }
    return "💡 Unpack your models! Settle down with a warm beverage and tick off the list to watch your progress unfold.";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Preparation': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Assembly': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Painting': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Gaming': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSortedMilestones = () => {
    const listCopy = [...milestones];
    
    switch (sortBy) {
      case 'priority-desc':
        return listCopy.sort((a, b) => {
          const wA = priorityWeight[a.priority || 'Medium'];
          const wB = priorityWeight[b.priority || 'Medium'];
          return wB - wA;
        });
      case 'priority-asc':
        return listCopy.sort((a, b) => {
          const wA = priorityWeight[a.priority || 'Medium'];
          const wB = priorityWeight[b.priority || 'Medium'];
          return wA - wB;
        });
      case 'completed':
        return listCopy.sort((a, b) => {
          const doneA = completedIds.includes(a.id) ? 1 : 0;
          const doneB = completedIds.includes(b.id) ? 1 : 0;
          return doneB - doneA;
        });
      case 'active':
        return listCopy.sort((a, b) => {
          const doneA = completedIds.includes(a.id) ? 1 : 0;
          const doneB = completedIds.includes(b.id) ? 1 : 0;
          return doneA - doneB;
        });
      default:
        return listCopy;
    }
  };

  return (
    <div className="bg-editorial-paper border-2 border-editorial-charcoal p-6 rounded shadow-sm space-y-6" id="hobby-progress-checklist-container">
      {/* Component Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-editorial-clay pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-editorial-forest text-editorial-cream rounded">
            <ClipboardList size={22} id="checklist-title-icon" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-editorial-charcoal">Hobby Progress Checklist</h3>
            <p className="text-xs text-editorial-moss font-sans uppercase tracking-wider font-semibold">Track your core wargaming accomplishments step-by-step</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Action button triggers addition */}
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-1.5 bg-editorial-cream hover:bg-editorial-clay border border-editorial-charcoal text-editorial-charcoal text-xs font-sans uppercase tracking-wider font-bold rounded cursor-pointer transition-colors"
            id="checklist-toggle-add-btn"
          >
            {isAdding ? 'Cancel' : 'Add Custom Task'}
          </button>

          {/* Reset button */}
          <button
            onClick={handleResetChecklist}
            className="p-1.5 hover:bg-editorial-clay border border-editorial-clay hover:border-editorial-charcoal text-editorial-moss hover:text-editorial-charcoal rounded transition-colors"
            title="Reset to original milestones"
            id="checklist-reset-btn"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-editorial-cream/30 border border-editorial-clay p-4 rounded-md space-y-3" id="checklist-progress-header">
        <div className="flex justify-between items-center text-xs font-sans">
          <span className="font-bold uppercase tracking-wider text-editorial-moss flex items-center gap-1.5">
            🎯 Campaign Milestones Accomplished
          </span>
          <span className="font-mono font-bold text-editorial-charcoal bg-[#e7edd4] px-2 py-0.5 rounded border border-editorial-moss/20">
            {completedCount} / {totalCount} ({progressPercent}%)
          </span>
        </div>

        {/* Visual progress track */}
        <div className="w-full bg-editorial-cream/80 border border-editorial-clay h-4 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div 
            className="bg-editorial-forest h-full rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent > 8 && (
              <span className="absolute inset-y-0 right-2 flex items-center text-[9px] font-sans font-black text-editorial-cream select-none leading-none">
                {progressPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Motivational status text */}
        <p className="text-xs text-editorial-moss font-serif italic leading-relaxed">
          {getMotivationalMessage()}
        </p>
      </div>

      {/* Badges Cabinet Segment */}
      <div className="bg-[#fcfdfa] border-2 border-editorial-charcoal p-5 rounded space-y-4 shadow-sm" id="rewards-badge-cabinet">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-editorial-clay pb-2.5 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg bg-editorial-cream border border-editorial-clay p-1 rounded">🏅</span>
            <div>
              <h4 className="text-xs uppercase font-sans tracking-widest font-black text-editorial-charcoal leading-tight">Dynasty Campaign Achievements</h4>
              <p className="text-[10px] text-editorial-moss font-serif italic">Complete tasks to unlock official wargaming accolades</p>
            </div>
          </div>
          <div className="bg-editorial-cream border border-editorial-clay rounded px-2 py-0.5 text-[9px] font-mono font-bold text-editorial-forest text-right shrink-0">
            Unlocked: {badges.filter(b => b.unlocked).length} / {badges.length} Trophies
          </div>
        </div>

        {/* Small grid of badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div 
                key={badge.id}
                className={`p-3 rounded border flex items-start gap-3 transition-all ${
                  badge.unlocked 
                    ? `${badge.unlockedColor} shadow-2xs` 
                    : `${badge.lockedColor}`
                }`}
                id={`badge-card-${badge.id}`}
              >
                {/* Visual Circle Emblem */}
                <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center relative ${
                  badge.unlocked 
                    ? badge.iconBg 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <IconComponent size={18} className="stroke-[2.5]" />
                  {!badge.unlocked && (
                    <div className="absolute -bottom-1 -right-1 bg-white border border-gray-200 rounded-full p-0.5 text-[7px]" title="Locked">
                      <Lock size={7} className="text-gray-400 fill-gray-400" />
                    </div>
                  )}
                </div>

                {/* Badge Descriptions */}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-sans font-black tracking-tight truncate block">
                      {badge.title}
                    </span>
                    {badge.unlocked ? (
                      <span className="shrink-0 bg-[#dbf5df] text-[#134914] border border-[#aadeb2] text-[7px] px-1 py-0.1 font-sans font-black uppercase rounded-xs tracking-wider scale-95 origin-right">
                        ✓ Active
                      </span>
                    ) : (
                      <span className="shrink-0 text-slate-400 text-[8px] font-mono font-bold">
                        {badge.current}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[10px] leading-snug text-editorial-moss font-serif opacity-90">
                    {badge.requirement}
                  </p>
                  
                  {/* Progress Indicator for category */}
                  {!badge.unlocked && (
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 p-0.5 border border-slate-250">
                      <div 
                        className="bg-slate-400 h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min(
                            100, 
                            (parseInt(badge.current.split('/')[0]) / (parseInt(badge.current.split('/')[1]) || 1)) * 100
                          )}%` 
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Addition Dialog Form */}
      {isAdding && (
        <form onSubmit={handleAddMilestone} className="bg-editorial-cream/70 border-2 border-dashed border-editorial-clay p-4 rounded space-y-4 animate-in fade-in-40 duration-200" id="checklist-add-form">
          <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-editorial-forest">Add Custom Milestone</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 space-y-1">
              <label className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss block">Milestone Title:</label>
              <input
                type="text"
                placeholder="e.g., Assemble first unit, Paint Necron Warriors..."
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                required
                className="w-full px-3 py-1.5 bg-editorial-paper border border-editorial-clay rounded text-xs font-sans focus:outline-hidden focus:border-editorial-charcoal"
                id="checklist-input-title"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss block">Category:</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-editorial-paper border border-editorial-clay rounded text-xs font-sans focus:outline-hidden focus:border-editorial-charcoal"
                id="checklist-select-category"
              >
                <option value="Preparation">Preparation</option>
                <option value="Assembly">Assembly</option>
                <option value="Painting">Painting</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss block">Priority:</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                className="w-full px-3 py-1.5 bg-editorial-paper border border-editorial-clay rounded text-xs font-sans focus:outline-hidden focus:border-editorial-charcoal font-bold"
                id="checklist-input-priority"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>
            
            <div className="md:col-span-12 space-y-1">
              <label className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss block">Brief Instructions / Description:</label>
              <textarea
                placeholder="Give yourself a specific goal or resource note..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={2}
                className="w-full px-3 py-1.5 bg-editorial-paper border border-editorial-clay rounded text-xs font-sans focus:outline-hidden focus:border-editorial-charcoal"
                id="checklist-input-desc"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-editorial-forest hover:bg-opacity-90 text-editorial-cream text-xs font-sans uppercase tracking-wider font-bold rounded shadow-sm cursor-pointer"
            id="checklist-submit-btn"
          >
            <Plus size={14} />
            <span>Confirm New Task</span>
          </button>
        </form>
      )}

      {/* Interactive Progress Indicators */}
      <div className="bg-editorial-cream p-4 rounded border border-editorial-clay shadow-inner space-y-2">
        <div className="flex justify-between items-center text-xs font-sans uppercase tracking-wider font-bold">
          <span className="text-editorial-forest flex items-center gap-1">
            <Sparkles size={12} className="text-editorial-forest" />
            Hobby Progress Bar
          </span>
          <span className="text-editorial-moss">{completedCount} of {totalCount} Completed ({progressPercent}%)</span>
        </div>
        
        <div className="w-full h-3 bg-editorial-clay rounded overflow-hidden border border-editorial-charcoal">
          <div
            className="h-full bg-editorial-forest transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex gap-1.5 items-start text-xs text-editorial-moss font-serif italic pt-1 leading-relaxed">
          <span className="text-editorial-forest font-bold shrink-0">Progress Level:</span>
          <span>{getMotivationalMessage()}</span>
        </div>
      </div>

      {/* Controls: Sort & Filter Priority Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-editorial-cream/40 p-4 rounded border border-editorial-clay shadow-xs" id="checklist-controls-hub">
        <div className="flex items-center gap-2">
          <span className="text-xs font-sans uppercase font-black text-editorial-moss">Sort Tasks:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white hover:bg-editorial-cream border border-editorial-charcoal rounded px-3 py-1 text-xs font-sans font-bold text-editorial-charcoal cursor-pointer focus:outline-hidden"
            id="checklist-sort-filter"
          >
            <option value="default">📋 Default Sequence</option>
            <option value="priority-desc">🔴 Priority: High to Low</option>
            <option value="priority-asc">🟢 Priority: Low to High</option>
            <option value="completed">✓ Completed First</option>
            <option value="active">⏳ Active First</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-sans text-editorial-moss">
          <span className="font-bold sm:inline-block hidden">Totals:</span>
          <span className="shrink-0 bg-red-50 text-red-800 border-red-200 border px-2 py-0.5 rounded font-mono font-bold">
            High: {milestones.filter(m => (m.priority || 'Medium') === 'High').length}
          </span>
          <span className="shrink-0 bg-amber-50 text-amber-800 border-amber-250 border px-2 py-0.5 rounded font-mono font-bold">
            Med: {milestones.filter(m => (m.priority || 'Medium') === 'Medium').length}
          </span>
          <span className="shrink-0 bg-slate-50 text-slate-700 border-slate-250 border px-2 py-0.5 rounded font-mono font-bold">
            Low: {milestones.filter(m => (m.priority || 'Medium') === 'Low').length}
          </span>
        </div>
      </div>

      {/* Main Grid Checklist Cards */}
      {milestones.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-editorial-clay rounded">
          <ClipboardList className="mx-auto text-editorial-moss/40 mb-2" size={32} />
          <p className="font-serif italic text-editorial-moss text-sm">Your checklist is completely empty.</p>
          <button
            onClick={() => setMilestones(DEFAULT_MILESTONES)}
            className="text-xs font-sans font-bold uppercase tracking-wider text-editorial-forest hover:underline mt-2 cursor-pointer"
            id="checklist-no-items-reset"
          >
            Load Core Milestones
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="hobby-milestones-grid">
          {getSortedMilestones().map((item) => {
            const isCompleted = completedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`flex gap-3 p-4 rounded border-2 transition-all relative group select-none ${
                  isCompleted
                    ? 'bg-editorial-paper border-editorial-charcoal opacity-75 shadow-sm'
                    : 'bg-editorial-cream/25 border-editorial-clay hover:border-editorial-charcoal hover:bg-editorial-cream/50'
                }`}
                id={`milestone-container-${item.id}`}
              >
                {/* Custom Label delete button */}
                {item.isCustom && (
                  <button
                    onClick={() => handleDeleteMilestone(item.id)}
                    className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 bg-white/80 rounded border border-editorial-clay cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                    title="Remove custom task"
                    id={`delete-milestone-btn-${item.id}`}
                  >
                    <Trash2 size={12} />
                  </button>
                )}

                {/* Left checkbox box */}
                <button
                  type="button"
                  onClick={() => toggleMilestone(item.id)}
                  className="mt-0.5 text-left text-editorial-forest hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-hidden"
                  aria-label={`Toggle milestone ${item.label}`}
                  id={`milestone-checkbox-${item.id}`}
                >
                  {isCompleted ? (
                    <div className="text-editorial-forest bg-editorial-cream rounded border border-editorial-charcoal p-0.5">
                      <Check size={14} className="stroke-[3px]" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded border border-editorial-charcoal bg-white" />
                  )}
                </button>

                {/* Right task detail info block */}
                <div className="space-y-2.5 flex-1 pr-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-sm font-sans font-bold leading-snug ${
                        isCompleted ? 'text-editorial-moss line-through decoration-editorial-forest decoration-2' : 'text-editorial-charcoal'
                      }`} style={{ fontSize: `${0.95 * fontSizeFactor}rem` }}>
                        {item.label}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-sans uppercase tracking-wider font-bold border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-sans uppercase tracking-wider font-bold border ${
                        (item.priority || 'Medium') === 'High'
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : (item.priority || 'Medium') === 'Medium'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {(item.priority || 'Medium')}
                      </span>
                    </div>
                    
                    <p className="text-xs text-editorial-moss font-serif leading-relaxed mt-1" style={{ fontSize: `${0.85 * fontSizeFactor}rem` }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Priority selector inline inside each task card */}
                  <div className="flex items-center gap-1.5 pt-1.5 border-t border-dashed border-editorial-clay/40" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[9px] uppercase tracking-wider font-sans font-black text-editorial-moss">Priority:</span>
                    <select
                      value={item.priority || 'Medium'}
                      onChange={(e) => handleUpdatePriority(item.id, e.target.value as 'Low' | 'Medium' | 'High')}
                      className={`text-[10px] font-sans font-black px-1.5 py-0.5 rounded-md border cursor-pointer focus:outline-hidden transition-colors ${
                        (item.priority || 'Medium') === 'High'
                          ? 'bg-red-50 text-red-800 border-red-300 hover:bg-red-100'
                          : (item.priority || 'Medium') === 'Medium'
                          ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                      id={`priority-select-${item.id}`}
                    >
                      <option value="High">🔴 High Priority</option>
                      <option value="Medium">🟡 Medium Priority</option>
                      <option value="Low">🟢 Low Priority</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Helpful footnote */}
      <div className="bg-editorial-cream/40 p-3.5 border-t border-editorial-clay rounded flex items-start gap-2.5 text-[11px] text-editorial-moss font-sans">
        <Info size={13} className="text-editorial-forest shrink-0 mt-0.5" />
        <span className="leading-relaxed">All progress steps checked here will be stored indefinitely on this browser so you can log back in and resume work right where you stopped painting.</span>
      </div>
    </div>
  );
}
