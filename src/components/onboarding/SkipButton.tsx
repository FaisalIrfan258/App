import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { colors, fonts } from '../../constants/theme';

const SkipButton: React.FC = () => {
  const { completeOnboarding } = useOnboarding();
  const navigation = useNavigation();

  const handleSkip = async () => {
    await completeOnboarding();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSkip}>
      <Text style={styles.text}>Skip for now</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    opacity: 0.5,
    marginBottom: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  text: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
});

export default SkipButton;
