import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { fonts } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import SkipButton from '../../components/onboarding/SkipButton';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Text animation: fade in and gentle scale up
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(textScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('BreathingIntro');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, textOpacity, textScale]);

  return (
    <View style={styles.container}>
      {/* Purple radial gradient background */}
      <Svg
        width={width}
        height={height}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <RadialGradient
            id="purpleGradient"
            cx="50%"
            cy="50%"
            rx="68%"
            ry="162%"
          >
            <Stop offset="0%" stopColor="#836FC9" stopOpacity="1" />
            <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#purpleGradient)"
        />
      </Svg>

      <SkipButton />

      {/* Centered "today" text with animation */}
      <Animated.Text
        style={[
          styles.titleText,
          {
            opacity: textOpacity,
            transform: [{ scale: textScale }],
          },
        ]}
      >
        today
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: 64,
    color: '#FFFFFF',
  },
});

export default SplashScreen;
