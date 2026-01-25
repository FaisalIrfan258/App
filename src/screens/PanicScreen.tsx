import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import ArcBreathing from '../components/panic/ArcBreathing';
import GroundingPrompt from '../components/panic/GroundingPrompt';
import GroundingPose from '../components/panic/GroundingPose';
import PanicCompletion from '../components/panic/PanicCompletion';
import { colors } from '../constants/theme';

// Flow steps
type FlowStep =
  | 'breathing'
  | 'grounding1'
  | 'grounding2'
  | 'grounding3'
  | 'pose'
  | 'completion';

// Grounding prompts
const GROUNDING_PROMPTS = [
  'Feel your feet',
  'Notice where you\'re sitting',
  'The wave is passing',
];

// Configuration
const BREATHING_CYCLES = 3;
const GROUNDING_PROMPT_DURATION = 4000; // 4 seconds per prompt
const POSE_DURATION = 60; // 60 seconds

interface PanicScreenProps {
  navigation: any;
}

const PanicScreen: React.FC<PanicScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('breathing');
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCycles, setBreathingCycles] = useState(0);
  const [currentGroundingIndex, setCurrentGroundingIndex] = useState(0);

  // Handle breathing phase changes
  useEffect(() => {
    if (currentStep !== 'breathing') return;

    // Phase durations: 4-7-8 breathing technique (inhale 4s, hold 7s, exhale 8s)
    const phaseDuration = breathingPhase === 'inhale' ? 4000
      : breathingPhase === 'hold' ? 7000
      : 8000;

    const timer = setTimeout(() => {
      if (breathingPhase === 'inhale') {
        setBreathingPhase('hold');
      } else if (breathingPhase === 'hold') {
        setBreathingPhase('exhale');
      } else {
        // Completed one full cycle (inhale → hold → exhale)
        const newCycles = breathingCycles + 1;
        setBreathingCycles(newCycles);

        if (newCycles >= BREATHING_CYCLES) {
          // Move to grounding
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setCurrentStep('grounding1');
        } else {
          setBreathingPhase('inhale');
        }
      }
    }, phaseDuration);

    return () => clearTimeout(timer);
  }, [currentStep, breathingPhase, breathingCycles]);

  // Handle grounding prompt transitions
  useEffect(() => {
    if (!currentStep.startsWith('grounding') || currentStep === 'pose') return;

    const timer = setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (currentStep === 'grounding1') {
        setCurrentStep('grounding2');
        setCurrentGroundingIndex(1);
      } else if (currentStep === 'grounding2') {
        setCurrentStep('grounding3');
        setCurrentGroundingIndex(2);
      } else if (currentStep === 'grounding3') {
        setCurrentStep('pose');
      }
    }, GROUNDING_PROMPT_DURATION);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Handle pose completion
  const handlePoseComplete = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCurrentStep('completion');
  }, []);

  // Handle finish
  const handleFinish = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'breathing':
        return (
          <ArcBreathing
            phase={breathingPhase}
            currentCycle={breathingCycles}
            totalCycles={BREATHING_CYCLES}
          />
        );

      case 'grounding1':
      case 'grounding2':
      case 'grounding3':
        return <GroundingPrompt text={GROUNDING_PROMPTS[currentGroundingIndex]} />;

      case 'pose':
        return (
          <GroundingPose
            duration={POSE_DURATION}
            onComplete={handlePoseComplete}
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
