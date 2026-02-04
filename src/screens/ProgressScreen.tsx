import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadialGradientBackground } from '../components/common/RadialGradientBackground';
import RecoveryGauge from '../components/progress/RecoveryGauge';
import StatCard from '../components/progress/StatCard';
import { useProgress } from '../contexts/ProgressContext';
import { fonts } from '../constants/theme';

const COLORS = {
  primary: '#AB9FF0',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.70)',
};

export default function ProgressScreen({ navigation }: any) {
  const { progressData, getRecoveryPercentage, isLoading } = useProgress();
  const userName = 'Roman';

  const recoveryPercentage = getRecoveryPercentage();

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleCommunityPress = () => {
    navigation.navigate('Community');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <RadialGradientBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header - Centered */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                source={require('../../assets/home/nav-progress-active.png')}
                style={styles.headerIcon}
                resizeMode="contain"
              />
              <Text style={styles.headerTitle}>Your Progress</Text>
            </View>
          </View>

          {/* Recovery Gauge */}
          <View style={styles.gaugeContainer}>
            <RecoveryGauge percentage={recoveryPercentage} size={320} />
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <StatCard
              icon="sync-outline"
              title="Calm Recoveries"
              value={progressData.calmRecoveries}
            />
            <StatCard
              icon="time-outline"
              title="Reset Minutes"
              value={progressData.resetMinutes}
            />
            <StatCard
              icon="flame-outline"
              title="Streak"
              value={progressData.currentStreak}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navTab} onPress={handleHomePress}>
            <Image
              source={require('../../assets/home/nav-home.png')}
              style={[styles.navIcon, { tintColor: COLORS.textPrimary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab}>
            <Image
              source={require('../../assets/home/nav-progress-active.png')}
              style={styles.navIcon}
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

          <TouchableOpacity style={styles.navTab} onPress={handleProfilePress}>
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
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  // Header - Centered
  header: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.textPrimary,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
  },
  // Gauge
  gaugeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  // Stats
  statsContainer: {
    gap: 12,
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
