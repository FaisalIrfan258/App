/**
 * Onboarding service for managing onboarding state
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingData } from '../types/onboarding';

const ONBOARDING_KEY = '@today_onboarding';
const ONBOARDING_DATA_KEY = '@today_onboarding_data';

export const onboardingService = {
  /**
   * Check if onboarding has been completed
   */
  async isCompleted(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      return value === 'completed';
    } catch {
      return false;
    }
  },

  /**
   * Mark onboarding as completed
   */
  async markCompleted(): Promise<void> {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'completed');
    } catch (error) {
      console.error('Failed to mark onboarding as completed:', error);
    }
  },

  /**
   * Save onboarding data (feeling selection, commitment, etc.)
   */
  async saveData(data: Partial<OnboardingData>): Promise<void> {
    try {
      const existing = await this.getData();
      const updated = { ...existing, ...data };
      await AsyncStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
    }
  },

  /**
   * Get saved onboarding data
   */
  async getData(): Promise<OnboardingData> {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_DATA_KEY);
      return value
        ? JSON.parse(value)
        : { feeling: null, commitment: null, completedAt: null };
    } catch {
      return { feeling: null, commitment: null, completedAt: null };
    }
  },

  /**
   * Reset onboarding (for development/testing)
   */
  async reset(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([ONBOARDING_KEY, ONBOARDING_DATA_KEY]);
    } catch (error) {
      console.error('Failed to reset onboarding:', error);
    }
  },
};
