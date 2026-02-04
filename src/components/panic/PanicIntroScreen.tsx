import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing } from '../../constants/theme';

interface PanicIntroScreenProps {
  onComplete: () => void;
}

const PanicIntroScreen: React.FC<PanicIntroScreenProps> = ({ onComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const blobScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(blobScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-advance after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Gradient Blob */}
        <Animated.View style={[styles.blobContainer, { transform: [{ scale: blobScale }] }]}>
          <LinearGradient
            colors={['#8B7FD4', '#C8A2D9', '#9583E1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.blob}
          />
        </Animated.View>

        {/* Main Heading */}
        <Text style={styles.heading}>You're Safe</Text>

        {/* Subheading */}
        <Text style={styles.subheading}>
          WE'RE GOING TO SLOW YOUR BODY DOWN TOGETHER
        </Text>
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
  blobContainer: {
    width: 200,
    height: 200,
    marginBottom: spacing.xxl * 2,
  },
  blob: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    opacity: 0.6,
  },
  heading: {
    fontFamily: fonts.bold,
    fontSize: 36,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subheading: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: '#8B7FD4',
    textAlign: 'center',
    letterSpacing: 2,
    lineHeight: 24,
  },
});

export default PanicIntroScreen;
