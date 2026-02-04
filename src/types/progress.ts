export interface ProgressData {
  calmRecoveries: number;      // Count of completed sessions
  resetMinutes: number;        // Total minutes in activities
  currentStreak: number;       // Consecutive days
  lastActivityDate: string | null;
}

export interface WeeklyProgress {
  sessionsThisWeek: number;
  recoveryPercentage: number;
}
