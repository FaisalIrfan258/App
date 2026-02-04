import React from 'react';
import SupportToolPlayer from '../components/support/SupportToolPlayer';
import { useProgress } from '../contexts/ProgressContext';

export default function ThoughtSlowingScreen({ navigation }: any) {
  const { recordActivity } = useProgress();

  const handleClose = async () => {
    // Track 3 minutes for thought slowing when audio completes
    // await recordActivity(3);
    navigation.goBack();
  };

  return (
    <SupportToolPlayer
      title="Thought Slowing"
      subtitle="Ease spiraling by Today"
      image={require('../../assets/home/thought-slowing.webp')}
      duration="03:00"
      onClose={handleClose}
    />
  );
}
