import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, fonts, spacing, borderRadius } from '../../constants/theme';
import { useOnboarding } from '../../contexts/OnboardingContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import SubscriptionCard from '../../components/onboarding/SubscriptionCard';
import Button from '../../components/common/Button';
import SkipButton from '../../components/onboarding/SkipButton';

type PlanType = 'monthly' | 'yearly';

const PaywallScreen: React.FC = () => {
  const { completeOnboarding } = useOnboarding();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');

  const handleStartTrial = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await completeOnboarding();
  };

  return (
    <OnboardingLayout
      currentScreen={7}
      showProgress={false}
      bottomContent={
        <View style={styles.bottomContainer}>
          <Button
            onPress={handleStartTrial}
            accessibilityLabel="Try first session free"
            accessibilityHint="Starts your free trial and completes onboarding"
          >
            Try first session free
          </Button>
          <Text style={styles.termsText}>
            Cancel anytime. Terms and Privacy Policy
          </Text>
        </View>
      }
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logoText}>today</Text>
          <Text style={styles.subtitle}>
            Most people feel calm after the first session. No commitment needed
            to find out for yourself.
          </Text>
        </View>

        <View style={styles.previewContainer}>
          <View style={styles.phoneFrame}>
            <View style={styles.phoneScreen}>
              <Text style={styles.phoneTitle}>Reviews</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.8</Text>
                <Text style={styles.ratingLabel}>Stars</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.plansContainer}>
          <SubscriptionCard
            title="Monthly"
            price="$14.99"
            period="/mo"
            isSelected={selectedPlan === 'monthly'}
            onSelect={() => setSelectedPlan('monthly')}
          />
          <SubscriptionCard
            title="Yearly"
            price="$4.95"
            period="/mo"
            isSelected={selectedPlan === 'yearly'}
            isPopular
            onSelect={() => setSelectedPlan('yearly')}
          />
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoText: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  phoneFrame: {
    width: 160,
    height: 200,
    backgroundColor: colors.card.background,
    borderRadius: borderRadius.xl,
    borderWidth: 3,
    borderColor: colors.card.border,
    overflow: 'hidden',
    padding: spacing.md,
  },
  phoneScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  ratingBadge: {
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: fonts.bold,
    fontSize: 36,
    color: colors.text.primary,
  },
  ratingLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text.secondary,
  },
  plansContainer: {
    gap: spacing.lg,
  },
  bottomContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

export default PaywallScreen;
