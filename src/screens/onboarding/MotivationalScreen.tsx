import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import Button from '../../components/common/Button';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Motivational'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Progress Circle Component using PNG
const ProgressCircle: React.FC = () => (
  <Image
    source={require('../../../assets/images/progress-circle.png')}
    style={styles.progressCircle}
    resizeMode="contain"
  />
);

const MotivationalScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleContinue = () => {
    navigation.navigate('Commitment');
  };

  return (
    <View style={styles.container}>
      {/* Background Image - offset positioning like reference */}
      <Image
        source={require('../../../assets/images/mountain-landscape.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Top Gradient - transparent at bottom to black at top (360deg gradient) */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#000000']}
        locations={[0, 1]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.topGradient}
      />

      {/* Bottom Gradient - transparent to black at bottom */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#000000']}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
      />

      {/* Subtle overall dark overlay */}
      <View style={styles.subtleOverlay} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header Text */}
        <View style={styles.headerSection}>
          <Text style={styles.titleText}>You're not broken.</Text>
          <View style={styles.titleGap} />
          <Text style={styles.titleText}>Your nervous system is just</Text>
          <Text style={styles.titleText}>overloaded.</Text>
        </View>

        {/* Journey Visualization */}
        <View style={styles.journeySection}>
          <ProgressCircle />
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.supportText}>Millions of people feel this way.</Text>

          <View style={styles.buttonWrapper}>
            <Button
              variant="onboarding"
              onPress={handleContinue}
              accessibilityLabel="Continue to next step"
              accessibilityHint="Proceeds to the commitment screen"
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
    backgroundColor: '#000000',
  },
  backgroundImage: {
    position: 'absolute',
    width: SCREEN_WIDTH * 1.55,
    height: SCREEN_HEIGHT * 0.95,
    left: -SCREEN_WIDTH * 0.5,
    top: SCREEN_HEIGHT * 0.145,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.68, // ~600/874 from reference
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.32, // ~280/874 from reference
    zIndex: 1,
  },
  subtleOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    zIndex: 2,
  },
  safeArea: {
    flex: 1,
    zIndex: 3,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 38,
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
  },
  titleGap: {
    height: 18,
  },
  journeySection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_WIDTH * 0.85,
  },
  bottomSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 16,
    alignItems: 'center',
  },
  supportText: {
    fontFamily: fonts.light,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
});

export default MotivationalScreen;
