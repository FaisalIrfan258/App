# Configuration Checklist

Use this checklist to track your progress through the RevenueCat setup.

---

## Phase 1: Apple Setup (Day 1)

### Apple Developer Account
- [ ] Go to https://developer.apple.com/programs/enroll/
- [ ] Enroll in Apple Developer Program
- [ ] Pay $99/year enrollment fee
- [ ] Submit enrollment application
- [ ] **WAIT 24-48 HOURS** for approval email
- [ ] Receive approval confirmation
- [ ] Can access https://appstoreconnect.apple.com

---

## Phase 2: App Store Connect (Day 2-3)

### Create App
- [ ] App Store Connect → My Apps → "+" → New App
- [ ] Platform: iOS
- [ ] Name: Today
- [ ] Bundle ID: `com.today.panicrelief`
- [ ] SKU: `today-app-001`
- [ ] Click "Create"

### Create Subscription Group
- [ ] Navigate to Monetization → Subscriptions
- [ ] Click "+" to create group
- [ ] Reference Name: Today Premium
- [ ] Save

### Create Monthly Subscription
- [ ] In "Today Premium" group → Click "+"
- [ ] Product ID: `monthly` ⚠️ MUST be exact
- [ ] Duration: 1 Month
- [ ] Reference Name: Monthly Subscription
- [ ] Display Name: Monthly Plan
- [ ] Description: Full access to all Today premium features
- [ ] Pricing: $14.99 (United States)
- [ ] Add screenshot (any app screenshot)
- [ ] Submit for Review
- [ ] Save

### Create Yearly Subscription
- [ ] In "Today Premium" group → Click "+"
- [ ] Product ID: `yearly` ⚠️ MUST be exact
- [ ] Duration: 1 Year
- [ ] Reference Name: Yearly Subscription
- [ ] Display Name: Yearly Plan
- [ ] Description: Full access to all Today premium features for one year
- [ ] Pricing: $59.99 (United States)
- [ ] Add screenshot (any app screenshot)
- [ ] Submit for Review
- [ ] Save

### Create Sandbox Tester
- [ ] App Store Connect → Users and Access → Sandbox
- [ ] Click "+"
- [ ] First Name: Test
- [ ] Last Name: User
- [ ] Email: `test+today@youremail.com` (must be unique!)
- [ ] Password: ______________ (write it down!)
- [ ] Territory: United States
- [ ] Create
- [ ] **Save credentials somewhere safe!**

### Verify Agreements
- [ ] App Store Connect → Agreements, Tax, and Banking
- [ ] All agreements accepted (green checkmarks)
- [ ] Tax information completed
- [ ] Banking information added

---

## Phase 3: RevenueCat Setup (Day 2-3)

### Create Account
- [ ] Go to https://app.revenuecat.com/signup
- [ ] Sign up with email or Google
- [ ] Create project: "Today"

### Add iOS App
- [ ] Dashboard → Apps → "+ New"
- [ ] Platform: Apple App Store
- [ ] App Name: Today
- [ ] Bundle ID: `com.today.panicrelief` ⚠️ MUST match exactly
- [ ] Get Shared Secret:
  - [ ] App Store Connect → Your App → General → App Information
  - [ ] Scroll to "App-Specific Shared Secret"
  - [ ] Click "Manage" → "Generate"
  - [ ] Copy secret
  - [ ] Paste into RevenueCat
- [ ] Save

### Create Products
- [ ] RevenueCat → Products → "+ New"
- [ ] Create Monthly:
  - [ ] Identifier: `monthly` ⚠️ MUST match App Store
  - [ ] Type: Subscription
  - [ ] Store: App Store
  - [ ] Store Product ID: `monthly`
  - [ ] Save
- [ ] Create Yearly:
  - [ ] Identifier: `yearly` ⚠️ MUST match App Store
  - [ ] Type: Subscription
  - [ ] Store: App Store
  - [ ] Store Product ID: `yearly`
  - [ ] Save

### Create Entitlement
- [ ] RevenueCat → Entitlements → "+ New"
- [ ] Identifier: `pro` ⚠️ MUST be exact (lowercase)
- [ ] Display Name: Premium Access
- [ ] Save
- [ ] Click on "pro" entitlement
- [ ] Click "Attach"
- [ ] Select `monthly`
- [ ] Select `yearly`
- [ ] Click "Attach"
- [ ] Verify both products show under "Attached Products"

### Create Offering
- [ ] RevenueCat → Offerings → "+ New"
- [ ] Identifier: `default`
- [ ] Description: Default offering
- [ ] Create
- [ ] Click on "default" offering
- [ ] Add Monthly Package:
  - [ ] Click "+ Add Package"
  - [ ] Identifier: `monthly`
  - [ ] Product: Select `monthly`
  - [ ] Add
