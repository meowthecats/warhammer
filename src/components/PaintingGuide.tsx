import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, Eye, Sparkles, Check, Info, Award, HelpCircle } from 'lucide-react';
import { PaintStep } from '../types';

interface Props {
  fontSizeFactor: number;
}

const SHIELD_PAINT_STEPS: PaintStep[] = [
  {
    stepNumber: 1,
    title: 'Stick the tiny plastic guy to a bottle cap',
    technique: 'Hodgepodge Assembly',
    description: 'Okay, first, you glue the robot dude together using basic cement glue. But here is the ultimate life-saver: those tiny plastic guys are impossible to hold without dropped paint everywhere. So, you grab a cherry-sized ball of blue sticky poster putty (sticky tack) and smash the robot\'s circle base onto the top of an old empty pill bottle or soda bottle cap. Now you have a giant handle to hold instead of a tiny toy!',
    lowDexterityTip: 'Seriously, do NOT try to hold the miniature base with your fingertips. Your hands will cramp up instantly and you will smudge your hard work. Hold the pill bottle like a giant coffee mug.',
    estimatedTimeMinutes: 10,
    suppliesNeeded: ['Model sprue', 'Tamiya Cement', 'Pill bottle / Soda cap', 'Sticky poster tack'],
  },
  {
    stepNumber: 2,
    title: 'Spray-paint him completely pitch black outside',
    technique: 'Rattle-can spray job',
    description: 'Go outside because spray paint smells terrible and will coat your kitchen in dark soot. Shake a cheap flat black rattle-spray can around for a full minute like you mean it. Stand about 10 inches back from the robot and do really quick, passing "whoosh" spray sweeps. Turn him around so he is covered in a deep matte black shadow. Do not hold the button down in one spot or he will drown in runny wet tar!',
    lowDexterityTip: 'If your index finger gets tired or cold from pressing the nozzle, buy a $3 plastic trigger handle from the hardware store that clips onto the spray can. It makes it feel like a toy water pistol and saves your grip.',
    estimatedTimeMinutes: 5,
    suppliesNeeded: ['Matte Black spray can', 'A scrap cardboard box to spray inside of'],
  },
  {
    stepNumber: 3,
    title: 'Tickle him with silver paint (The dollar makeup brush hack)',
    technique: 'Drybrushing (wipe it all off!)',
    description: 'Get some silver metallic paint. Now, buy a cheap, soft, fluffy makeup powder brush from the dollar store. Dip the tip of the brush in the silver paint, and then IMMEDIATELY scrub almost all of it off on a paper towel. Seriously, wipe it until the brush looks empty. Then, just dust and flick the brush all over the black robot. Like magic, all his metal bones start glowing silver while the deep crevices stay pitch black!',
    lowDexterityTip: 'Here is the best secret: if your hands are shaky, this step actually works BETTER! Your natural tremors will hit the edges randomly, making the metal look beautifully weathered and battle-worn.',
    estimatedTimeMinutes: 10,
    suppliesNeeded: ['Vallejo Gunmetal paint', 'Dollar store makeup powder brush', 'Paper towel'],
  },
  {
    stepNumber: 4,
    title: 'Slather on the muddy ink shadow juice',
    technique: 'Liquid Wash Drenching',
    description: 'Open up this magical dark watery bottle called "Dark Tone shadow wash." Get your normal paintbrush and literally drench the silver robot in the liquid. Do not try to be neat! Just slop it all over him. The magical dark ink will automatically run away from his silver edges on its own and hide in all his ribcages, hollow joints, and shadows, instantly creating three-dimensional depth.',
    lowDexterityTip: 'You need zero precision or good eyes here. Slosh it on like gravy on a Sunday roast. Go take a 20-minute coffee break while it air-dries into beautiful shadows.',
    estimatedTimeMinutes: 5,
    suppliesNeeded: ['Army Painter Dark Tone Wash', 'Standard brush', 'Dunking energy'],
  },
  {
    stepNumber: 5,
    title: 'Make details shine with radioactive neon green',
    technique: 'Contrast glow cheat-code',
    description: 'We need glowing guns and power-cores. Doing glowing effects usually takes expert blending, but here is our ultimate shortcut: paint the gun tubes and chest glyph with standard white acrylic paint first. Let it dry completely. Then, sloppy-paint over that white with a bright green glaze called "Tesseract Glow." It magically turns the flat white into a bright neon radioactive green instantly!',
    lowDexterityTip: 'Brace your wrists/elbows together on the table for double stability. If painting the glowing eyes is too stressful, skip them entirely! Just glowing weapons still look absolutely phenomenal.',
    estimatedTimeMinutes: 8,
    suppliesNeeded: ['Basic white acrylic paint', 'Citadel Tesseract Glow', 'Smaller brush'],
  },
  {
    stepNumber: 6,
    title: 'Glue actual dirt from your backyard to the stand',
    technique: 'Backyard excavation',
    description: 'The solid circle base looks boring. Paint some school-grade Elmer\'s white glue all over the top. Then, scoop a cup of real dirt or sand from your yard and dip his stand right into it! Shake off the extra dirt. Boom, now your metallic robot is standing in a real post-apocalyptic desert wasteland for absolutely zero extra dollars!',
    lowDexterityTip: 'To avoid bringing yard mold or bug spores into your house, spread the dirt on some foil and bake it in the kitchen oven at 200°F (93°C) for 15 minutes before gluing it.',
    estimatedTimeMinutes: 5,
    suppliesNeeded: ['Sterilized backyard soil/sand', 'Elmer\'s white school glue', 'Old brush to spread glue'],
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
          The Clueless Beginner's "Silver Tide" Guide
        </h3>
        <p className="text-editorial-charcoal font-serif text-sm leading-relaxed" style={{ fontSize: `${0.95 * fontSizeFactor}rem` }}>
          Look, I have absolutely NO idea what I'm doing half the time, and professional hobby videos with 40-hour painting recipes make me want to sweat. But it turns out you can cheat! By using raw metallic silver drybrushing and wet ink shading, we completely skip fine-line precision. The steps are dirt-cheap, super clear, extremely forgiving of shaky hands, and make your robotic cyborg army look professional on any gaming table!
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
