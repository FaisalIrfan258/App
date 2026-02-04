import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import ReviewCard from '../../components/onboarding/ReviewCard';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Review'>;

const REVIEWS = [
  {
    name: 'Sarah Mitchell',
    review:
      "I didn't expect much. I just pressed start because I was overwhelmed. Ten minutes later, my chest felt lighter. It didn't try to fix me or ask questions. It just helped me breathe again.",
    rating: 5,
  },
  {
    name: 'Justin Trapp',
    review:
      "This is the first app that didn't make me feel broken. No tracking, no pressure; just a calm place when my mind gets loud. I keep coming back because it feels safe.",
    rating: 5,
  },
];

const ReviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Paywall');
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
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Give us a rating</Text>
          </View>

          {/* Rating Display */}
          <View style={styles.ratingContainer}>
            <LinearGradient
              colors={['#FFFFFF', 'rgba(255, 255, 255, 0)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.decorativeLine}
            />
            <View style={styles.ratingContent}>
              <Text style={styles.ratingText}>4.8 Stars</Text>
              <Text style={styles.ratingSubtext}>100k+ App Ratings</Text>
            </View>
            <LinearGradient
              colors={['#FFFFFF', 'rgba(255, 255, 255, 0)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.decorativeLine}
            />
          </View>

          {/* Review Cards */}
          <View style={styles.reviewsContainer}>
            {REVIEWS.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                review={review.review}
                rating={review.rating}
              />
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.9}
            accessibilityLabel="Continue"
            accessibilityHint="Proceeds to the paywall screen"
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
  titleContainer: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.12,
    marginBottom: 20,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 36,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 50.4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    marginBottom: 40,
  },
  decorativeLine: {
    width: 26.71,
    height: 56.03,
  },
  ratingContent: {
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
  },
  ratingSubtext: {
    fontFamily: fonts.light,
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  reviewsContainer: {
    gap: 20,
    paddingHorizontal: 4,
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
  continueButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});

export default ReviewScreen;
