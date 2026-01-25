import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, spacing } from '../../constants/theme';

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
}

const STAR_COLOR = '#FCA212'; // Orange color for new design

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 24,
  showNumber = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {Array.from({ length: fullStars }).map((_, index) => (
          <Ionicons key={`full-${index}`} name="star" size={size} color={STAR_COLOR} />
        ))}
        {hasHalfStar && (
          <Ionicons name="star-half" size={size} color={STAR_COLOR} />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Ionicons
            key={`empty-${index}`}
            name="star-outline"
            size={size}
            color={STAR_COLOR}
          />
        ))}
      </View>
      {showNumber && <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: spacing.xs,
  },
});

export default StarRating;
