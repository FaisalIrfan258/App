import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import { fonts } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import AuthButton from '../../components/onboarding/AuthButton';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'SignIn'>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { signInWithGoogle, signInWithApple, signInAnonymously } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithApple();
      navigation.navigate('Paywall');
    } catch (error: any) {
      Alert.alert(
        'Sign In Failed',
        error.message || 'Apple Sign-In is not yet configured. Please use Google Sign-In or skip for now.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigation.navigate('Paywall');
    } catch (error: any) {
      Alert.alert(
        'Sign In Failed',
        error.message || 'Could not sign in with Google. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      // Sign in anonymously so we can still track their sessions
      await signInAnonymously();
      navigation.navigate('Paywall');
    } catch (error: any) {
      // If anonymous sign-in fails, just proceed anyway
      console.error('Anonymous sign-in failed:', error);
      navigation.navigate('Paywall');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Circular Black Overlay */}
      <View style={styles.circularOverlay} />

      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.content}>

          {/* Title Section - Top */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              So we can remember where you left off
            </Text>
          </View>

          {/* Auth Buttons - Center */}
          <View style={styles.buttonsContainer}>
            <AuthButton provider="apple" onPress={handleAppleSignIn} />
            <AuthButton
              provider="google"
              onPress={handleGoogleSignIn}
              variant="outline"
            />
          </View>

          {/* Continue Button - Bottom */}
          <View style={styles.continueButtonContainer}>
            <Button
              variant="onboarding"
              onPress={handleContinue}
              accessibilityLabel="Continue"
              accessibilityHint="Continue to paywall screen"
              disabled={isLoading}
            >
              Continue
            </Button>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AB9FF3',
  },
  circularOverlay: {
    position: 'absolute',
    width: 800,
    height: 800,
    borderRadius: 400,
    backgroundColor: '#000000',
    left: -199,
    top: 134,
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 160,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 22,
    color: '#FFFFFF',
    lineHeight: 28,
    textAlign: 'center',
    maxWidth: 280,
  },
  buttonsContainer: {
    alignItems: 'center',
    gap: 10,
  },
  continueButtonContainer: {
    paddingBottom: 24,
  },
});

export default SignInScreen;
