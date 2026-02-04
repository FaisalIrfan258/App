import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts, spacing } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ARC_WIDTH = SCREEN_WIDTH - 40;  // Wider arc for better visual
const ARC_HEIGHT = 320;  // Taller arc for proper parabolic curve

interface ArcBreathingProps {
  phase: 'inhale' | 'hold' | 'exhale';
  currentCycle?: number;
  totalCycles?: number;
  onCycleComplete?: () => void;
}

const ArcBreathing: React.FC<ArcBreathingProps> = ({
  phase,
  currentCycle = 0,
  totalCycles = 3,
  onCycleComplete
}) => {
  const ballPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hold phase: keep ball at top (position 1), no animation
    if (phase === 'hold') {
      return;
    }

    const targetValue = phase === 'inhale' ? 1 : 0;
    // Animation durations: 4s for inhale, 8s for exhale
    const animationDuration = phase === 'inhale' ? 4000 : 8000;

    Animated.timing(ballPosition, {
      toValue: targetValue,
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && phase === 'exhale' && onCycleComplete) {
        onCycleComplete();
      }
    });
  }, [phase]);

  // Calculate ball position along the arc path
  const ballTranslateX = ballPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [40, ARC_WIDTH - 40], // Account for padding to match arc endpoints
  });

  // Smooth parabolic motion matching the SVG arc
  // Ball moves up to peak (-ARC_HEIGHT) at midpoint, then back down
  const ballTranslateY = ballPosition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -ARC_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  // Create SVG path for the arc (quadratic bezier curve)
  // Smooth parabolic arc from bottom-left to bottom-right with control point at center-top
  const arcPath = `M 40 ${ARC_HEIGHT} Q ${ARC_WIDTH / 2} 0 ${ARC_WIDTH - 40} ${ARC_HEIGHT}`;

  return (
    <View style={styles.container}>
      {/* Session counter */}
      <Text style={styles.counterText}>
        Session {currentCycle + 1} of {totalCycles}
      </Text>

      <Text style={styles.instructionText}>
        Synchronize your breath to when the ball goes down
      </Text>

      {/* Arc and Ball Container */}
      <View style={styles.arcContainer}>
        {/* SVG Arc */}
        <Svg
          width={ARC_WIDTH}
          height={ARC_HEIGHT + 40}
          viewBox={`0 0 ${ARC_WIDTH} ${ARC_HEIGHT + 20}`}
          style={styles.svg}
        >
          <Path
            d={arcPath}
            stroke="#9583E1"
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>

        {/* Animated Ball */}
        <Animated.View
          style={[
            styles.ball,
            {
              transform: [
                { translateX: ballTranslateX },
                { translateY: ballTranslateY },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  counterText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: '#9583E1',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  instructionText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xxl * 2,
  },
  arcContainer: {
    width: ARC_WIDTH,
    height: ARC_HEIGHT + 40,
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  ball: {
    position: 'absolute',
    bottom: 0,
    left: -20, // Offset for 40px ball center
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD60A',
    shadowColor: '#FFD60A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default ArcBreathing;
