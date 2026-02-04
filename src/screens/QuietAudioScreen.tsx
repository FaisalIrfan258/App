import React from 'react';
import SupportToolPlayer from '../components/support/SupportToolPlayer';
import { useProgress } from '../contexts/ProgressContext';

export default function QuietAudioScreen({ navigation }: any) {
  const { recordActivity } = useProgress();

  const handleClose = async () => {
    // Track playback time when audio completes
    // await recordActivity(minutes);
    navigation.goBack();
  };

  return (
    <SupportToolPlayer
      title="Quiet Audio Space"
      subtitle="Soothing nature sounds by Today"
      image={require('../../assets/home/meditations.jpg')}
      duration="05:00"
      onClose={handleClose}
    />
  );
}
