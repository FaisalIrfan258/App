import React from 'react';
import SupportToolPlayer from '../components/support/SupportToolPlayer';
import { useProgress } from '../contexts/ProgressContext';

export default function SleepWindDownScreen({ navigation }: any) {
  const { recordActivity } = useProgress();

  const handleClose = async () => {
    // Track playback time when audio completes
    // await recordActivity(minutes);
    navigation.goBack();
  };

  return (
    <SupportToolPlayer
      title="Sleep Wind Down"
      subtitle="Prep for sleep by Today"
      image={require('../../assets/home/sleep.jpg')}
      duration="10:00"
      onClose={handleClose}
    />
  );
}
