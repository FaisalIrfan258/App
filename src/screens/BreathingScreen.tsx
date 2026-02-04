import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BreathingCircle from '../components/breathing/BreathingCircle';
import { useBreathingCycle, BreathingPhase } from '../hooks/useBreathingCycle';
import { hapticService } from '../services/hapticService';
import { colors, typography, spacing } from '../constants/theme';
import { useProgress } from '../contexts/ProgressContext';

interface BreathingScreenProps {
  navigation: any;
}

const BreathingScreen: React.FC<BreathingScreenProps> = ({ navigation }) => {
  const { phase, progress, countdown, cycleCount } = useBreathingCycle();
  const [showOptions, setShowOptions] = useState(false);
  const optionsOpacity = React.useRef(new Animated.Value(0)).current;
  const { recordActivity } = useProgress();

  // Trigger haptics on phase change
  useEffect(() => {
    switch (phase) {
      case 'inhale':
        hapticService.breathingInhale();
        break;
      case 'hold':
        hapticService.breathingHold();
        break;
      case 'exhale':
        hapticService.breathingExhale();
        break;
      case 'pause':
        hapticService.breathingPause();
        // Trigger cycle complete haptic
        if (cycleCount > 0) {
          hapticService.cycleComplete();
        }
        break;
    }
  }, [phase, cycleCount]);

  // Cleanup haptics on unmount
  useEffect(() => {
    return () => {
      hapticService.cleanup();
    };
  }, []);

  // Toggle options bottom sheet
  useEffect(() => {
    Animated.timing(optionsOpacity, {
      toValue: showOptions ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showOptions]);

  const getPhaseInstruction = (): string => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'pause':
        return 'Pause';
      default:
        return '';
    }
  };

  const handleClose = async () => {
    await hapticService.sessionComplete();
    // Each cycle is ~19 seconds, calculate minutes
    const minutes = Math.round((cycleCount * 19) / 60);
    if (cycleCount > 0) {
      await recordActivity(Math.max(minutes, 1));
    }
    navigation.goBack();
  };

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
    hapticService.selection();
  };

  return (
    <LinearGradient
      colors={[colors.background.gradient.start, colors.background.primary]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Breathe with me</Text>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            accessible={true}
            accessibilityLabel="End breathing exercise"
            accessibilityRole="button"
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Breathing Circle */}
          <View style={styles.circleContainer}>
            <BreathingCircle phase={phase} progress={progress} size={240} />
          </View>

          {/* Dynamic Instruction */}
          <View style={styles.instructionContainer}>
            <Text
              style={styles.instruction}
              accessible={true}
              accessibilityLabel={`${getPhaseInstruction()} for ${countdown} seconds`}
              accessibilityLiveRegion="polite"
            >
              {getPhaseInstruction()}
            </Text>
            <Text style={styles.countdown}>{countdown}</Text>
          </View>

          {/* Cycle Counter */}
          <Text style={styles.cycleCount}>
            {cycleCount} {cycleCount === 1 ? 'cycle' : 'cycles'} completed
          </Text>
        </View>

        {/* Bottom Options */}
        <View style={styles.bottomContainer}>
          <Pressable
            onPress={handleShowOptions}
            style={styles.moreOptions}
            accessible={true}
            accessibilityLabel="Show more calming options"
            accessibilityRole="button"
          >
            <Text style={styles.moreOptionsText}>⌄ More Options</Text>
          </Pressable>

          {showOptions && (
            <Animated.View
              style={[
                styles.optionsSheet,
                { opacity: optionsOpacity },
              ]}
            >
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => {
                  hapticService.selection();
                  navigation.navigate('Grounding');
                }}
                accessible={true}
                accessibilityLabel="Start grounding exercise"
                accessibilityRole="button"
              >
                <Text style={styles.optionButtonText}>Grounding Exercise</Text>
                <Text style={styles.optionDescription}>5-4-3-2-1 technique</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => {
                  hapticService.selection();
                  navigation.navigate('UpliftingText');
                }}
                accessible={true}
                accessibilityLabel="View uplifting affirmations"
                accessibilityRole="button"
              >
                <Text style={styles.optionButtonText}>Uplifting Text</Text>
                <Text style={styles.optionDescription}>Calming affirmations</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text.primary,
    fontWeight: '300',
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 28,
    color: colors.text.secondary,
    fontWeight: '300',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  circleContainer: {
    marginBottom: spacing.xxl,
  },
  instructionContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  instruction: {
    ...typography.instruction,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  countdown: {
    ...typography.h1,
    fontSize: 48,
    color: colors.text.secondary,
    fontWeight: '200',
  },
  cycleCount: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xl,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  moreOptions: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  moreOptionsText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  optionsSheet: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.md,
    marginTop: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  optionButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.sm,
    backgroundColor: colors.background.primary,
  },
  optionButtonText: {
    ...typography.button,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});

export default BreathingScreen;
