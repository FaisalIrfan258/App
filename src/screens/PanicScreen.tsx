import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import PanicIntroScreen from '../components/panic/PanicIntroScreen';
import ArcBreathing from '../components/panic/ArcBreathing';
import GroundingPrompt from '../components/panic/GroundingPrompt';
import TimedPhysicalExercise from '../components/panic/TimedPhysicalExercise';
import PanicCompletion from '../components/panic/PanicCompletion';
import { colors } from '../constants/theme';
import { useProgress } from '../contexts/ProgressContext';

// Flow steps (13 total)
type FlowStep =
  | 'intro'              // Step 1: "You're Safe" with gradient blob
  | 'breathing'          // Step 2: Arc breathing animation (3 cycles)
  | 'reassurance1'       // Step 3: "Good. Stay with me"
  | 'reassurance2'       // Step 4: "Your body is beginning to relax"
  | 'exercise-feet'      // Step 5: Press feet (5s timer)
  | 'exercise-shoulders' // Step 6: Roll shoulders (5s timer)
  | 'exercise-jaw'       // Step 7: Unclench jaw (5s timer)
  | 'reassurance3'       // Step 8: "You're coming back into your body"
  | 'reassurance4'       // Step 9: "Notice where you're sitting and standing"
  | 'counting'           // Step 10: Count rectangular objects (15s)
  | 'exercise-tongue'    // Step 11: Press tongue (5s timer)
  | 'reassurance5'       // Step 12: "This feeling won't harm you"
  | 'completion';        // Step 13: "You did it!"

interface StepConfig {
  component: 'intro' | 'breathing' | 'grounding' | 'exercise' | 'completion';
  duration?: number; // milliseconds, undefined = manual advance
  text?: string; // for grounding prompts and exercises
  hapticOnEnter?: boolean;
  hapticOnExit?: boolean;
}

const STEP_CONFIGS: Record<FlowStep, StepConfig> = {
  'intro': { component: 'intro', duration: 4000, hapticOnExit: true },
  'breathing': { component: 'breathing', hapticOnExit: true }, // 3 cycles, ~57s
  'reassurance1': { component: 'grounding', duration: 4000, text: 'Good. Stay with me', hapticOnEnter: true },
  'reassurance2': { component: 'grounding', duration: 4000, text: 'Your body is beginning to relax' },
  'exercise-feet': { component: 'exercise', duration: 5000, text: 'Press your feet firmly against the floor for 5 sec', hapticOnExit: true },
  'exercise-shoulders': { component: 'exercise', duration: 5000, text: 'Roll your shoulders back slowly', hapticOnExit: true },
  'exercise-jaw': { component: 'exercise', duration: 5000, text: 'Unclench your jaw', hapticOnExit: true },
  'reassurance3': { component: 'grounding', duration: 4000, text: 'You\'re coming back into your body' },
  'reassurance4': { component: 'grounding', duration: 4000, text: 'Notice where you\'re sitting and standing' },
  'counting': { component: 'grounding', duration: 15000, text: 'Silently count 5 objects you can see that are rectangular' },
  'exercise-tongue': { component: 'exercise', duration: 5000, text: 'Gently press your tongue to the roof of your mouth', hapticOnExit: true },
  'reassurance5': { component: 'grounding', duration: 4000, text: 'This feeling won\'t harm you. It will pass.' },
  'completion': { component: 'completion' }, // manual dismiss
};

// Define step order
const STEP_ORDER: FlowStep[] = [
  'intro',
  'breathing',
  'reassurance1',
  'reassurance2',
  'exercise-feet',
  'exercise-shoulders',
  'exercise-jaw',
  'reassurance3',
  'reassurance4',
  'counting',
  'exercise-tongue',
  'reassurance5',
  'completion',
];

const BREATHING_CYCLES = 3;

interface PanicScreenProps {
  navigation: any;
}

const PanicScreen: React.FC<PanicScreenProps> = ({ navigation }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCycles, setBreathingCycles] = useState(0);
  const { recordActivity } = useProgress();
  const startTimeRef = useRef<number>(Date.now());

  const currentStep = STEP_ORDER[currentStepIndex];
  const config = STEP_CONFIGS[currentStep];

  // Handle step entry haptics
  useEffect(() => {
    if (config.hapticOnEnter) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [currentStep]);

  // Handle auto-advance for timed steps
  useEffect(() => {
    if (!config.duration || config.component === 'intro') return;
    if (config.component === 'breathing') return; // Breathing has its own timer

    const timer = setTimeout(() => {
      handleStepComplete();
    }, config.duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Handle breathing phase changes
  useEffect(() => {
    if (currentStep !== 'breathing') return;

    // Phase durations: 4-7-8 breathing technique
    const phaseDuration = breathingPhase === 'inhale' ? 4000
      : breathingPhase === 'hold' ? 7000
      : 8000;

    const timer = setTimeout(() => {
      if (breathingPhase === 'inhale') {
        setBreathingPhase('hold');
      } else if (breathingPhase === 'hold') {
        setBreathingPhase('exhale');
      } else {
        // Completed one full cycle
        const newCycles = breathingCycles + 1;
        setBreathingCycles(newCycles);

        if (newCycles >= BREATHING_CYCLES) {
          // Move to next step
          handleStepComplete();
        } else {
          setBreathingPhase('inhale');
        }
      }
    }, phaseDuration);

    return () => clearTimeout(timer);
  }, [currentStep, breathingPhase, breathingCycles]);

  // Handle step completion
  const handleStepComplete = useCallback(() => {
    // Trigger exit haptic if configured
    if (config.hapticOnExit) {
      if (currentStep === 'intro' || currentStep === 'breathing') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }

    // Move to next step
    if (currentStepIndex < STEP_ORDER.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  }, [currentStepIndex, currentStep, config]);

  // Handle final completion
  const handleFinish = useCallback(async () => {
    // Calculate elapsed time in minutes
    const elapsedMs = Date.now() - startTimeRef.current;
    const elapsedMinutes = Math.round(elapsedMs / 60000);

    await recordActivity(elapsedMinutes);
    navigation.goBack();
  }, [navigation, recordActivity]);

  // Render current step
  const renderStep = () => {
    switch (config.component) {
      case 'intro':
        return <PanicIntroScreen onComplete={handleStepComplete} />;

      case 'breathing':
        return (
          <ArcBreathing
            phase={breathingPhase}
            currentCycle={breathingCycles}
            totalCycles={BREATHING_CYCLES}
          />
        );

      case 'grounding':
        return <GroundingPrompt text={config.text!} />;

      case 'exercise':
        return (
          <TimedPhysicalExercise
            instruction={config.text!}
            duration={config.duration! / 1000}
            onComplete={handleStepComplete}
          />
        );

      case 'completion':
        return <PanicCompletion onFinish={handleFinish} />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {renderStep()}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
});

export default PanicScreen;
