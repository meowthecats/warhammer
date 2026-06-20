export interface HobbyTool {
  id: string;
  name: string;
  category: 'tool' | 'paint' | 'primer';
  estimatedCost: number;
  description: string;
  budgetAlternative: string;
  purpose: string;
  essential: boolean;
}

export interface NecronUnit {
  id: string;
  name: string;
  type: 'commander' | 'battleline' | 'elite' | 'fast_attack' | 'heavy_support';
  points: number;
  estimatedCostUSD: number;
  estimatedBuildTimeHours: number;
  estimatedPaintTimeHours: number;
  difficultyRating: 1 | 2 | 3 | 4 | 5; // 1 = easiest on shaky hands/eyes
  description: string;
  whyChosen50Plus: string;
  tacticalTip: string;
}

export interface GameStore {
  id: string;
  name: string;
  city: string;
  address: string;
  distanceFromGermantownMiles: number;
  phone: string;
  warhammerNight: string;
  atmosphereRating: string; // e.g. "Relaxed & Mature", "Highly Competitive"
  whyWelcomingToSeniors: string;
  veteranTip: string;
  mapEmbedUrl?: string;
  website: string;
  services?: string[];
}

export interface PaintStep {
  stepNumber: number;
  title: string;
  technique: string;
  description: string;
  lowDexterityTip: string; // targeted advice for shaky hands / eyesight
  estimatedTimeMinutes: number;
  suppliesNeeded: string[];
}
