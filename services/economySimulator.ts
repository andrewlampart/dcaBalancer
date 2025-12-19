
import { EconomyConfig, UserScenario, SimulationResult } from '../types';

export const simulateEconomy = (
  config: EconomyConfig,
  scenario: UserScenario,
  days: number
): SimulationResult[] => {
  const results: SimulationResult[] = [];
  let totalPoints = 0;
  let currentStreak = 0;

  for (let d = 1; d <= days; d++) {
    let dailyPoints = 0;

    // 1. Streak Logic
    const isConsistent = Math.random() < scenario.consistency;
    if (isConsistent) {
      currentStreak++;
      const streakDay = ((currentStreak - 1) % 7) + 1;
      dailyPoints += streakDay * config.streakStep;
      if (streakDay === 7) {
        dailyPoints += config.streakBonusDay7;
      }
    } else {
      currentStreak = 0;
    }

    // 2. Mood Check-ins
    const moodDailyCount = Math.round(scenario.moodCheckInFrequency * config.moodCheckInMaxPerDay);
    dailyPoints += moodDailyCount * config.moodCheckInPoints;

    // 3. Breathing Exercises
    if (Math.random() < scenario.breathingFrequency) {
      dailyPoints += config.breathingPoints;
    }

    // 4. Reports (Simplified: happens exactly every 14 days if frequency check passes)
    if (d % config.reportIntervalDays === 0) {
      if (Math.random() < scenario.reportFrequency) {
        dailyPoints += config.reportPoints;
      }
    }

    totalPoints += dailyPoints;

    // Affordability Check
    const canAfford: string[] = [];
    if (totalPoints >= config.costSkinBasic) canAfford.push('Skin Basic');
    if (totalPoints >= config.costSkinSeason) canAfford.push('Skin Sezonowy');
    if (totalPoints >= config.costSkinZen) canAfford.push('Skin Zen');
    if (totalPoints >= config.costCoffee) canAfford.push('Kawa');
    if (totalPoints >= config.costGadget) canAfford.push('Gadżet');
    if (totalPoints >= config.costPremium) canAfford.push('Premium Drop');

    results.push({
      day: d,
      totalPoints,
      dailyPoints,
      canAfford,
    });
  }

  return results;
};
