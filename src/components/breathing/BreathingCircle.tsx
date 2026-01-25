import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { colors } from '../../constants/theme';
import { BreathingPhase } from '../../hooks/useBreathingCycle';

interface BreathingCircleProps {
  phase: BreathingPhase;
  progress: number;
  size?: number;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({
  phase,
  progress,
  size = 200,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    switch (phase) {
      case 'inhale':
        // Expand circle over 4 seconds
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.5,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start();
        break;

      case 'hold':
        // Pulsate gently during hold
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.55,
              duration: 1750,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1.5,
              duration: 1750,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1.55,
              duration: 1750,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1.5,
              duration: 1750,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(opacity, {
            toValue: 0.95,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
        break;

      case 'exhale':
        // Contract circle over 8 seconds
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 8000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]).start();
        break;

      case 'pause':
        // Subtle breathing during pause
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0.95,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.7,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
        break;
    }
  }, [phase]);

  const getCircleColor = (): string => {
    switch (phase) {
      case 'inhale':
        return colors.breathing.inhale;
      case 'hold':
        return colors.breathing.hold;
      case 'exhale':
        return colors.breathing.exhale;
      case 'pause':
        return colors.breathing.inhale;
      default:
        return colors.breathing.inhale;
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale }],
            opacity,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: getCircleColor(),
          },
        ]}
      />
      {/* Outer glow ring */}
      <View
        style={[
          styles.glowRing,
          {
            width: size * 1.3,
            height: size * 1.3,
            borderRadius: (size * 1.3) / 2,
            borderColor: getCircleColor(),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  glowRing: {
    position: 'absolute',
    borderWidth: 2,
    opacity: 0.2,
  },
});

export default BreathingCircle;
