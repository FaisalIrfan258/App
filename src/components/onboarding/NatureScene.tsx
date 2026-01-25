import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Path,
  Circle,
  RadialGradient,
  Ellipse,
} from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCENE_HEIGHT = 320;

interface StarProps {
  cx: number;
  cy: number;
  r: number;
  delay: number;
}

const Star: React.FC<StarProps> = ({ cx, cy, r, delay }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ),
    ]).start();
  }, []);

  // For now, just render a static star since AnimatedCircle requires react-native-svg-animations
  return <Circle cx={cx} cy={cy} r={r} fill="white" opacity={0.6} />;
};

const NatureScene: React.FC = () => {
  const stars = [
    { cx: 30, cy: 25, r: 1.5, delay: 0 },
    { cx: 80, cy: 40, r: 1, delay: 500 },
    { cx: 120, cy: 20, r: 1.2, delay: 1000 },
    { cx: 160, cy: 50, r: 0.8, delay: 300 },
    { cx: 200, cy: 30, r: 1.3, delay: 800 },
    { cx: 250, cy: 45, r: 1, delay: 200 },
    { cx: 290, cy: 25, r: 1.5, delay: 600 },
    { cx: 330, cy: 55, r: 0.9, delay: 1200 },
    { cx: 50, cy: 60, r: 1.1, delay: 400 },
    { cx: 140, cy: 70, r: 0.7, delay: 900 },
    { cx: 220, cy: 65, r: 1.2, delay: 100 },
    { cx: 310, cy: 35, r: 1, delay: 700 },
  ];

  return (
    <View style={styles.container}>
      <Svg width={SCREEN_WIDTH} height={SCENE_HEIGHT} viewBox={`0 0 ${SCREEN_WIDTH} ${SCENE_HEIGHT}`}>
        <Defs>
          {/* Sky gradient */}
          <LinearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#1a1625" stopOpacity="1" />
            <Stop offset="0.5" stopColor="#2d2640" stopOpacity="1" />
            <Stop offset="1" stopColor="#1a1a2e" stopOpacity="1" />
          </LinearGradient>

          {/* Mountain gradients */}
          <LinearGradient id="mountain1" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#2d2640" stopOpacity="1" />
            <Stop offset="1" stopColor="#1a1625" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="mountain2" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#3d3555" stopOpacity="1" />
            <Stop offset="1" stopColor="#2d2640" stopOpacity="1" />
          </LinearGradient>

          {/* Campfire glow */}
          <RadialGradient id="fireGlow" cx="0.5" cy="0.5" r="0.5">
            <Stop offset="0" stopColor="#FF6B35" stopOpacity="0.6" />
            <Stop offset="0.5" stopColor="#FF6B35" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#FF6B35" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Sky background */}
        <Rect x="0" y="0" width={SCREEN_WIDTH} height={SCENE_HEIGHT} fill="url(#skyGradient)" />

        {/* Stars */}
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}

        {/* Back mountains */}
        <Path
          d={`M0,${SCENE_HEIGHT * 0.55}
              L${SCREEN_WIDTH * 0.15},${SCENE_HEIGHT * 0.35}
              L${SCREEN_WIDTH * 0.35},${SCENE_HEIGHT * 0.5}
              L${SCREEN_WIDTH * 0.5},${SCENE_HEIGHT * 0.3}
              L${SCREEN_WIDTH * 0.7},${SCENE_HEIGHT * 0.45}
              L${SCREEN_WIDTH * 0.85},${SCENE_HEIGHT * 0.32}
              L${SCREEN_WIDTH},${SCENE_HEIGHT * 0.5}
              L${SCREEN_WIDTH},${SCENE_HEIGHT}
              L0,${SCENE_HEIGHT} Z`}
          fill="url(#mountain1)"
        />

        {/* Front mountains */}
        <Path
          d={`M0,${SCENE_HEIGHT * 0.7}
              L${SCREEN_WIDTH * 0.2},${SCENE_HEIGHT * 0.5}
              L${SCREEN_WIDTH * 0.4},${SCENE_HEIGHT * 0.65}
              L${SCREEN_WIDTH * 0.6},${SCENE_HEIGHT * 0.48}
              L${SCREEN_WIDTH * 0.8},${SCENE_HEIGHT * 0.6}
              L${SCREEN_WIDTH},${SCENE_HEIGHT * 0.52}
              L${SCREEN_WIDTH},${SCENE_HEIGHT}
              L0,${SCENE_HEIGHT} Z`}
          fill="url(#mountain2)"
        />

        {/* Ground */}
        <Path
          d={`M0,${SCENE_HEIGHT * 0.75}
              Q${SCREEN_WIDTH * 0.25},${SCENE_HEIGHT * 0.72}
              ${SCREEN_WIDTH * 0.5},${SCENE_HEIGHT * 0.75}
              Q${SCREEN_WIDTH * 0.75},${SCENE_HEIGHT * 0.78}
              ${SCREEN_WIDTH},${SCENE_HEIGHT * 0.75}
              L${SCREEN_WIDTH},${SCENE_HEIGHT}
              L0,${SCENE_HEIGHT} Z`}
          fill="#1a1625"
        />

        {/* Pine trees - left side */}
        <Path
          d={`M${SCREEN_WIDTH * 0.08},${SCENE_HEIGHT * 0.75}
              L${SCREEN_WIDTH * 0.12},${SCENE_HEIGHT * 0.55}
              L${SCREEN_WIDTH * 0.16},${SCENE_HEIGHT * 0.75} Z`}
          fill="#0d0d12"
        />
        <Path
          d={`M${SCREEN_WIDTH * 0.18},${SCENE_HEIGHT * 0.78}
              L${SCREEN_WIDTH * 0.23},${SCENE_HEIGHT * 0.52}
              L${SCREEN_WIDTH * 0.28},${SCENE_HEIGHT * 0.78} Z`}
          fill="#0d0d12"
        />

        {/* Pine trees - right side */}
        <Path
          d={`M${SCREEN_WIDTH * 0.72},${SCENE_HEIGHT * 0.78}
              L${SCREEN_WIDTH * 0.77},${SCENE_HEIGHT * 0.54}
              L${SCREEN_WIDTH * 0.82},${SCENE_HEIGHT * 0.78} Z`}
          fill="#0d0d12"
        />
        <Path
          d={`M${SCREEN_WIDTH * 0.84},${SCENE_HEIGHT * 0.75}
              L${SCREEN_WIDTH * 0.88},${SCENE_HEIGHT * 0.58}
              L${SCREEN_WIDTH * 0.92},${SCENE_HEIGHT * 0.75} Z`}
          fill="#0d0d12"
        />

        {/* Campfire glow */}
        <Ellipse
          cx={SCREEN_WIDTH * 0.5}
          cy={SCENE_HEIGHT * 0.88}
          rx={50}
          ry={30}
          fill="url(#fireGlow)"
        />

        {/* Tent */}
        <Path
          d={`M${SCREEN_WIDTH * 0.38},${SCENE_HEIGHT * 0.82}
              L${SCREEN_WIDTH * 0.5},${SCENE_HEIGHT * 0.58}
              L${SCREEN_WIDTH * 0.62},${SCENE_HEIGHT * 0.82} Z`}
          fill="#2d2640"
          stroke="#3d3555"
          strokeWidth={1}
        />
        {/* Tent opening */}
        <Path
          d={`M${SCREEN_WIDTH * 0.46},${SCENE_HEIGHT * 0.82}
              L${SCREEN_WIDTH * 0.5},${SCENE_HEIGHT * 0.7}
              L${SCREEN_WIDTH * 0.54},${SCENE_HEIGHT * 0.82} Z`}
          fill="#1a1625"
        />

        {/* Campfire */}
        <Circle cx={SCREEN_WIDTH * 0.5} cy={SCENE_HEIGHT * 0.88} r={4} fill="#FF6B35" />
        <Circle cx={SCREEN_WIDTH * 0.48} cy={SCENE_HEIGHT * 0.86} r={2} fill="#FFB347" />
        <Circle cx={SCREEN_WIDTH * 0.52} cy={SCENE_HEIGHT * 0.87} r={2.5} fill="#FF8C42" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCENE_HEIGHT,
    marginLeft: -24, // Offset the padding from OnboardingLayout
  },
});

export default NatureScene;