- [ ] Add Yearly Package:
  - [ ] Click "+ Add Package"
  - [ ] Identifier: `yearly`
  - [ ] Product: Select `yearly`
  - [ ] Add
- [ ] Verify both packages appear
- [ ] Toggle "Current" to ON (at top of page)
- [ ] Verify "Current Offering" badge appears

### Get API Key
- [ ] RevenueCat → Project Settings → API Keys
- [ ] Find "Public app-specific API keys"
- [ ] Locate iOS app key (starts with `appl_`)
- [ ] Click "Show"
- [ ] Copy key: `____________________________________`
- [ ] **Save this key!**

---

## Phase 4: Code Updates (Day 2-3)

### Update RevenueCat Config
- [ ] Open `src/config/revenuecat.ts`
- [ ] Find line 2: `apiKey: process.env.REVENUECAT_API_KEY || 'test_VAgCumvulhWoUwVSTsYSdxXkTqR',`
- [ ] Replace with: `apiKey: 'appl_YOUR_ACTUAL_KEY_HERE',`
- [ ] Paste your real API key from RevenueCat
- [ ] Save file

### Update Legal URLs (Optional)
- [ ] Open `src/screens/onboarding/PaywallScreen.tsx`
- [ ] Find line 241: `Linking.openURL('https://yourwebsite.com/terms')`
- [ ] Replace with your Terms URL (or leave for now)
- [ ] Find line 245: `Linking.openURL('https://yourwebsite.com/privacy')`
- [ ] Replace with your Privacy URL (or leave for now)
- [ ] Save file

### Verify Configuration
- [ ] Open `src/config/revenuecat.ts`
- [ ] Line 7: `PRO: 'pro'` - confirms entitlement name
- [ ] Line 11: `MONTHLY: 'monthly'` - confirms monthly ID
- [ ] Line 12: `YEARLY: 'yearly'` - confirms yearly ID
- [ ] All match RevenueCat configuration ✓

---

## Phase 5: Wait for Sync (Day 2-3)

### Product Sync Wait
- [ ] Note current time: __________
- [ ] **WAIT 2-4 HOURS** for App Store to sync products
- [ ] While waiting, you can proceed with building the app
- [ ] After wait, check RevenueCat:
  - [ ] Dashboard → Overview
  - [ ] Check "Product Status"
  - [ ] Should show products as "Available"

---

## Phase 6: Build & Test (Day 3-4)

### Build App
- [ ] Open terminal
- [ ] Navigate to project: `cd "/Users/romanahmed/Desktop/Today App/today-app"`
- [ ] Run: `npm start`
- [ ] Press `i` for iOS
- [ ] App builds successfully
- [ ] No errors in console

### Test on Simulator (UI Only)
- [ ] App launches
- [ ] Navigate through onboarding
- [ ] Reach paywall screen
- [ ] Verify UI elements:
  - [ ] Purple gradient background
  - [ ] "today" logo
  - [ ] Description text
  - [ ] Phone mockup image
  - [ ] Two pricing cards (Monthly, Yearly)
  - [ ] Subscribe Now button
  - [ ] Footer links (Terms, Privacy, Restore)

### Prepare Physical Device
- [ ] Connect iPhone/iPad via USB
- [ ] Trust computer if prompted
- [ ] Settings → App Store → Sign Out
  - [ ] ⚠️ Only sign out of App Store, NOT iCloud
- [ ] Restart device
- [ ] Verify signed out: Settings → App Store → Shows "Sign In"

### Deploy to Physical Device
- [ ] In terminal: `npm start` → `i`
- [ ] Select your device from list
- [ ] App installs on device
- [ ] App launches successfully

### Test Pricing Display
- [ ] Navigate to paywall
- [ ] Check Monthly card:
  - [ ] Shows "$14.99"
  - [ ] Shows "per month"
- [ ] Check Yearly card:
  - [ ] Shows "$4.99" (monthly equivalent)
  - [ ] Shows "per month"
  - [ ] Shows "Billed as $59.99/year"
  - [ ] Shows "SAVE X%" badge
- [ ] If shows $0.00:
  - [ ] Wait 2-4 hours for product sync
  - [ ] Check RevenueCat product status
  - [ ] Verify product IDs match

### Test Plan Selection
- [ ] Tap Monthly card
- [ ] Checkmark appears on Monthly
- [ ] Yearly is unselected
- [ ] Tap Yearly card
- [ ] Checkmark appears on Yearly
- [ ] Monthly is unselected
- [ ] Feel haptic feedback (if device supports)

