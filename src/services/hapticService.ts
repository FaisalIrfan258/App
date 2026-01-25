import * as Haptics from 'expo-haptics';

/**
 * Haptic Service for Today: Panic Attack Relief
 * Provides synchronized haptic feedback patterns for breathing exercises
 */

class HapticService {
  private isPulsing = false;
  private pulseIntervalId: NodeJS.Timeout | null = null;

  /**
   * Breathing Inhale Pattern
   * Light impact at start + 4 pulses (1 per second)
   */
  async breathingInhale(): Promise<void> {
    // Initial impact
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // 4 pulses over 4 seconds
    this.startPulse(4, 1000, Haptics.ImpactFeedbackStyle.Light);
  }

  /**
   * Breathing Hold Pattern
   * No haptics during hold (calm moment)
   */
  async breathingHold(): Promise<void> {
    this.stopPulse();
    // Intentionally empty - no haptics during hold
  }

  /**
   * Breathing Exhale Pattern
   * Medium impact at start + 8 decreasing pulses
   */
  async breathingExhale(): Promise<void> {
    // Initial impact
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // 8 pulses over 8 seconds
    this.startPulse(8, 1000, Haptics.ImpactFeedbackStyle.Light);
  }

  /**
   * Breathing Pause Pattern
   * Gentle feedback during pause
   */
  async breathingPause(): Promise<void> {
    this.stopPulse();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  /**
   * Cycle Complete Notification
   * Success haptic when completing a breathing cycle
   */
  async cycleComplete(): Promise<void> {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
  }

  /**
   * Session Complete Notification
   * Stronger success haptic for ending session
   */
  async sessionComplete(): Promise<void> {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
  }

  /**
   * Button Press Feedback
   * Various intensities for different button types
   */
  async buttonPress(type: 'light' | 'medium' | 'heavy' = 'light'): Promise<void> {
    let feedbackStyle: Haptics.ImpactFeedbackStyle;

    switch (type) {
      case 'light':
        feedbackStyle = Haptics.ImpactFeedbackStyle.Light;
        break;
      case 'medium':
        feedbackStyle = Haptics.ImpactFeedbackStyle.Medium;
        break;
      case 'heavy':
        feedbackStyle = Haptics.ImpactFeedbackStyle.Heavy;
        break;
    }

    await Haptics.impactAsync(feedbackStyle);
  }

  /**
   * Selection Feedback
   * Light feedback for selections (e.g., swipe between cards)
   */
  async selection(): Promise<void> {
    await Haptics.selectionAsync();
  }

  /**
   * Error Feedback
   * For error states or invalid actions
   */
  async error(): Promise<void> {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Error
    );
  }

  /**
   * Warning Feedback
   * For warning states
   */
  async warning(): Promise<void> {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    );
  }

  /**
   * Start pulsing haptic pattern
   * Private method for creating timed pulses
   */
  private startPulse(
    count: number,
    intervalMs: number,
    style: Haptics.ImpactFeedbackStyle
  ): void {
    this.stopPulse();
    this.isPulsing = true;

    let pulseCount = 0;

    this.pulseIntervalId = setInterval(async () => {
      if (pulseCount >= count) {
        this.stopPulse();
        return;
      }

      if (this.isPulsing) {
        await Haptics.impactAsync(style);
        pulseCount++;
      }
    }, intervalMs);
  }

  /**
   * Stop any ongoing pulse pattern
   */
  private stopPulse(): void {
    if (this.pulseIntervalId) {
      clearInterval(this.pulseIntervalId);
      this.pulseIntervalId = null;
    }
    this.isPulsing = false;
  }

  /**
   * Cleanup method - call when unmounting or ending session
   */
  cleanup(): void {
    this.stopPulse();
  }
}

// Export singleton instance
export const hapticService = new HapticService();
