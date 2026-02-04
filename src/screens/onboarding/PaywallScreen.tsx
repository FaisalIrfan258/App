import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { fonts } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import { PricingCard } from '../../components/onboarding/PricingCard';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Paywall'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PaywallScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedPackageId, setSelectedPackageId] = useState<string>('yearly');

  const handleSelectPackage = async (packageId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPackageId(packageId);
  };

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Skip to UserInfo for now (subscription will be implemented later)
    navigation.navigate('UserInfo');
  };

  return (
    <View style={styles.container}>
      {/* Radial gradient background */}
      <LinearGradient
        colors={['#836FC9', 'rgba(131, 111, 201, 0)', '#000000']}
        locations={[0, 0.4, 1]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Text style={styles.logo}>today</Text>

          {/* Description */}
          <Text style={styles.description}>
            Most people feel calmer after the first session. To keep this
            accessible, we ask for support.
          </Text>

          {/* Phone Mockups */}
          <Image
            source={require('../../../assets/images/paywall-phones.png')}
            style={styles.phoneMockup}
            resizeMode="contain"
          />

          {/* Pricing Cards */}
          <View style={styles.pricingContainer}>
            <PricingCard
              title="Monthly"
              price="$9.99"
              period="per month"
              isSelected={selectedPackageId === 'monthly'}
              onPress={() => handleSelectPackage('monthly')}
            />

            <PricingCard
              title="Yearly"
              price="$4.99"
              period="per month"
              subtitle="Billed as $59.99/year"
              savingsPercentage={50}
              isSelected={selectedPackageId === 'yearly'}
              onPress={() => handleSelectPackage('yearly')}
            />
          </View>

          {/* Footer Links */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => Linking.openURL('https://yourwebsite.com/terms')}>
              <Text style={styles.footerLink}>Terms of Use</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}> • </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://yourwebsite.com/privacy')}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}> • </Text>
            <TouchableOpacity onPress={handleContinue}>
              <Text style={styles.footerLink}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Fixed CTA Button */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleContinue}
            activeOpacity={0.9}
            accessibilityLabel="Continue"
            accessibilityHint="Continue to complete profile"
          >
            <Text style={styles.ctaButtonText}>Continue</Text>
          </TouchableOpacity>
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
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: 120, // Space for CTA button
  },
  logo: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.80)',
    textAlign: 'center',
    lineHeight: 22.4,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  phoneMockup: {
    width: SCREEN_WIDTH - 48,
    height: SCREEN_HEIGHT * 0.35,
    alignSelf: 'center',
    marginBottom: 32,
  },
  pricingContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  footerLink: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.50)',
  },
  footerSeparator: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.50)',
    marginHorizontal: 4,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 34, // Account for home indicator
    backgroundColor: 'transparent',
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButtonDisabled: {
    opacity: 0.6,
  },
  ctaButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.70)',
    marginTop: 16,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.70)',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#8B7FD4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  retryButtonText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default PaywallScreen;
