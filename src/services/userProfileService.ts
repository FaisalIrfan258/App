import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, MIN_AGE, MAX_AGE } from '../types/profile';

const STORAGE_KEY = '@today_user_profile';
const LEGACY_NAME_KEY = 'userName';
const LEGACY_AGE_KEY = 'userAge';

class UserProfileService {
  async getProfile(): Promise<UserProfile | null> {
    try {
      // Check for new format first
      const profileData = await AsyncStorage.getItem(STORAGE_KEY);
      if (profileData) {
        return JSON.parse(profileData);
      }

      // Check for legacy format and migrate
      const legacyName = await AsyncStorage.getItem(LEGACY_NAME_KEY);
      const legacyAge = await AsyncStorage.getItem(LEGACY_AGE_KEY);

      if (legacyName || legacyAge) {
        const migratedProfile: UserProfile = {
          name: legacyName || '',
          age: legacyAge ? parseInt(legacyAge, 10) : 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Save in new format
        await this.saveProfile(migratedProfile);

        // Clean up legacy keys
        await AsyncStorage.multiRemove([LEGACY_NAME_KEY, LEGACY_AGE_KEY]);

        return migratedProfile;
      }

      return null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  async saveProfile(profile: UserProfile): Promise<void> {
    try {
      // Validate
      if (!profile.name || profile.name.trim().length === 0) {
        console.error('Invalid profile: name is required');
        return;
      }

      if (profile.age < MIN_AGE || profile.age > MAX_AGE) {
        console.error(`Invalid profile: age must be between ${MIN_AGE} and ${MAX_AGE}`);
        return;
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }

  async updateProfile(updates: Partial<Omit<UserProfile, 'createdAt'>>): Promise<void> {
    try {
      const currentProfile = await this.getProfile();
      if (!currentProfile) {
        console.error('No profile to update');
        return;
      }

      const updatedProfile: UserProfile = {
        ...currentProfile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await this.saveProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  async clearProfile(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing profile:', error);
    }
  }
}

export const userProfileService = new UserProfileService();
