import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Trash2, Check, Sparkles, Trophy, RotateCcw, HelpCircle, AlertCircle, Bookmark, Scissors, Paintbrush, BookOpen } from 'lucide-react';

export interface HobbySession {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlot: string; // e.g. "07:30 PM - 08:00 PM"
  activity: string; // "Assembly", "Painting", "Priming", "Lore Study", etc.
  notes: string;
  isCompleted: boolean;
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;

const STANDARD_ACTIVITIES = [
  { label: 'Assemble Models', icon: Scissors, color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { label: 'Basecoating / Metallics', icon: Paintbrush, color: 'text-slate-700 bg-slate-50 border-slate-200' },
  { label: 'Spray Priming (Outdoor)', icon: Sparkles, color: 'text-blue-700 bg-blue-50 border-blue-200' },
  { label: 'Recess Wash / Ink Shading', icon: Paintbrush, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { label: 'Vibrant Glow Detailing', icon: Sparkles, color: 'text-lime-700 bg-lime-50 border-lime-200' },
  { label: 'Basing with Texture Paste', icon: Bookmark, color: 'text-amber-800 bg-amber-100/40 border-amber-300' },
  { label: 'Rulebook & Tactics Study', icon: BookOpen, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' }
];

// 30-minute time intervals from 7:00 AM to 11:30 PM
const TIME_SLOTS = [
  '07:00 AM - 07:30 AM',
  '07:30 AM - 08:00 AM',
  '08:00 AM - 08:30 AM',
  '08:30 AM - 09:00 AM',
  '09:00 AM - 09:30 AM',
  '09:30 AM - 10:00 AM',
  '10:00 AM - 10:30 AM',
  '10:30 AM - 11:00 AM',
  '11:00 AM - 11:30 AM',
  '11:35 AM - 12:05 PM',
  '12:00 PM - 12:30 PM',
  '12:30 PM - 01:00 PM',
  '01:00 PM - 01:30 PM',
  '01:30 PM - 02:00 PM',
  '02:00 PM - 02:30 PM',
  '02:30 PM - 03:00 PM',
  '03:00 PM - 03:30 PM',
  '03:30 PM - 04:00 PM',
  '04:00 PM - 04:30 PM',
  '04:30 PM - 05:00 PM',
  '05:00 PM - 05:30 PM',
  '05:30 PM - 06:00 PM',
  '06:00 PM - 06:30 PM',
  '06:30 PM - 07:00 PM',
  '07:00 PM - 07:30 PM',
  '07:30 PM - 08:00 PM',
  '08:00 PM - 08:30 PM',
  '08:30 PM - 09:00 PM',
  '09:00 PM - 09:30 PM',
  '09:30 PM - 10:00 PM',
  '10:00 PM - 10:30 PM',
  '10:30 PM - 11:00 PM'
];

interface Props {
  fontSizeFactor: number;
}

export default function WeeklyHobbySchedule({ fontSizeFactor }: Props) {
  // Saved routine or custom list
  const [sessions, setSessions] = useState<HobbySession[]>(() => {
    try {
      const saved = localStorage.getItem('necron_weekly_schedule');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load hobby schedule', e);
    }
    // Default starter plan for busy adults
    return [
      {
        id: 'default-1',
        day: 'Tuesday',
        timeSlot: '07:30 PM - 08:00 PM',
        activity: 'Assemble Models',
        notes: 'Clip and glue next two Necron Warriors. Rest wrists between sprues.',
        isCompleted: false
      },
      {
        id: 'default-2',
        day: 'Thursday',
        timeSlot: '08:00 PM - 08:30 PM',
        activity: 'Basecoating / Metallics',
        notes: 'Drybrush metallic base color onto primed Warriors.',
        isCompleted: false
      },
      {
        id: 'default-3',
        day: 'Saturday',
        timeSlot: '10:00 AM - 10:30 AM',
        activity: 'Recess Wash / Ink Shading',
        notes: 'Apply liberal Nuln oil wash over metal frames. Let it sit while enjoying team.',
        isCompleted: false
      },
      {
        id: 'default-4',
        day: 'Sunday',
        timeSlot: '04:00 PM - 04:30 PM',
        activity: 'Vibrant Glow Detailing',
        notes: 'Pick out green eyes and weaponry energy bars using a magnifying guide.',
        isCompleted: false
      }
    ];
  });

  const [activeDay, setActiveDay] = useState<typeof DAYS_OF_WEEK[number] | 'All'>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // New slot form state
  const [newDay, setNewDay] = useState<typeof DAYS_OF_WEEK[number]>('Monday');
  const [newTime, setNewTime] = useState('08:00 PM - 08:30 PM');
  const [newActivity, setNewActivity] = useState('Assemble Models');
  const [customActivity, setCustomActivity] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('necron_weekly_schedule', JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  }, [sessions]);

  // Handle adding new micro-session
  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    const finalActivity = newActivity === 'Custom' ? (customActivity.trim() || 'Custom Micro-Session') : newActivity;
    
    const newSession: HobbySession = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      day: newDay,
      timeSlot: newTime,
      activity: finalActivity,
      notes: newNotes.trim() || '30 minutes of high-focus tranquil painting or modeling.',
      isCompleted: false
    };

    setSessions(prev => {
      // Sort sessions by day chronology and then start time
      const updated = [...prev, newSession];
      return sortHobbySessions(updated);
    });

    // Reset Form
    setCustomActivity('');
    setNewNotes('');
    setShowAddForm(false);
  };

  // Sort sessions helper
  const sortHobbySessions = (list: HobbySession[]) => {
    const dayOrder = {
      'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7
    };
    return list.sort((a, b) => {
      if (dayOrder[a.day] !== dayOrder[b.day]) {
        return dayOrder[a.day] - dayOrder[b.day];
      }
      return TIME_SLOTS.indexOf(a.timeSlot) - TIME_SLOTS.indexOf(b.timeSlot);
    });
  };

  // Toggle completion
  const handleToggleCompleted = (id: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, isCompleted: !s.isCompleted } : s));
  };

  // Delete card
  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  // Generate a blueprint template
  const handleLoadBlueprint = (type: 'daily-habit' | 'weekend-warrior' | 'relaxing-cadence') => {
    let list: HobbySession[] = [];
    if (type === 'daily-habit') {
      // 30 minute sessions spread through evenings
      list = [
        { id: 'b-1', day: 'Monday', timeSlot: '08:00 PM - 08:30 PM', activity: 'Assemble Models', notes: 'Prune parts carefully. Sand sharp plastic edges.', isCompleted: false },
        { id: 'b-2', day: 'Wednesday', timeSlot: '08:00 PM - 08:30 PM', activity: 'Basecoating / Metallics', notes: 'Paint deep pewter or iron onto chest plates.', isCompleted: false },
        { id: 'b-3', day: 'Friday', timeSlot: '08:00 PM - 08:30 PM', activity: 'Recess Wash / Ink Shading', notes: 'Ink wash the joints. Let the wash work the shadows.', isCompleted: false },
        { id: 'b-4', day: 'Sunday', timeSlot: '08:00 PM - 08:30 PM', activity: 'Vibrant Glow Detailing', notes: 'Add green glowing accents on eyes and Gauss rods.', isCompleted: false },
      ];
    } else if (type === 'weekend-warrior') {
      // Focused weekend sessions
      list = [
        { id: 'w-1', day: 'Saturday', timeSlot: '10:00 AM - 10:30 AM', activity: 'Assemble Models', notes: 'Prepare work desk. Place protect pad. Glue warrior limbs.', isCompleted: false },
        { id: 'w-2', day: 'Saturday', timeSlot: '11:00 AM - 11:30 AM', activity: 'Spray Priming (Outdoor)', notes: 'Shake spray can 2 minutes. Even distance light passes.', isCompleted: false },
        { id: 'w-3', day: 'Sunday', timeSlot: '02:00 PM - 02:30 PM', activity: 'Basecoating / Metallics', notes: 'Layer metallic paint. Take deep breaths, brace hands.', isCompleted: false },
        { id: 'w-4', day: 'Sunday', timeSlot: '03:00 PM - 03:30 PM', activity: 'Recess Wash / Ink Shading', notes: 'Apply shadows. Check details under your magnifying lens.', isCompleted: false },
      ];
    } else {
      // Gentle pacing
      list = [
        { id: 'r-1', day: 'Wednesday', timeSlot: '07:35 PM - 08:05 PM', activity: 'Rulebook & Tactics Study', notes: 'Read Necron background lore. Look at the miniature photos.', isCompleted: false },
        { id: 'r-2', day: 'Saturday', timeSlot: '04:00 PM - 04:30 PM', activity: 'Assemble Models', notes: 'Just work on one fine detail miniature slowly.', isCompleted: false },
        { id: 'r-3', day: 'Sunday', timeSlot: '04:00 PM - 04:30 PM', activity: 'Basing with Texture Paste', notes: 'Spoon dynamic textured grain onto bases to tie squad theme.', isCompleted: false },
      ];
    }

    if (confirm('Replace your current schedule with this beginner-friendly blueprint routine?')) {
      setSessions(list);
    }
  };

  const completedCount = sessions.filter(s => s.isCompleted).length;
  const totalMinutes = sessions.length * 30;
  const completedMinutes = completedCount * 30;

  // Render correct icon for standard activities
  const getActivityIcon = (actName: string) => {
    const act = STANDARD_ACTIVITIES.find(a => a.label === actName);
    if (!act) return Clock;
    return act.icon;
  };

  const getActivityBadgeColor = (actName: string) => {
    const act = STANDARD_ACTIVITIES.find(a => a.label === actName);
    if (!act) return 'text-editorial-charcoal bg-[#f5f5f4] border-editorial-clay';
    return act.color;
  };

  return (
    <div className="bg-editorial-paper border-2 border-editorial-charcoal p-6 rounded shadow-sm space-y-6" id="weekly-hobby-schedule-container">
      {/* Title & Micro explanation */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-editorial-charcoal pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl bg-editorial-cream border border-editorial-clay p-1 rounded">📅</span>
            <div>
              <h3 className="text-lg uppercase font-sans tracking-widest font-black text-editorial-charcoal">
                Weekly Miniatures Micro-Scheduler
              </h3>
              <p className="text-xs text-editorial-moss font-serif italic mt-0.5">
                Block out mindful 30-minute mini-slots to master your legion without experiencing creative fatigue or eye fatigue.
              </p>
            </div>
          </div>
        </div>
        
        {/* Statistics Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#f0f9f3] text-[#134914] border border-[#aadeb2] px-3 py-1.5 rounded text-center shrink-0">
            <div className="text-[9px] font-sans uppercase font-extrabold tracking-wider leading-none">WEEKLY GOAL</div>
            <div className="text-sm font-sans font-black mt-1">
              {completedMinutes / 60}h / {totalMinutes / 60}h Done
            </div>
          </div>
          
          <div className="bg-editorial-cream border border-editorial-clay px-3 py-1.5 rounded text-center shrink-0">
            <div className="text-[9px] font-sans uppercase font-extrabold tracking-wider leading-none">SLOTS ACCOMPLISHED</div>
            <div className="text-sm font-sans font-black text-editorial-charcoal mt-1">
              {completedCount} / {sessions.length} Slots
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('Clear entire scheduler data and reset to original recommended Maryland novice plan?')) {
                localStorage.removeItem('necron_weekly_schedule');
                window.location.reload();
              }
            }}
            className="p-2 border border-editorial-clay text-editorial-moss hover:text-editorial-charcoal hover:bg-editorial-cream rounded transition-colors cursor-pointer"
            title="Reset Weekly Planner"
            id="reset-schedule-btn"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Helpful Adult Advice block */}
      <div className="bg-editorial-cream/50 border border-editorial-clay p-4 rounded flex items-start gap-3">
        <AlertCircle className="text-editorial-forest shrink-0 mt-0.5" size={18} />
        <div className="text-xs text-editorial-moss font-serif leading-relaxed">
          <p className="font-bold text-editorial-charcoal mb-1">
            💡 Busy Adults & Seniors: The "30-Minute Boundary Rule"
          </p>
          Instead of waiting for an empty 4-hour window that never arrives, block out a single standalone 30-minute recess. 
          When your 30-minute alarm rings, put down the brush! Stop early. This keeps you eager and prevents your wrists, hands, and eyes from feeling exhausted.
        </div>
      </div>

      {/* Blueprints / Template Fast Generator */}
      <div className="space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.12em] font-black text-editorial-moss block">
          ⚡ SELECT A RECOMMENDED NOVICE Blueprint PLAN
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleLoadBlueprint('daily-habit')}
            className="px-3 py-2 bg-white hover:bg-[#fafaf9] border border-editorial-clay rounded text-left flex flex-col justify-between transition-colors cursor-pointer"
            id="blueprint-daily-btn"
          >
            <span className="text-xs font-sans font-bold text-editorial-charcoal">⏱ 15-Min System Draft</span>
            <span className="text-[10px] text-editorial-moss font-serif mt-1">Four low-pressure 30-minute sessions matching light evening moments.</span>
          </button>
          <button
            onClick={() => handleLoadBlueprint('weekend-warrior')}
            className="px-3 py-2 bg-white hover:bg-[#fafaf9] border border-editorial-clay rounded text-left flex flex-col justify-between transition-colors cursor-pointer"
            id="blueprint-weekend-btn"
          >
            <span className="text-xs font-sans font-bold text-editorial-charcoal">⚔️ Weekend Campaign</span>
            <span className="text-[10px] text-editorial-moss font-serif mt-1">Saturday and Sunday focused sessions including outside priming.</span>
          </button>
          <button
            onClick={() => handleLoadBlueprint('relaxing-cadence')}
            className="px-3 py-2 bg-white hover:bg-[#fafaf9] border border-editorial-clay rounded text-left flex flex-col justify-between transition-colors cursor-pointer"
            id="blueprint-relaxing-btn"
          >
            <span className="text-xs font-sans font-bold text-editorial-charcoal">☕ Quiet Hobby Cadence</span>
            <span className="text-[10px] text-editorial-moss font-serif mt-1">Very relaxed pacing with study reading and organic scenic basing.</span>
          </button>
        </div>
      </div>

      {/* Form Toggle & Quick Filtering controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
        {/* Navigation Tabs (All, Mo, Tu, We, Th, Fr, Sa, Su) */}
        <div className="flex flex-wrap items-center gap-1.5" id="schedule-day-tabs">
          <button
            onClick={() => setActiveDay('All')}
            className={`px-2.5 py-1 text-xs font-sans font-bold rounded border transition-colors cursor-pointer ${
              activeDay === 'All'
                ? 'bg-editorial-charcoal text-white border-editorial-charcoal'
                : 'bg-white hover:bg-editorial-cream border-editorial-clay text-editorial-charcoal'
            }`}
          >
            All Week
          </button>
          {DAYS_OF_WEEK.map(day => {
            const dayCount = sessions.filter(s => s.day === day).length;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-2 py-1 text-xs font-sans font-bold rounded border transition-all cursor-pointer flex items-center gap-1 ${
                  activeDay === day
                    ? 'bg-editorial-forest text-editorial-cream border-editorial-forest'
                    : 'bg-white hover:bg-editorial-cream border-editorial-clay text-editorial-charcoal'
                }`}
                id={`schedule-day-tab-${day}`}
              >
                <span>{day.substring(0, 3)}</span>
                {dayCount > 0 && (
                  <span className="bg-editorial-cream text-editorial-charcoal text-[9px] rounded-full px-1 font-mono">
                    {dayCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Trigger to show add micro-session form */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full sm:w-auto px-3.5 py-1.5 bg-editorial-forest hover:bg-opacity-90 text-editorial-cream rounded text-xs font-sans uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 border border-editorial-charcoal cursor-pointer shadow-xs"
          id="toggle-schedule-form-btn"
        >
          <Plus size={14} />
          {showAddForm ? 'Close Scheduler Form' : 'Plan Micro-Session'}
        </button>
      </div>

      {/* Expandable Add Slot Form */}
      {showAddForm && (
        <form onSubmit={handleAddSession} className="bg-[#fcfdfa] border-2 border-editorial-charcoal p-5 rounded space-y-4 shadow-sm" id="schedule-creation-form">
          <div className="flex items-center gap-2 border-b border-editorial-clay pb-2">
            <Clock size={16} className="text-editorial-forest" />
            <h4 className="text-xs uppercase tracking-wider font-sans font-black text-editorial-charcoal">Block Out 30-Minute Hobby Segment</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Choose Day */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-sans tracking-wider font-black text-editorial-moss">Day of Week:</label>
              <select
                value={newDay}
                onChange={(e) => setNewDay(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-white border border-editorial-clay rounded text-xs focus:outline-hidden focus:border-editorial-charcoal font-sans font-bold"
                id="schedule-input-day"
              >
                {DAYS_OF_WEEK.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {/* Choose Time Slot */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-sans tracking-wider font-black text-editorial-moss">30-Min Micro Slot:</label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-editorial-clay rounded text-xs focus:outline-hidden focus:border-editorial-charcoal font-sans font-bold"
                id="schedule-input-time"
              >
                {TIME_SLOTS.map(times => (
                  <option key={times} value={times}>{times}</option>
                ))}
              </select>
            </div>

            {/* Choose Activity */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-sans tracking-wider font-black text-editorial-moss">Hobby Action:</label>
              <select
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-editorial-clay rounded text-xs focus:outline-hidden focus:border-editorial-charcoal font-sans font-bold"
                id="schedule-input-activity"
              >
                {STANDARD_ACTIVITIES.map(act => (
                  <option key={act.label} value={act.label}>{act.label}</option>
                ))}
                <option value="Custom">✍️ Custom Specific Goal</option>
              </select>
            </div>

            {/* Handle Custom Prompt */}
            {newActivity === 'Custom' && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-sans tracking-wider font-black text-editorial-moss">Type Custom Goal:</label>
                <input
                  type="text"
                  required
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                  placeholder="e.g. Scrape arm mold-lines"
                  className="w-full px-3 py-1.5 bg-white border border-editorial-clay rounded text-xs focus:outline-hidden focus:border-editorial-charcoal font-sans font-medium"
                  id="schedule-input-custom-activity"
                />
              </div>
            )}
          </div>

          {/* Activity Goal notes */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-sans tracking-wider font-black text-editorial-moss">Brief Objective / Notes (Optional):</label>
            <input
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="e.g. Assemble Necron leg bits slowly. Rest joints every 10 mins."
              className="w-full px-3 py-2 bg-white border border-editorial-clay rounded text-xs focus:outline-hidden focus:border-editorial-charcoal font-sans font-medium"
              id="schedule-input-notes"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-editorial-charcoal hover:bg-neutral-800 text-white rounded text-xs font-sans uppercase font-bold tracking-widest cursor-pointer shadow-xs"
            id="schedule-form-submit-btn"
          >
            Add To Block Schedule
          </button>
        </form>
      )}

      {/* Scheduled slots listings */}
      {sessions.filter(s => activeDay === 'All' || s.day === activeDay).length === 0 ? (
        <div className="text-center py-10 bg-[#fafafa]/50 border-2 border-dashed border-editorial-clay rounded-md">
          <Calendar className="mx-auto text-editorial-moss opacity-50 mb-2" size={32} />
          <h4 className="text-sm font-sans font-bold text-editorial-charcoal">No Micro-Sessions for {activeDay}</h4>
          <p className="text-xs text-editorial-moss font-serif italic mt-1 leading-relaxed max-w-sm mx-auto">
            Hobby blocks help prevent your miniatures from staying in the box. Choose a blueprint template above or plan your own slot.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="weekly-hobby-sessions-list">
          {sessions
            .filter(s => activeDay === 'All' || s.day === activeDay)
            .map(session => {
              const ActIcon = getActivityIcon(session.activity);
              const badgeColors = getActivityBadgeColor(session.activity);
              
              return (
                <div
                  key={session.id}
                  className={`border-2 rounded p-4 flex flex-col justify-between space-y-3 transition-all relative ${
                    session.isCompleted
                      ? 'bg-emerald-50/45 border-emerald-600/60 opacity-80 shadow-xs'
                      : 'bg-white border-editorial-clay hover:border-editorial-charcoal hover:shadow-2xs'
                  }`}
                  id={`schedule-session-card-${session.id}`}
                >
                  {/* Top Day, Time Slot & Completion Status */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1">
                      {/* Day and Time Badge */}
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-editorial-moss">
                        <Calendar size={10} />
                        {session.day} - <span className="text-editorial-charcoal">{session.timeSlot}</span>
                      </span>
                      
                      {/* Activity block */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded border text-[9px] font-sans font-black uppercase tracking-wider inline-flex items-center gap-1 ${badgeColors}`}>
                          <ActIcon size={10} className="stroke-[2.5]" />
                          {session.activity}
                        </span>
                      </div>
                    </div>

                    {/* Checkbox Trigger */}
                    <button
                      type="button"
                      onClick={() => handleToggleCompleted(session.id)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        session.isCompleted
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-editorial-clay hover:border-editorial-charcoal text-transparent'
                      }`}
                      title={session.isCompleted ? "Mark Uncompleted" : "Mark Micro Session Completed"}
                      id={`complete-session-${session.id}`}
                    >
                      <Check size={12} className="stroke-[3]" />
                    </button>
                  </div>

                  {/* Goal instructions notes */}
                  <div className="space-y-1">
                    <p className={`text-xs leading-relaxed font-serif ${session.isCompleted ? 'text-emerald-900 line-through-none' : 'text-editorial-charcoal'}`}>
                      {session.notes}
                    </p>
                  </div>

                  {/* Actions (Delete/Completed celebration stats) */}
                  <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-editorial-clay/50">
                    <div className="flex items-center gap-1 text-[8px] font-mono tracking-wider font-extrabold uppercase">
                      {session.isCompleted ? (
                        <span className="text-emerald-800 flex items-center gap-1">
                          <Trophy size={10} /> +30 MINS CONQUERED!
                        </span>
                      ) : (
                        <span className="text-[#856404] bg-[#fff3cd] border border-amber-200 px-1 rounded-xs">
                          30-MIN TARGET
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteSession(session.id)}
                      className="text-[9px] text-red-700 hover:text-red-950 hover:underline font-mono uppercase font-black cursor-pointer bg-transparent border-0 p-0"
                      title="Delete Scheduled Session"
                      id={`delete-session-${session.id}`}
                    >
                      <Trash2 size={11} className="inline mr-0.5" /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
