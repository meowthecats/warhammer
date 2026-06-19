import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, Eye, Sparkles, Check, Info, Award, HelpCircle } from 'lucide-react';
import { PaintStep } from '../types';

interface Props {
  fontSizeFactor: number;
}

const SHIELD_PAINT_STEPS: PaintStep[] = [
  {
    stepNumber: 1,
    title: 'Prep, Handle & Mount',
    technique: 'Assembly Optimization',
    description: 'Assemble your model using Tamiya Extra Thin Cement. To protect your hands and prevent finger fatigue, attach your finished model to the cap of an empty pill bottle or soda bottle using a cherry-sized ball of blue Tac (poster putty).',
    lowDexterityTip: 'Do not hold the tiny 32mm model base with your fingertips. Holding a thick pill bottle relaxes hand pressure, reduces joint aches, and prevents accidentally smudging wet paint with your thumbs.',
    estimatedTimeMinutes: 10,
    suppliesNeeded: ['Model sprue', 'Tamiya Cement', 'Pill bottle cup', 'Poster Tac'],
  },
  {
    stepNumber: 2,
    title: 'The Dark Undercoat',
    technique: 'Spray Priming outside',
    description: 'Take your mounted model outside into fresh air. Shake your flat black rattle-can primer for 1 full minute. Stand 8 to 10 inches away, and spray the model in quick, controlled 1-second dusting sweeps. Rotate the model to ensure all angles are coated in deep matte black.',
    lowDexterityTip: 'If your index finger gets tired or cold while pressing the spray nozzle, purchase a standard slip-on spray-can trigger handle from the hardware store ($3). It mimics a paint-gun and protects your grip.',
    estimatedTimeMinutes: 5,
    suppliesNeeded: ['Rust-Oleum Flat Black spray can', 'Cardboard backing box'],
  },
  {
    stepNumber: 3,
    title: 'The Silver Frost (Heavy Drybrush)',
    technique: 'Drybrushing (Pre-shading)',
    description: 'Dip your flat, wide drybrush (or cheap soft makeup powder brush) into the Vallejo Gunmetal paint. Immediately rub the brush back and forth intensely on a clean dry paper towel. Once almost NO paint is coming off on the towel, vigorously flick the brush all over the black model.',
    lowDexterityTip: 'Since drybrushing relies on the bristles only catching raised details, shaky wrist movements actually enhance the weathered metallic texture! Your tremors are a feature here, creating beautiful war-torn armor weathering.',
    estimatedTimeMinutes: 10,
    suppliesNeeded: ['Vallejo Gunmetal paint', 'Flab brush / Makeup brush', 'Paper towel'],
  },
  {
    stepNumber: 4,
    title: 'Immersion Wash (Shading)',
    technique: 'All-over Liquid Shading',
    description: 'Dip your medium synthetic brush into the Army Painter Dark Tone wash. Generously slather this dark liquid ink across the entire metallic model. Let it flow and pool naturally inside joints, metallic ribcages, and muscle splits.',
    lowDexterityTip: 'No precision or vision strain is required here. The wash pools in the crevices on its own, drawing shadows and creating incredible anatomical depth automatically. Allow 20 minutes to fully air dry.',
    estimatedTimeMinutes: 5,
    suppliesNeeded: ['Army Painter Dark Tone Wash', '#2 Detail Brush'],
  },
  {
    stepNumber: 5,
    title: 'Chamber & Eyes Neon Glow',
    technique: 'Contrast Plasma Washing',
    description: 'Carefully take standard acrylic white paint and dot the tiny ball-spheres inside the Gauss weapon barrels and the center of the Necron chest glyph. Once dry, coat those exact white areas with Tesseract Glow green wash. The glowing green binds perfectly over the white base, popping instantly!',
    lowDexterityTip: 'Brace your wrists together! If painting the glowing eyes is too difficult for your eyesight, bypass eyes entirely. Just drybrush the green weapon tubes. It looks wonderful even without glowing eyes!',
    estimatedTimeMinutes: 8,
    suppliesNeeded: ['White acrylic paint', 'Citadel Tesseract Glow', '#2 Detail Brush'],
  },
  {
    stepNumber: 6,
    title: 'Sterilized Yard Basing',
    technique: 'Organic Materials Bonding',
    description: 'Paint the top of the dynamic plastic circle base with Elmer’s school white glue (PVA). Immediately dip the base into a cup of sterilized garden dirt or fine sifted sand. Shake off the excess, and let dry. You get a perfect desert ruin look for zero cost!',
    lowDexterityTip: 'To sterilize yard soil: Bake a trowel-scoop on aluminum foil at 200°F (93°C) for 15 minutes. This kills any unseen spores or moisture, preparing it safely for acrylic adhesion.',
    estimatedTimeMinutes: 5,
    suppliesNeeded: ['Sterilized backyard soil', 'Elmers white glue', 'Old brush to apply glue'],
  },
];

