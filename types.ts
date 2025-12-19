
export interface EconomyConfig {
  moodCheckInPoints: number;
  moodCheckInMaxPerDay: number;
  breathingPoints: number;
  breathingMaxPerDay: number;
  reportPoints: number;
  reportIntervalDays: number;
  streakStep: number;
  streakBonusDay7: number;
  
  // Costs
  costSkinBasic: number;
  costSkinSeason: number;
  costSkinZen: number;
  costCoffee: number;
  costGadget: number;
  costPremium: number;
}

export interface UserScenario {
  id: string;
  name: string;
  moodCheckInFrequency: number; // 0 to 1 (probability or daily count)
  breathingFrequency: number; // 0 to 1
  reportFrequency: number; // 0 to 1
  consistency: number; // 0 to 1 (streak reliability)
}

export interface SimulationResult {
  day: number;
  totalPoints: number;
  dailyPoints: number;
  canAfford: string[];
}
