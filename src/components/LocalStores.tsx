import React, { useState } from 'react';
import { MapPin, Phone, Calendar, Star, Compass, ShieldAlert, Sliders, ExternalLink } from 'lucide-react';
import { GameStore } from '../types';

interface Props {
  fontSizeFactor: number;
}

const LOCAL_STORES_MARYLAND: GameStore[] = [
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
  },
  {
    id: 'brainstorm_frederick',
    name: 'Brainstorm Comics and Games',
    city: 'Frederick, MD',
    address: '10 N Market St, Frederick, MD 21701',
    distanceFromGermantownMiles: 20.2,
    phone: '(301) 662-1300',
    warhammerNight: 'Thursdays Skirmishes & Board Game Socials',
    atmosphereRating: 'Downtown vibe, Narrative-Focused, Community Active',
    whyWelcomingToSeniors: 'Located right in historic downtown Frederick. Perfect to coordinate with a lunch date. The staff and patrons focus heavily on roleplay, lore, and visual narrative rather than ruthless tournament competition.',
    veteranTip: 'After browsing, walk down to one of the adjacent historic Frederick coffee houses. It is a wonderful community outing to combine with the modeling hobby.',
    website: 'https://www.brainstormcomics.com',
  },
  {
    id: 'warhammer_bowie',
    name: 'Official Warhammer Store: Bowie',
    city: 'Rockville, MD', // closest catalog region within slightly larger radius
    address: '15467 Excelsior Dr, Bowie, MD 20716',
    distanceFromGermantownMiles: 33.5, // slightly outside 30mi but critical official hub
    phone: '(301) 805-4923',
    warhammerNight: 'Wednesday Introductory Classes & Weekend Battles',
    atmosphereRating: 'Deeply Educational, Games Workshop official',
    whyWelcomingToSeniors: 'As an official retail store, they are explicitly trained to guide beginners of all age classes. You get a **completely free single miniature** and a free painting lesson on your first walk-in!',
    veteranTip: 'While slightly over our 30-mile preference (~33 miles down route 50), visiting Bowie once is incredible to practice painting tips with a GW professional coach.',
    website: 'https://www.warhammer.com',
  },
];

export default function LocalStores({ fontSizeFactor }: Props) {
  const [maxDistance, setMaxDistance] = useState<number>(30);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  // Filter stores
  const filteredStores = LOCAL_STORES_MARYLAND.filter(
    (store) => store.distanceFromGermantownMiles <= maxDistance
  );

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

      {/* Radius slider control */}
      <div className="bg-editorial-paper border-2 border-editorial-charcoal p-5 rounded space-y-4 max-w-2xl shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-xs text-editorial-moss uppercase font-sans font-bold flex items-center gap-2">
            <Sliders size={14} className="text-editorial-forest" /> Distance from Germantown:
          </span>
          <span className="font-sans text-editorial-forest font-bold border border-editorial-charcoal px-2 py-0.5 rounded bg-editorial-cream text-xs">
            Within {maxDistance} miles
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-editorial-moss font-bold font-sans">10mi</span>
          <input
            type="range"
            min="10"
            max="35"
            step="5"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full h-1 bg-editorial-clay rounded-lg appearance-none cursor-pointer accent-editorial-forest"
            aria-label="Filter stores by maximum distance in miles"
          />
          <span className="text-xs text-editorial-moss font-bold font-sans">35mi</span>
        </div>

        <p className="text-[11px] text-editorial-moss font-serif italic">
          *Germantown local transport is simple: Route 355 or I-270 gets you to Rockville south and Frederick north in under 22 minutes off-peak.
        </p>
      </div>

      {/* Stores list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  {/* Vibe rating badge */}
                  <div className="flex items-center gap-1 bg-editorial-cream px-2 py-1 rounded border border-editorial-clay">
                    <Star size={10} className="text-editorial-forest fill-editorial-forest" />
                    <span className="text-[9px] text-editorial-charcoal font-bold font-sans uppercase tracking-wider">Mature Vibe</span>
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
