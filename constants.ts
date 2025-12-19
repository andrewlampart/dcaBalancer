
import { EconomyConfig, UserScenario } from './types';

export const DEFAULT_CONFIG: EconomyConfig = {
  moodCheckInPoints: 10,
  moodCheckInMaxPerDay: 3,
  breathingPoints: 20,
  breathingMaxPerDay: 1,
  reportPoints: 150,
  reportIntervalDays: 14,
  streakStep: 5,
  streakBonusDay7: 100,
  
  costSkinBasic: 200,
  costSkinSeason: 600,
  costSkinZen: 2000,
  costCoffee: 500,
  costGadget: 800,
  costPremium: 2500,
};

export const SCENARIOS: UserScenario[] = [
  {
    id: 'perfectionist',
    name: 'Perfekcjonista (Max)',
    moodCheckInFrequency: 1.0, // 3 times
    breathingFrequency: 1.0,
    reportFrequency: 1.0,
    consistency: 1.0,
  },
  {
    id: 'average',
    name: 'Przeciętny Student',
    moodCheckInFrequency: 0.6, // ~2 times
    breathingFrequency: 0.5,
    reportFrequency: 0.8,
    consistency: 0.7,
  },
  {
    id: 'struggling',
    name: 'Osoba w kryzysie',
    moodCheckInFrequency: 0.3, // ~1 time
    breathingFrequency: 0.2,
    reportFrequency: 0.5,
    consistency: 0.4,
  },
];
