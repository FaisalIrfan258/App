import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fonts } from '../../constants/theme';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  subtitle?: string;
  savingsPercentage?: number;
  isSelected: boolean;
  onPress: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  subtitle,
  savingsPercentage,
  isSelected,
  onPress,
}) => {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected ? styles.cardSelected : styles.cardDefault,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected }}
      accessibilityLabel={`${title} plan, ${price} ${period}${subtitle ? `, ${subtitle}` : ''}`}
    >
      {/* Savings Badge */}
      {savingsPercentage && savingsPercentage > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SAVE {savingsPercentage}%</Text>
        </View>
      )}

      {/* Checkmark Icon */}
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#FFFFFF"
          style={styles.checkmark}
        />
      )}

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.period}>/{period}</Text>
        </View>

        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    paddingVertical: 30,
    paddingHorizontal: 24,
    minHeight: 180,
    justifyContent: 'center',
  },
  cardDefault: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardSelected: {
    backgroundColor: 'rgba(171, 159, 243, 0.25)',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#000000',
    textTransform: 'uppercase',
  },
  checkmark: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: '#FFFFFF',
  },
  period: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.70)',
    marginLeft: 2,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.60)',
    textAlign: 'center',
    marginTop: 4,
  },
});
