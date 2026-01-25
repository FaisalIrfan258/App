import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  gradientColors?: readonly [string, string, ...string[]];
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  gradientColors = [colors.background.gradient.start, colors.background.gradient.end] as const,
}) => {
  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default AnimatedBackground;
