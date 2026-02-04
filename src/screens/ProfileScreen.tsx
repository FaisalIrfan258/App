import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSubscription } from '../contexts/SubscriptionContext';
import { RadialGradientBackground } from '../components/common/RadialGradientBackground';
import { fonts } from '../constants/theme';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { isProUser, restorePurchases } = useSubscription();
  const userName = 'Roman';

  const handleHomePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Home');
  };

  const handlePanicPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate('Panic');
  };

  const handleManageSubscription = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Manage Subscription', 'Subscription management coming soon!');
  };

  const handleRestorePurchases = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await restorePurchases();
      Alert.alert('Success', 'Purchases restored successfully!');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to restore purchases. Please try again.');
    }
  };

  const handleUpgrade = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Upgrade', 'Upgrade functionality coming soon!');
  };

  return (
    <RadialGradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#AB9FF0" />
          </View>
          <Text style={styles.username}>{userName}</Text>
        </View>

        {/* Subscription Section */}
        <View style={styles.subscriptionSection}>
          {isProUser ? (
            <>
              <View style={styles.proBadgeContainer}>
                <Ionicons name="star" size={20} color="#8B7FD4" />
                <Text style={styles.proText}>Today Pro</Text>
              </View>
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={handleManageSubscription}
                >
                  <Ionicons name="settings-outline" size={24} color="#AB9FF0" />
                  <Text style={styles.menuText}>Manage Subscription</Text>
                  <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={handleUpgrade}
              >
                <Ionicons name="star-outline" size={24} color="#AB9FF0" />
                <Text style={styles.upgradeText}>Upgrade to Pro</Text>
                <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>
            </View>
          )}

          {/* Restore Purchases */}
          <View style={[styles.menuContainer, { marginTop: 24 }]}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={handleRestorePurchases}
            >
              <Ionicons name="refresh-outline" size={24} color="#AB9FF0" />
              <Text style={styles.menuText}>Restore Purchases</Text>
              <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navTab} onPress={handleHomePress}>
            <Image
              source={require('../../assets/home/nav-home.png')}
              style={[styles.navIcon, { tintColor: '#FFFFFF' }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate('Progress')}
          >
            <Image
              source={require('../../assets/home/nav-progress-active.png')}
              style={[styles.navIcon, { tintColor: '#FFFFFF' }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate('Community')}
          >
            <Image
              source={require('../../assets/home/nav-community.png')}
              style={[styles.navIcon, { tintColor: '#FFFFFF' }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab}>
            <Image
              source={require('../../assets/home/nav-profile.png')}
              style={[styles.navIcon, { tintColor: '#AB9FF0' }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </RadialGradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 12,
    marginBottom: 28,
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(41, 41, 41, 0.40)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#AB9FF0',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  menuContainer: {
    backgroundColor: 'rgba(41, 41, 41, 0.40)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.20)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 16,
  },
  subscriptionSection: {
    marginBottom: 24,
  },
  proBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(139, 127, 212, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
    gap: 8,
  },
  proText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8B7FD4',
  },
  upgradeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#AB9FF0',
    marginLeft: 16,
  },
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

export default ProfileScreen;
