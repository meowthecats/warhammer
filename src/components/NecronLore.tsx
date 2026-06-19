import React from 'react';
import { Shield, Sparkles, Zap, Award, Flame, Star } from 'lucide-react';

interface Props {
  fontSizeFactor: number;
}

export default function NecronLore({ fontSizeFactor }: Props) {
  return (
    <div className="space-y-8 animate-fade-in text-editorial-charcoal">
      {/* Necron Banner */}
      <div className="relative border-2 border-editorial-charcoal bg-editorial-paper p-6 sm:p-8 rounded shadow-sm min-h-[220px] flex flex-col justify-end">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Flame size={180} className="text-editorial-forest" />
        </div>
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-editorial-forest text-editorial-cream rounded mb-3">
            <Star size={12} className="fill-current" />
            <span className="text-[10px] font-sans tracking-widest uppercase font-bold">HISTORIC CHRONICLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-editorial-charcoal tracking-tight mb-2">
            The Undying Legions
          </h2>
          <p className="text-editorial-forest italic font-serif text-sm max-w-2xl leading-relaxed">
            "We slept for sixty million years. The galaxy is ours by right. Let these fleshy interlopers kneel before the undying dynasties."
          </p>
        </div>
      </div>

      {/* Main Lore Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lore Background Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b-2 border-editorial-charcoal pb-1">
            <h3 className="text-2xl font-serif font-bold text-editorial-charcoal tracking-tight flex items-center gap-2">
              Who are the Necrons?
            </h3>
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#7da481] font-bold">Origins of the Cosmic Sovereigns</p>
          </div>
          
          <div className="space-y-4 text-editorial-charcoal font-serif leading-relaxed text-sm sm:text-base" style={{ fontSize: `${1 * fontSizeFactor}rem` }}>
            <p>
              Before the modern species of the galaxy even crawled out of primordial oceans, there existed a tragic, proud race known as the <strong>Necrontyr</strong>. Plagued by shortened, cancer-ridden lives due to the harsh radiation of their star, they sought immortality from god-like cosmic beings called the <strong>C'tan</strong>.
            </p>
            <p>
              In a grand tragedy known as the <strong>Biotransference</strong>, the Necrontyr exchanged their frail, diseased organic bodies for skeletal cybernetic chassis made of self-repairing living metal (Necrodermis). The cost: their souls were devoured by the C'tan, turning the standard military ranks into mindless, obedient machines.
            </p>
            <p>
              Having turned on their star-god captors and shattered them into enslaved fragments, the Necrons buried themselves in grand vault networks known as <strong>Tomb Worlds</strong>. After 60 million years of subterranean slumber, they are finally waking up—restoring their ancient, pharaonic hierarchies and driving back any species foolish enough to occupy their world.
            </p>
          </div>

          {/* Core Dynasties */}
          <h4 className="text-lg font-serif font-bold text-editorial-forest mt-6 border-t-2 border-editorial-clay pt-4">Classic Dynastic Schemes</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-editorial-paper border border-editorial-clay rounded">
              <span className="text-[10px] font-sans text-editorial-forest font-bold block mb-1 uppercase tracking-wider">SZAREKHAN DYNASTY</span>
              <p className="text-xs font-serif text-editorial-charcoal">The ruling dynasty of the Silent King. Features polished bronze armor plating, dark iron skeletons, and rich deep green energy glow.</p>
            </div>
            <div className="p-4 bg-editorial-paper border border-editorial-clay rounded">
              <span className="text-[10px] font-sans text-editorial-forest font-bold block mb-1 uppercase tracking-wider">SAUTEKH DYNASTY</span>
              <p className="text-xs font-serif text-editorial-charcoal">The most widespread empire, known of warlord Imotekh. Features pristine bright silver metal, dark gray joints, and emerald weapons.</p>
            </div>
            <div className="p-4 bg-editorial-paper border border-editorial-clay rounded">
              <span className="text-[10px] font-sans text-editorial-forest font-bold block mb-1 uppercase tracking-wider">NIHILAKH DYNASTY</span>
              <p className="text-xs font-serif text-editorial-charcoal">Looters and guardians of vast riches. Features turquoise shoulder guards, gold body plating, and green weaponry. Highly regal.</p>
            </div>
            <div className="p-4 bg-editorial-paper border border-editorial-clay rounded">
              <span className="text-[10px] font-sans text-editorial-forest font-bold block mb-1 uppercase tracking-wider">MEPHRIT DYNASTY</span>
              <p className="text-xs font-serif text-editorial-charcoal">Solar hunters utilizing stellar radiation. Features green/brass armor plates coupled with unique sun-orange bright energy glows.</p>
            </div>
          </div>
        </div>

        {/* Why Perfect for 50+ Column */}
        <div className="space-y-6">
          <div className="border-b-2 border-editorial-charcoal pb-1">
            <h3 className="text-2xl font-serif font-bold text-editorial-charcoal tracking-tight">
              An Ideal Choice
            </h3>
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#7da481] font-bold">Why Necrons Fit the 50+ General</p>
          </div>

          <div className="space-y-4">
            <div className="bg-editorial-paper border border-editorial-clay p-5 rounded hover:border-editorial-moss transition-all">
              <div className="flex gap-3">
                <div className="text-editorial-forest mt-1"><Shield size={18} /></div>
                <div>
                  <h4 className="font-sans font-bold text-editorial-forest text-sm uppercase tracking-wider">Forgiving Rules (Reanimation)</h4>
                  <p className="text-xs font-serif text-editorial-charcoal leading-relaxed mt-1">
                    At the start of every turn, Necron units restore lost models via *Reanimation Protocols*. This makes errors on the game board highly forgivable, as your troops recover automatically over time rather than being vaporized instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-editorial-paper border border-editorial-clay p-5 rounded hover:border-editorial-moss transition-all">
              <div className="flex gap-3">
                <div className="text-editorial-forest mt-1"><Award size={18} /></div>
                <div>
                  <h4 className="font-sans font-bold text-editorial-forest text-sm uppercase tracking-wider">Low-Dilation Assembly</h4>
                  <p className="text-xs font-serif text-editorial-charcoal leading-relaxed mt-1">
                    Unlike factions with thin fragile limbs, antennae, or hundreds of spikey spikes (like Tyranids or Drukhari), Necron models are cohesive, sturdy robotic figures. They contain fewer pieces, are highly durable to carry around, and don't break easily.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-editorial-paper border border-editorial-clay p-5 rounded hover:border-editorial-moss transition-all">
              <div className="flex gap-3">
                <div className="text-editorial-forest mt-1"><Flame size={18} /></div>
                <div>
                  <h4 className="font-sans font-bold text-editorial-forest text-sm uppercase tracking-wider">Speed Painter’s Dream</h4>
                  <p className="text-xs font-serif text-editorial-charcoal leading-relaxed mt-1">
                    A Necron metal skeleton is 85% metal. You can paint them to "Tournament Standard" with just a silver coat, a dark shade-wash, and a single bright green color for the eyes/weapons. It requires zero delicate fine-motor skills to look beautiful!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-editorial-paper border border-editorial-clay p-5 rounded hover:border-editorial-moss transition-all">
              <div className="flex gap-3">
                <div className="text-editorial-forest mt-1"><Zap size={18} /></div>
                <div>
                  <h4 className="font-sans font-bold text-editorial-forest text-sm uppercase tracking-wider">Methodical, Direct Strategy</h4>
                  <p className="text-xs font-serif text-editorial-charcoal leading-relaxed mt-1">
                    Necrons act as a slow, inexorable silver tide. They march straight up the board, hold objectives, and survive. This playstyle doesn't require committing hundreds of micro-rules or fast reflexes to memory—allowing you to play stress-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
