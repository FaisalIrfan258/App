import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList, FeelingOption, FeelingChoice } from '../../types/onboarding';
import { onboardingService } from '../../services/onboardingService';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Feeling'>;

const FEELINGS: FeelingChoice[] = [
  { id: 'overthinking', label: 'Overthinking', icon: 'help-circle-outline' },
  { id: 'constant-pressure', label: 'Constant pressure', icon: 'trending-up' },
  { id: 'burned-out', label: 'Burned out', icon: 'flame-outline' },
  { id: 'panic-anxiety', label: 'Panic / anxiety', icon: 'pulse-outline' },
  { id: 'just-tired', label: 'Just tired', icon: 'moon-outline' },
];

const FeelingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingOption | null>(null);

  const handleSelect = (feeling: FeelingOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedFeeling(feeling);
  };

  const handleContinue = async () => {
    if (selectedFeeling) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await onboardingService.saveData({ feeling: selectedFeeling });
      navigation.navigate('Motivational');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Large black circle for curved top effect */}
      <View style={styles.blackCircle} />

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Which one feels closest to{'\n'}you lately?</Text>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardsContainer}>
            {FEELINGS.map((feeling) => {
              const isSelected = selectedFeeling === feeling.id;
              return (
                <TouchableOpacity
                  key={feeling.id}
                  style={[
                    styles.card,
                    isSelected && styles.cardSelected,
                  ]}
                  onPress={() => handleSelect(feeling.id)}
                  activeOpacity={0.9}
                  accessible
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={feeling.label}
                >
                  <Ionicons
                    name={feeling.icon as any}
                    size={18}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.label}>{feeling.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedFeeling && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedFeeling}
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
    backgroundColor: '#AB9FF3',
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
  title: {
    fontFamily: fonts.medium,
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginTop: 130,
    marginBottom: 40,
    lineHeight: 28,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
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
    backgroundColor: '#AB9FF3',
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

export default FeelingScreen;
