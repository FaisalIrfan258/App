import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { RadialGradientBackground } from '../components/common/RadialGradientBackground';

// Nature illustrations array
const NATURE_IMAGES = [
  require('../../assets/nature-illustrations/Art Pin.jpg'),
  require('../../assets/nature-illustrations/Arte Pin.jpg'),
  require("../../assets/nature-illustrations/Fond d'ecran Pin.jpg"),
  require('../../assets/nature-illustrations/Pin on My.jpg'),
  require('../../assets/nature-illustrations/Sheep on Green Field.png'),
  require('../../assets/nature-illustrations/Tranh Hieu Ung.jpg'),
  require('../../assets/nature-illustrations/Vibes Pin.jpg'),
  require('../../assets/nature-illustrations/Wall Art Pin.jpg'),
];

export default function HomeScreen({ navigation }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Select random image on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * NATURE_IMAGES.length);
    setCurrentImageIndex(randomIndex);
  }, []);
  return (
    <RadialGradientBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>You're safe to start.</Text>
          <Text style={styles.title}>Roman</Text>
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          <ImageBackground
            source={NATURE_IMAGES[currentImageIndex]}
            resizeMode="cover"
            style={styles.image}
            imageStyle={styles.imageRadius}
          >
            <Text style={styles.today}>today</Text>
          </ImageBackground>

          {/* Bottom Section: Headphone + Button */}
          <View style={styles.cardBottom}>
            {/* Headphone Message */}
            <View style={styles.headphoneRow}>
              <Ionicons name="headset" size={16} color="rgba(255, 255, 255, 0.90)" style={{ marginRight: 8 }} />
              <Text style={styles.headphoneText}>
                Use headphone for best experience
              </Text>
            </View>

            {/* Start Button */}
            <LinearGradient
              colors={['#705AAF', '#9583E1']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.startButton}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Meditation')}
                style={styles.startButtonTouchable}
              >
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom Tabs */}
      <SafeAreaView edges={['bottom']} style={styles.tabsWrapper}>
        {/* Floating Help Button - overlaps tabs */}
        <View style={styles.helpWrapper}>
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
                <Text style={styles.helpText}>Need Help Now</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="home" size={24} color="#AB9FF0" />
            <Text style={styles.tabActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person" size={20} color="#AB9FF0" />
            <Text style={styles.tabText}>Roman</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </RadialGradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingHorizontal: 24 },
  header: { marginTop: 12, marginBottom: 28 },
  subtitle: { color: '#A1A1B3', fontSize: 15 },
  title: { color: '#fff', fontSize: 34, fontWeight: '700' },
  card: {
    backgroundColor: 'rgba(41, 41, 41, 0.40)',
    borderRadius: 50,
    padding: 2,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.20)',
  },
  image: {
    height: 340,
    justifyContent: 'flex-start',
  },
  imageRadius: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.20)',
  },
  today: {
    marginTop: 12,
    marginLeft: 19,
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.40)',
    fontWeight: '700',
    lineHeight: 30,
  },
  cardBottom: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  headphoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  headphoneText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  startButton: {
    width: 160,
    height: 45,
    borderRadius: 16,
    marginTop: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    overflow: 'hidden',
  },
  startButtonTouchable: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 16,
    textAlign: 'center',
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
});
