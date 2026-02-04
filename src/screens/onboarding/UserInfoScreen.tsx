import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { fonts } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { userProfileService } from '../../services/userProfileService';
import { UserProfile, MIN_AGE, MAX_AGE } from '../../types/profile';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'UserInfo'>;

const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { completeOnboarding } = useOnboarding();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [ageFocused, setAgeFocused] = useState(false);

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const handleContinue = async () => {
    if (!name.trim() || !age.trim()) {
      return;
    }

    // Validate age
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < MIN_AGE || ageNum > MAX_AGE) {
      Alert.alert(
        'Invalid Age',
        `Please enter a valid age between ${MIN_AGE} and ${MAX_AGE}.`,
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Save user profile
      const profile: UserProfile = {
        name: name.trim(),
        age: ageNum,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await userProfileService.saveProfile(profile);

      // Complete onboarding - this will navigate to the main app
      await completeOnboarding();
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };

  const handleSkip = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await completeOnboarding();
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/user-info-background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', '#000000']}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientOverlay}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Streak Card */}
            <View style={styles.streakCardContainer}>
              <View style={styles.streakCard}>
                <BlurView intensity={40} style={styles.blurView}>
                  <LinearGradient
                    colors={['#000000', 'rgba(0, 0, 0, 0)']}
                    locations={[0, 1]}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 0.5, y: 0 }}
                    style={styles.cardGradient}
                  >
                    {/* Today Badge */}
                    <View style={styles.todayBadge}>
                      <Text style={styles.todayText}>today</Text>
                    </View>

                    {/* Streak Number */}
                    <Text style={styles.streakNumber}>0</Text>

                    {/* Days of streak */}
                    <Text style={styles.streakLabel}>Days of streak</Text>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Date */}
                    <Text style={styles.dateText}>{getCurrentDate()}</Text>
                  </LinearGradient>
                </BlurView>
              </View>
            </View>

            {/* Title Section */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Finally</Text>
              <Text style={styles.subtitle}>A little more about you</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.inputsContainer}>
              <View style={[
                styles.inputWrapper,
                nameFocused && styles.inputWrapperFocused,
                name.length > 0 && styles.inputWrapperFilled
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  autoCapitalize="words"
                  returnKeyType="next"
                  autoCorrect={false}
                />
              </View>

              <View style={[
                styles.inputWrapper,
                ageFocused && styles.inputWrapperFocused,
                age.length > 0 && styles.inputWrapperFilled
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Age"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={age}
                  onChangeText={(text) => {
                    // Only allow numbers
                    const numericText = text.replace(/[^0-9]/g, '');
                    setAge(numericText);
                  }}
                  onFocus={() => setAgeFocused(true)}
                  onBlur={() => setAgeFocused(false)}
                  keyboardType="default"
                  returnKeyType="done"
                  onSubmitEditing={handleContinue}
                  maxLength={3}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Continue Button - Fixed at bottom */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!name.trim() || !age.trim()) && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={!name.trim() || !age.trim()}
            activeOpacity={0.9}
            accessibilityLabel="Continue"
            accessibilityHint="Saves your information and continues"
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 16,
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  streakCardContainer: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.04,
    marginBottom: 32,
  },
  streakCard: {
    width: 280,
    height: 360,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    overflow: 'hidden',
  },
  blurView: {
    flex: 1,
  },
  cardGradient: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 24,
  },
  todayBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  todayText: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 12,
  },
  streakNumber: {
    fontFamily: fonts.semiBold,
    fontSize: 80,
    color: '#F9F8FD',
    lineHeight: 80,
    marginBottom: 16,
  },
  streakLabel: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: '#F9F8FD',
    lineHeight: 21.6,
    marginBottom: 26,
  },
  divider: {
    width: 232,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    borderRadius: 10,
    marginBottom: 26,
  },
  dateText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: '#F9F8FD',
    lineHeight: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: fonts.light,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
  },
  inputsContainer: {
    gap: 12,
  },
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 40,
    opacity: 0.4,
  },
  inputWrapperFocused: {
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputWrapperFilled: {
    opacity: 1,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 16,
    padding: 0,
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

export default UserInfoScreen;
