import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle, Animated, Easing } from 'react-native';
import { colors, spacing } from '../../constants/theme';

interface ProgressIndicatorProps {
  currentIndex: number;
  totalScreens?: number;
  style?: ViewStyle;
}

const DOT_SIZE = 8;
const ACTIVE_DOT_WIDTH = 24;

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentIndex,
  totalScreens = 8,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalScreens }).map((_, index) => (
        <Dot key={index} isActive={index === currentIndex} />
      ))}
    </View>
  );
};

interface DotProps {
  isActive: boolean;
}

const Dot: React.FC<DotProps> = ({ isActive }) => {
  const width = useRef(new Animated.Value(DOT_SIZE)).current;
  const backgroundColor = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: isActive ? ACTIVE_DOT_WIDTH : DOT_SIZE,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    Animated.timing(backgroundColor, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.text.tertiary, colors.primary.default],
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width,
          backgroundColor: interpolatedColor,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});

export default ProgressIndicator;