### Test Purchase Flow
- [ ] Verify signed OUT of App Store
- [ ] Select Yearly plan (recommended for testing)
- [ ] Tap "Subscribe Now"
- [ ] App Store payment sheet appears
- [ ] Verify shows "[Sandbox]" in title
- [ ] Verify shows "Yearly Plan" or similar
- [ ] Verify shows "$59.99"
- [ ] When prompted, sign in:
  - [ ] Use SANDBOX account email
  - [ ] Use SANDBOX account password
- [ ] Verify sandbox indicator visible
- [ ] Tap "Subscribe" or "Buy"
- [ ] Wait for processing (5-10 seconds)
- [ ] Success: App navigates to UserInfo screen
- [ ] Feel success haptic feedback

### Test Restore Purchases
- [ ] Delete app from device (long press → Remove App)
- [ ] Reinstall app:
  - [ ] `npm start` → `i` → Select device
  - [ ] Wait for installation
- [ ] Launch app
- [ ] Navigate through onboarding to paywall
- [ ] Tap "Restore Purchases" in footer
- [ ] Sign in with same sandbox account if prompted
- [ ] Alert appears: "Restore Successful"
- [ ] Tap "Continue"
- [ ] Navigates to UserInfo screen

### Verify in RevenueCat Dashboard
- [ ] Go to https://app.revenuecat.com
- [ ] Navigate to "Customers"
- [ ] Search for your sandbox email or see recent customer
- [ ] Click on customer
- [ ] Verify shows:
  - [ ] Active subscription
  - [ ] Entitlement "pro" is active
  - [ ] Correct product (yearly)
  - [ ] Purchase date/time
  - [ ] Revenue amount ($59.99)

---

## Phase 7: Final Verification

### Code Verification
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No linting errors
- [ ] API key is NOT the test key
- [ ] Entitlement ID is `pro` everywhere
- [ ] Product IDs are `monthly` and `yearly` everywhere

### App Store Connect Verification
- [ ] App created
- [ ] Subscription group exists
- [ ] Monthly product: ID `monthly`, $14.99
- [ ] Yearly product: ID `yearly`, $59.99
- [ ] Both submitted for review
- [ ] Sandbox account exists and working

### RevenueCat Verification
- [ ] App added with correct bundle ID
- [ ] Products: `monthly` and `yearly` created
- [ ] Products synced (shows "Available")
- [ ] Entitlement `pro` created
- [ ] Both products attached to `pro`
- [ ] Offering `default` created
- [ ] Both packages in offering
- [ ] Offering is "Current"
- [ ] API key copied and added to code

### Testing Verification
- [ ] ✅ App builds on device
- [ ] ✅ Paywall displays correctly
- [ ] ✅ Pricing shows real values ($14.99, $59.99)
- [ ] ✅ Can select plans
- [ ] ✅ Purchase works with sandbox
- [ ] ✅ Navigates after purchase
- [ ] ✅ Restore works after reinstall
- [ ] ✅ Transaction in RevenueCat dashboard

---

## Phase 8: Production Prep

### Pre-Launch
- [ ] Update legal URLs to real URLs (if not done)
- [ ] Test on multiple devices
- [ ] Test both Monthly and Yearly purchases
- [ ] Test cancellation flow
- [ ] Test failed payment handling

### App Store Submission Prep
- [ ] Add app screenshots
- [ ] Write app description
- [ ] Add app icon
- [ ] Set age rating
- [ ] Add support URL
- [ ] Provide demo account (sandbox credentials)

### Final Build
- [ ] Build production version: `eas build --platform ios` or `npx expo build:ios`
- [ ] Test production build (TestFlight)
- [ ] Submit to App Store

---

## Completion Status

**Configuration Progress:** __ / 8 Phases Complete

- [ ] Phase 1: Apple Setup
- [ ] Phase 2: App Store Connect
- [ ] Phase 3: RevenueCat Setup
- [ ] Phase 4: Code Updates
- [ ] Phase 5: Wait for Sync
- [ ] Phase 6: Build & Test
- [ ] Phase 7: Final Verification
- [ ] Phase 8: Production Prep

---

## Quick Reference

### Important URLs
- App Store Connect: https://appstoreconnect.apple.com
- RevenueCat Dashboard: https://app.revenuecat.com
- Apple Developer: https://developer.apple.com/account

### Important IDs
- Bundle ID: `com.today.panicrelief`
- Monthly Product: `monthly`
- Yearly Product: `yearly`
- Entitlement: `pro`
- Offering: `default`

### Sandbox Account
- Email: _______________________________
- Password: _______________________________

### RevenueCat API Key
- Key: _______________________________

---

## Need Help?

If stuck, check:
1. `IMPLEMENTATION_GUIDE.md` - Full detailed guide
2. `QUICK_START.md` - Quick reference
3. Common issues section in IMPLEMENTATION_GUIDE.md
4. RevenueCat community: https://community.revenuecat.com

---

**Once all phases are complete, you're ready to launch! 🚀**
