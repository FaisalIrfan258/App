import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, fonts, spacing, borderRadius } from '../../constants/theme';

interface PanicCompletionProps {
  onFinish: () => void;
}

const PanicCompletion: React.FC<PanicCompletionProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleFinish = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onFinish();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Affirmation Text */}
        <Text style={styles.affirmationText}>
          You didn't do anything wrong
        </Text>

        {/* Finish Button */}
        <TouchableOpacity
          onPress={handleFinish}
          activeOpacity={0.8}
          style={styles.finishButton}
        >
          <Text style={styles.finishButtonText}>Finish Excersise</Text>
        </TouchableOpacity>
      </Animated.View>
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
  content: {
    alignItems: 'center',
    width: '100%',
  },
  affirmationText: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: '#C3B7F9',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: spacing.xxl * 4,
  },
  finishButton: {
    backgroundColor: '#9886E5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  finishButtonText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 16,
  },
});

export default PanicCompletion;