export default function PaintingGuide({ fontSizeFactor }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const prevStep = () => {
    setActiveStep((curr) => Math.max(0, curr - 1));
  };

  const nextStep = () => {
    setActiveStep((curr) => Math.min(SHIELD_PAINT_STEPS.length - 1, curr + 1));
  };

  const currentStepData = SHIELD_PAINT_STEPS[activeStep];
  const progressPercent = ((activeStep + 1) / SHIELD_PAINT_STEPS.length) * 100;

  return (
    <div className="space-y-8 animate-fade-in text-editorial-charcoal">
      {/* Overview Block */}
      <div className="border-2 border-editorial-charcoal bg-editorial-paper p-6 rounded shadow-sm">
        <h3 className="text-2xl font-serif font-bold text-editorial-charcoal flex items-center gap-2 mb-2">
          <Award className="text-editorial-forest" />
          The "Silver Tide" Speed Painting Method
        </h3>
        <p className="text-editorial-charcoal font-serif text-sm leading-relaxed" style={{ fontSize: `${0.95 * fontSizeFactor}rem` }}>
          Many novices get discouraged when looking at professional painting videos that take 40 hours per model. For our 50+ cohort, we utilize the **Wet Shading & Drybrushing** methodology. It requires zero fine-line tracing, utilizes highly cheap supplies, and generates beautiful metallic cyborg forces that look amazing on Rockville tabletop boards.
        </p>
      </div>

      {/* Interactive Step Carousel Container */}
      <div className="bg-editorial-paper border-2 border-editorial-charcoal rounded p-6 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
        {/* Step Indicator and Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-sans uppercase tracking-wider font-bold">
            <span className="text-editorial-forest">Speed Tutorial Progress</span>
            <span className="text-editorial-moss">Step {activeStep + 1} of {SHIELD_PAINT_STEPS.length}</span>
          </div>
          {/* Bar track */}
          <div className="w-full h-2 bg-editorial-clay rounded-full overflow-hidden border border-editorial-charcoal">
            <div
              className="h-full bg-editorial-forest transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Big step title card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start pt-2">
          {/* Left panel: Step Metadata */}
          <div className="md:border-r-2 md:border-editorial-clay md:pr-6 space-y-4 font-sans text-xs">
            <div>
              <span className="text-5xl font-extrabold text-editorial-clay block leading-none">
                0{currentStepData.stepNumber}
              </span>
              <span className="text-xs text-editorial-forest font-bold uppercase tracking-wider block mt-2">
                {currentStepData.technique}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-editorial-moss uppercase font-bold tracking-wider block">Estimated Effort:</span>
              <span className="text-sm font-bold text-editorial-charcoal block">
                ~{currentStepData.estimatedTimeMinutes} minutes
              </span>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[10px] text-editorial-moss uppercase font-bold tracking-wider block">Used Materials:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {currentStepData.suppliesNeeded.map((supply, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-editorial-cream text-editorial-charcoal border border-editorial-clay font-bold tracking-tight">
                    {supply}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Description and targeted 50+ tips */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-editorial-charcoal flex items-center gap-2">
              {currentStepData.title}
            </h4>

            <p className="text-editorial-charcoal font-serif leading-relaxed text-sm sm:text-base animate-fade-in" style={{ fontSize: `${1 * fontSizeFactor}rem` }}>
              {currentStepData.description}
            </p>

            {/* Targeted 50 Plus Ergonomics Box */}
            <div className="p-4 bg-editorial-cream border-l-4 border-editorial-forest rounded-r space-y-1.5">
              <div className="flex items-center gap-2 text-editorial-forest font-bold text-xs font-sans uppercase tracking-wider">
                <Eye size={12} /> Key Ergonomics Adjustments (For 50+)
              </div>
              <p className="text-editorial-moss font-serif text-xs sm:text-sm leading-relaxed" style={{ fontSize: `${0.9 * fontSizeFactor}rem` }}>
                {currentStepData.lowDexterityTip}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel buttons */}
        <div className="flex justify-between items-center pt-4 border-t-2 border-editorial-clay">
          <button
            onClick={prevStep}
            disabled={activeStep === 0}
            className="flex items-center gap-2 py-2 px-4 rounded border-2 border-editorial-charcoal bg-editorial-cream hover:bg-editorial-clay text-editorial-charcoal font-sans uppercase tracking-wider font-bold text-xs transition disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft size={14} /> Prior Step
          </button>

          {activeStep < SHIELD_PAINT_STEPS.length - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 py-2 px-5 rounded bg-editorial-forest text-editorial-cream font-sans uppercase tracking-wider font-bold text-xs transition hover:bg-opacity-90 cursor-pointer"
            >
              Next Step <ArrowRight size={14} />
            </button>
          ) : (
            <span className="flex items-center gap-1 text-editorial-forest text-xs sm:text-sm font-sans uppercase tracking-wider font-bold animate-pulse">
              <Check size={16} /> Master Setup Completed!
            </span>
          )}
        </div>
      </div>

      {/* Bonus Tip */}
      <div className="bg-editorial-cream border border-editorial-clay p-5 rounded max-w-4xl mx-auto space-y-3">
        <h4 className="text-sm font-sans uppercase tracking-wider font-bold text-editorial-forest flex items-center gap-2">
          <Info size={16} /> Shaky Hands Quick-Fixes
        </h4>
        <p className="text-xs text-editorial-moss font-serif leading-relaxed" style={{ fontSize: `${0.85 * fontSizeFactor}rem` }}>
          Remember, **paint doesn't care how fast or steady your pulse is**. Historically, some of the most beautiful Grimdark armies are weathered and textured using coarse drybrushing. If a spot of bright green slips onto the silver chest armor, don't worry! It looks like radiant plasma discharge leaking from an ancient reactor core, adding glorious narrative value to the miniature.
        </p>
      </div>
    </div>
  );
}
