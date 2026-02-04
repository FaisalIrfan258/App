import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { colors, fonts, spacing } from '../../constants/theme';

interface TimedPhysicalExerciseProps {
  instruction: string;
  duration: number; // in seconds
  onComplete: () => void;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const TimedPhysicalExercise: React.FC<TimedPhysicalExerciseProps> = ({
  instruction,
  duration,
  onComplete,
}) => {
  const [countdown, setCountdown] = useState(duration);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const CIRCLE_RADIUS = 80;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Animate progress ring
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration * 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
      // Light haptic pulse every second
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Calculate stroke dash offset for progress ring
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCLE_CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Instruction Text */}
        <Text style={styles.instructionText}>{instruction}</Text>

        {/* Circular Progress with Countdown */}
        <View style={styles.timerContainer}>
          <Svg width={200} height={200} viewBox="0 0 200 200">
            {/* Background Circle */}
            <Circle
              cx="100"
              cy="100"
              r={CIRCLE_RADIUS}
              stroke="rgba(139, 127, 212, 0.2)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <AnimatedCircle
              cx="100"
              cy="100"
              r={CIRCLE_RADIUS}
              stroke="#8B7FD4"
              strokeWidth="8"
              fill="none"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="100, 100"
            />
          </Svg>

          {/* Countdown Number */}
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  instructionText: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: spacing.xxl * 2,
    paddingHorizontal: spacing.lg,
  },
  timerContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontFamily: fonts.bold,
    fontSize: 72,
    color: '#8B7FD4',
  },
});

export default TimedPhysicalExercise;
