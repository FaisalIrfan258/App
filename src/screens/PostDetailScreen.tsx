import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RadialGradientBackground } from '../components/common/RadialGradientBackground';
import { fonts } from '../constants/theme';

const COLORS = {
  primary: '#AB9FF0',
  cardBg: 'rgba(255, 255, 255, 0.10)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.70)',
  divider: 'rgba(255, 255, 255, 0.20)',
  inputBorder: '#FFFFFF',
};

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  createdAt: Date;
  comments: Comment[];
}

interface PostDetailScreenProps {
  navigation: any;
  route: {
    params: {
      post: Post;
    };
  };
}

export default function PostDetailScreen({ navigation, route }: PostDetailScreenProps) {
  const { post } = route.params;
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `c-${Date.now()}`,
        author: 'You',
        content: newComment.trim(),
        createdAt: new Date(),
      };
      setComments((prev) => [...prev, comment]);
      setNewComment('');
    }
  };

  return (
    <RadialGradientBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <SafeAreaView style={styles.container} edges={['top']}>
          {/* Header Row */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Post</Text>

            <TouchableOpacity
              style={[styles.upvoteButton, hasUpvoted && styles.upvoteButtonActive]}
              onPress={handleUpvote}
              activeOpacity={0.7}
            >
              <Ionicons
                name={hasUpvoted ? 'thumbs-up' : 'thumbs-up-outline'}
                size={18}
                color={hasUpvoted ? COLORS.primary : COLORS.textPrimary}
              />
              <Text style={[styles.upvoteCount, hasUpvoted && styles.upvoteCountActive]}>
                {upvotes}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Main Content ScrollView */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Author Row */}
            <View style={styles.authorRow}>
              <Ionicons name="person-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.authorName}>{post.author}</Text>
            </View>

            {/* Post Title */}
            <Text style={styles.postTitle}>{post.title}</Text>

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Comments Section Header */}
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Comments</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Comments List */}
            <View style={styles.commentsList}>
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentContainer}>
                  {/* Comment Author */}
                  <View style={styles.commentAuthorRow}>
                    <Ionicons name="person-outline" size={12} color={COLORS.textSecondary} />
                    <Text style={styles.commentAuthorName}>{comment.author}:</Text>
                  </View>

                  {/* Comment Bubble */}
                  <View style={styles.commentBubble}>
                    <Text style={styles.commentText}>{comment.content}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* Comment Input Bar */}
        <SafeAreaView edges={['bottom']} style={styles.inputBarWrapper}>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a comment ..."
              placeholderTextColor={COLORS.textPrimary}
              value={newComment}
              onChangeText={setNewComment}
              multiline={false}
            />
            <View style={styles.sendButtonContainer}>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendComment}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-up" size={20} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </RadialGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingTop: 8,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  upvoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 6,
  },
  upvoteButtonActive: {
    backgroundColor: 'rgba(171, 159, 240, 0.15)',
  },
  upvoteCount: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
  },
  upvoteCountActive: {
    color: COLORS.primary,
  },
  // ScrollView
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 21,
    paddingBottom: 20,
  },
  // Author Row
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  authorName: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  // Post Content
  postTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 15,
    fontFamily: fonts.light,
    color: COLORS.textPrimary,
    lineHeight: 22,
    marginBottom: 32,
  },
  // Comments Section
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  commentsTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginBottom: 20,
  },
  // Comments List
  commentsList: {
    gap: 20,
  },
  commentContainer: {
    gap: 14,
  },
  commentAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentAuthorName: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  commentBubble: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    padding: 14,
  },
  commentText: {
    fontSize: 14,
    fontFamily: fonts.light,
    color: COLORS.textPrimary,
    lineHeight: 19.6,
  },
  // Input Bar
  inputBarWrapper: {
    paddingHorizontal: 21,
    paddingBottom: 8,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 100,
    height: 60,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 24,
    paddingRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: COLORS.textPrimary,
    lineHeight: 16,
  },
  sendButtonContainer: {
    marginLeft: 14,
  },
  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 100,
    backgroundColor: COLORS.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
