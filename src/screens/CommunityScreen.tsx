import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { RadialGradientBackground } from '../components/common/RadialGradientBackground';
import { fonts } from '../constants/theme';

const COLORS = {
  primary: '#AB9FF0',
  cardBg: 'rgba(255, 255, 255, 0.10)',
  upvoteBg: 'rgba(255, 255, 255, 0.10)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.70)',
};

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  createdAt: Date;
  comments: Comment[];
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'demo-1',
    title: 'Day 11 update!',
    content: "I just wanted to share a small victory that feels huge to me. Today at work, during our weekly team meeting, I actually spoke up and shared an idea. Normally, my heart races and I stay quiet, but I reminded myself of the breathing exercise I learned here last week. My voice shook a little, but no one laughed or judged — in fact, my manager said it was a great idea.",
    author: 'Cassian Rook',
    upvotes: 34,
    createdAt: new Date(),
    comments: [
      { id: 'c1', author: 'CalmSteps', content: 'Huge win! 🎉', createdAt: new Date() },
      { id: 'c2', author: 'BraveBean', content: "You're inspiring me.", createdAt: new Date() },
      { id: 'c3', author: 'MindfulMike', content: 'Breathing trick works wonders.', createdAt: new Date() },
    ],
  },
  {
    id: 'demo-2',
    title: 'How do you enable the AI therapist feature?',
    content: 'No clue how to enable it. I have been looking everywhere in the app settings but cannot find it. Any help would be appreciated!',
    author: 'Matt',
    upvotes: 0,
    createdAt: new Date(),
    comments: [],
  },
  {
    id: 'demo-3',
    title: 'This is personal',
    content: "I'm doing this for no one but myself. This is personal. Every day I wake up and choose to work on myself, not for anyone else's approval but for my own peace of mind.",
    author: 'Anonymous',
    upvotes: 69,
    createdAt: new Date(),
    comments: [
      { id: 'c4', author: 'SilentStrength', content: 'This resonates so much 💜', createdAt: new Date() },
    ],
  },
  {
    id: 'demo-4',
    title: 'Evening all, dilemma',
    content: "Evening all, dilemma. I'm having a disagreement with my partner about how much time I spend on self-care. They think I'm being selfish, but I know I need this time to stay balanced. How do you all handle this?",
    author: 'Anonymous',
    upvotes: 12,
    createdAt: new Date(),
    comments: [
      { id: 'c5', author: 'BalancedLife', content: 'Communication is key. Explain why it matters.', createdAt: new Date() },
      { id: 'c6', author: 'PeacefulMind', content: 'Self-care is not selfish!', createdAt: new Date() },
    ],
  },
];

