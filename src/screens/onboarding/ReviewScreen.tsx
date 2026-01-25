import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';
import ReviewCard from '../../components/onboarding/ReviewCard';
import Button from '../../components/common/Button';

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

  const handleContinue = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Black circular overlay for depth effect */}
      <View style={styles.circleOverlay} />

      {/* Title positioned in black area */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Give us a rating</Text>
      </View>

      {/* Award Image positioned in black area */}
      <View style={styles.awardContainer}>
        <Image
          source={require('../../../assets/images/Award.png')}
          style={styles.awardImage}
          resizeMode="contain"
        />
      </View>

      {/* Review Cards - Vertical Layout */}
      <View style={styles.reviewsContainer}>
        {REVIEWS.map((review, index) => (
          <View key={index} style={styles.reviewCardWrapper}>
            <ReviewCard
              name={review.name}
              review={review.review}
              rating={review.rating}
            />
          </View>
        ))}
      </View>

      {/* Fixed Bottom Button */}
      <View style={styles.buttonContainer}>
        <Button
          variant="onboarding"
          onPress={handleContinue}
          accessibilityLabel="Continue to sign in"
          accessibilityHint="Proceeds to the sign in screen"
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AB9FF3', // Purple background
  },
  circleOverlay: {
    position: 'absolute',
    width: 800,
    height: 800,
    borderRadius: 400,
    backgroundColor: '#000000',
    left: -199,
    top: 131,
    opacity: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    zIndex: 2,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.medium, // Spotify Mix Medium
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  awardContainer: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    zIndex: 2,
    alignItems: 'center',
  },
  awardImage: {
    width: 160,
    height: 105,
  },
  reviewsContainer: {
    position: 'absolute',
    top: 295,
    left: 0,
    right: 0,
    bottom: 150,
    paddingHorizontal: spacing.lg,
    gap: 10,
  },
  reviewCardWrapper: {
    marginBottom: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: spacing.lg,
    right: spacing.lg,
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'transparent',
  },
});

export default ReviewScreen;
