import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, fonts, typography, borderRadius, shadows, RECOMMENDED_TAP_TARGET } from '../../constants/theme';

export type ButtonVariant = 'primary' | 'urgent' | 'secondary' | 'onboarding';
export type ButtonSize = 'large' | 'medium';
export type HapticType = 'light' | 'medium' | 'heavy';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress: () => void;
  children: React.ReactNode;
  hapticType?: HapticType;
  animatePress?: boolean;
  disabled?: boolean;
  accessibilityLabel: string;
  accessibilityHint?: string;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  onPress,
  children,
  hapticType = 'light',
  animatePress = true,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  style,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled && animatePress) {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled && animatePress) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePress = async () => {
    if (disabled) return;

    // Trigger haptic feedback
    switch (hapticType) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
    }

    onPress();
  };

  const getButtonStyle = (): ViewStyle => {
    let backgroundColor = colors.primary.default;
    let shadow = shadows.medium;

    // Onboarding variant has special styling - matches Figma specs
    if (variant === 'onboarding') {
      return {
        backgroundColor: '#FFFFFF',
        width: 354,
        height: 60,
        paddingHorizontal: 24,
        paddingVertical: 19,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      };
    }

    if (disabled) {
      backgroundColor = colors.primary.disabled;
      shadow = shadows.small;
    } else {
      switch (variant) {
        case 'primary':
          backgroundColor = colors.primary.default;
          break;
        case 'urgent':
          backgroundColor = colors.urgent.default;
          shadow = shadows.large;
          break;
        case 'secondary':
          backgroundColor = colors.background.secondary;
          break;
      }
    }

    const height = size === 'large' ? RECOMMENDED_TAP_TARGET : 48;

    return {
      backgroundColor,
      height,
      paddingHorizontal: 32,
      borderRadius: borderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      ...shadow,
    };
  };

  const getTextStyle = (): TextStyle => {
    // Onboarding variant has special text styling - matches Figma specs
    if (variant === 'onboarding') {
      return {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center',
        fontFamily: fonts.medium,
      };
    }

    const typo = size === 'large' ? typography.buttonLarge : typography.button;
    let color = colors.text.inverse;

    if (variant === 'secondary') {
      color = colors.text.primary;
    }

    return {
      ...typo,
      color,
    };
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        style={[styles.button, getButtonStyle()]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <Text style={[styles.text, getTextStyle()]}>{children}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    // Width is defined in getButtonStyle based on variant
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
