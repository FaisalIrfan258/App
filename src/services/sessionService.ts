import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENT_SESSION_KEY = '@today_current_session';
const LAST_PLAYED_DATE_KEY = '@today_last_played_date';
const TOTAL_SESSIONS = 4; // Updated to 4 sessions

// Session audio sources - these will be loaded by expo-av
// Using require for assets that expo-av can handle
const SESSION_SOURCES = [
  require('../../assets/audio/S1.mp3'),
  require('../../assets/audio/S2.mp3'),
  require('../../assets/audio/S3.mp3'),
  require('../../assets/audio/S4.mp3'),
];

/**
 * Get the current session index (0-based)
 * Sessions rotate daily: Day 1 = Session 1, Day 2 = Session 2, etc.
 * After all sessions are played, it starts from Session 1 again
 */
export const getCurrentSessionIndex = async (): Promise<number> => {
  try {
    const today = new Date().toDateString();
    const lastPlayedDate = await AsyncStorage.getItem(LAST_PLAYED_DATE_KEY);
    const currentSession = await AsyncStorage.getItem(CURRENT_SESSION_KEY);

    if (!currentSession) {
      // First time user - start with session 0
      await AsyncStorage.setItem(CURRENT_SESSION_KEY, '0');
      await AsyncStorage.setItem(LAST_PLAYED_DATE_KEY, today);
      return 0;
    }

    const sessionIndex = parseInt(currentSession, 10);

    // If it's a new day, advance to the next session
    if (lastPlayedDate !== today) {
      const nextSession = (sessionIndex + 1) % TOTAL_SESSIONS;
      await AsyncStorage.setItem(CURRENT_SESSION_KEY, nextSession.toString());
      await AsyncStorage.setItem(LAST_PLAYED_DATE_KEY, today);
      return nextSession;
    }

    return sessionIndex;
  } catch (error) {
    return 0;
  }
};

/**
 * Get the audio source for the current session
 * Since we only have 2 sessions now, we'll use modulo to rotate between available ones
 */
export const getCurrentSessionAudio = async () => {
  const sessionIndex = await getCurrentSessionIndex();
  // Use modulo to handle case where we have fewer audio files than TOTAL_SESSIONS
  const audioIndex = sessionIndex % SESSION_SOURCES.length;

  return {
    source: SESSION_SOURCES[audioIndex],
    sessionNumber: sessionIndex + 1, // 1-based for display
    totalSessions: TOTAL_SESSIONS,
  };
};

/**
 * Mark a session as completed
 * This can be used to track user progress
 */
export const markSessionCompleted = async (sessionIndex: number): Promise<void> => {
  try {
    const completedKey = `@today_session_${sessionIndex}_completed`;
    await AsyncStorage.setItem(completedKey, new Date().toISOString());
  } catch (error) {
    // Silently fail - completion won't be tracked
  }
};

/**
 * Reset session progress (for testing or user preference)
 */
export const resetSessionProgress = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CURRENT_SESSION_KEY);
    await AsyncStorage.removeItem(LAST_PLAYED_DATE_KEY);
  } catch (error) {
    // Silently fail - reset won't complete
  }
};
