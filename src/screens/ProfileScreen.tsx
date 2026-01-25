import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAuth } from '../contexts/AuthContext';
import { RadialGradientBackground } from '../components/common/RadialGradientBackground';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { userProfile, signOut, isAuthenticated } = useAuth();

  const handleHomePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Home');
  };

  const handlePanicPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate('Panic');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              await signOut();
              Alert.alert('Signed Out', 'You have been signed out successfully.');
            } catch (error: any) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const displayName = userProfile?.displayName || 'Guest User';
  const displayEmail = userProfile?.email || 'Not signed in';
  const authStatus = isAuthenticated
    ? userProfile?.provider === 'anonymous'
      ? 'Anonymous'
      : 'Signed in'
    : 'Not signed in';

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
          <Text style={styles.username}>{displayName}</Text>
          <Text style={styles.subtitle}>{displayEmail}</Text>
          <Text style={styles.authStatus}>{authStatus}</Text>
        </View>

        {/* Menu Items */}
        {isAuthenticated && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={[styles.menuItem, styles.signOutItem]}
              activeOpacity={0.7}
              onPress={handleSignOut}
            >
              <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
              <Text style={[styles.menuText, styles.signOutText]}>Sign Out</Text>
              <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>

      {/* Bottom Tabs */}
      <SafeAreaView edges={['bottom']} style={styles.tabsWrapper}>
        {/* Floating Help Button - overlaps tabs */}
        <View style={styles.helpWrapper}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handlePanicPress}
          >
            <View style={styles.helpButtonContainer}>
              <LinearGradient
                colors={['rgba(152, 134, 229, 0)', '#9886E5']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.helpButton}
              >
                <Ionicons name="warning" size={20} color="#fff" />
                <Text style={styles.helpText}>Need Help Now</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={handleHomePress}
          >
            <Ionicons name="home" size={24} color="#AB9FF0" />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="person" size={20} color="#AB9FF0" />
            <Text style={styles.tabActive}>Roman</Text>
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
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#A1A1B3',
  },
  authStatus: {
    fontSize: 12,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
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
    color: '#FF6B6B',
    marginLeft: 16,
  },
  tabsWrapper: {
    position: 'relative',
  },
  helpWrapper: {
    position: 'absolute',
    top: -40,
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
    paddingVertical: 26,
    paddingHorizontal: 24,
    gap: 8,
  },
  helpText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 14,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 220,
    paddingVertical: 12,
    paddingTop: 20,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
  },
  tabActive: {
    color: '#AB9FF0',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 24,
    textAlign: 'center',
  },
  signOutItem: {},
  signOutText: {},
});

export default ProfileScreen;
