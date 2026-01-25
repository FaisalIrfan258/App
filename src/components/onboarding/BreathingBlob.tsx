import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface BreathingBlobProps {
  phase: 'inhale' | 'exhale';
}

const { width } = Dimensions.get('window');
const BLOB_SIZE = width * 1.5; // Make blob wider than screen

const BreathingBlob: React.FC<BreathingBlobProps> = ({ phase }) => {
  const scale = useRef(new Animated.Value(1.0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (phase === 'inhale') {
      // Expand: scale up and move up
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.4,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -80,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Contract: scale down and move down
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [phase, scale, translateY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.blob,
          {
            width: BLOB_SIZE,
            height: BLOB_SIZE,
            borderRadius: BLOB_SIZE / 2,
            transform: [{ scale }, { translateY }],
          },
        ]}
      >
        <LinearGradient
          colors={['#9B8FE4', '#7B6FC4']}
          style={[styles.gradient, { borderRadius: BLOB_SIZE / 2 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Face */}
        <View style={styles.faceContainer}>
          {/* Closed eyes */}
          <Svg width={80} height={30} style={styles.eyes}>
            <Path
              d="M10,15 Q20,22 30,15"
              stroke="#1A1A1A"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M50,15 Q60,22 70,15"
              stroke="#1A1A1A"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
            />
          </Svg>

          {/* Smile */}
          <Svg width={100} height={50} style={styles.smile}>
            <Path
              d="M20,20 Q50,45 80,20"
              stroke="#1A1A1A"
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    bottom: -(BLOB_SIZE / 2), // Position so only top half visible
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  faceContainer: {
    alignItems: 'center',
    marginTop: -200,
    gap: 20,
  },
  eyes: {
    marginBottom: 10,
  },
  smile: {
    marginTop: 5,
  },
});

export default BreathingBlob;
