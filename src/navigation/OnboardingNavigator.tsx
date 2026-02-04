import React from 'react';
import { Easing } from 'react-native';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types/onboarding';

// Screens
import SplashScreen from '../screens/onboarding/SplashScreen';
import BreathingIntroScreen from '../screens/onboarding/BreathingIntroScreen';
import FeelingScreen from '../screens/onboarding/FeelingScreen';
import MotivationalScreen from '../screens/onboarding/MotivationalScreen';
import CommitmentScreen from '../screens/onboarding/CommitmentScreen';
import ControlScreen from '../screens/onboarding/ControlScreen';
import ReviewScreen from '../screens/onboarding/ReviewScreen';
import PaywallScreen from '../screens/onboarding/PaywallScreen';
import UserInfoScreen from '../screens/onboarding/UserInfoScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

const forOnboardingTransition = ({
  current,
  next,
  layouts,
}: StackCardInterpolationProps) => {
  return {
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [25, 0],
          }),
        },
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.98, 1],
          }),
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.3],
      }),
    },
  };
};

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator: forOnboardingTransition,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 350,
              easing: Easing.out(Easing.cubic),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 350,
              easing: Easing.out(Easing.cubic),
            },
          },
        },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="BreathingIntro" component={BreathingIntroScreen} />
      <Stack.Screen name="Feeling" component={FeelingScreen} />
      <Stack.Screen name="Motivational" component={MotivationalScreen} />
      <Stack.Screen name="Commitment" component={CommitmentScreen} />
      <Stack.Screen name="Control" component={ControlScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
