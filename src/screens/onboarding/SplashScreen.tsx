import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import SkipButton from '../../components/onboarding/SkipButton';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.8)).current;
  const blobTranslateY = useRef(new Animated.Value(height * 0.5)).current;

  useEffect(() => {
    // Text animation: fade in and scale up
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(textScale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Blob animation: rise from bottom
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(blobTranslateY, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('BreathingIntro');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <SkipButton />
      <Animated.View
        style={[
          styles.textContainer,
          { opacity: textOpacity, transform: [{ scale: textScale }] },
        ]}
      >
        <Text style={styles.titleText}>today</Text>
      </Animated.View>

      <Animated.View
        style={[styles.blobContainer, { transform: [{ translateY: blobTranslateY }] }]}
      >
        <Svg
          width={width}
          height={height * 0.45}
          viewBox={`0 0 ${width} ${height * 0.45}`}
          style={styles.blob}
        >
          <Path
            d={`
              M0,${height * 0.15}
              Q${width * 0.25},${height * 0.05} ${width * 0.5},${height * 0.12}
              Q${width * 0.75},${height * 0.19} ${width},${height * 0.1}
              L${width},${height * 0.45}
              L0,${height * 0.45}
              Z
            `}
            fill={colors.primary.default}
          />
        </Svg>
        <View style={styles.faceContainer}>
          <View style={styles.eyesContainer}>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </View>
          <Svg width={60} height={30} viewBox="0 0 60 30">
            <Path
              d="M5,15 Q30,30 55,15"
              stroke="white"
              strokeWidth={4}
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
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: 56,
    color: colors.text.primary,
    letterSpacing: 2,
  },
  blobContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
  },
  blob: {
    position: 'absolute',
    bottom: 0,
  },
  faceContainer: {
    position: 'absolute',
    bottom: height * 0.15,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 16,
  },
  eye: {
    width: 12,
    height: 18,
    borderRadius: 6,
    backgroundColor: 'white',
  },
});

export default SplashScreen;
