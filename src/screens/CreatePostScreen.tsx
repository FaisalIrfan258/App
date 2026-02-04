import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { RadialGradientBackground } from '../components/common/RadialGradientBackground';
import { fonts } from '../constants/theme';

const COLORS = {
  primary: '#AB9FF0',
  primaryDark: '#705AAF',
  primaryLight: '#9583E1',
  cardBg: 'rgba(255, 255, 255, 0.10)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.70)',
  textMuted: 'rgba(255, 255, 255, 0.40)',
  inputBg: 'rgba(255, 255, 255, 0.08)',
};

export default function CreatePostScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;

    navigation.navigate('Community', {
      newPost: {
        title: title.trim(),
        content: content.trim(),
        isAnonymous,
      },
    });
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <RadialGradientBackground>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Post</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
                placeholder="What's on your mind?"
                placeholderTextColor={COLORS.textMuted}
                maxLength={100}
              />
            </View>

            {/* Content Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Content</Text>
              <TextInput
                style={styles.contentInput}
                value={content}
                onChangeText={setContent}
                placeholder="Share your thoughts, experiences, or questions..."
                placeholderTextColor={COLORS.textMuted}
                multiline
                textAlignVertical="top"
                maxLength={1000}
              />
            </View>

            {/* Anonymous Toggle */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
                <View style={styles.toggleTextContainer}>
                  <Text style={styles.toggleLabel}>Post anonymously</Text>
                  <Text style={styles.toggleDescription}>
                    Your name won't be shown with this post
                  </Text>
                </View>
              </View>
              <Switch
                value={isAnonymous}
                onValueChange={setIsAnonymous}
                trackColor={{
                  false: 'rgba(255, 255, 255, 0.15)',
                  true: COLORS.primary,
                }}
                thumbColor={COLORS.textPrimary}
                ios_backgroundColor="rgba(255, 255, 255, 0.15)"
              />
            </View>

            {/* Preview */}
            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>Preview</Text>
              <View style={styles.previewCard}>
                <Text style={styles.previewTitle}>
                  {title || 'Your title here...'}
                </Text>
                <Text style={styles.previewContent} numberOfLines={2}>
                  {content || 'Your content here...'}
                </Text>
                <View style={styles.previewAuthor}>
                  <Ionicons
                    name="person-outline"
                    size={12}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.previewAuthorName}>
                    {isAnonymous ? 'Anonymous' : 'Roman'}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <TouchableOpacity
              activeOpacity={isValid ? 0.85 : 1}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <LinearGradient
                colors={
                  isValid
                    ? [COLORS.primaryDark, COLORS.primaryLight]
                    : ['rgba(112, 90, 175, 0.3)', 'rgba(149, 131, 225, 0.3)']
                }
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.submitButton}
              >
                <Text
                  style={[
                    styles.submitButtonText,
                    !isValid && styles.submitButtonTextDisabled,
                  ]}
                >
                  Post to Community
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </RadialGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  closeButton: {
    padding: 4,
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 21,
    paddingBottom: 40,
  },
  // Input Groups
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  titleInput: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  contentInput: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: COLORS.textPrimary,
    minHeight: 140,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  // Toggle
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: COLORS.textSecondary,
  },
  // Preview
  previewSection: {
    marginBottom: 24,
  },
  previewLabel: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  previewCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
  },
  previewTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  previewContent: {
    fontSize: 14,
    fontFamily: fonts.light,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  previewAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  previewAuthorName: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  // Submit Button
  submitContainer: {
    paddingHorizontal: 21,
    paddingBottom: 16,
    paddingTop: 8,
  },
  submitButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  submitButtonTextDisabled: {
    color: COLORS.textMuted,
  },
});
