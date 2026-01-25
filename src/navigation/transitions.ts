import { Easing } from 'react-native';
import { StackCardInterpolationProps } from '@react-navigation/stack';

/**
 * Instagram-like transition interpolator
 * Minimal horizontal slide with subtle opacity fade
 */
export const forInstagramTransition = ({ current, layouts }: StackCardInterpolationProps) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [15, 0], // 15px subtle slide
          }),
        },
      ],
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.95, 1.0], // Imperceptible opacity fade
      }),
    },
  };
};

/**
 * Instagram-like transition timing config
 * Fast and smooth with cubic easing
 */
export const instagramTransitionSpec = {
  open: {
    animation: 'timing' as const,
    config: {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    },
  },
  close: {
    animation: 'timing' as const,
    config: {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    },
  },
};
