import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RadialGradientBackground } from '../common/RadialGradientBackground';
import { fonts } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SupportToolPlayerProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  duration: string;
  onClose: () => void;
  onPlayPause?: (isPlaying: boolean) => void;
}

const SupportToolPlayer: React.FC<SupportToolPlayerProps> = ({
  title,
  subtitle,
  image,
  duration,
  onClose,
  onPlayPause,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(duration);

  const handlePlayPause = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    onPlayPause?.(newState);
  };

  return (
    <RadialGradientBackground>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Timer */}
          <Text style={styles.timer}>{currentTime}</Text>

          {/* Play/Pause Button */}
          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlayPause}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={36}
              color="#000000"
              style={!isPlaying ? { marginLeft: 4 } : {}}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </RadialGradientBackground>
  );
};

const IMAGE_WIDTH = SCREEN_WIDTH - 48;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    overflow: 'hidden',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: 'rgba(255, 255, 255, 0.60)',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 30,
  },
  timer: {
    fontSize: 30,
    fontFamily: fonts.medium,
    color: 'rgba(255, 255, 255, 0.60)',
    textAlign: 'center',
    marginBottom: 30,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SupportToolPlayer;
