import React from 'react';
import { ShieldCheck, Heart, Clock, Compass, Activity, Eye, Hammer, Sparkles, Award } from 'lucide-react';

interface Props {
  fontSizeFactor: number;
}

export default function WelcomeAcademy({ fontSizeFactor }: Props) {
  // Editorial font sizes and styling based on font factor
  const getSubHeadingStyle = () => {
    if (fontSizeFactor > 1.22) return 'text-xl font-sans font-bold text-editorial-forest mb-1';
    if (fontSizeFactor > 1.05) return 'text-lg font-sans font-bold text-editorial-forest mb-1';
    return 'text-md font-sans font-bold text-editorial-forest mb-1';
  };

  return (
    <div className="space-y-8 animate-fade-in text-editorial-charcoal">
      {/* Intro Header Section */}
      <div className="border-2 border-editorial-charcoal bg-editorial-paper p-6 sm:p-8 rounded relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Award size={160} className="text-editorial-forest" />
        </div>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-editorial-forest text-editorial-cream rounded mb-4">
            <Heart size={12} />
            <span className="text-[10px] font-sans tracking-widest uppercase font-bold">AGELESS MINIS COURSE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-editorial-charcoal tracking-tight font-bold mb-4">
            Welcome to the 50+ Hobby Academy
          </h2>
          <p className="text-editorial-charcoal font-serif leading-relaxed max-w-3xl mb-4" style={{ fontSize: `${1 * fontSizeFactor}rem` }}>
            Warhammer 40,000 is often associated with younger players, but tabletop miniatures are a perfect, therapeutic lifetime pursuit. It offers creative satisfaction, cognitive focus, dynamic tactical puzzles, and a friendly local community. 
          </p>
          <p className="text-editorial-moss font-serif leading-relaxed max-w-3xl" style={{ fontSize: `${0.95 * fontSizeFactor}rem` }}>
            If you have <strong>limited time</strong>, a <strong>modest budget</strong>, or concerns about <strong>hand steadiness or eyesight</strong>, this guide is crafted specifically for you. We focus on Necrons—an ancient undead legion that is both visually striking and miraculously easy to assemble and paint.
          </p>
        </div>
      </div>

      {/* Grid of Key Strategies */}
      <div className="border-b-2 border-editorial-charcoal pb-2">
        <h3 className="text-2xl font-serif font-bold text-editorial-charcoal tracking-tight">
          Hobby Ergonomics: Working Smarter, Not Harder
        </h3>
        <p className="text-xs text-editorial-moss font-sans uppercase tracking-[0.2em] font-semibold mt-1">PRO-LEVEL METHODS ADAPTED FOR COMPASSIONATE PLAY</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shakiness Section */}
        <div className="bg-editorial-paper border-2 border-editorial-clay p-6 rounded hover:border-editorial-moss transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2.5 bg-editorial-forest text-editorial-cream rounded">
              <Activity size={20} />
            </div>
            <div>
              <h4 className={getSubHeadingStyle()}>1. Managing Shakiness & Hand Tremors</h4>
              <p className="text-xs text-editorial-moss font-sans uppercase tracking-wider font-semibold">Precision-free painting methods</p>
            </div>
          </div>
          <ul className="space-y-3 text-editorial-charcoal text-sm font-serif" style={{ fontSize: `${0.9 * fontSizeFactor}rem` }}>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>The Brace Method:</strong> rest both of your elbows firmly on your building desk, and touch your wrists together. This locks your hands into the same vibrational movement, neutralizing shakiness perfectly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>Dampen Vibrations:</strong> Use a chunky handle. Instead of holding thin model bases, mount models onto a plastic bottle (like an empty pill bottle) using poster putty. This relaxes hand joints and reduces fatigue.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>Heavy Drybrushing:</strong> Forget dotting pupils or tracing razor-thin edge highlights. Our Necron guide utilizes drybrushing—softly flicking a broad brush across models—which relies on natural highlights, turning shakiness into a beneficial weathered texture!</span>
            </li>
          </ul>
        </div>

        {/* Eye Strain Section */}
        <div className="bg-editorial-paper border-2 border-editorial-clay p-6 rounded hover:border-editorial-moss transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2.5 bg-editorial-forest text-editorial-cream rounded">
              <Eye size={20} />
            </div>
            <div>
              <h4 className={getSubHeadingStyle()}>2. Overcoming Eye Strain</h4>
              <p className="text-xs text-editorial-moss font-sans uppercase tracking-wider font-semibold">Lighting & magnification essentials</p>
            </div>
          </div>
          <ul className="space-y-3 text-editorial-charcoal text-sm font-serif" style={{ fontSize: `${0.9 * fontSizeFactor}rem` }}>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>Daylight LED Ring Lamps:</strong> Standard warm dining room yellow light tires our eyes quickly. For less than $15 on Amazon, a cold daylight (5500K-6000K) LED ring lamp will illuminate the model with 5x more clarity.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>Inexpensive Magnifying Visors:</strong> You don't need expensive medical gear. A basic, dual-lens magnifying head strap style visor ($12) lets you zoom in comfortably to let your neck muscles relax.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>Contrast Paints & Washes:</strong> These liquid paints pool naturally in crevices, "shading" details automatically. This means your eyes don't have to strain to paint shadows—the paint does the vision work for you!</span>
            </li>
          </ul>
        </div>

        {/* Time constraints */}
        <div className="bg-editorial-paper border-2 border-editorial-clay p-6 rounded hover:border-editorial-moss transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2.5 bg-editorial-forest text-editorial-cream rounded">
              <Clock size={20} />
            </div>
            <div>
              <h4 className={getSubHeadingStyle()}>3. Time-Smart Hobby Routines</h4>
              <p className="text-xs text-editorial-moss font-sans uppercase tracking-wider font-semibold">Defeating the 15-minute challenge</p>
            </div>
          </div>
          <p className="text-sm text-editorial-charcoal font-serif leading-relaxed mb-3" style={{ fontSize: `${0.9 * fontSizeFactor}rem` }}>
            Do not set out to paint a whole army in a weekend. That invites fatigue and a "gray pile of shame." Embrace the **15-Minute Session**:
          </p>
          <ul className="space-y-2 text-editorial-charcoal font-serif text-xs sm:text-sm" style={{ fontSize: `${0.85 * fontSizeFactor}rem` }}>
            <li className="flex items-center gap-2">
              <span className="text-editorial-forest font-bold select-none">&#9632;</span>
              <span><strong>Day 1-3:</strong> Snip and assemble 3 models while listening to an audio book or music.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-editorial-forest font-bold select-none">&#9632;</span>
              <span><strong>Day 4:</strong> Spray prime outside. This takes exactly 2 minutes and needs 20 minutes to dry.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-editorial-forest font-bold select-none">&#9632;</span>
              <span><strong>Day 5-6:</strong> Coat metallic base-coats on the prepared squad. No precision needed!</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-editorial-forest font-bold select-none">&#9632;</span>
              <span><strong>Day 7:</strong> Shade wash. It dries by itself while you enjoy tea or coffee. Complete!</span>
            </li>
          </ul>
        </div>

        {/* Resource smarts */}
        <div className="bg-editorial-paper border-2 border-editorial-clay p-6 rounded hover:border-editorial-moss transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2.5 bg-editorial-forest text-editorial-cream rounded">
              <Hammer size={20} />
            </div>
            <div>
              <h4 className={getSubHeadingStyle()}>4. Resource-Smart Execution</h4>
              <p className="text-xs text-editorial-moss font-sans uppercase tracking-wider font-semibold">Avoiding expensive corporate pitfalls</p>
            </div>
          </div>
          <ul className="space-y-3 text-editorial-charcoal text-sm font-serif" style={{ fontSize: `${0.9 * fontSizeFactor}rem` }}>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>Hardware Store Primer:</strong> Traditional miniature primers cost $20-25 a can. A can of **Rust-Oleum Flat Black** costs $6 at Home Depot/Lowes and is just as effective for base-coating models.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>The Homemade Wet Palette:</strong> Keeps acrylic paint usable for days instead of minutes. Take a shallow tupperware, put a wet paper towel inside, and place a sheet of baking parchment paper on top. It saves $15 and prevents wasted paint paint-drops.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-editorial-forest font-bold select-none">•</span>
              <span><strong>Start Small:</strong> Only buy your next box *after* you have painted the current one. This maintains low emotional pressure and keeps your project budget under strict, affordable margins.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Motivational Closing Quote */}
      <div className="border-l-4 border-editorial-forest bg-editorial-paper p-4 italic text-editorial-forest leading-relaxed text-sm max-w-4xl" style={{ fontSize: `${0.9 * fontSizeFactor}rem` }}>
        "Tabletop gaming is one of the few hobbies where you actively combine tactile craft, spatial strategy, and face-to-face social engagement. For veterans and beginners over 50, it offers an incredible routine that exercises brain plasticity and fine motor skills—all while having a warm beverage in the company of a deeply supportive tabletop community."
      </div>
    </div>
  );
}
