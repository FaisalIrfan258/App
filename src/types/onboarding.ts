/**
 * Type definitions for onboarding flow
 */

// Navigation types
export type OnboardingStackParamList = {
  Splash: undefined;
  BreathingIntro: undefined;
  Feeling: undefined;
  Motivational: undefined;
  Commitment: undefined;
  Control: undefined;
  Review: undefined;
  SignIn: undefined;
  Paywall: undefined;
};

// Screen names for progress tracking (excluding Splash)
export const ONBOARDING_SCREENS = [
  'BreathingIntro',
  'Feeling',
  'Motivational',
  'Commitment',
  'Control',
  'Review',
  'SignIn',
  'Paywall',
] as const;

export type OnboardingScreen = (typeof ONBOARDING_SCREENS)[number];

// Feeling options
export type FeelingOption =
  | 'overthinking'
  | 'constant-pressure'
  | 'burned-out'
  | 'panic-anxiety'
  | 'just-tired';

export interface FeelingChoice {
  id: FeelingOption;
  label: string;
  icon: string;
}

// Commitment options
export type CommitmentChoice = 'yes-try' | 'not-sure';

// User selections stored during onboarding
export interface OnboardingData {
  feeling: FeelingOption | null;
  commitment: CommitmentChoice | null;
  completedAt: string | null;
}
