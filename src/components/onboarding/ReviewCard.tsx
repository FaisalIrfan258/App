import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, spacing } from '../../constants/theme';

interface ReviewCardProps {
  name: string;
  review: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, review, rating }) => {
  // Render star icons
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color="#FFB800" />
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      {/* Stars */}
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>

      {/* Review Text */}
      <Text style={styles.reviewText}>
        {review}
      </Text>

      {/* Footer with Avatar and Name */}
      <View style={styles.footer}>
        <View style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 20,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 20,
    width: '100%',
    height: 170,
    justifyContent: 'space-between',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  reviewText: {
    fontFamily: fonts.light,
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 18.2,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8576B6',
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 16,
  },
});

export default ReviewCard;
