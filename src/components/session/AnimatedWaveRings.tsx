import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CENTER_SIZE = 100;
const NUM_RINGS = 5;

interface AnimatedWaveRingsProps {
  isPlaying: boolean;
  children?: React.ReactNode;
}

const AnimatedWaveRings: React.FC<AnimatedWaveRingsProps> = ({ isPlaying, children }) => {
  // Create animated values for each ring
  const ringAnimations = useRef(
    Array.from({ length: NUM_RINGS }, () => ({
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0.3),
    }))
  ).current;

  // Pulse animation that creates wave effect
  const pulseAnimation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isPlaying) {
      // Create staggered pulse animations for each ring
      const animations = ringAnimations.map((ring, index) => {
        const delay = index * 400; // Stagger each ring
        const duration = 2000 + index * 200; // Outer rings animate slower

        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
              Animated.sequence([
                Animated.timing(ring.scale, {
                  toValue: 1.15 - index * 0.02,
                  duration: duration / 2,
                  easing: Easing.inOut(Easing.sin),
                  useNativeDriver: true,
                }),
                Animated.timing(ring.scale, {
                  toValue: 1,
                  duration: duration / 2,
                  easing: Easing.inOut(Easing.sin),
                  useNativeDriver: true,
                }),
              ]),
              Animated.sequence([
                Animated.timing(ring.opacity, {
                  toValue: 0.5 - index * 0.05,
                  duration: duration / 2,
                  easing: Easing.inOut(Easing.sin),
                  useNativeDriver: true,
                }),
                Animated.timing(ring.opacity, {
                  toValue: 0.2 - index * 0.02,
                  duration: duration / 2,
                  easing: Easing.inOut(Easing.sin),
                  useNativeDriver: true,
                }),
              ]),
            ]),
          ])
        );
      });

      pulseAnimation.current = Animated.parallel(animations);
      pulseAnimation.current.start();
    } else {
      // Stop animations and reset
      pulseAnimation.current?.stop();
      ringAnimations.forEach((ring) => {
        Animated.parallel([
          Animated.timing(ring.scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(ring.opacity, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }

    return () => {
      pulseAnimation.current?.stop();
    };
  }, [isPlaying]);

  // Calculate ring sizes - they expand outward from center
  const getRingSize = (index: number) => {
    const baseSize = CENTER_SIZE + 80;
    return baseSize + index * 70;
  };

  return (
    <View style={styles.container}>
      {/* Render rings from outermost to innermost */}
      {ringAnimations
        .slice()
        .reverse()
        .map((ring, reversedIndex) => {
          const index = NUM_RINGS - 1 - reversedIndex;
          const size = getRingSize(index);

          return (
            <Animated.View
              key={index}
              style={[
                styles.ring,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  transform: [{ scale: ring.scale }],
                  opacity: ring.opacity,
                },
              ]}
            />
          );
        })}

      {/* Center glow effect */}
      <View style={styles.centerGlow} />

      {/* Children (play/pause button) */}
      <View style={styles.centerContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  centerGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedWaveRings;
