# Paywall Testing Guide

## Quick Start

1. **Start the development server:**
   ```bash
   cd "/Users/romanahmed/Desktop/Today App/today-app"
   npm start
   ```

2. **Open on iOS simulator:**
   - Press `i` in the terminal
   - Or scan QR code with Expo Go app

3. **Navigate to paywall:**
   - Go through onboarding flow
   - Or manually navigate: `navigation.navigate('Paywall')`

## What You Should See

### Visual Elements (in order from top to bottom)

1. **Background**: Radial purple gradient (#836FC9) fading to black
2. **Logo**: "today" in white, bold, 32px at the top
3. **Description**: Gray text about calming sessions
4. **Phone Images**: Three phone mockups showing app screens
5. **Pricing Cards**: Two cards side-by-side
   - Left: Monthly plan
   - Right: Yearly plan (selected by default with checkmark)
6. **Yearly Badge**: White "SAVE X%" badge on top-right of yearly card
7. **Subscribe Button**: White button at bottom with "Subscribe Now" text
8. **Footer**: Small gray text with three links separated by dots

### Pricing Card Details

**Monthly Card (Left):**
- Transparent/dark background
- "$14.99" (or actual price from RevenueCat)
- "/per month" in smaller text
- No badge
- No checkmark (when not selected)

**Yearly Card (Right - Default Selected):**
- Purple-tinted background (`rgba(171, 159, 243, 0.25)`)
- "$4.99" (calculated: yearly price ÷ 12)
- "/per month" in smaller text
- "Billed as $59.99/year" subtitle
- "SAVE 70%" white badge at top-right
- White checkmark icon at top-right

## Manual Testing Steps

### 1. Visual Inspection
- [ ] Background gradient looks smooth (purple → transparent → black)
- [ ] All text is readable and properly aligned
- [ ] Phone mockup images display without distortion
- [ ] Both pricing cards are visible and equal width
- [ ] Yearly card has purple background
- [ ] Monthly card has darker background
- [ ] Badge displays on yearly card
- [ ] Checkmark displays on selected card
- [ ] Subscribe button is visible and prominent
- [ ] Footer links are small and subtle

### 2. Interaction Testing

**Test Plan Selection:**
1. Tap the Monthly card
   - [ ] Haptic feedback occurs (light vibration)
   - [ ] Monthly card gets purple background
   - [ ] Checkmark moves to Monthly card
   - [ ] Yearly card loses purple background
   - [ ] Yearly card checkmark disappears

2. Tap the Yearly card
   - [ ] Haptic feedback occurs
   - [ ] Yearly card gets purple background
   - [ ] Checkmark moves to Yearly card
   - [ ] Monthly card loses purple background
   - [ ] Selection persists

**Test Purchase Flow:**
3. With Yearly selected, tap "Subscribe Now"
   - [ ] Haptic feedback (medium impact)
   - [ ] Button shows loading spinner (black on white)
   - [ ] Button is disabled during loading
   - [ ] RevenueCat purchase sheet appears

4. In purchase sheet, tap "Subscribe"
   - [ ] Payment processes (sandbox mode = instant)
   - [ ] Success haptic feedback
   - [ ] Navigates to UserInfo screen

5. Go back to paywall, select Monthly, tap "Subscribe Now"
   - [ ] Monthly purchase sheet appears
   - [ ] Different price shown ($14.99)

6. In purchase sheet, tap "Cancel"
   - [ ] Sheet dismisses
   - [ ] No error alert shown
   - [ ] Light haptic feedback
   - [ ] Stays on paywall screen

**Test Restore Purchases:**
7. Tap "Restore Purchases" in footer
   - [ ] Light haptic feedback
   - [ ] Loading occurs (brief)
   - [ ] IF subscription exists: Success alert + navigation to UserInfo
   - [ ] IF no subscription: "No Purchases Found" alert
   - [ ] Stays on paywall if no purchases

**Test Footer Links:**
8. Tap "Terms of Use"
   - [ ] Opens link (currently placeholder URL)
   - [ ] Returns to app when done

9. Tap "Privacy Policy"
   - [ ] Opens link (currently placeholder URL)
   - [ ] Returns to app when done

### 3. Edge Cases

**No Internet:**
1. Turn off WiFi and cellular
2. Navigate to paywall
   - [ ] Loading state shows
   - [ ] After timeout: Error state or offerings fail to load
   - [ ] Error message is clear

**Only One Package:**
1. Temporarily disable yearly product in RevenueCat
2. Navigate to paywall
   - [ ] Only monthly card shows
   - [ ] Card takes full width OR half width
   - [ ] Purchase works normally

**Small Screen (iPhone SE):**
1. Test on small device or simulator
   - [ ] All content is visible
   - [ ] Scrolling works
   - [ ] Subscribe button remains visible (fixed at bottom)
   - [ ] No overlapping elements

**VoiceOver (Accessibility):**
1. Enable VoiceOver: Settings → Accessibility → VoiceOver
2. Navigate through paywall
   - [ ] Can select each pricing card
   - [ ] Reads "Monthly plan, $14.99 per month"
   - [ ] Reads selected state ("checked")
   - [ ] Can activate subscribe button
   - [ ] All interactive elements are focusable

### 4. Error Scenarios

**Purchase Error:**
1. Trigger purchase error (invalid payment method in sandbox)
   - [ ] Error haptic feedback
   - [ ] Alert shows: "Purchase Failed" with error message
   - [ ] Stays on paywall after dismissing alert
   - [ ] Can try again

**Network Error During Purchase:**
1. Turn off internet after tapping subscribe
   - [ ] Purchase fails gracefully
   - [ ] Error message explains issue
   - [ ] Can retry when internet returns

## Expected Pricing Calculation

If RevenueCat returns:
- Monthly product: $14.99/month
- Yearly product: $59.99/year

The UI should show:
- Monthly card: "$14.99 / per month"
- Yearly card: "$4.99 / per month" + "Billed as $59.99/year"
- Savings: 70% (or actual calculated percentage)

**Calculation Logic:**
```
Monthly annual cost = $14.99 × 12 = $179.88
Yearly cost = $59.99
Savings = ($179.88 - $59.99) / $179.88 = 66.7%
Rounded = 67% or 70% (depends on rounding)
```

## Debug Checklist

If something doesn't work:

**Paywall doesn't load:**
- [ ] Check console for RevenueCat errors
- [ ] Verify offerings are configured in RevenueCat dashboard
- [ ] Check internet connection
- [ ] Verify API keys in `src/config/revenuecat.ts`

**Pricing shows $0.00 or wrong prices:**
- [ ] Check products exist in App Store Connect
- [ ] Verify product IDs match: "monthly" and "yearly"
- [ ] Check RevenueCat dashboard for product mapping
- [ ] Wait 24 hours for App Store Connect sync

**Purchase doesn't work:**
- [ ] Using sandbox test account? (must sign out of real account)
- [ ] Sandbox account verified in App Store Connect?
- [ ] RevenueCat API keys correct?
- [ ] Check RevenueCat dashboard for error logs

**Images don't load:**
- [ ] Verify file exists: `assets/images/paywall-phones.png`
- [ ] Check file path in PaywallScreen.tsx: `require('../../../assets/images/paywall-phones.png')`
- [ ] Try `npm start --clear` to clear cache

**Haptic feedback doesn't work:**
- [ ] Testing on physical device? (simulator doesn't have haptics)
- [ ] Device supports haptics? (iPhone 7+)
- [ ] Haptics enabled in device settings?

## RevenueCat Sandbox Testing

### Setup Sandbox Account
1. Go to App Store Connect
2. Users and Access → Sandbox Testers
3. Create new sandbox account
4. Note email and password

### Test on Device
1. Sign out of App Store on device
2. Don't sign in to any account
3. Run app and navigate to paywall
4. Tap Subscribe Now
5. When prompted, enter sandbox account credentials
6. Complete purchase (no charge in sandbox)
7. Verify subscription: Settings → Your Name → Subscriptions

### Test Restore
1. Delete and reinstall app
2. Navigate to paywall
3. Tap "Restore Purchases"
4. Should recognize previous subscription
5. Should navigate to UserInfo screen

## Console Commands

**View Offerings:**
```javascript
import { revenueCatService } from './src/services/revenueCatService';
const offerings = await revenueCatService.getOfferings();
console.log('Current offering:', offerings.current);
console.log('Packages:', offerings.current?.availablePackages);
```

**Check Customer Info:**
```javascript
const info = await revenueCatService.getCustomerInfo();
console.log('Is Pro:', revenueCatService.isProUser());
console.log('Active subscriptions:', info.activeSubscriptions);
```

**Test Purchase (Dev Mode):**
```javascript
// Don't do this in production!
navigation.navigate('UserInfo'); // Skip paywall for testing
```

## Production Checklist

Before releasing:

- [ ] Update Terms of Use URL in PaywallScreen.tsx
- [ ] Update Privacy Policy URL in PaywallScreen.tsx
- [ ] Test with real products (not sandbox)
- [ ] Verify pricing displays correctly
- [ ] Test on multiple devices (iPhone SE, 14 Pro, 14 Pro Max)
- [ ] Test with VoiceOver
- [ ] Test restore purchases
- [ ] Monitor RevenueCat dashboard for errors
- [ ] Set up webhooks for subscription events
- [ ] Configure subscription groups in App Store Connect
- [ ] Submit for App Review with test account

## Success Criteria

✅ **The implementation is working correctly if:**

1. Paywall loads with gradient background
2. Pricing shows real values from RevenueCat
3. Yearly plan selected by default
4. Tapping cards switches selection with haptic
5. Savings badge shows correct percentage
6. Subscribe button triggers purchase flow
7. Successful purchase navigates to UserInfo
8. Restore purchases works for existing subscribers
9. Error handling is graceful and user-friendly
10. All haptic feedback works on device
11. Accessibility works with VoiceOver
12. No console errors or warnings

## Need Help?

**Check these files:**
- `src/screens/onboarding/PaywallScreen.tsx` - Main screen
- `src/components/onboarding/PricingCard.tsx` - Pricing card component
- `src/contexts/SubscriptionContext.tsx` - Subscription state
- `src/services/revenueCatService.ts` - RevenueCat integration
- `src/config/revenuecat.ts` - API keys and config

**Common Issues:**
- "Offerings not loaded" → Check RevenueCat dashboard and API keys
- "Package not found" → Verify product IDs: "monthly" and "yearly"
- "Purchase failed" → Check sandbox account and internet
- "Images not showing" → Clear cache with `npm start --clear`

---

**Status**: Ready for testing!
**Next Step**: Run `npm start` and navigate to the paywall screen
