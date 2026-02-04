import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList, CommitmentChoice } from '../../types/onboarding';
import { onboardingService } from '../../services/onboardingService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
    <View style={styles.container}>
      {/* Radial gradient background - purple from bottom fading to transparent */}
      <LinearGradient
        colors={['#836FC9', 'rgba(131, 111, 201, 0)', 'rgba(0, 0, 0, 0)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.radialGradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
                    styles.cardWrapper,
                    isSelected && styles.cardWrapperSelected,
                  ]}
                  onPress={() => handleSelect(option.id)}
                  activeOpacity={0.9}
                  accessible
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={option.label}
                >
                  <View style={[
                    styles.card,
                    isSelected && styles.cardSelected,
                  ]}>
                    <Ionicons
                      name={option.icon}
                      size={21}
                      color={isSelected ? 'black' : 'white'}
                      style={styles.icon}
                    />
                    <Text style={[
                      styles.label,
                      isSelected && styles.labelSelected,
                    ]}>
                      {option.label}
                    </Text>
                  </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  radialGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.15,
    marginBottom: SCREEN_HEIGHT * 0.08,
    paddingHorizontal: 24,
    gap: 4,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: fonts.light,
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 20,
  },
  cardsContainer: {
    gap: 10,
  },
  cardWrapper: {
    borderRadius: 100,
    padding: 0,
  },
  cardWrapperSelected: {
    padding: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 14,
  },
  cardSelected: {
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 21,
    height: 21,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 16,
  },
  labelSelected: {
    color: '#000000',
    fontFamily: fonts.medium,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 19,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: SCREEN_WIDTH - 48,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});

export default CommitmentScreen;
