import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface BreathingCirclesProps {
  phase: 'inhale' | 'exhale';
  inhaleDuration: number;
  exhaleDuration: number;
}

const CIRCLE_SIZES = [640, 520, 390, 260]; // outer to inner

const BreathingCircles: React.FC<BreathingCirclesProps> = ({
  phase,
  inhaleDuration,
  exhaleDuration,
}) => {
  const scale = useRef(new Animated.Value(1.0)).current;

  useEffect(() => {
    if (phase === 'inhale') {
      Animated.timing(scale, {
        toValue: 1.15,
        duration: inhaleDuration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 1.0,
        duration: exhaleDuration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [phase, scale, inhaleDuration, exhaleDuration]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circlesWrapper,
          { transform: [{ scale }] },
        ]}
      >
        {CIRCLE_SIZES.map((size, index) => (
          <View
            key={index}
            style={[
              styles.circle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlesWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.20)',
  },
});

export default BreathingCircles;
