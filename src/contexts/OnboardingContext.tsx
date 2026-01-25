import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { onboardingService } from '../services/onboardingService';

interface OnboardingContextType {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: ReactNode;
  initialCompleted: boolean;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  initialCompleted,
}) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(initialCompleted);

  const completeOnboarding = useCallback(async () => {
    await onboardingService.saveData({
      completedAt: new Date().toISOString(),
    });
    await onboardingService.markCompleted();
    setHasCompletedOnboarding(true);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        hasCompletedOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
