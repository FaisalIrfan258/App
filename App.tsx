import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MeditationScreen from './src/screens/MeditationScreen';
import PanicScreen from './src/screens/PanicScreen';
import GroundingScreen from './src/screens/GroundingScreen';
import UpliftingTextScreen from './src/screens/UpliftingTextScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import QuietAudioScreen from './src/screens/QuietAudioScreen';
import SleepWindDownScreen from './src/screens/SleepWindDownScreen';
import ThoughtSlowingScreen from './src/screens/ThoughtSlowingScreen';
import MindResetScreen from './src/screens/MindResetScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import PostDetailScreen, { Post } from './src/screens/PostDetailScreen';
import ProgressScreen from './src/screens/ProgressScreen';

// Onboarding
import OnboardingNavigator from './src/navigation/OnboardingNavigator';
import { onboardingService } from './src/services/onboardingService';
import { OnboardingProvider, useOnboarding } from './src/contexts/OnboardingContext';

// Subscription
import { revenueCatService } from './src/services/revenueCatService';
import { SubscriptionProvider } from './src/contexts/SubscriptionContext';

// Progress
import { ProgressProvider } from './src/contexts/ProgressContext';

// Transitions
import { forInstagramTransition, instagramTransitionSpec } from './src/navigation/transitions';

export type RootStackParamList = {
  Home: undefined;
  Meditation: undefined;
  Panic: undefined;
  Grounding: undefined;
  UpliftingText: undefined;
  Profile: undefined;
  QuietAudio: undefined;
  SleepWindDown: undefined;
  ThoughtSlowing: undefined;
  MindReset: undefined;
  Community: { newPost?: { title: string; content: string; isAnonymous: boolean } } | undefined;
  CreatePost: undefined;
  PostDetail: { post: Post };
  Progress: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          cardStyleInterpolator: forInstagramTransition,
          transitionSpec: instagramTransitionSpec,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          cardStyleInterpolator: forInstagramTransition,
          transitionSpec: instagramTransitionSpec,
        }}
      />
      <Stack.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Panic"
        component={PanicScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Grounding"
        component={GroundingScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="UpliftingText"
        component={UpliftingTextScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="QuietAudio"
        component={QuietAudioScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="SleepWindDown"
        component={SleepWindDownScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="ThoughtSlowing"
        component={ThoughtSlowingScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="MindReset"
        component={MindResetScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          cardStyleInterpolator: forInstagramTransition,
          transitionSpec: instagramTransitionSpec,
        }}
      />
      <Stack.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          cardStyleInterpolator: forInstagramTransition,
          transitionSpec: instagramTransitionSpec,
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const { hasCompletedOnboarding } = useOnboarding();

  return (
    <NavigationContainer>
      {hasCompletedOnboarding ? <MainNavigator /> : <OnboardingNavigator />}
      <StatusBar style="light" />
    </NavigationContainer>
  );
};

// For testing: Force onboarding to always show (set to false for production)
const FORCE_ONBOARDING = true;

export default function App() {
  const [fontsLoaded] = useFonts({
    'SpotifyMix-Light': require('./assets/fonts/SpotifyMix-Light.ttf'),
    'SpotifyMix-Regular': require('./assets/fonts/SpotifyMix-Regular.ttf'),
    'SpotifyMix-Medium': require('./assets/fonts/SpotifyMix-Medium.ttf'),
    'SpotifyMix-Bold': require('./assets/fonts/SpotifyMix-Bold.ttf'),
  });

  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const [initialOnboardingCompleted, setInitialOnboardingCompleted] = useState(false);
  const [isRevenueCatReady, setIsRevenueCatReady] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (FORCE_ONBOARDING) {
        setInitialOnboardingCompleted(false);
      } else {
        const completed = await onboardingService.isCompleted();
        setInitialOnboardingCompleted(completed);
      }
      setIsCheckingOnboarding(false);
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    const initializeRevenueCat = async () => {
      try {
        await revenueCatService.initialize();
        setIsRevenueCatReady(true);
      } catch (error) {
        // Continue without RevenueCat (graceful degradation)
        setIsRevenueCatReady(true);
      }
    };
    initializeRevenueCat();
  }, []);

  if (!fontsLoaded || isCheckingOnboarding || !isRevenueCatReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D0F' }}>
        <ActivityIndicator size="large" color="#8B7FD4" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <SubscriptionProvider>
          <OnboardingProvider initialCompleted={initialOnboardingCompleted}>
            <AppNavigator />
          </OnboardingProvider>
        </SubscriptionProvider>
      </ProgressProvider>
    </SafeAreaProvider>
  );
}
