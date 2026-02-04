import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { hapticService } from '../services/hapticService';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import { useProgress } from '../contexts/ProgressContext';

interface UpliftingTextScreenProps {
  navigation: any;
}

const AFFIRMATIONS = [
  {
    text: "You are safe.\nThis feeling will pass.\nYou've handled this before.",
    color: colors.breathing.inhale,
  },
  {
    text: "You've survived 100% of your worst days.\nYou're doing better than you think.",
    color: colors.accent.calm,
  },
  {
    text: 'Focus on your breath.\nYou are in control.\nOne moment at a time.',
    color: colors.breathing.hold,
  },
  {
    text: 'This is temporary.\nYou are strong.\nYou will get through this.',
    color: colors.breathing.exhale,
  },
  {
    text: "It's okay to not be okay.\nYou're doing your best,\nand that's enough.",
    color: colors.accent.success,
  },
  {
    text: 'You are not alone.\nMany people feel this way.\nReaching out is brave.',
    color: colors.primary.default,
  },
  {
    text: "It's okay to take a break.\nYour feelings are valid.\nSelf-care is important.",
    color: colors.accent.calm,
  },
  {
    text: "Progress isn't always linear.\nEvery small step counts.\nYou're moving forward.",
    color: colors.breathing.inhale,
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const UpliftingTextScreen: React.FC<UpliftingTextScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { recordActivity } = useProgress();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);

    if (index !== currentIndex) {
      setCurrentIndex(index);
      hapticService.selection();
    }
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
    hapticService.selection();
  };

  const handleBack = async () => {
    await hapticService.buttonPress('light');
    // Track 1 minute for uplifting text
    await recordActivity(1);
    navigation.goBack();
  };

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {AFFIRMATIONS.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
            accessible={true}
            accessibilityLabel={`Go to affirmation ${index + 1}`}
            accessibilityRole="button"
          />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[AFFIRMATIONS[currentIndex].color, colors.background.primary]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            accessible={true}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Uplifting Words</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Affirmation Cards */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {AFFIRMATIONS.map((affirmation, index) => (
            <View
              key={index}
              style={[styles.card, { width: SCREEN_WIDTH }]}
            >
              <View style={styles.cardContent}>
                <Text
                  style={styles.affirmationText}
                  accessible={true}
                  accessibilityRole="text"
                  accessibilityLabel={affirmation.text.replace(/\n/g, '. ')}
                >
                  {affirmation.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination */}
        {renderPaginationDots()}

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>
            ← Swipe to see more →
          </Text>
          <Text style={styles.counter}>
            {currentIndex + 1} of {AFFIRMATIONS.length}
          </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  cardContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  affirmationText: {
    ...typography.h2,
    fontSize: 24,
    lineHeight: 36,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '300',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.tertiary,
    opacity: 0.3,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: colors.text.primary,
    opacity: 0.8,
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
  instructions: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  counter: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
});

export default UpliftingTextScreen;
