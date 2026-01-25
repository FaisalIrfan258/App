import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import Button from '../../components/common/Button';
import SkipButton from '../../components/onboarding/SkipButton';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Motivational'>;

const MotivationalScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleContinue = () => {
    navigation.navigate('Commitment');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background Image - Absolute positioned to cover entire screen */}
      <ImageBackground
        source={require('../../../assets/images/camping-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Content */}
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>You're not broken.</Text>
            <Text style={styles.mainText}>
              Your nervous system is just overloaded.
            </Text>
            <Text style={styles.secondaryText}>
              Millions of people feel this way.
            </Text>
          </View>
        </View>

        {/* Bottom buttons */}
        <View style={styles.bottomContainer}>
          <SkipButton />
          <Button
            variant="onboarding"
            onPress={handleContinue}
            accessibilityLabel="Continue to next step"
            accessibilityHint="Proceeds to the commitment screen"
          >
            Continue
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fallback background
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 80,
  },
  textContainer: {
    alignItems: 'center',
    gap: 4,
    width: 280,
    alignSelf: 'center',
  },
  mainText: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
  },
  secondaryText: {
    fontFamily: fonts.light,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 16,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});

export default MotivationalScreen;
