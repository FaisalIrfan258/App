import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ProgressData } from '../types/progress';
import { progressService } from '../services/progressService';

interface ProgressContextType {
  progressData: ProgressData;
  recordActivity: (minutes: number) => Promise<void>;
  getRecoveryPercentage: () => number;
  isLoading: boolean;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [progressData, setProgressData] = useState<ProgressData>({
    calmRecoveries: 0,
    resetMinutes: 0,
    currentStreak: 0,
    lastActivityDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    try {
      const data = await progressService.getProgress();
      setProgressData(data);
    } catch (error) {
      // Keep default progress data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const recordActivity = useCallback(async (minutes: number) => {
    try {
      const updatedProgress = await progressService.recordActivity(minutes);
      setProgressData(updatedProgress);
    } catch (error) {
      // Silently fail - activity won't be recorded but app continues
    }
  }, []);

  const getRecoveryPercentage = useCallback(() => {
    return progressService.getRecoveryPercentage(progressData);
  }, [progressData]);

  const refreshProgress = useCallback(async () => {
    await loadProgress();
  }, [loadProgress]);

  return (
    <ProgressContext.Provider
      value={{
        progressData,
        recordActivity,
        getRecoveryPercentage,
        isLoading,
        refreshProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
