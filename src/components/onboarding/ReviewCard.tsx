import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, borderRadius, shadows } from '../../constants/theme';
import StarRating from './StarRating';

interface ReviewCardProps {
  name: string;
  review: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, review, rating }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <StarRating rating={rating} size={16} showNumber={false} />
      </View>
      <Text style={styles.reviewText} numberOfLines={4}>
        {review}
      </Text>
      <View style={styles.footer}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F4F3F7', // Light cream background
    borderRadius: 30, // Updated from borderRadius.lg
    padding: spacing.lg,
    width: '100%', // Full width with margins handled by parent
    // Custom shadow matching design specs
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 70, // Reduced from 140 for better performance
    elevation: 10, // Android shadow
  },
  header: {
    marginBottom: spacing.md,
  },
  reviewText: {
    fontFamily: fonts.light, // Using light weight (300)
    fontSize: 14, // Updated from 15
    color: '#1D1A23', // Dark text color
    lineHeight: 19.6, // Matching design specs
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24, // Updated from 32
    height: 24, // Updated from 32
    borderRadius: 12, // Updated from 16
    backgroundColor: colors.primary.default,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  initials: {
    fontFamily: fonts.bold,
    fontSize: 10, // Reduced proportionally
    color: colors.text.inverse,
  },
  name: {
    fontFamily: fonts.bold, // Using bold weight (600)
    fontSize: 16, // Updated from 15
    color: '#1D1A23', // Dark text color
  },
});

export default ReviewCard;
