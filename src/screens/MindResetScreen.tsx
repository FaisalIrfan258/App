import React from 'react';
import SupportToolPlayer from '../components/support/SupportToolPlayer';
import { useProgress } from '../contexts/ProgressContext';

export default function MindResetScreen({ navigation }: any) {
  const { recordActivity } = useProgress();

  const handleClose = async () => {
    // Track 1 minute for mind reset when audio completes
    // await recordActivity(1);
    navigation.goBack();
  };

  return (
    <SupportToolPlayer
      title="1 Min Mind Reset"
      subtitle="Quick reset by Today"
      image={require('../../assets/home/mind-reset.jpg')}
      duration="00:59"
      onClose={handleClose}
    />
  );
}
