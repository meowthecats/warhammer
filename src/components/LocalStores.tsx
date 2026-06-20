import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Calendar, Star, Compass, ShieldAlert, Sliders, ExternalLink, Search, Check, RotateCcw, Trophy, CheckSquare, Square, Award } from 'lucide-react';
import { GameStore } from '../types';

interface Props {
  fontSizeFactor: number;
}

const LOCAL_STORES_MARYLAND: GameStore[] = [
  {
    id: 'play_more_games',
    name: 'Play More Games',
    city: 'Gaithersburg, MD',
    address: '42 Bureau Dr, Gaithersburg, MD 20878',
    distanceFromGermantownMiles: 6.2,
    phone: '(240) 801-9375',
    warhammerNight: 'Thursday Casual Tabletop & Open Hobby Socials',
    atmosphereRating: 'Incredibly Spacious, Laid-Back Vibe, Board Game & Miniatures Paradise',
    whyWelcomingToSeniors: 'Located in the Walnut Hill plaza with expansive, one-level strip mall parking right in front of the door. The store interior is exceptionally wide, bright, and uncluttered, with excellent wheelchair and walker clearance.',
    veteranTip: 'The owner, Rick, and staff are uniquely welcoming and happy to help you source specific games and paints. Drop by of an afternoon for a coffee-and-chat vibe with local hobbyists.',
    website: 'https://www.playmoregamestore.com',
    services: ['Game Nights', 'Painting Tables', 'Snacks & Coffee', 'Wheelchair Accessible'],
  },
  {
    id: 'warhammer_gaithersburg',
    name: 'Official Warhammer Store: Gaithersburg',
    city: 'Gaithersburg, MD',
    address: '119 Market St W, Gaithersburg, MD 20878',
    distanceFromGermantownMiles: 8.5,
    phone: '(301) 963-4530',
    warhammerNight: 'Wednesday Introductory Painting Classes & Saturday Open Battle Days',
    atmosphereRating: 'Hyper-Local, Direct Support, Beginner-First Oasis',
    whyWelcomingToSeniors: 'Nestled in Kentlands Town Square, perfect for combining a scenic walk or cafe coffee with your hobby checklist. The official store manager holds highly patient, slow-paced tutorials specifically structured for mature beginners with shaky hands.',
    veteranTip: 'Walk in empty-handed and request your "Battle Honours" checklist book. They will immediately build and paint a free test miniature with you at the community painting counter.',
    website: 'https://www.warhammer.com',
    services: ['Painting Tables', 'Game Nights', 'Beginner Tutorials'],
  },
  {
    id: 'dream_wizards',
    name: 'Dream Wizards',
    city: 'Rockville, MD',
    address: '11772 Parklawn Dr, Rockville, MD 20852',
    distanceFromGermantownMiles: 14.5,
    phone: '(301) 881-3530',
    warhammerNight: 'Thursdays (Casual League) & Saturday Open Play',
    atmosphereRating: 'Mature, Spacious, and Hobby-First',
    whyWelcomingToSeniors: 'Dream Wizards is a legendary venue in Maryland and contains a highly diverse, older adult cohort. The playing floor is vast, well-lit, and wheelchair accessible, with zero cramming in corridors.',
    veteranTip: 'Ask the staff about their casual 40k Thursday campaigns. It is a slow-paced bracket ideal for meeting local Montgomery County hobbyists.',
    website: 'https://www.dreamwizards.com',
    services: ['Game Nights', 'Painting Tables', 'Wheelchair Accessible'],
  },
  {
    id: 'dice_city',
    name: 'Dice City Games',
    city: 'Silver Spring, MD',
    address: '11130 Georgia Ave, Silver Spring, MD 20902',
    distanceFromGermantownMiles: 17.8,
    phone: '(301) 933-2882',
    warhammerNight: 'Wednesdays (Escalation League) & Sundays Casuals',
    atmosphereRating: 'Ultra-Welcoming, Inclusive, and Cozy',
    whyWelcomingToSeniors: 'Dice City is renowned for its kindness toward absolute beginners. They run "Escalation Leagues" where you paint 250 points, play a beginner game, and slowly increase the army over weeks.',
    veteranTip: 'Parking in the rear is easiest. If you tell their community coordinator you are a brand new 50+ Necron collector, they will match you with a experienced teaching referee.',
    website: 'https://www.dicecitygames.com',
    services: ['Game Nights', 'Beginner Tutorials'],
  },
  {
    id: 'hobbytown_frederick',
    name: 'HobbyTown Frederick',
    city: 'Frederick, MD',
    address: '1306 W Patrick St, Frederick, MD 21703',
    distanceFromGermantownMiles: 19.5,
    phone: '(301) 694-7395',
    warhammerNight: 'Tuesday Hobby nights & Friday Casual Miniatures',
    atmosphereRating: 'Family-Friendly, Tool Heaven, Unpretentious',
    whyWelcomingToSeniors: 'Combines scale airplanes, trains, and Warhammer into a single layout. The staff are experts in basic modeling, sprue assembly, and non-branded budget paints.',
    veteranTip: 'They stock the complete drawer of Vallejo Model Color paints ($4.50/pot) and cheap plastic cement. You can get your entire list of budget tools in-store in a single afternoon.',
    website: 'https://www.hobbytown.com/frederick-md/',
    services: ['Painting Tables', 'Game Nights', 'Beginner Tutorials'],
  },
  {
    id: 'gritty_goblin',
    name: 'Gritty Goblin Games',
    city: 'Fulton, MD',
    address: '8110 Maple Lawn Blvd, Fulton, MD 20759',
    distanceFromGermantownMiles: 25.5,
    phone: '(301) 490-6710',
    warhammerNight: 'Thursday Open Table Miniatures & Sunday Casuals',
    atmosphereRating: 'Spacious, Upscale Tavern Aesthetic, Cozy Cafe Feel',
    whyWelcomingToSeniors: 'Features gorgeous, wide custom wood tables, excellent lighting, comfortable seating, and an in-house coffee bar serving refreshments and craft sodas. The store structure resembles a custom library/pub and heavily caters to casual, narrative-driven adult hobbyists.',
    veteranTip: 'The venue is incredibly spacious and parking is abundant. They carry a fantastic selection of coffee and snacks—it is by far the most relaxed, upscale tabletop environment in the region for a mature hobbyist looking to chat and paint.',
    website: 'https://grittygoblingames.com',
    services: ['Game Nights', 'Painting Tables', 'Snacks & Coffee', 'Wheelchair Accessible'],
  },
  {
    id: 'game_haven',
    name: 'Game Haven',
    city: 'Sykesville, MD',
    address: '1313-A Liberty Rd, Sykesville, MD 21784',
    distanceFromGermantownMiles: 24.5,
    phone: '(410) 549-4263',
    warhammerNight: 'Saturdays Casual Matches & Campaign Play',
    atmosphereRating: 'Community-Focused, Nostalgic, Large Selection',
    whyWelcomingToSeniors: 'Extremely spacious layout with dedicated custom miniatures tables in the back. Famously friendly shop owners who help newcomers build local connections.',
    veteranTip: 'They have an active local Discord server with coordinates for matching games. Perfect to schedule your matches in advance!',
    website: 'https://gamehavenmd.com',
    services: ['Game Nights', 'Painting Tables'],
  },
  {
    id: 'game_kastle_cp',
    name: 'Game Kastle College Park',
    city: 'College Park, MD',
    address: '4728 Cherry Hill Rd, College Park, MD 20740',
    distanceFromGermantownMiles: 29.8,
    phone: '(301) 982-1130',
    warhammerNight: 'Sundays Miniatures Open Play & Painting Circles',
    atmosphereRating: 'Vast Playing Floor, Vibrant, Expert Model Stock',
    whyWelcomingToSeniors: 'It is a huge, modern, clean venue with dozens of spacious tables and top-tier lighting. They carry an unparalleled selection of specialized hobby paints, synthetic/sable brushes, and modeling tools.',
    veteranTip: 'Ask about their community painting tables—you can often sit down and paint alongside hobby veterans who will gladly give you hands-on advice on thinning your silvers and washing your Necrons.',
    website: 'https://gamekastle.com',
    services: ['Painting Tables', 'Game Nights', 'Beginner Tutorials'],
  },
  {
    id: 'warhammer_bowie',
    name: 'Official Warhammer Store: Bowie',
    city: 'Bowie, MD',
    address: '15467 Excelsior Dr, Bowie, MD 20716',
    distanceFromGermantownMiles: 33.5,
    phone: '(301) 805-4923',
    warhammerNight: 'Wednesday Introductory Classes & Weekend Battles',
    atmosphereRating: 'Deeply Educational, Games Workshop Official',
    whyWelcomingToSeniors: 'As an official retail store, they are explicitly trained to guide beginners of all age classes. You get a completely free single miniature and a free painting lesson on your first walk-in!',
    veteranTip: 'Visiting Bowie is incredible to practice specialized painting tips with an official licensed design coach.',
    website: 'https://www.warhammer.com',
    services: ['Painting Tables', 'Game Nights', 'Beginner Tutorials'],
  },
  {
    id: 'games_and_stuff',
    name: 'Games & Stuff',
    city: 'Glen Burnie, MD',
    address: '7385 Baltimore Annapolis Blvd, Glen Burnie, MD 21061',
    distanceFromGermantownMiles: 41.5,
    phone: '(410) 863-7418',
    warhammerNight: 'Saturdays Big Battle Campaigns & Open Tables',
    atmosphereRating: 'Mega-Store, Highly Diverse, Absolute Hobby Oasis',
    whyWelcomingToSeniors: 'Known as one of the largest tabletop game stores in the entire country! It boasts a jaw-dropping gaming hall with premium terrain and custom mats. They are welcoming of mature cohorts and run spectacular beginner-friendly narrative events.',
    veteranTip: 'Make it a Saturday day-trip. The colossal sheer quantity of hobby supplies, board games, and custom paint brands they stock makes it an unforgettable pilgrimage.',
    website: 'https://gamesandstuffonline.com',
    services: ['Game Nights', 'Painting Tables'],
  },
  {
    id: 'third_eye_annapolis',
    name: 'Third Eye Games & Hobbies',
    city: 'Annapolis, MD',
    address: '2092 West St #6, Annapolis, MD 21401',
    distanceFromGermantownMiles: 54.8,
    phone: '(410) 252-1844',
    warhammerNight: 'Fridays Combat Patrol & Painting Clashes',
    atmosphereRating: 'Pop Culture Hub, Enthusiastic, Stunning Aesthetics',
    whyWelcomingToSeniors: 'Part of the famous "Third Eye" family, this store is incredibly clean, brightly lit, and meticulously organized. The staff has dedicated hobby specialists who love walking newcomers through assembly.',
    veteranTip: 'The parking is excellent and it is in a fantastic part of Annapolis. If you love comics, their sister comic shop is right next door. Combine both for a great weekend venture!',
    website: 'https://thirdeyecomics.com',
    services: ['Game Nights', 'Painting Tables', 'Beginner Tutorials'],
  },
];

