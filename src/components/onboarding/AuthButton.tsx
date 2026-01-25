import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fonts, spacing, borderRadius, shadows } from '../../constants/theme';

interface AuthButtonProps {
  provider: 'apple' | 'google';
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'filled' | 'outline';
}

const AuthButton: React.FC<AuthButtonProps> = ({ provider, onPress, style, variant = 'filled' }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      friction: 15,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 15,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const isApple = provider === 'apple';
  const isOutline = variant === 'outline';
  const iconColor = isOutline ? '#FFFFFF' : '#000000';
  const textColor = isOutline ? '#FFFFFF' : '#000000';

  const buttonStyle = isOutline
    ? [styles.button, styles.buttonOutline]
    : styles.button;

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Sign in with ${isApple ? 'Apple' : 'Google'}`}
      >
        {isApple ? (
          <Ionicons name="logo-apple" size={24} color={iconColor} style={styles.icon} />
        ) : (
          <View style={[styles.googleIcon, isOutline && styles.googleIconOutline]}>
            <Text style={[styles.googleG, { color: isOutline ? '#FFFFFF' : '#4285F4' }]}>G</Text>
          </View>
        )}
        <Text style={[styles.text, { color: textColor }]}>
          Sign in with {isApple ? 'Apple' : 'Google'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    height: 60,
    width: 354,
    paddingHorizontal: 24,
    paddingVertical: 19,
    ...shadows.medium,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  icon: {
    marginRight: spacing.sm,
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  googleIconOutline: {
    backgroundColor: 'transparent',
  },
  googleG: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: '#4285F4',
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 17,
    color: '#000000',
  },
});

export default AuthButton;
