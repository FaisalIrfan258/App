/**
 * User Session Service
 * Links meditation sessions with authenticated users
 * Stores session history and progress for each user
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from './authService';

const SESSION_HISTORY_PREFIX = '@today_session_history_';
const USER_STATS_PREFIX = '@today_user_stats_';

export interface SessionRecord {
  sessionIndex: number;
  sessionNumber: number; // 1-based display number
  completedAt: string; // ISO timestamp
  duration?: number; // Duration in seconds
  completed: boolean;
}

export interface UserStats {
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string | null;
  firstSessionDate: string | null;
}

class UserSessionService {
  /**
   * Record a completed meditation session for the current user
   */
  async recordSession(
    sessionIndex: number,
    sessionNumber: number,
    duration?: number
  ): Promise<void> {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        console.warn('No authenticated user, session not recorded');
        return;
      }

      const uid = currentUser.uid;
      const sessionRecord: SessionRecord = {
        sessionIndex,
        sessionNumber,
        completedAt: new Date().toISOString(),
        duration,
        completed: true,
      };

      // Get existing session history
      const history = await this.getSessionHistory(uid);
      history.push(sessionRecord);

      // Save updated history
      const historyKey = `${SESSION_HISTORY_PREFIX}${uid}`;
      await AsyncStorage.setItem(historyKey, JSON.stringify(history));

      // Update user stats
      await this.updateUserStats(uid);
    } catch (error) {
      console.error('Error recording session:', error);
    }
  }

  /**
   * Get session history for a specific user
   */
  async getSessionHistory(uid?: string): Promise<SessionRecord[]> {
    try {
      const userId = uid || authService.getCurrentUser()?.uid;
      if (!userId) {
        return [];
      }

      const historyKey = `${SESSION_HISTORY_PREFIX}${userId}`;
      const historyJson = await AsyncStorage.getItem(historyKey);

      if (!historyJson) {
        return [];
      }

      return JSON.parse(historyJson);
    } catch (error) {
      console.error('Error getting session history:', error);
      return [];
    }
  }

  /**
   * Get user statistics (total sessions, streaks, etc.)
   */
  async getUserStats(uid?: string): Promise<UserStats> {
    try {
      const userId = uid || authService.getCurrentUser()?.uid;
      if (!userId) {
        return this.getEmptyStats();
      }

      const statsKey = `${USER_STATS_PREFIX}${userId}`;
      const statsJson = await AsyncStorage.getItem(statsKey);

      if (!statsJson) {
        return this.getEmptyStats();
      }

      return JSON.parse(statsJson);
    } catch (error) {
      console.error('Error getting user stats:', error);
      return this.getEmptyStats();
    }
  }

  /**
   * Update user statistics based on session history
   */
  private async updateUserStats(uid: string): Promise<void> {
    try {
      const history = await this.getSessionHistory(uid);

      if (history.length === 0) {
        return;
      }

      // Sort by date
      const sortedHistory = history.sort(
        (a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
      );

      const firstSession = sortedHistory[0];
      const lastSession = sortedHistory[sortedHistory.length - 1];

      // Calculate streaks
      const { currentStreak, longestStreak } = this.calculateStreaks(sortedHistory);

      const stats: UserStats = {
        totalSessions: history.length,
        currentStreak,
        longestStreak,
        lastSessionDate: lastSession.completedAt,
        firstSessionDate: firstSession.completedAt,
      };

      const statsKey = `${USER_STATS_PREFIX}${uid}`;
      await AsyncStorage.setItem(statsKey, JSON.stringify(stats));
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  }

  /**
   * Calculate current and longest streaks from session history
   */
  private calculateStreaks(sortedHistory: SessionRecord[]): {
    currentStreak: number;
    longestStreak: number;
  } {
    if (sortedHistory.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    let currentStreak = 1;
    let longestStreak = 1;
    let tempStreak = 1;

    // Get unique dates
    const uniqueDates = new Set(
      sortedHistory.map((session) =>
        new Date(session.completedAt).toDateString()
      )
    );

    const dateArray = Array.from(uniqueDates).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    // Calculate streaks
    for (let i = 1; i < dateArray.length; i++) {
      const prevDate = new Date(dateArray[i - 1]);
      const currDate = new Date(dateArray[i]);
      const diffDays = Math.floor(
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    // Check if current streak is ongoing
    const today = new Date().toDateString();
    const lastSessionDate = dateArray[dateArray.length - 1];
    const daysSinceLastSession = Math.floor(
      (new Date(today).getTime() - new Date(lastSessionDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastSession <= 1) {
      currentStreak = tempStreak;
    } else {
      currentStreak = 0;
    }

    return { currentStreak, longestStreak };
  }

  /**
   * Get empty stats object
   */
  private getEmptyStats(): UserStats {
    return {
      totalSessions: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastSessionDate: null,
      firstSessionDate: null,
    };
  }

  /**
   * Clear session history for current user (for testing/reset)
   */
  async clearSessionHistory(): Promise<void> {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        return;
      }

      const uid = currentUser.uid;
      const historyKey = `${SESSION_HISTORY_PREFIX}${uid}`;
      const statsKey = `${USER_STATS_PREFIX}${uid}`;

      await AsyncStorage.multiRemove([historyKey, statsKey]);
    } catch (error) {
      console.error('Error clearing session history:', error);
    }
  }
}

export const userSessionService = new UserSessionService();
