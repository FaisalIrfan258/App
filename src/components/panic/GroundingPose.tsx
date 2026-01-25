import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing } from '../../constants/theme';

interface GroundingPoseProps {
  duration: number; // in seconds
  onComplete: () => void;
}

const GroundingPose: React.FC<GroundingPoseProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Pulse animation for the dot
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient
      colors={['#1a1625', '#2d2640', '#1a1625']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <Text style={styles.headerText}>Let the ground hold you</Text>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Animated.View
            style={[
              styles.timerDot,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>

        {/* Pose Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/grounding-pose.png')}
            style={styles.poseImage}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  headerText: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  timerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B7FD4',
    marginRight: spacing.sm,
  },
  timerText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.text.primary,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  poseImage: {
    width: 280,
    height: 200,
  },
});

export default GroundingPose;
