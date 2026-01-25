import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

interface AnimatedBlobProps {
  phase: 'inhale' | 'exhale' | 'idle';
  showFace?: boolean;
  size?: number;
}

const AnimatedBlob: React.FC<AnimatedBlobProps> = ({
  phase,
  showFace = true,
  size = 200,
}) => {
  const baseScale = 1;
  const expandedScale = 1.3;
  const scale = useRef(new Animated.Value(baseScale)).current;

  useEffect(() => {
    const targetScale = phase === 'inhale' ? expandedScale : baseScale;
    Animated.timing(scale, {
      toValue: targetScale,
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const eyeScale = size / 200;

  return (
    <View style={[styles.container, { width: size * 1.5, height: size * 1.5 }]}>
      <Animated.View style={[styles.blobWrapper, { transform: [{ scale }] }]}>
        <View style={[styles.blob, { width: size, height: size, borderRadius: size / 2 }]}>
          <LinearGradient
            colors={['#9B8FE4', '#7B6FC4']}
            style={[styles.gradient, { borderRadius: size / 2 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          {showFace && (
            <View style={styles.faceContainer}>
              <View style={styles.eyesContainer}>
                <View
                  style={[
                    styles.eye,
                    {
                      width: 10 * eyeScale,
                      height: 16 * eyeScale,
                      borderRadius: 5 * eyeScale,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.eye,
                    {
                      width: 10 * eyeScale,
                      height: 16 * eyeScale,
                      borderRadius: 5 * eyeScale,
                    },
                  ]}
                />
              </View>
              <Svg
                width={50 * eyeScale}
                height={25 * eyeScale}
                viewBox="0 0 50 25"
              >
                <Path
                  d="M5,12 Q25,25 45,12"
                  stroke="white"
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          )}
        </View>
        <View
          style={[
            styles.glow,
            {
              width: size * 1.2,
              height: size * 1.2,
              borderRadius: (size * 1.2) / 2,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blobWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blob: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 2,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  faceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 12,
  },
  eye: {
    backgroundColor: 'white',
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(139, 127, 212, 0.2)',
    zIndex: 1,
  },
});

export default AnimatedBlob;
