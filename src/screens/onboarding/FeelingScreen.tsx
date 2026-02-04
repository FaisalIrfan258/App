import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Stop, Rect, Path, G } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { fonts } from '../../constants/theme';
import { OnboardingStackParamList, FeelingOption, FeelingChoice } from '../../types/onboarding';
import { onboardingService } from '../../services/onboardingService';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Feeling'>;

const { width, height } = Dimensions.get('window');

// Custom icons as SVG paths
const FeelingIcon: React.FC<{ type: string; color: string; size?: number }> = ({ type, color, size = 18 }) => {
  const icons: Record<string, React.ReactNode> = {
    'overthinking': (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          fill={color}
        />
        <Path
          d="M12 6c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
          fill={color}
        />
        <Path d="M11 16h2v2h-2z" fill={color} />
      </Svg>
    ),
    'constant-pressure': (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={color}
        />
        <Path
          d="M16 8l-4 4-2-2"
          stroke={color === 'black' ? 'white' : 'black'}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
    'burned-out': (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          fill={color}
        />
        <Path d="M8 14s1.5 2 4 2 4-2 4-2" stroke={color} strokeWidth={1.5} strokeLinecap="round" fill="none" />
        <Path d="M9 9h.01M15 9h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </Svg>
    ),
    'panic-anxiety': (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 3L4 9v12h16V9l-8-6z"
          stroke={color}
          strokeWidth={1.5}
          fill="none"
        />
        <Path d="M12 8v4M12 14v.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <Path d="M8 3L4 6M16 3l4 3M6 1v4M18 1v4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
    ),
    'just-tired': (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          fill={color}
        />
        <Path d="M8 11l2 2M14 11l2 2M8 13l2-2M14 13l2-2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M9 16h6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
    ),
  };
  return icons[type] || null;
};

const FEELINGS: FeelingChoice[] = [
  { id: 'overthinking', label: 'Overthinking', icon: 'overthinking' },
  { id: 'constant-pressure', label: 'Constant pressure', icon: 'constant-pressure' },
  { id: 'burned-out', label: 'Burned out', icon: 'burned-out' },
  { id: 'panic-anxiety', label: 'Panic / anxiety', icon: 'panic-anxiety' },
  { id: 'just-tired', label: 'Just tired', icon: 'just-tired' },
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
    <View style={styles.container}>
      {/* Purple radial gradient background at bottom */}
      <Svg
        width={width}
        height={height}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <RadialGradient
            id="purpleGradient"
            cx="50%"
            cy="100%"
            rx="61.21%"
            ry="145.68%"
          >
            <Stop offset="0%" stopColor="#836FC9" stopOpacity="1" />
            <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#purpleGradient)"
        />
      </Svg>

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Which one feels closest to{'\n'}you lately?</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {FEELINGS.map((feeling) => {
            const isSelected = selectedFeeling === feeling.id;
            return (
              <TouchableOpacity
                key={feeling.id}
                style={[
                  styles.optionWrapper,
                  isSelected && styles.optionWrapperSelected,
                ]}
                onPress={() => handleSelect(feeling.id)}
                activeOpacity={0.8}
                accessible
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={feeling.label}
              >
                <View style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                ]}>
                  <FeelingIcon
                    type={feeling.icon}
                    color={isSelected ? 'black' : 'white'}
                    size={18}
                  />
                  <Text style={[
                    styles.optionLabel,
                    isSelected && styles.optionLabelSelected,
                  ]}>
                    {feeling.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Continue Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedFeeling && styles.continueButtonDisabled,
            ]}
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
  titleContainer: {
    paddingHorizontal: 24,
    marginTop: 60,
    marginBottom: 50,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsContainer: {
    paddingHorizontal: 24,
    gap: 10,
  },
  optionWrapper: {
    borderRadius: 100,
    padding: 0,
  },
  optionWrapperSelected: {
    padding: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 14,
  },
  optionSelected: {
    backgroundColor: '#FFFFFF',
  },
  optionLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 16,
  },
  optionLabelSelected: {
    fontFamily: fonts.medium,
    color: '#000000',
  },
  spacer: {
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
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

export default FeelingScreen;
