import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { fonts } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import BreathingCircles from '../../components/onboarding/BreathingCircles';
import SkipButton from '../../components/onboarding/SkipButton';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'BreathingIntro'>;

const { width, height } = Dimensions.get('window');

const INHALE_DURATION = 4000;  // 4 seconds
const EXHALE_DURATION = 6000;  // 6 seconds
const TOTAL_CYCLES = 2;

const BreathingIntroScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
          // Auto-navigate after cycles complete
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          navigation.navigate('Feeling');
        } else {
          runPhase('inhale', newCycleCount);
        }
      }
    }, duration);
  };

  return (
    <View style={styles.container}>
      {/* Purple radial gradient background */}
      <Svg
        width={width}
        height={height}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <RadialGradient
            id="purpleGradient"
            cx="50%"
            cy="50%"
            rx="68%"
            ry="162%"
          >
            <Stop offset="0%" stopColor="#836FC9" stopOpacity="1" />
            <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#purpleGradient)"
        />
      </Svg>

      {/* Skip Button */}
      <SkipButton />

      {/* Breathing Circles */}
      <BreathingCircles
        phase={phase}
        inhaleDuration={INHALE_DURATION}
        exhaleDuration={EXHALE_DURATION}
      />

      {/* Centered Text */}
      <View style={styles.textContainer}>
        <Text style={styles.breathText}>
          {phase === 'inhale' ? 'Breath In' : 'Breath Out'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathText: {
    fontSize: 24,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default BreathingIntroScreen;
