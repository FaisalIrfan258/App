# Authentication Setup Guide

This guide will help you complete the Firebase Authentication setup for the Today App.

## What's Been Implemented

✅ Firebase Authentication infrastructure
✅ Google Sign-In integration
✅ Apple Sign-In support (requires additional setup)
✅ Anonymous authentication for guest users
✅ User profile management
✅ Session history tracking per user
✅ Sign-out functionality
✅ Authentication state management with React Context

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

### 2. Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable the following providers:
   - **Google**: Click Enable and follow the prompts
   - **Apple** (optional): Click Enable and configure (requires Apple Developer account)
   - **Anonymous**: Click Enable (already set up for guest users)

### 3. Add iOS App to Firebase Project

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click **Add app** → **iOS**
3. Enter your iOS bundle identifier (found in `app.json` under `ios.bundleIdentifier`)
4. Download the `GoogleService-Info.plist` file
5. Place `GoogleService-Info.plist` in the `ios/` directory

### 4. Configure Firebase in Your App

1. Open `src/config/firebase.ts`
2. Replace the placeholder values with your actual Firebase configuration:

```typescript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID", // Optional
};
```

You can find these values in Firebase Console → Project Settings → General → Your apps

3. Get your **Web Client ID** for Google Sign-In:
   - Go to Firebase Console → Authentication → Sign-in method → Google
   - Copy the **Web client ID**
   - Replace `GOOGLE_WEB_CLIENT_ID` in `firebase.ts` with your actual Web Client ID

### 5. Install iOS Pods

```bash
cd ios
pod install
cd ..
```

### 6. Configure Google Sign-In (iOS)

1. Open `ios/[YourAppName]/Info.plist`
2. Add the following URL scheme (replace with your REVERSED_CLIENT_ID from GoogleService-Info.plist):

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
    </array>
  </dict>
</array>
```

### 7. Configure Apple Sign-In (Optional)

If you want to enable Apple Sign-In:

1. Install Apple Authentication package:
```bash
npm install @invertase/react-native-apple-authentication
```

2. Enable "Sign in with Apple" capability in Xcode:
   - Open `ios/[YourAppName].xcworkspace` in Xcode
   - Select your project → Signing & Capabilities
   - Click "+ Capability" → Add "Sign in with Apple"

3. In Firebase Console:
   - Go to Authentication → Sign-in method → Apple
   - Enable it and follow the configuration steps

4. Update `src/services/authService.ts` to uncomment the Apple Sign-In implementation

### 8. Test Authentication

Run your app:

```bash
npm start
# Press 'i' for iOS simulator
```

Test the authentication flow:
1. Complete the onboarding flow
2. On the Sign-In screen, try:
   - Google Sign-In (should work after setup)
   - Skip for now (creates anonymous user)
3. Go to Profile screen to see your signed-in user info
4. Try signing out

## Architecture Overview

### Files Created/Modified

1. **`src/config/firebase.ts`** - Firebase configuration
2. **`src/services/authService.ts`** - Authentication service (Google, Apple, Anonymous)
3. **`src/contexts/AuthContext.tsx`** - Authentication state management
4. **`src/services/userSessionService.ts`** - User session history tracking
5. **`src/screens/onboarding/SignInScreen.tsx`** - Updated with real auth
6. **`src/screens/ProfileScreen.tsx`** - Added sign-out and user profile display
7. **`App.tsx`** - Wrapped with AuthProvider

### How It Works

1. **Authentication Flow**:
   - User completes onboarding → SignInScreen
   - User can sign in with Google, Apple, or skip (anonymous)
   - Auth state is managed by AuthContext
   - User profile (name, email) is stored locally and in Firebase

2. **Session Tracking**:
   - Each meditation session is linked to the authenticated user
   - Session history is stored per user in AsyncStorage
   - Stats include: total sessions, current streak, longest streak

3. **User Profile**:
   - ProfileScreen displays user's name, email, and auth status
   - Sign-out button available for authenticated users
   - On sign-out, local profile data is cleared

## Troubleshooting

### Google Sign-In Not Working
- Verify `GOOGLE_WEB_CLIENT_ID` is correct in `firebase.ts`
- Check that Google Sign-In is enabled in Firebase Console
- Make sure `GoogleService-Info.plist` is in the correct location

### App Crashes on Launch
- Run `cd ios && pod install` to ensure native dependencies are installed
- Clean and rebuild: `cd ios && rm -rf Pods Podfile.lock && pod install`

### Authentication State Not Persisting
- Check that AsyncStorage is working
- Verify Firebase auth state listener is set up correctly

## Environment Variables (Optional)

For better security, consider using environment variables:

1. Install `react-native-config`:
```bash
npm install react-native-config
```

2. Create a `.env` file:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... other config values
```

3. Update `firebase.ts` to use environment variables

## Next Steps

After completing setup:
- [ ] Test Google Sign-In on a real device
- [ ] Configure Apple Sign-In if needed
- [ ] Set up Firebase Firestore for cloud sync (optional)
- [ ] Add password reset functionality (if using email/password)
- [ ] Implement social profile picture display
- [ ] Add email verification flow

## Support

For issues or questions:
- Check [Firebase Documentation](https://firebase.google.com/docs/auth)
- Review [React Native Firebase Docs](https://rnfirebase.io)
- Check the console logs for detailed error messages
