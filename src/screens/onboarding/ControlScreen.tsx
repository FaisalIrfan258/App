import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'Control'>;

interface ReassuranceItemProps {
  text: string;
  delay: number;
}

const ReassuranceItem: React.FC<ReassuranceItemProps> = ({ text, delay }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <Ionicons
        name="checkmark-circle"
        size={21}
        color="#C3B7F9"
      />
      <Text style={styles.itemText}>{text}</Text>
    </Animated.View>
  );
};

const ControlScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const reassurances = [
    { text: 'I can stop anytime', delay: 200 },
    { text: 'No notifications without permission', delay: 400 },
    { text: 'No judgment, ever', delay: 600 },
  ];

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Review');
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
            <Text style={styles.title}>You stay in control.</Text>
          </View>

          <View style={styles.cardsContainer}>
            {reassurances.map((item, index) => (
              <ReassuranceItem key={index} text={item.text} delay={item.delay} />
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.9}
            accessibilityLabel="I'm ready"
            accessibilityHint="Proceeds to the review screen"
          >
            <Text style={styles.continueButtonText}>I'm ready</Text>
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
    fontFamily: fonts.bold,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  cardsContainer: {
    gap: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 14,
  },
  itemText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 16,
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

export default ControlScreen;
