/**
 * Authentication Service using Firebase Auth
 * Handles Google Sign-In, Apple Sign-In, and user authentication state
 */
/*
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User,
  getReactNativePersistence
} from 'firebase/auth';
import { firebaseConfig, GOOGLE_WEB_CLIENT_ID } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

// Initialize Auth with React Native persistence
const auth = getAuth();

// Set up persistence for React Native
// Note: This is automatically handled in newer Firebase versions

const USER_PROFILE_KEY = '@today_user_profile';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: 'google' | 'apple' | 'anonymous';
  createdAt: string;
  lastSignInAt: string;
}

class AuthService {
  constructor() {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }

  /**
   * Sign in with Google
   */
  /*
  async signInWithGoogle(): Promise<UserProfile | null> {
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await signInWithCredential(auth, googleCredential);

      // Save user profile
      const profile = await this.saveUserProfile(userCredential.user, 'google');

      return profile;
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      throw new Error(`Google Sign-In failed: ${error.message}`);
    }
  }

  /**
   * Sign in with Apple
   * Note: Apple Sign-In requires additional setup in Xcode and Apple Developer Console
   */
  /*
  async signInWithApple(): Promise<UserProfile | null> {
    try {
      // For now, this is a placeholder as Apple Sign-In requires native module setup
      // You'll need to install and configure @invertase/react-native-apple-authentication
      console.warn('Apple Sign-In requires additional native setup. Please follow Firebase Apple Sign-In guide.');

      // Placeholder for Apple Sign-In implementation
      // Uncomment and implement after setting up Apple Sign-In native module
      /*
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      const userCredential = await auth().signInWithCredential(appleCredential);

      return await this.saveUserProfile(userCredential.user, 'apple');
      */
     /*

      throw new Error('Apple Sign-In not yet configured. Please complete native setup.');
    } catch (error: any) {
      console.error('Apple Sign-In Error:', error);
      throw new Error(`Apple Sign-In failed: ${error.message}`);
    }
  }

  /**
   * Sign in anonymously (useful for users who skip sign-in)
   *//*
  async signInAnonymously(): Promise<UserProfile | null> {
    try {
      const userCredential = await firebaseSignInAnonymously(auth);
      return await this.saveUserProfile(userCredential.user, 'anonymous');
    } catch (error: any) {
      console.error('Anonymous Sign-In Error:', error);
      throw new Error(`Anonymous Sign-In failed: ${error.message}`);
    }
  }

  /**
   * Sign out
   *//*
  async signOut(): Promise<void> {
    try {
      // Sign out from Google if signed in with Google
      const currentUser = auth.currentUser;
      if (currentUser) {
        const providerData = currentUser.providerData;
        const isGoogleUser = providerData.some(
          (provider) => provider.providerId === 'google.com'
        );

        if (isGoogleUser) {
          await GoogleSignin.signOut();
        }
      }

      // Sign out from Firebase
      await firebaseSignOut(auth);

      // Clear local profile
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
    } catch (error: any) {
      console.error('Sign Out Error:', error);
      throw new Error(`Sign out failed: ${error.message}`);
    }
  }

  /**
   * Get current user
   *//*
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Get user profile from local storage
   *//*
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const profileJson = await AsyncStorage.getItem(USER_PROFILE_KEY);
      if (profileJson) {
        return JSON.parse(profileJson);
      }

      // If no local profile, check Firebase auth state
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        return await this.saveUserProfile(currentUser, 'google'); // Default to google, will be overridden if needed
      }

      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  /**
   * Save user profile to local storage
   *//*
  private async saveUserProfile(
    user: User,
    provider: 'google' | 'apple' | 'anonymous'
  ): Promise<UserProfile> {
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider,
      createdAt: user.metadata.creationTime ? new Date(parseInt(user.metadata.creationTime)).toISOString() : new Date().toISOString(),
      lastSignInAt: user.metadata.lastSignInTime ? new Date(parseInt(user.metadata.lastSignInTime)).toISOString() : new Date().toISOString(),
    };

    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    return profile;
  }

  /**
   * Listen to auth state changes
   *//*
  onAuthStateChanged(callback: (user: User | null) => void) {
    return firebaseOnAuthStateChanged(auth, callback);
  }
}

export const authService = new AuthService(); 
*/