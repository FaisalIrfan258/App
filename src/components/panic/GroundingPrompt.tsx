import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, fonts, spacing } from '../../constants/theme';

interface GroundingPromptProps {
  text: string;
}

const GroundingPrompt: React.FC<GroundingPromptProps> = ({ text }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Cleanup: fade out will be handled by parent unmounting
  }, [text]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.promptText, { opacity: fadeAnim }]}>
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  promptText: {
    fontFamily: fonts.medium,
    fontSize: 24,
    color: colors.accent.purple,
    textAlign: 'center',
    lineHeight: 36,
  },
});

export default GroundingPrompt;
