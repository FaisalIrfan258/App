import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressData } from '../types/progress';

const STORAGE_KEY = '@today_progress';

const DEFAULT_PROGRESS: ProgressData = {
  calmRecoveries: 0,
  resetMinutes: 0,
  currentStreak: 0,
  lastActivityDate: null,
};

class ProgressService {
  async getProgress(): Promise<ProgressData> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return DEFAULT_PROGRESS;
    } catch (error) {
      return DEFAULT_PROGRESS;
    }
  }

  async saveProgress(progress: ProgressData): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      // Silently fail - progress will be lost but app continues
    }
  }

  async recordActivity(minutes: number): Promise<ProgressData> {
    const progress = await this.getProgress();
    const today = new Date().toISOString().split('T')[0];

    // Update session count and minutes
    progress.calmRecoveries += 1;
    progress.resetMinutes += minutes;

    // Calculate streak
    if (progress.lastActivityDate) {
      const lastDate = new Date(progress.lastActivityDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        // Consecutive day - increment streak
        progress.currentStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken - reset to 1
        progress.currentStreak = 1;
      }
      // If diffDays === 0, same day - keep current streak
    } else {
      // First activity ever
      progress.currentStreak = 1;
    }

    progress.lastActivityDate = today;
    await this.saveProgress(progress);

    return progress;
  }

  getSessionsThisWeek(progress: ProgressData): number {
    if (!progress.lastActivityDate) return 0;

    const today = new Date();
    const lastActivity = new Date(progress.lastActivityDate);
    const daysSinceLastActivity = Math.floor(
      (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );

    // If last activity was more than 7 days ago, return 0
    if (daysSinceLastActivity > 7) return 0;

    // Simple approximation: use streak if within week, otherwise estimate
    return Math.min(progress.currentStreak, 7);
  }

  getRecoveryPercentage(progress: ProgressData): number {
    const sessionsThisWeek = this.getSessionsThisWeek(progress);
    // Recovery percentage = (sessionsThisWeek / 7) * 100, capped at 100
    return Math.min(Math.round((sessionsThisWeek / 7) * 100), 100);
  }

  async resetProgress(): Promise<void> {
    await this.saveProgress(DEFAULT_PROGRESS);
  }
}

export const progressService = new ProgressService();
