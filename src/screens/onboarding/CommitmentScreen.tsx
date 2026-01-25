import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList, CommitmentChoice } from '../../types/onboarding';
import { onboardingService } from '../../services/onboardingService';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Commitment'>;

interface Option {
  id: CommitmentChoice;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const OPTIONS: Option[] = [
  { id: 'yes-try', label: 'Yes, I can try', icon: 'happy-outline' },
  { id: 'not-sure', label: "I'm not sure yet", icon: 'help-circle-outline' },
];

const CommitmentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedOption, setSelectedOption] = useState<CommitmentChoice | null>(null);

  const handleSelect = (option: CommitmentChoice) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedOption(option);
  };

  const handleContinue = async () => {
    if (selectedOption) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await onboardingService.saveData({ commitment: selectedOption });
      navigation.navigate('Control');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Large black circle for curved top effect */}
      <View style={styles.blackCircle} />

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Can you give us 10 minutes a day?</Text>
          <Text style={styles.subtitle}>Anywhere. No preparation.</Text>
        </View>

        <View style={styles.cardsContainer}>
          {OPTIONS.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                ]}
                onPress={() => handleSelect(option.id)}
                activeOpacity={0.9}
                accessible
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={option.label}
              >
                <Ionicons name={option.icon} size={24} color="white" style={styles.icon} />
                <Text style={styles.label}>{option.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedOption && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedOption}
          activeOpacity={0.9}
          accessibilityLabel="Continue to next step"
          accessibilityHint="Saves your selection and proceeds to the next screen"
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5A9F5',
  },
  blackCircle: {
    position: 'absolute',
    width: 800,
    height: 800,
    borderRadius: 400,
    backgroundColor: '#111111',
    left: -199,
    top: 100,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 40,
    gap: 8,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: fonts.light,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    lineHeight: 15,
  },
  cardsContainer: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: spacing.lg,
    minHeight: 58,
  },
  cardSelected: {
    backgroundColor: '#B5A9F5',
    borderColor: 'white',
  },
  icon: {
    marginRight: 14,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: 'white',
    lineHeight: 16,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    zIndex: 1,
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 19,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 354,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default CommitmentScreen;
