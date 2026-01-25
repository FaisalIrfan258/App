import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';
import ProgressIndicator from './ProgressIndicator';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentScreen?: number;
  showProgress?: boolean;
  bottomContent?: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentScreen,
  showProgress = true,
  bottomContent,
  style,
  contentStyle,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['top', 'bottom']}>
      {showProgress && currentScreen !== undefined && (
        <View style={styles.progressContainer}>
          <ProgressIndicator currentIndex={currentScreen} />
        </View>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
      {bottomContent && (
        <View style={styles.bottomContainer}>{bottomContent}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});

export default OnboardingLayout;
