# Today: Panic Attack Relief

A minimal, frictionless iOS mental health app for students experiencing anxiety and panic attacks.

## 🌟 Features

### Core Features
- **Instant Start**: Two large buttons - Start meditation or immediate panic relief
- **4-7-8 Breathing Exercise**: Guided breathing with animated circle and haptic feedback
- **5-4-3-2-1 Grounding**: Sensory grounding technique to reconnect with the present
- **Uplifting Affirmations**: 8 swipeable cards with evidence-based calming messages

### Design Principles
- **Zero Cognitive Load**: Large buttons, minimal UI, no configuration
- **Immediate Relief**: Panic button provides instant access to breathing exercise
- **No Data Collection**: Completely private, no tracking whatsoever
- **Apple HIG Compliant**: Native iOS feel with full accessibility support

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Xcode (for iOS Simulator)
- Expo Go app (for testing on real iPhone)

### Installation

1. Install dependencies (already done):
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on iOS Simulator:
- Press `i` in the terminal
- Or scan the QR code with Expo Go app on your iPhone

## 📱 User Flow

1. **Home Screen**
   - Tap "Start" → Meditation (placeholder)
   - Tap "I Need Help Now" → Breathing Exercise

2. **Breathing Exercise**
   - Automatically starts 4-7-8 breathing pattern
   - Follow the animated circle
   - Feel synchronized haptic feedback
   - Tap "More Options" for additional tools

3. **Grounding Exercise**
   - Step through 5-4-3-2-1 technique
   - Focus on your senses
   - Progress at your own pace

4. **Uplifting Text**
   - Swipe through calming affirmations
   - Read at your own speed
   - Return when ready

## 🎨 Design System

### Color Palette
- **Calming Blue**: `#5B9FD4` (primary actions)
- **Soft Red**: `#E87D7D` (panic button)
- **Mint Green**: `#98D8C8` (exhale)
- **Light Blue**: `#7EC8E3` (inhale)
- **Lavender**: `#A78BDD` (hold)

### Typography
- SF Pro (iOS system font)
- Light weights (300-400) for low visual stress
- High line-height for breathing room

## 🧪 Testing Checklist

- [ ] Home screen displays correctly with gradient
- [ ] Panic button has pulsing animation
- [ ] Breathing screen starts immediately
- [ ] Circle animates smoothly (60fps)
- [ ] Haptics work (test on real device)
- [ ] Countdown timer is accurate
- [ ] Navigation between screens works
- [ ] Grounding exercise steps through correctly
- [ ] Affirmation cards are swipeable
- [ ] VoiceOver labels are clear

## 📂 Project Structure

```
src/
├── screens/
│   ├── HomeScreen.tsx              # Main screen with Start/Panic buttons
│   ├── BreathingScreen.tsx         # 4-7-8 breathing exercise
│   ├── GroundingScreen.tsx         # 5-4-3-2-1 sensory technique
│   ├── UpliftingTextScreen.tsx     # Swipeable affirmations
│   └── MeditationScreen.tsx        # Placeholder for future
├── components/
│   ├── common/
│   │   ├── Button.tsx              # Reusable button with haptics
│   │   └── AnimatedBackground.tsx  # Gradient backgrounds
│   └── breathing/
│       └── BreathingCircle.tsx     # Animated breathing guide
├── services/
│   └── hapticService.ts            # Haptic feedback patterns
├── hooks/
│   └── useBreathingCycle.ts        # 4-7-8 breathing timing logic
└── constants/
    └── theme.ts                    # Colors, typography, spacing
```

## 🔧 Technical Stack

- **React Native** (via Expo SDK 54)
- **TypeScript** for type safety
- **React Navigation** for modal navigation
- **react-native-reanimated** for 60fps animations
- **expo-haptics** for tactile feedback
- **expo-linear-gradient** for calming gradients

## ♿ Accessibility

- VoiceOver labels on all interactive elements
- Dynamic Type support (respects user's text size)
- Reduced Motion support (simplifies animations)
- High Contrast mode compatible
- 60pt tap targets (exceeds 44pt minimum)

## 🚧 Future Enhancements

### Phase 1 (Optional)
- [ ] Add guided meditation audio tracks
- [ ] Implement audio playback controls
- [ ] Add ambient calming sounds (rain, ocean)
- [ ] Create custom app icon and splash screen

### Phase 2 (Optional)
- [ ] Add more affirmations (user-selectable)
- [ ] Breathing pattern customization
- [ ] Dark mode optimization
- [ ] Widget for quick access

## 📄 Privacy

**We collect ZERO data.**
- No analytics
- No tracking
- No user accounts
- No cloud storage
- Completely offline-capable

## ⚠️ Medical Disclaimer

This app is not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing a medical emergency, call emergency services immediately.

## 📝 License

Private project - not for distribution yet.

## 🙏 Credits

Built with Claude Code for students facing mental health challenges.

---

**App Store Info:**
- Name: Today: Panic Attack Relief
- Subtitle: Instant calm for students
- Category: Health & Fitness
- Bundle ID: com.today.panicrelief
