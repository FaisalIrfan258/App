import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { RadialGradientBackground } from '../components/common/RadialGradientBackground';
import { fonts } from '../constants/theme';

// Colors
const COLORS = {
  primary: '#AB9FF0',
  primaryDark: '#705AAF',
  primaryLight: '#9583E1',
  background: '#000000',
  cardBg: 'rgba(41, 41, 41, 0.40)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.70)',
  textMuted: 'rgba(255, 255, 255, 0.40)',
  tagBg: 'rgba(71, 56, 135, 0.50)',
};

// Support Tools Data
const SUPPORT_TOOLS = [
  {
    id: 'quiet-audio',
    title: 'Quiet audio space',
    subtitle: 'Soothing nature sounds',
    tag: 'Meditations',
    image: require('../../assets/home/meditations.jpg'),
    screen: 'QuietAudio',
  },
  {
    id: 'sleep',
    title: 'Sleep wind down',
    subtitle: 'Prep for sleep',
    tag: 'Sleep',
    image: require('../../assets/home/sleep.jpg'),
    screen: 'SleepWindDown',
  },
  {
    id: 'thought-slowing',
    title: 'Thought Slowing',
    subtitle: 'Ease spiraling',
    tag: null,
    image: require('../../assets/home/thought-slowing.webp'),
    screen: 'ThoughtSlowing',
  },
  {
    id: 'mind-reset',
    title: '1 Min Mind Reset',
    subtitle: 'Quick reset',
    tag: null,
    image: require('../../assets/home/mind-reset.jpg'),
    screen: 'MindReset',
  },
];

export default function HomeScreen({ navigation }: any) {
  const userName = 'Roman';
  const streakCount = 2;

  const handleCommunityPress = () => {
    navigation.navigate('Community');
  };

  return (
    <RadialGradientBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Row */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/home/today-logo.png')}
                style={styles.logoIcon}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>today</Text>
            </View>
            <View style={styles.streakPill}>
              <Image
                source={require('../../assets/home/fire-icon.png')}
                style={styles.fireIcon}
                resizeMode="contain"
              />
              <Text style={styles.streakText}>{streakCount}</Text>
            </View>
          </View>

          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <Text style={styles.greetingSubtitle}>How are you feeling?</Text>
            <Text style={styles.greetingTitle}>{userName}</Text>
          </View>

          {/* Reset My Mind Card */}
          <LinearGradient
            colors={['rgba(55, 45, 85, 0.35)', 'rgba(149, 131, 225, 0.35)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.resetCard}
          >
            <View style={styles.resetCardInner}>
              <View style={styles.resetCardLeft}>
                <Text style={styles.resetTitle}>Reset My Mind</Text>
                <View style={styles.resetInfoRow}>
                  <Ionicons name="refresh" size={12} color={COLORS.textSecondary} />
                  <Text style={styles.resetInfoText}>Everyday</Text>
                </View>
                <View style={styles.resetInfoRow}>
                  <Ionicons name="time-outline" size={12} color={COLORS.textSecondary} />
                  <Text style={styles.resetInfoText}>7 minute</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('Meditation')}
                >
                  <LinearGradient
                    colors={[COLORS.primaryDark, COLORS.primaryLight]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.startButton}
                  >
                    <Text style={styles.startButtonText}>Start</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <Image
                source={require('../../assets/home/reset-mind.jpg')}
                style={styles.resetImage}
                resizeMode="cover"
              />
            </View>
          </LinearGradient>

          {/* Support Tools Section */}
          <View style={styles.supportToolsHeader}>
            <Text style={styles.supportToolsTitle}>Support Tools</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.supportToolsScroll}
          >
            {SUPPORT_TOOLS.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                activeOpacity={0.85}
                onPress={() => navigation.navigate(tool.screen)}
                style={styles.toolCard}
              >
                <ImageBackground
                  source={tool.image}
                  style={styles.toolCardImage}
                  imageStyle={styles.toolCardImageStyle}
                >
                  <Text style={styles.toolCardWatermark}>today</Text>
                </ImageBackground>
                <View style={styles.toolCardContent}>
                  {tool.tag && (
                    <View style={styles.toolCardTag}>
                      <Text style={styles.toolCardTagText}>{tool.tag}</Text>
                    </View>
                  )}
                  <Text style={styles.toolCardTitle}>{tool.title}</Text>
                  <Text style={styles.toolCardSubtitle}>{tool.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>

      {/* Need Help Now Button */}
      <View style={styles.helpButtonWrapper}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Panic')}
        >
          <View style={styles.helpButtonContainer}>
            <LinearGradient
              colors={['rgba(152, 134, 229, 0)', '#9886E5']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.helpButton}
            >
              <Ionicons name="warning" size={20} color="#fff" />
              <Text style={styles.helpButtonText}>Need Help Now</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navTab}>
            <Image
              source={require('../../assets/home/nav-home.png')}
              style={[styles.navIcon, { tintColor: COLORS.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate('Progress')}
          >
            <Image
              source={require('../../assets/home/nav-progress-active.png')}
              style={[styles.navIcon, { tintColor: COLORS.textPrimary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab} onPress={handleCommunityPress}>
            <Image
              source={require('../../assets/home/nav-community.png')}
              style={[styles.navIcon, { tintColor: COLORS.textPrimary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={require('../../assets/home/nav-profile.png')}
              style={[styles.navIcon, { tintColor: COLORS.textPrimary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </RadialGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 21,
    paddingBottom: 140,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 24,
    height: 24,
  },
  logoText: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: COLORS.primary,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  fireIcon: {
    width: 16,
    height: 16,
  },
  streakText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
  },
  // Greeting
  greetingSection: {
    marginBottom: 20,
  },
  greetingSubtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  greetingTitle: {
    fontSize: 32,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
  },
  // Reset My Mind Card
  resetCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resetCardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetCardLeft: {
    flex: 1,
  },
  resetTitle: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  resetInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  resetInfoText: {
    fontSize: 11,
    fontFamily: fonts.regular,
    color: COLORS.textSecondary,
  },
  startButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  resetImage: {
    width: 140,
    height: 100,
    borderRadius: 16,
  },
  // Support Tools
  supportToolsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  supportToolsTitle: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
  },
  supportToolsScroll: {
    paddingRight: 21,
    gap: 14,
  },
  toolCard: {
    width: 180,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
  },
  toolCardImage: {
    width: 180,
    height: 150,
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10,
  },
  toolCardImageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  toolCardWatermark: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  toolCardContent: {
    padding: 12,
  },
  toolCardTag: {
    backgroundColor: COLORS.tagBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  toolCardTagText: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: COLORS.primary,
  },
  toolCardTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  toolCardSubtitle: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  // Need Help Now Button
  helpButtonWrapper: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  helpButtonContainer: {
    backgroundColor: '#000000',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    shadowColor: 'rgba(130, 122, 178, 0.6)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 12,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 8,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: fonts.bold,
  },
  // Bottom Navigation
  bottomNavWrapper: {
    backgroundColor: 'transparent',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navTab: {
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});
