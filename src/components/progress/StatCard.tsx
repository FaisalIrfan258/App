import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../constants/theme';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string | number;
}

const COLORS = {
  primary: '#AB9FF0',
  cardBg: 'rgba(40, 40, 45, 0.6)',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.60)',
  divider: 'rgba(255, 255, 255, 0.15)',
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color={COLORS.textSecondary} />
      </View>
      <View style={styles.divider} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  iconContainer: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.divider,
    marginHorizontal: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  value: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
});

export default StatCard;
