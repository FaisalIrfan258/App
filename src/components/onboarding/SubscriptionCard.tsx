import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  colors,
  fonts,
  spacing,
  borderRadius,
} from '../../constants/theme';

interface SubscriptionCardProps {
  title: string;
  price: string;
  period: string;
  savings?: string;
  isSelected: boolean;
  isPopular?: boolean;
  onSelect: () => void;
  style?: ViewStyle;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  period,
  savings,
  isSelected,
  isPopular,
  onSelect,
  style,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      friction: 15,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 15,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        accessible
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
        accessibilityLabel={`${title} plan, ${price} ${period}`}
      >
        {isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>SAVE 10%</Text>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.period}>{period}</Text>
          </View>
        </View>
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card.background,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: spacing.lg,
    position: 'relative',
  },
  cardSelected: {
    borderColor: colors.primary.default,
    backgroundColor: 'rgba(139, 127, 212, 0.1)',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: spacing.lg,
    backgroundColor: colors.accent.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  popularText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.text.inverse,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 17,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.text.primary,
  },
  period: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.text.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary.default,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.default,
  },
});

export default SubscriptionCard;
