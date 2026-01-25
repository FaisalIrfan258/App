import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {
  colors,
  fonts,
  spacing,
  borderRadius,
} from '../../constants/theme';

interface SelectableCardProps {
  label: string;
  icon?: string;
  isSelected: boolean;
  onSelect: () => void;
  variant?: 'default' | 'compact';
  style?: ViewStyle;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  label,
  icon,
  isSelected,
  onSelect,
  variant = 'default',
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

  const isCompact = variant === 'compact';

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        style={[
          styles.card,
          isCompact && styles.cardCompact,
          isSelected && styles.cardSelected,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        accessible
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
        accessibilityLabel={label}
      >
        {icon && (
          <Ionicons
            name={icon as any}
            size={isCompact ? 20 : 24}
            color={isSelected ? colors.primary.default : colors.text.secondary}
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.label,
            isCompact && styles.labelCompact,
            isSelected && styles.labelSelected,
          ]}
        >
          {label}
        </Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors.primary.default}
            />
          </View>
        )}
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
    borderWidth: 1,
    borderColor: colors.card.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 60,
  },
  cardCompact: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    minHeight: 52,
  },
  cardSelected: {
    borderColor: colors.primary.default,
    borderWidth: 2,
    backgroundColor: 'rgba(139, 127, 212, 0.1)',
  },
  icon: {
    marginRight: spacing.md,
  },
  label: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 17,
    color: colors.text.primary,
  },
  labelCompact: {
    fontSize: 16,
  },
  labelSelected: {
    color: colors.text.primary,
  },
  checkmark: {
    marginLeft: spacing.sm,
  },
});

export default SelectableCard;
