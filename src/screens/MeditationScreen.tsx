import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AnimatedWaveRings from '../components/session/AnimatedWaveRings';
import { getCurrentSessionAudio } from '../services/sessionService';
import { colors, fonts, spacing } from '../constants/theme';
import { useProgress } from '../contexts/ProgressContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type AudioMode = 'ambient' | 'guided';

interface MeditationScreenProps {
  navigation: any;
}

const MeditationScreen: React.FC<MeditationScreenProps> = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<AudioMode>('ambient');
  const [sessionInfo, setSessionInfo] = useState({ sessionNumber: 1, totalSessions: 4 });
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const playbackStartTime = useRef<number | null>(null);
  const { recordActivity } = useProgress();

  // Load audio on mount
  useEffect(() => {
    setupAudio();
    return () => {
      // Cleanup audio on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const setupAudio = async () => {
    try {
      // Configure audio mode for background playback
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      // Get current session
      const session = await getCurrentSessionAudio();
      setSessionInfo({
        sessionNumber: session.sessionNumber,
        totalSessions: session.totalSessions,
      });

      // Load the audio
      const { sound } = await Audio.Sound.createAsync(
        session.source,
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
      setIsLoading(false);
    } catch (error) {
      console.error('Error setting up audio:', error);
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = async (status: any) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        setIsPlaying(false);
        // Track activity completion
        if (playbackStartTime.current) {
          const playedMinutes = Math.round(
            (Date.now() - playbackStartTime.current) / (1000 * 60)
          );
          await recordActivity(Math.max(playedMinutes, 1));
          playbackStartTime.current = null;
        }
      }
    }
  };

  const handlePlayPause = async () => {
    if (!soundRef.current) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        if (!playbackStartTime.current) {
          playbackStartTime.current = Date.now();
        }
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Stop audio before closing
    if (soundRef.current && isPlaying) {
      await soundRef.current.pauseAsync();
    }

    navigation.goBack();
  };

  const handleModeChange = async (mode: AudioMode) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAudioMode(mode);
    // In future, this could switch between ambient-only and guided voice tracks
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1625', '#2d2640', '#1a1625']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerSpacer} />
            <Text style={styles.title}>today</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Close session"
            >
              <Ionicons name="close" size={28} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Animated Wave Rings with Play/Pause Button */}
          <View style={styles.waveContainer}>
            <AnimatedWaveRings isPlaying={isPlaying}>
              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={handlePlayPause}
                activeOpacity={0.8}
                disabled={isLoading}
                accessibilityLabel={isPlaying ? 'Pause session' : 'Play session'}
              >
                {isLoading ? (
                  <Text style={styles.loadingText}>...</Text>
                ) : (
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={48}
                    color={colors.text.primary}
                    style={isPlaying ? {} : { marginLeft: 6 }}
                  />
                )}
              </TouchableOpacity>
            </AnimatedWaveRings>
          </View>

          {/* Bottom Controls */}
          <SafeAreaView edges={['bottom']} style={styles.bottomContainer}>
            <View style={styles.modeSelector}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  audioMode === 'ambient' && styles.modeButtonActive,
                ]}
                onPress={() => handleModeChange('ambient')}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="pulse-outline"
                  size={18}
                  color="#FFFFFF"
                />
                <Text
                  style={[
                    styles.modeText,
                    audioMode === 'ambient' && styles.modeTextActive,
                  ]}
                >
                  AMBIENT
                </Text>
              </TouchableOpacity>

              <View style={styles.modeDivider} />

              <TouchableOpacity
                style={[
                  styles.modeButton,
                  audioMode === 'guided' && styles.modeButtonActive,
                ]}
                onPress={() => handleModeChange('guided')}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="mic-outline"
                  size={18}
                  color="#FFFFFF"
                />
                <Text
                  style={[
                    styles.modeText,
                    audioMode === 'guided' && styles.modeTextActive,
                  ]}
                >
                  GUIDED VOICE
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl * 2,
  },
  headerSpacer: {
    width: 28,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 20,
    color: colors.text.secondary,
    letterSpacing: 2,
  },
  closeButton: {
    padding: spacing.xs,
  },
  waveContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: fonts.medium,
    fontSize: 24,
    color: colors.text.primary,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    marginTop: spacing.xl,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  modeButtonActive: {
    // Active state styling
  },
  modeText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.text.secondary,
    letterSpacing: 1,
  },
  modeTextActive: {
    color: colors.text.primary,
  },
  modeDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.text.tertiary,
    marginHorizontal: spacing.md,
  },
});

export default MeditationScreen;
