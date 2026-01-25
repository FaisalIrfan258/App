import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fonts, spacing } from '../../constants/theme';
import { OnboardingStackParamList } from '../../types/onboarding';

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
        name="checkmark"
        size={24}
        color="#C3B7F9"
        style={{ fontWeight: 'bold' }}
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Large black decorative circle */}
      <View style={styles.decorativeCircle} />

      <View style={styles.content}>
        {/* Heading */}
        <Text style={styles.title}>You stay in control.</Text>

        {/* Reassurance items */}
        <View style={styles.itemsContainer}>
          {reassurances.map((item, index) => (
            <ReassuranceItem key={index} text={item.text} delay={item.delay} />
          ))}
        </View>
      </View>

      {/* Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          accessibilityLabel="I'm ready"
          accessibilityHint="Proceeds to the review screen"
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>I'm ready</Text>
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
  decorativeCircle: {
    position: 'absolute',
    width: 800,
    height: 800,
    borderRadius: 9999,
    backgroundColor: '#000000',
    left: -199,
    top: 134,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 22,
    lineHeight: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    top: 215,
    left: 24,
    right: 24,
  },
  itemsContainer: {
    position: 'absolute',
    top: 309.5,
    left: 24,
    right: 24,
    gap: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 14,
  },
  itemText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
    zIndex: 1,
  },
  button: {
    width: 354,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 19,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});

export default ControlScreen;