export default function CommunityScreen({ navigation, route }: any) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [upvotedPosts, setUpvotedPosts] = useState<Set<string>>(new Set());
  const [readPosts, setReadPosts] = useState<Set<string>>(new Set());
  const [userCreatedPosts, setUserCreatedPosts] = useState<Set<string>>(new Set());
  const userName = 'Roman';

  // Check for new post from CreatePostScreen
  React.useEffect(() => {
    if (route.params?.newPost) {
      const postId = `post-${Date.now()}`;
      const newPost: Post = {
        id: postId,
        title: route.params.newPost.title,
        content: route.params.newPost.content,
        author: route.params.newPost.isAnonymous ? 'Anonymous' : userName,
        upvotes: 0,
        createdAt: new Date(),
        comments: [],
      };
      setPosts((prev) => [newPost, ...prev]);
      // Track user-created posts for delete functionality
      setUserCreatedPosts((prev) => new Set(prev).add(postId));
      // Clear the param to prevent re-adding on navigation
      navigation.setParams({ newPost: undefined });
    }
  }, [route.params?.newPost]);

  const handleUpvote = (postId: string) => {
    if (upvotedPosts.has(postId)) {
      // Remove upvote
      setUpvotedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, upvotes: post.upvotes - 1 } : post
        )
      );
    } else {
      // Add upvote
      setUpvotedPosts((prev) => new Set(prev).add(postId));
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
        )
      );
    }
  };

  const handleCreatePost = () => {
    navigation.navigate('CreatePost');
  };

  const handlePostPress = (post: Post) => {
    // Mark post as read
    setReadPosts((prev) => new Set(prev).add(post.id));
    // Navigate to post detail
    navigation.navigate('PostDetail', { post });
  };

  const handleDeletePost = (postId: string) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPosts((prev) => prev.filter((post) => post.id !== postId));
            setUserCreatedPosts((prev) => {
              const newSet = new Set(prev);
              newSet.delete(postId);
              return newSet;
            });
          },
        },
      ]
    );
  };

  return (
    <RadialGradientBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="chatbubbles-outline" size={22} color={COLORS.textPrimary} />
            <Text style={styles.headerTitle}>Community</Text>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Posts Feed */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {posts.map((post) => {
            const isRead = readPosts.has(post.id);
            const isUserPost = userCreatedPosts.has(post.id);

            return (
              <TouchableOpacity
                key={post.id}
                style={[styles.postCard, isRead && styles.postCardRead]}
                activeOpacity={0.7}
                onPress={() => handlePostPress(post)}
              >
                <View style={styles.postContent}>
                  <View style={styles.postTextContainer}>
                    <Text style={[styles.postTitle, isRead && styles.textRead]}>
                      {post.title}
                    </Text>
                    <Text
                      style={[styles.postDescription, isRead && styles.textRead]}
                      numberOfLines={2}
                    >
                      {post.content}
                    </Text>
                    <View style={styles.authorRow}>
                      <Ionicons
                        name="person-outline"
                        size={12}
                        color={isRead ? 'rgba(255, 255, 255, 0.35)' : COLORS.textSecondary}
                      />
                      <Text style={[styles.authorName, isRead && styles.textRead]}>
                        {post.author}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.postActions}>
                    {isUserPost && (
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleDeletePost(post.id);
                        }}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={[
                        styles.upvoteButton,
                        upvotedPosts.has(post.id) && styles.upvoteButtonActive,
                      ]}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleUpvote(post.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={upvotedPosts.has(post.id) ? 'thumbs-up' : 'thumbs-up-outline'}
                        size={18}
                        color={upvotedPosts.has(post.id) ? COLORS.primary : COLORS.textPrimary}
                      />
                      <Text
                        style={[
                          styles.upvoteCount,
                          upvotedPosts.has(post.id) && styles.upvoteCountActive,
                        ]}
                      >
                        {post.upvotes}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Gradient Fade */}
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.9)', '#000000']}
        style={styles.bottomFade}
        pointerEvents="none"
      />

      {/* Floating Action Button */}
      <View style={styles.fabWrapper}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleCreatePost}
        >
          <View style={styles.fabContainer}>
            <LinearGradient
              colors={['rgba(152, 134, 229, 0)', '#9886E5']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.fab}
            >
              <Ionicons name="add" size={28} color="#fff" />
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              source={require('../../assets/home/nav-home.png')}
              style={[styles.navIcon, { tintColor: COLORS.textPrimary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate('Progress')}
          >
            <Image
              source={require('../../assets/home/nav-progress-active.png')}
              style={[styles.navIcon, { tintColor: COLORS.textPrimary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab}>
            <Image
              source={require('../../assets/home/nav-community.png')}
              style={[styles.navIcon, { tintColor: COLORS.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={require('../../assets/home/nav-profile.png')}
              style={[styles.navIcon, { tintColor: COLORS.textPrimary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 8,
    paddingBottom: 45,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  infoButton: {
    padding: 4,
  },
  // Scroll Content
  scrollContent: {
    paddingHorizontal: 21,
    paddingBottom: 180,
  },
  // Post Card
  postCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
  },
  postCardRead: {
    opacity: 0.5,
  },
  postContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  postActions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRead: {
    opacity: 0.7,
  },
  postTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  postTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  postDescription: {
    fontSize: 14,
    fontFamily: fonts.light,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorName: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: COLORS.textPrimary,
  },
  // Upvote Button
  upvoteButton: {
    backgroundColor: COLORS.upvoteBg,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  upvoteButtonActive: {
    backgroundColor: 'rgba(171, 159, 240, 0.15)',
  },
  upvoteCount: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  upvoteCountActive: {
    color: COLORS.primary,
  },
  // Bottom Fade
  bottomFade: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 100,
  },
  // FAB
  fabWrapper: {
    position: 'absolute',
    bottom: 95,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  fabContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    shadowColor: 'rgba(130, 122, 178, 0.6)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 12,
  },
  fab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Bottom Navigation
  bottomNavWrapper: {
    backgroundColor: 'transparent',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navTab: {
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});
