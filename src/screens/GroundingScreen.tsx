import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { hapticService } from '../services/hapticService';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import { useProgress } from '../contexts/ProgressContext';

interface GroundingScreenProps {
  navigation: any;
}

const GROUNDING_STEPS = [
  {
    instruction: 'Name 5 things you can see',
    sense: 'See',
    count: 5,
    examples: ['The sky outside', 'Your phone', 'A picture on the wall', 'Your hands', 'A plant or tree'],
  },
  {
    instruction: 'Name 4 things you can touch',
    sense: 'Touch',
    count: 4,
    examples: ['The ground beneath your feet', 'Your clothes', 'A nearby surface', 'Your hair'],
  },
  {
    instruction: 'Name 3 things you can hear',
    sense: 'Hear',
    count: 3,
    examples: ['Birds chirping', 'Traffic sounds', 'Your breathing', 'A fan or air conditioning'],
  },
  {
    instruction: 'Name 2 things you can smell',
    sense: 'Smell',
    count: 2,
    examples: ['Fresh air', 'Your perfume or soap', 'Coffee or tea', 'The scent of nature'],
  },
  {
    instruction: 'Name 1 thing you can taste',
    sense: 'Taste',
    count: 1,
    examples: ['Your last meal', 'Mint from toothpaste', 'Water', 'The inside of your mouth'],
  },
];

const GroundingScreen: React.FC<GroundingScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = GROUNDING_STEPS[currentStep];
  const isLastStep = currentStep === GROUNDING_STEPS.length - 1;
  const { recordActivity } = useProgress();

  const handleNext = async () => {
    await hapticService.selection();

    if (isLastStep) {
      // Complete grounding exercise
      await hapticService.sessionComplete();
      // Track 2 minutes for grounding session
      await recordActivity(2);
      navigation.goBack();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = async () => {
    await hapticService.buttonPress('light');

    if (currentStep === 0) {
      navigation.goBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderProgressDots = () => {
    return (
      <View style={styles.progressDots}>
        {GROUNDING_STEPS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentStep && styles.dotActive,
              index < currentStep && styles.dotCompleted,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[colors.breathing.exhale, colors.background.primary]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            accessible={true}
            accessibilityLabel={currentStep === 0 ? "Go back to breathing" : "Go to previous step"}
            accessibilityRole="button"
          >
            <Text style={styles.backText}>← {currentStep === 0 ? 'Back' : 'Previous'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Grounding Exercise</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress */}
        {renderProgressDots()}

        {/* Content */}
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>Step {currentStep + 1} of 5</Text>
            <Text
              style={styles.instruction}
              accessible={true}
              accessibilityRole="header"
            >
              {step.instruction}
            </Text>

            {/* Examples */}
            <View style={styles.examplesContainer}>
              <Text style={styles.examplesTitle}>Examples:</Text>
              {step.examples.map((example, index) => (
                <View key={index} style={styles.exampleItem}>
                  <Text style={styles.exampleBullet}>•</Text>
                  <Text style={styles.exampleText}>{example}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.hint}>
              Take your time. Focus on the present moment.
            </Text>
          </View>
        </ScrollView>

        {/* Next Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            accessible={true}
            accessibilityLabel={isLastStep ? "Complete grounding exercise" : "Continue to next step"}
            accessibilityRole="button"
          >
            <Text style={styles.nextButtonText}>
              {isLastStep ? 'Complete' : 'Next Step →'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingRight: spacing.md,
  },
  backText: {
    ...typography.body,
    color: colors.primary.default,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text.primary,
    fontWeight: '400',
  },
  placeholder: {
    width: 60,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.tertiary,
    opacity: 0.3,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.accent.calm,
    opacity: 1,
  },
  dotCompleted: {
    backgroundColor: colors.accent.success,
    opacity: 0.6,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  stepNumber: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  instruction: {
    ...typography.h2,
    fontSize: 26,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    fontWeight: '300',
  },
  examplesContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  examplesTitle: {
    ...typography.button,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  exampleBullet: {
    ...typography.body,
    color: colors.accent.calm,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  exampleText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  hint: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  nextButton: {
    backgroundColor: colors.primary.default,
    height: 60,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    ...typography.buttonLarge,
    color: colors.text.inverse,
  },
});

export default GroundingScreen;