export default function LocalStores({ fontSizeFactor }: Props) {
  const [maxDistance, setMaxDistance] = useState<number>(40);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  // Visited Stores Log state loaded from/saved to localStorage
  const [visitedStores, setVisitedStores] = useState<Record<string, { gameNight: boolean; paintingSession: boolean }>>(() => {
    try {
      const saved = localStorage.getItem('necron_store_visits');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('necron_store_visits', JSON.stringify(visitedStores));
    } catch (e) {
      console.error('Failed to save store visits', e);
    }
  }, [visitedStores]);

  const handleToggleVisit = (storeId: string, type: 'gameNight' | 'paintingSession') => {
    setVisitedStores(prev => {
      const current = prev[storeId] || { gameNight: false, paintingSession: false };
      const updated = {
        ...current,
        [type]: !current[type]
      };
      
      const copy = { ...prev };
      if (!updated.gameNight && !updated.paintingSession) {
        delete copy[storeId];
      } else {
        copy[storeId] = updated;
      }
      return copy;
    });
  };

  // Available services list for toggling filters
  const ALL_SERVICES = [
    'Game Nights',
    'Painting Tables',
    'Beginner Tutorials',
    'Snacks & Coffee',
    'Wheelchair Accessible'
  ];

  const handleToggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleResetFilters = () => {
    setMaxDistance(40);
    setSelectedServices([]);
    setSearchQuery('');
  };

  // Filter stores based on distance, selected services, and search query
  const filteredStores = LOCAL_STORES_MARYLAND.filter((store) => {
    // 1. Distance filter
    if (store.distanceFromGermantownMiles > maxDistance) return false;

    // 2. Services filter (must contain all selected services)
    if (selectedServices.length > 0) {
      const storeServices = store.services || [];
      const hasAll = selectedServices.every(s => storeServices.includes(s));
      if (!hasAll) return false;
    }

    // 3. Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = store.name.toLowerCase().includes(query);
      const matchCity = store.city.toLowerCase().includes(query);
      const matchAddress = store.address.toLowerCase().includes(query);
      const matchServices = store.services?.some(s => s.toLowerCase().includes(query)) || false;
      const matchAtmosphere = store.atmosphereRating.toLowerCase().includes(query);
      if (!matchName && !matchCity && !matchAddress && !matchServices && !matchAtmosphere) return false;
    }

    return true;
  });

  const hasActiveFilters = maxDistance !== 40 || selectedServices.length > 0 || searchQuery !== '';

  return (
    <div className="space-y-8 animate-fade-in text-editorial-charcoal">
      {/* Intro geography panel */}
      <div className="border-2 border-editorial-charcoal bg-editorial-paper p-6 rounded shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Compass size={140} className="text-editorial-forest" />
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold text-editorial-charcoal flex items-center gap-2 mb-2">
            <MapPin className="text-editorial-forest" />
            Maryland Tabletop Match Finder (Germantown, MD Region)
          </h3>
          <p className="text-editorial-charcoal font-serif text-sm leading-relaxed max-w-3xl" style={{ fontSize: `${0.95 * fontSizeFactor}rem` }}>
            Germantown, MD enjoys perfect Maryland geography. From Interstate 270, you are uniquely situated within exactly **15 miles of Rockville's premier gaming halls** and **20 miles of Frederick's bustling boardgame culture**. This provides double options for mature hobbyist tables.
          </p>
        </div>
      </div>

      {/* Personal Visit Log & Campaign Progress */}
      <div className="border-2 border-editorial-charcoal bg-[#fdfdfc] p-6 rounded shadow-xs space-y-4" id="personal-visit-log-tracker">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-editorial-charcoal pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="text-editorial-forest shrink-0" size={20} />
            <div>
              <h4 className="text-sm uppercase font-sans tracking-widest font-black text-editorial-charcoal">Hobbyist Campaign & Visit Log</h4>
              <p className="text-[10px] text-editorial-moss font-serif italic">Track your local gaming hall pilgrimages and hobby events</p>
            </div>
          </div>
          <div className="bg-editorial-cream text-editorial-charcoal border border-editorial-charcoal rounded px-3 py-1 font-sans text-xs font-bold text-right self-start sm:self-auto">
            Campaign Rank: <span className="text-editorial-forest uppercase tracking-wider font-extrabold">{(() => {
              const visitCount = Object.keys(visitedStores).length;
              if (visitCount === 0) return "Couch Strategist";
              if (visitCount <= 2) return "Vanguard Scout";
              if (visitCount <= 5) return "Sector Skirmisher";
              if (visitCount <= 8) return "Veteran Commando";
              return "Grand Sector Overlord";
            })()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Indicators */}
          <div className="bg-editorial-cream/40 border border-editorial-clay p-4 rounded flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.10em] font-black text-editorial-moss">OVERALL DISCOVERY PROGRESS</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-sans font-black text-editorial-charcoal">
                  {Object.keys(visitedStores).length}
                </span>
                <span className="text-xs font-sans font-bold text-editorial-moss">/ {LOCAL_STORES_MARYLAND.length} stores visited</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-editorial-clay h-2.5 rounded-full overflow-hidden border border-editorial-charcoal">
                <div 
                  className="bg-editorial-forest h-full transition-all duration-500" 
                  style={{ width: `${(Object.keys(visitedStores).length / LOCAL_STORES_MARYLAND.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-editorial-moss">
                <span>0% START</span>
                <span>{Math.round((Object.keys(visitedStores).length / LOCAL_STORES_MARYLAND.length) * 100)}% CONQUERED</span>
              </div>
            </div>
          </div>

          {/* Activity Breakdown */}
          <div className="bg-editorial-cream/40 border border-editorial-clay p-4 rounded space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.10em] font-black text-editorial-moss block">VISITATION BREAKDOWN</span>
            
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center text-xs font-serif">
                <span className="flex items-center gap-1.5 text-editorial-moss">
                  <span className="w-2.5 h-2.5 bg-editorial-forest rounded-sm" /> 
                  Game Night Outings:
                </span>
                <strong className="font-sans font-black bg-white border border-editorial-clay px-2 py-0.5 rounded text-editorial-charcoal">
                  {Object.values(visitedStores).filter((v: any) => v.gameNight).length}
                </strong>
              </div>
              
              <div className="flex justify-between items-center text-xs font-serif">
                <span className="flex items-center gap-1.5 text-editorial-moss">
                  <span className="w-2.5 h-2.5 bg-editorial-moss rounded-sm" /> 
                  Painting Tables Sessions:
                </span>
                <strong className="font-sans font-black bg-white border border-editorial-clay px-2 py-0.5 rounded text-editorial-charcoal">
                  {Object.values(visitedStores).filter((v: any) => v.paintingSession).length}
                </strong>
              </div>

              <p className="text-[9px] text-editorial-moss leading-tight italic pt-1">
                *Check off checkboxes on individual store cards below when you hang out or play there!
              </p>
            </div>
          </div>

          {/* Recent Recon Records / Quick list */}
          <div className="bg-editorial-cream/40 border border-editorial-clay p-4 rounded space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.10em] font-black text-editorial-moss block">VISITED GARRISONS</span>
              
              {Object.keys(visitedStores).length === 0 ? (
                <p className="text-xs text-editorial-moss italic font-serif pt-2 leading-relaxed">
                  No registered scouts yet. Click "Inspected Tables" or "Attended Battles" on any store card below to register your journey.
                </p>
              ) : (
                <div className="max-h-[85px] overflow-y-auto space-y-1.5 pr-1 mt-1 font-sans text-xs scrollbar-thin">
                  {LOCAL_STORES_MARYLAND.filter(store => visitedStores[store.id]).map(store => {
                    const visit = visitedStores[store.id];
                    return (
                      <div key={store.id} className="flex items-center justify-between bg-white px-2 py-1 rounded border border-editorial-clay">
                        <div className="truncate pr-2">
                          <span className="font-bold text-editorial-charcoal truncate block max-w-[120px]">{store.name}</span>
                          <span className="text-[9px] text-editorial-moss block font-serif">
                            {[visit.gameNight && 'Game Night', visit.paintingSession && 'Painting'].filter(Boolean).join(' & ')}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setVisitedStores(prev => {
                              const copy = { ...prev };
                              delete copy[store.id];
                              return copy;
                            });
                          }}
                          className="text-[9px] text-red-700 hover:text-red-950 hover:underline font-mono uppercase font-black cursor-pointer bg-transparent border-0 p-0"
                          title="Remove from Visit Log"
                        >
                          Clear
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Integrated Search & Filter Hub */}
      <div className="bg-editorial-paper border-2 border-editorial-charcoal p-6 rounded space-y-6 shadow-sm" id="store-filter-hub">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-editorial-clay pb-4">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-editorial-forest" />
            <h4 className="text-sm uppercase font-sans tracking-wider font-extrabold text-editorial-charcoal">Store Search & Filter Hub</h4>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-editorial-cream border border-editorial-charcoal text-xs font-sans uppercase tracking-[0.05em] font-bold rounded transition-colors"
              id="reset-stores-filter-btn"
            >
              <RotateCcw size={12} />
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Text Search & Distance Input */}
          <div className="space-y-4">
            {/* Plain Search Field */}
            <div className="space-y-1.5">
              <label htmlFor="search-input" className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss block">
                Search By Name, City, or Service:
              </label>
              <div className="flex items-center gap-2 bg-white border-2 border-editorial-charcoal rounded px-3 py-2 w-full shadow-xs">
                <Search size={15} className="text-editorial-moss shrink-0" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="e.g. Paint Tables, Game Nights, Frederick, Gaithersburg..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-editorial-charcoal focus:outline-hidden"
                />
              </div>
            </div>

            {/* Slider container */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-sans tracking-wider font-bold">
                <span className="text-editorial-moss">Distance limit:</span>
                <span className="text-editorial-forest font-black bg-editorial-cream px-2 py-0.5 rounded border border-editorial-clay">
                  Within {maxDistance} miles
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs font-sans text-editorial-moss font-bold">10mi</span>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full h-1 bg-editorial-clay rounded-lg appearance-none cursor-pointer accent-editorial-forest"
                  aria-label="Filter stores by maximum distance in miles"
                />
                <span className="text-xs font-sans text-editorial-moss font-bold">60mi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Toggleable Service offered capsules */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-sans tracking-wider font-bold text-editorial-moss block">
              Filter By Services Offered (All Checked Must Match):
            </span>
            
            <div className="flex flex-wrap gap-2 pt-1" id="filter-service-capsules-box">
              {ALL_SERVICES.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleToggleService(service)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-sans font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-editorial-forest text-editorial-cream border-editorial-charcoal shadow-xs'
                        : 'bg-white text-editorial-moss border-editorial-clay hover:border-editorial-charcoal hover:bg-editorial-cream/30'
                    }`}
                    id={`filter-service-pill-${service.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {isSelected && <Check size={12} className="stroke-[3px]" />}
                    <span>{service}</span>
                  </button>
                );
              })}
            </div>
            
            <p className="text-[11px] text-editorial-moss font-serif italic pt-2 leading-relaxed">
              *Choose 'Painting Tables' or 'Game Nights' to quickly sort spaces with dedicated hobby setup tables.
            </p>
          </div>
        </div>
      </div>

      {/* Beginner-Friendly Quick Reference Directory & Legend */}
      <div className="bg-[#fcfdfa] border-2 border-editorial-charcoal p-5 rounded space-y-4 shadow-xs" id="beginner-friendly-directory">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-editorial-clay pb-3 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg bg-editorial-cream border border-editorial-clay p-1 rounded">🔰</span>
            <div>
              <h4 className="text-sm uppercase font-sans tracking-widest font-black text-editorial-charcoal">Academy Directives: Beginner-Friendly Status</h4>
              <p className="text-[10px] text-editorial-moss font-serif italic">Green badges identify veteran guilds offering hands-on "Beginner Tutorials"</p>
            </div>
          </div>
          <div className="bg-editorial-cream border border-editorial-clay rounded px-2.5 py-0.5 font-sans text-[10px] font-bold text-editorial-forest self-start sm:self-auto">
            {LOCAL_STORES_MARYLAND.filter(s => s.services?.includes('Beginner Tutorials')).length} / {LOCAL_STORES_MARYLAND.length} Welcoming Garrisons
          </div>
        </div>

        {/* Visual interactive list mapping all stores */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {LOCAL_STORES_MARYLAND.map(store => {
            const isBeginnerFriendly = store.services?.includes('Beginner Tutorials');
            const isSelected = selectedStore === store.id;
            
            return (
              <button
                key={store.id}
                type="button"
                onClick={() => {
                  setSelectedStore(isSelected ? null : store.id);
                  setTimeout(() => {
                    const element = document.getElementById(`store-card-${store.id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 50);
                }}
                className={`p-2.5 rounded border text-left flex flex-col justify-between h-full transition-all text-xs cursor-pointer ${
                  isSelected 
                    ? 'bg-editorial-cream border-editorial-charcoal shadow-inner ring-1 ring-editorial-charcoal' 
                    : isBeginnerFriendly 
                    ? 'bg-[#f4faf5] border-[#b8dfbe] hover:border-[#2e5d31] hover:bg-[#ebf5ec]' 
                    : 'bg-white border-editorial-clay/60 hover:border-editorial-charcoal hover:bg-editorial-cream/35'
                }`}
                id={`beginner-marker-btn-${store.id}`}
              >
                <div className="flex items-start gap-1 justify-between w-full">
                  <span className="font-sans font-black text-editorial-charcoal leading-tight truncate block max-w-[120px] sm:max-w-[180px]">
                    {store.name}
                  </span>
                  <span className="shrink-0 text-xs text-right" title={isBeginnerFriendly ? "Beginner Friendly" : "Standard Vibe"}>
                    {isBeginnerFriendly ? "🔰" : "⚪"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between w-full mt-2 pt-1.5 border-t border-dashed border-editorial-clay/40 text-[9px] text-editorial-moss font-mono">
                  <span className="tracking-tight font-bold">{store.city.split(',')[0]}</span>
                  {isBeginnerFriendly ? (
                    <span className="text-[#134914] bg-[#dbf5df] border border-[#aadeb2] px-1 rounded-sm uppercase font-sans font-black text-[8px] tracking-wider scale-95 origin-right">
                      Friendly
                    </span>
                  ) : (
                    <span className="text-slate-600 bg-slate-100 border border-slate-200 px-1 rounded-sm uppercase font-sans font-medium text-[8px] tracking-wider scale-95 origin-right">
                      Standard
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stores list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="stores-filtered-results-grid">
        {filteredStores.map((store) => {
          const isToggled = selectedStore === store.id;
          return (
            <div
              key={store.id}
              onClick={() => setSelectedStore(isToggled ? null : store.id)}
              className={`p-5 rounded border-2 transition-all cursor-pointer relative ${
                isToggled
                  ? 'bg-editorial-paper border-editorial-charcoal shadow-sm'
                  : 'bg-editorial-cream/40 border-editorial-clay hover:border-editorial-charcoal'
              }`}
              id={`store-card-${store.id}`}
            >
              <div className="space-y-4">
                {/* Store Header */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-sans font-bold text-editorial-forest uppercase tracking-wider block mb-1">
                      {store.city} ({store.distanceFromGermantownMiles} miles)
                    </span>
                    <h4 className="font-serif font-bold text-editorial-charcoal text-base sm:text-lg">{store.name}</h4>
                  </div>

                  {/* Vibe rating badge & Visited Stamp */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-1 bg-editorial-cream px-2 py-1 rounded border border-editorial-clay">
                      <Star size={10} className="text-editorial-forest fill-editorial-forest" />
                      <span className="text-[9px] text-editorial-charcoal font-bold font-sans uppercase tracking-wider">Mature Vibe</span>
                    </div>

                    {store.services?.includes('Beginner Tutorials') && (
                      <div 
                        className="flex items-center gap-1 bg-[#f4faf5] text-[#134914] border border-[#aadeb2] px-1.5 py-0.5 rounded uppercase font-sans text-[8px] font-black tracking-wider shadow-2xs"
                        title="Offers Beginner Tutorials & Training Tables"
                      >
                        <span>🔰 BEGINNER FRIENDLY</span>
                      </div>
                    )}

                    {(visitedStores[store.id]?.gameNight || visitedStores[store.id]?.paintingSession) && (
                      <div 
                        className="flex items-center gap-1 bg-emerald-50 text-[#1e4620] border border-[#2e5d31] px-1.5 py-0.5 rounded uppercase font-mono text-[8px] font-black tracking-widest shadow-xs animate-pulse"
                        title="Personally Visited"
                      >
                        <Check size={9} className="stroke-[3px]" />
                        <span>VISITED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main coordinates */}
                <div className="space-y-2 text-xs text-editorial-charcoal font-serif border-b border-editorial-clay pb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-editorial-forest" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-editorial-forest" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-editorial-forest" />
                    <span className="font-serif">Focus Event: <strong className="text-editorial-charcoal font-sans uppercase tracking-wider text-[11px] block sm:inline">{store.warhammerNight}</strong></span>
                  </div>
                </div>

                {/* Offerings service tags bar */}
                {store.services && store.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {store.services.map((service) => {
                      const isFilterActive = selectedServices.includes(service);
                      return (
                        <span
                          key={service}
                          className={`text-[10px] uppercase font-sans font-extrabold tracking-wider px-2.5 py-0.5 rounded border transition-all ${
                            isFilterActive
                              ? 'bg-editorial-forest text-editorial-cream border-editorial-charcoal'
                              : 'bg-white text-editorial-moss border-editorial-clay'
                          }`}
                        >
                          {service}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Personal Visit Logger Box */}
                <div 
                  className="bg-editorial-cream border border-editorial-clay rounded p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-inner"
                  onClick={(e) => e.stopPropagation()} // Prevent toggling the layout expansion of the card
                  id={`visit-log-box-${store.id}`}
                >
                  <span className="text-[10px] font-sans uppercase tracking-wider font-extrabold text-editorial-moss flex items-center gap-1 text-left">
                    <Award size={12} className="text-editorial-forest" />
                    My Visit Record:
                  </span>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-sans font-bold">
                    {/* Game Night Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVisit(store.id, 'gameNight');
                      }}
                      className="flex items-center gap-1.5 text-editorial-charcoal hover:text-editorial-forest select-none transition-colors cursor-pointer bg-transparent border-0 p-0"
                      id={`visit-gamenight-${store.id}`}
                    >
                      {visitedStores[store.id]?.gameNight ? (
                        <CheckSquare size={15} className="text-editorial-forest shrink-0" />
                      ) : (
                        <Square size={15} className="text-editorial-moss shrink-0" />
                      )}
                      <span>Attended Battles</span>
                    </button>

                    {/* Painting Session Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVisit(store.id, 'paintingSession');
                      }}
                      className="flex items-center gap-1.5 text-editorial-charcoal hover:text-editorial-forest select-none transition-colors cursor-pointer bg-transparent border-0 p-0"
                      id={`visit-paint-${store.id}`}
                    >
                      {visitedStores[store.id]?.paintingSession ? (
                        <CheckSquare size={15} className="text-editorial-forest shrink-0" />
                      ) : (
                        <Square size={15} className="text-editorial-moss shrink-0" />
                      )}
                      <span>Inspected Tables</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Details section */}
                <div className={`space-y-3 transition-all duration-300 overflow-hidden ${
                  isToggled ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-1">
                    <span className="text-[10px] text-editorial-forest font-sans block uppercase tracking-wider font-bold">Community Culture Atmosphere:</span>
                    <p className="text-xs text-editorial-charcoal font-sans font-bold">{store.atmosphereRating}</p>
                  </div>

                  <div className="space-y-1 bg-editorial-cream p-2.5 rounded border border-editorial-clay">
                    <span className="text-[10px] text-editorial-forest font-sans block uppercase tracking-wider font-bold mb-1">Why It's Welcoming to Over-50s:</span>
                    <p className="text-xs text-editorial-moss font-serif leading-relaxed" style={{ fontSize: `${0.85 * fontSizeFactor}rem` }}>
                      {store.whyWelcomingToSeniors}
                    </p>
                  </div>

                  <div className="space-y-1 bg-editorial-cream p-2.5 rounded border border-editorial-clay">
                    <span className="text-[10px] text-editorial-forest font-sans block uppercase tracking-wider font-bold mb-1">Local Veteran Insider Tip:</span>
                    <p className="text-xs text-editorial-moss font-serif leading-relaxed italic" style={{ fontSize: `${0.85 * fontSizeFactor}rem` }}>
                      "{store.veteranTip}"
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-editorial-forest hover:underline font-sans uppercase tracking-wider font-bold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Store Online <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                {/* Touch hint arrow */}
                <div className="text-center text-[9px] text-editorial-moss pt-1 font-sans uppercase tracking-wider font-bold hover:text-editorial-charcoal">
                  {isToggled ? 'Click to collapse details' : 'Click to inspect schedules and reviews'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Radius safety advice */}
      {filteredStores.length === 0 && (
        <div className="text-center p-8 bg-editorial-paper border-2 border-editorial-charcoal rounded">
          <p className="text-sm text-editorial-moss italic font-serif">No community venues match the set distance radius.</p>
        </div>
      )}

      {/* Joint match tips */}
      <div className="border-2 bg-editorial-paper border-editorial-charcoal p-6 rounded max-w-4xl mx-auto space-y-4 shadow-sm">
        <h4 className="text-md font-sans uppercase tracking-wider font-bold text-editorial-forest flex items-center gap-2">
          <ShieldAlert size={16} className="text-editorial-forest" /> Outing Checklist: Joining the Club Environment
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-editorial-charcoal font-serif">
          <div className="space-y-1">
            <strong className="text-editorial-charcoal font-sans uppercase tracking-wider text-xs block mb-1">1. Walk-In First</strong>
            <span className="leading-relaxed text-editorial-moss text-xs">Do not pack your products straight away. Visit empty-handed during a game night first to browse, chat with the manager, observe table spacing, and gauge the store volume level.</span>
          </div>
          <div className="space-y-1">
            <strong className="text-editorial-charcoal font-sans uppercase tracking-wider text-xs block mb-1">2. Introduce Yourself</strong>
            <span className="leading-relaxed text-editorial-moss text-xs">Tabletop gamers are extremely eager to welcome new blood. Tell them, "I am a new player building a budget Necron force." They will usually pull up a seat and run down an active game state for you.</span>
          </div>
          <div className="space-y-1">
            <strong className="text-editorial-charcoal font-sans uppercase tracking-wider text-xs block mb-1">3. Support Local Store</strong>
            <span className="leading-relaxed text-editorial-moss text-xs">These shops provide hundreds of square feet of climate-controlled gaming tables for free. When visiting, try to buy a paint pot, a brush packet, or your next miniature set from them to fund their space.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
