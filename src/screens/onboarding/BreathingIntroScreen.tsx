import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { colors, fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import BreathingBlob from '../../components/onboarding/BreathingBlob';
import Button from '../../components/common/Button';
import SkipButton from '../../components/onboarding/SkipButton';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'BreathingIntro'>;

const INHALE_DURATION = 4000;
const EXHALE_DURATION = 4000;
const TOTAL_CYCLES = 3;

const BreathingIntroScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startBreathingCycle();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const startBreathingCycle = () => {
    runPhase('inhale', 0);
  };

  const runPhase = (currentPhase: 'inhale' | 'exhale', currentCycle: number) => {
    setPhase(currentPhase);

    if (currentPhase === 'inhale') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const duration = currentPhase === 'inhale' ? INHALE_DURATION : EXHALE_DURATION;

    timerRef.current = setTimeout(() => {
      if (currentPhase === 'inhale') {
        runPhase('exhale', currentCycle);
      } else {
        const newCycleCount = currentCycle + 1;
        setCycleCount(newCycleCount);

        if (newCycleCount >= TOTAL_CYCLES) {
          setShowContinue(true);
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }).start();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          runPhase('inhale', newCycleCount);
        }
      }
    }, duration);
  };

  const handleContinue = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    navigation.navigate('Feeling');
  };

  return (
    <View style={styles.container}>
      {/* Instruction Text - TOP */}
      <SafeAreaView edges={['top']} style={styles.instructionContainer}>
        <Text style={styles.instruction}>
          {phase === 'inhale' ? 'Breathe in' : 'Breathe out'}
        </Text>
      </SafeAreaView>

      {/* Breathing Blob - BOTTOM */}
      <BreathingBlob phase={phase} />

      {/* Button Group - Overlay */}
      {showContinue && (
        <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
          <View style={styles.buttonGroup}>
            <SkipButton />
            <Button
              variant="onboarding"
              onPress={handleContinue}
              accessibilityLabel="Continue to next step"
              accessibilityHint="Proceeds to the feeling selection screen"
            >
              Continue
            </Button>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  instructionContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  instruction: {
    fontFamily: fonts.light,
    fontSize: 32,
    color: colors.text.primary,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    zIndex: 3,
  },
  buttonGroup: {
    alignItems: 'center',
  },
});

export default BreathingIntroScreen;
