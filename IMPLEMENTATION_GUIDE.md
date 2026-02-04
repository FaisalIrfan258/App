# Today App - RevenueCat Implementation Guide

## Current Status

✅ **COMPLETE - Your custom paywall is fully implemented!**

All the code is written and ready. You just need to configure the backend services (App Store Connect and RevenueCat) to make subscriptions work.

---

## What You Have

Your app already includes:
- ✅ Custom purple gradient paywall UI
- ✅ RevenueCat SDK integration (`react-native-purchases` v9.7.5)
- ✅ Subscription context for managing purchases
- ✅ Pricing cards with dynamic savings calculation
- ✅ Purchase and restore functionality
- ✅ Loading and error states

**Configuration files ready:**
- `src/config/revenuecat.ts` - RevenueCat config
- `src/screens/onboarding/PaywallScreen.tsx` - Paywall screen
- `src/contexts/SubscriptionContext.tsx` - Subscription logic
- `src/services/revenueCatService.ts` - RevenueCat wrapper

---

## Step-by-Step Configuration

### STEP 0: Apple Developer Account (REQUIRED FIRST)

**⏱️ Time:** 10 minutes signup + 24-48 hours for Apple approval

**What:** You need a paid Apple Developer account to create in-app purchases.

**Actions:**
1. Go to https://developer.apple.com/programs/enroll/
2. Click "Enroll" and sign in with your Apple ID
3. Select account type (Individual or Organization)
4. Accept the Apple Developer Agreement
5. Pay the $99/year enrollment fee
6. Wait 24-48 hours for Apple to approve your enrollment

**Cost:** $99/year USD (required for App Store submission)

**After Approval:**
- You'll receive an email confirmation
- Sign in to https://appstoreconnect.apple.com
- You'll see the App Store Connect dashboard

**⚠️ IMPORTANT:** You cannot proceed with any other steps until your Apple Developer account is approved!

---

### STEP 1: Create App in App Store Connect

**⏱️ Time:** 10 minutes

**What:** Register your app so you can add in-app purchases.

**Actions:**

1. Go to https://appstoreconnect.apple.com
2. Click "My Apps"
3. Click the "+" button → "New App"
4. Fill in the form:
   - **Platform:** iOS
   - **Name:** Today (or your app name)
   - **Primary Language:** English (U.S.)
   - **Bundle ID:** Select "Xcode iOS App" → `com.today.panicrelief`
     - (If bundle ID doesn't exist, you'll need to create it in https://developer.apple.com/account/resources/identifiers/list)
   - **SKU:** `today-app-001` (internal identifier, can be anything)
   - **User Access:** Full Access

5. Click "Create"

**Result:** Your app is now registered in App Store Connect.

---

### STEP 2: Create Subscriptions in App Store Connect

**⏱️ Time:** 20 minutes

**What:** Define your subscription products with pricing.

**Actions:**

**2A. Create Subscription Group:**
1. In App Store Connect → Your App → "Monetization" → "Subscriptions"
2. Click "+" to create a new subscription group
3. Enter:
   - **Reference Name:** Today Premium
4. Click "Create"

**2B. Create Monthly Subscription:**
1. Inside the "Today Premium" group, click "+"
2. Fill in:
   - **Product ID:** `monthly` (MUST be exactly this!)
   - **Subscription Duration:** 1 Month
   - **Reference Name:** Monthly Subscription
3. Click "Create"
4. Add Subscription Information:
   - **Subscription Display Name:** Monthly Plan
   - **Description:** Full access to all Today premium features
5. Add Subscription Pricing:
   - Click "Add Subscription Pricing"
   - **Country/Region:** United States
   - **Price:** $14.99
   - Click "Next" → "Create"
6. Review Information → Click "Save"

**2C. Create Yearly Subscription:**
1. Back in "Today Premium" group, click "+" again
2. Fill in:
   - **Product ID:** `yearly` (MUST be exactly this!)
   - **Subscription Duration:** 1 Year
   - **Reference Name:** Yearly Subscription
3. Click "Create"
4. Add Subscription Information:
   - **Subscription Display Name:** Yearly Plan
   - **Description:** Full access to all Today premium features for one year
5. Add Subscription Pricing:
   - Click "Add Subscription Pricing"
   - **Country/Region:** United States
   - **Price:** $59.99
   - Click "Next" → "Create"
6. Review Information → Click "Save"

**2D. Submit for Review (Required):**
1. For EACH subscription (monthly and yearly):
   - Add a screenshot (can be any app screenshot for now)
   - Add Review Notes (optional): "In-app subscription for mental health app"
   - Click "Submit for Review"

**⚠️ CRITICAL:** Product IDs MUST be exactly `monthly` and `yearly` - these match your app code!

**Result:**
- Subscriptions created in App Store Connect
- Products submitted for review (usually approved in 24 hours)
- You can still test in sandbox mode while waiting for approval

---

### STEP 3: Create Sandbox Test Account

**⏱️ Time:** 5 minutes

**What:** Create a test account for testing purchases without real money.

**Actions:**

1. In App Store Connect → "Users and Access" (top navigation)
2. Click "Sandbox" tab
3. Click "+" under "Testers"
4. Fill in:
   - **First Name:** Test
   - **Last Name:** User
   - **Email:** Create a NEW email (not associated with any Apple ID)
     - Example: `today-test@yourcompany.com` or `test+today@gmail.com`
     - This MUST be a unique email not used anywhere else
   - **Password:** Create a strong password (save it!)
   - **App Store Territory:** United States
5. Click "Create"
6. Verify email if required

**💡 TIP:** Write down these credentials - you'll need them for testing!

**Result:** Sandbox account ready for testing purchases.

---

### STEP 4: Configure RevenueCat

**⏱️ Time:** 15 minutes

**What:** Connect RevenueCat to App Store Connect and set up products.

**Actions:**

**4A. Create RevenueCat Account (if you don't have one):**
1. Go to https://app.revenuecat.com/signup
2. Sign up with email/password or Google
3. Create a new project name: "Today"

**4B. Add iOS App:**
1. In RevenueCat dashboard → Click "Projects" → Your project
2. Click "Apps" in left sidebar
3. Click "+ New"
4. Select "Apple App Store"
5. Fill in:
   - **App Name:** Today
   - **Bundle ID:** `com.today.panicrelief` (MUST match exactly)
   - **Apple App Store Connect App-Specific Shared Secret:**
     - Go to https://appstoreconnect.apple.com
     - Your App → "General" → "App Information"
     - Scroll to "App-Specific Shared Secret"
     - Click "Manage" → "Generate" (if not exists)
     - Copy the secret
     - Paste into RevenueCat
6. Click "Save"

**4C. Add Products:**
1. RevenueCat → "Products" (left sidebar)
2. Click "+ New"
3. Create Monthly Product:
   - **Identifier:** `monthly` (matches App Store Connect)
   - **Type:** Subscription
   - **Store:** App Store
   - **Store Product ID:** `monthly`
4. Click "Save"
5. Click "+ New" again
6. Create Yearly Product:
   - **Identifier:** `yearly` (matches App Store Connect)
   - **Type:** Subscription
   - **Store:** App Store
   - **Store Product ID:** `yearly`
7. Click "Save"

**4D. Create Entitlement:**
1. RevenueCat → "Entitlements" (left sidebar)
2. Click "+ New"
3. Fill in:
   - **Identifier:** `pro` (MUST match code exactly)
   - **Display Name:** Premium Access
4. Click "Save"
5. Click on the "pro" entitlement
6. Under "Attached Products", click "Attach"
7. Select BOTH `monthly` and `yearly`
8. Click "Attach"

**4E. Create Offering:**
1. RevenueCat → "Offerings" (left sidebar)
2. Click "+ New"
3. Fill in:
   - **Identifier:** `default`
   - **Description:** Default offering
4. Click "Create"
5. Click on "default" offering
6. Under "Packages", click "+ Add Package"
7. Create Monthly Package:
   - **Identifier:** `monthly`
   - **Product:** Select `monthly`
8. Click "Add"
9. Click "+ Add Package" again
10. Create Yearly Package:
    - **Identifier:** `yearly`
    - **Product:** Select `yearly`
11. Click "Add"
12. Mark "default" as "Current" (toggle switch at top)

**4F. Get API Key:**
1. RevenueCat → "API Keys" (left sidebar under project settings)
2. Under "Public app-specific API keys"
3. Find your iOS app key (starts with `appl_`)
4. Click "Show" → Copy the key
5. **Save this key** - you'll need it in next step

**Result:**
- RevenueCat connected to App Store Connect
- Products, entitlements, and offerings configured
- API key ready

---

### STEP 5: Update App Configuration

**⏱️ Time:** 2 minutes

**What:** Add your RevenueCat API key to the app.

**Actions:**

1. Open `src/config/revenuecat.ts` in your code editor
2. Find this line:
   ```typescript
   apiKey: process.env.REVENUECAT_API_KEY || 'test_VAgCumvulhWoUwVSTsYSdxXkTqR',
   ```
3. Replace with your REAL API key from RevenueCat:
   ```typescript
   apiKey: 'appl_YOUR_ACTUAL_KEY_HERE',
   ```
   - Example: `apiKey: 'appl_xYzAbC123',`
4. Save the file

**⚠️ IMPORTANT:**
- Use the iOS public API key (starts with `appl_`)
- Remove the test key completely
- This key is safe to include in your app - it's the PUBLIC key

**Result:** App can now communicate with RevenueCat.

---

### STEP 6: Update Legal Links (OPTIONAL)

**⏱️ Time:** 5 minutes (or skip for now)

**What:** Add your Terms of Use and Privacy Policy URLs.

**Actions:**

1. Open `src/screens/onboarding/PaywallScreen.tsx`
2. Find lines 241 and 245:
   ```typescript
   <TouchableOpacity onPress={() => Linking.openURL('https://yourwebsite.com/terms')}>
   ...
   <TouchableOpacity onPress={() => Linking.openURL('https://yourwebsite.com/privacy')}>
   ```
3. Replace with your actual URLs:
   ```typescript
   <TouchableOpacity onPress={() => Linking.openURL('https://today.com/terms')}>
   ...
   <TouchableOpacity onPress={() => Linking.openURL('https://today.com/privacy')}>
   ```
4. Save the file

**⏭️ Can Skip:** You can do this later before App Store submission. For testing, the current placeholder URLs are fine.

**Result:** Legal links point to your real policies.

---

### STEP 7: Wait for App Store Product Sync

**⏱️ Time:** 2-4 hours (automatic)

**What:** Wait for Apple to sync your products to RevenueCat.

**Why:** After creating products in App Store Connect, Apple takes 2-4 hours to make them available to apps (including sandbox).

**What to do:**
1. Wait 2-4 hours after creating products in App Store Connect
2. You can proceed with testing, but pricing might show $0.00 initially
3. Check RevenueCat dashboard → Overview → "Product Status" to see when products are available

**How to check if ready:**
- RevenueCat Dashboard → Overview → Check if products show "Available"
- Or run the app and see if real pricing appears ($14.99, $59.99)

**Result:** Products synced and ready for testing.

---

### STEP 8: Test the Integration

**⏱️ Time:** 15 minutes

**What:** Test that everything works end-to-end.

**Actions:**

**8A. Build and Run App:**

```bash
cd "/Users/romanahmed/Desktop/Today App/today-app"
npm start
```

- For iOS Simulator: Press `i` (you can see the UI but can't test purchases)
- For iOS Device: Press `i` then select your device (required for purchase testing)

**8B. Sign Out of App Store (On Physical Device):**
1. On your iPhone/iPad → Settings → App Store
2. Tap your name at top → Sign Out
3. Important: Only sign out of App Store, NOT iCloud

**8C. Test Paywall UI:**
1. Navigate through onboarding to the paywall screen
2. Verify you see:
   - "today" logo
   - Phone mockup images
   - Two pricing cards (Monthly and Yearly)
   - Real pricing: $14.99/month and $4.99/month (billed $59.99/year)
   - "SAVE X%" badge on yearly plan
   - Subscribe Now button
   - Footer with Terms / Privacy / Restore links

**If pricing shows $0.00:**
- Wait 2-4 hours for App Store product sync
- Check RevenueCat dashboard product status
- Verify product IDs match exactly: `monthly` and `yearly`

**8D. Test Purchase Flow (Physical Device Required):**

⚠️ **MUST use a REAL iPhone/iPad** - Simulator cannot make purchases!

1. Tap "Yearly" plan (should have checkmark)
2. Tap "Subscribe Now"
3. App Store payment sheet appears
4. When prompted to sign in:
   - Use your SANDBOX test account credentials
   - Format: `today-test@yourcompany.com` (from Step 3)
5. Confirm sandbox environment message (says "[Sandbox]")
6. Tap "Subscribe" (no real charge)
7. Wait for confirmation
8. Should navigate to UserInfo screen

**If purchase fails:**
- Verify you're signed OUT of regular App Store
- Only use sandbox credentials
- Check that subscriptions are submitted for review in App Store Connect
- Verify RevenueCat entitlement is named exactly `pro`

**8E. Test Restore Purchases:**
1. Delete the app from device
2. Reinstall the app
3. Navigate to paywall
4. Tap "Restore Purchases" in footer
5. Sign in with same sandbox account
6. Should show success alert
7. Should navigate to UserInfo screen

**8F. Verify in RevenueCat Dashboard:**
1. Go to https://app.revenuecat.com
2. Navigate to "Customers"
3. You should see your test user
4. Click on the customer
5. Verify:
   - Active subscription shown
   - Entitlement "pro" is active
   - Product (monthly or yearly) is correct

**Result:**
✅ Paywall displays correctly
✅ Pricing shows real amounts
✅ Purchase completes successfully
✅ Restore purchases works
✅ RevenueCat tracking works

---

## Verification Checklist

Copy this checklist to track your progress:

### Apple Developer Account
- [ ] Enrolled in Apple Developer Program ($99/year)
- [ ] Account approved (received confirmation email)
- [ ] Can access App Store Connect

### App Store Connect
- [ ] App created (bundle ID: `com.today.panicrelief`)
- [ ] Subscription group created ("Today Premium")
- [ ] Monthly subscription created (ID: `monthly`, $14.99)
- [ ] Yearly subscription created (ID: `yearly`, $59.99)
- [ ] Both subscriptions submitted for review
- [ ] Sandbox test account created and verified

### RevenueCat Dashboard
- [ ] Account created at app.revenuecat.com
- [ ] iOS app added (bundle ID matches)
- [ ] App Store Connect connected (shared secret added)
- [ ] Products added (`monthly`, `yearly`)
- [ ] Entitlement created (ID: `pro`)
- [ ] Both products attached to `pro` entitlement
- [ ] Offering created (ID: `default`)
- [ ] Packages added to offering (monthly, yearly)
- [ ] Offering marked as "Current"
- [ ] API key copied

### App Code
- [ ] RevenueCat API key updated in `src/config/revenuecat.ts`
- [ ] Legal URLs updated (or noted as TODO)
- [ ] App builds without errors
- [ ] No TypeScript/linting errors

### Testing (After 2-4 hour sync wait)
- [ ] App runs on simulator (UI check)
- [ ] Paywall displays correctly
- [ ] Real pricing appears ($14.99, $59.99)
- [ ] SAVE badge shows correct percentage
- [ ] Can select plans (checkmark appears)
- [ ] App runs on physical device
- [ ] Signed out of App Store on device
- [ ] Purchase flow works with sandbox account
- [ ] Success: navigates to UserInfo screen
- [ ] Delete and reinstall app
- [ ] Restore purchases works
- [ ] RevenueCat dashboard shows test transaction

---

## Common Issues & Solutions

### Issue 1: Pricing Shows $0.00

**Symptoms:** Paywall shows "$0.00" for both plans.

**Causes:**
- App Store products not synced yet (takes 2-4 hours)
- Product IDs don't match
- RevenueCat not connected to App Store properly

**Solutions:**
1. **Wait:** If you just created products, wait 2-4 hours
2. **Check Product IDs:** Must be exactly `monthly` and `yearly` everywhere:
   - App Store Connect product IDs
   - RevenueCat product identifiers
   - Code references
3. **Verify RevenueCat Connection:**
   - Dashboard → Apps → Your app → Edit
   - Check that "App-Specific Shared Secret" is set
   - Re-enter if needed
4. **Check RevenueCat Products Page:**
   - Dashboard → Products
   - Click on `monthly` → Should show "Synced" status
   - Same for `yearly`
5. **Check Offerings:**
   - Dashboard → Offerings → `default`
   - Verify both packages exist
   - Verify "Current" toggle is ON

---

### Issue 2: "No Offerings Available"

**Symptoms:** App shows loading spinner forever or error "No offerings available."

**Causes:**
- Offering not marked as "Current"
- No packages in offering
- Wrong API key
- Network/RevenueCat service issue

**Solutions:**
1. **Check Current Offering:**
   - RevenueCat → Offerings
   - Find `default` offering
   - Toggle "Current" to ON
2. **Verify Packages:**
   - Click on `default` offering
   - Should have 2 packages: `monthly` and `yearly`
   - Each package should link to a product
3. **Check API Key:**
   - RevenueCat → API Keys
   - Copy the iOS public key (starts with `appl_`)
   - Verify it matches `src/config/revenuecat.ts`
   - Rebuild app after changing
4. **Check Device/Simulator Logs:**
   - In Xcode: Window → Devices and Simulators → Open Console
   - Filter for "RevenueCat"
   - Look for errors about API key, network, etc.

---

### Issue 3: Purchase Fails with "Cannot Connect to iTunes Store"

**Symptoms:** Tap Subscribe → Error "Cannot connect to iTunes Store."

**Causes:**
- Still signed into regular Apple ID (not sandbox)
- Sandbox account not set up correctly
- Network issue
- Testing on simulator (can't purchase)

**Solutions:**
1. **Sign Out Completely:**
   - Settings → App Store → Tap your name → Sign Out
   - Settings → Media & Purchases → Sign Out
   - Restart device
2. **Must Use Physical Device:**
   - iOS Simulator CANNOT make purchases (even sandbox)
   - Deploy to real iPhone/iPad
3. **Wait for Sign-In Prompt:**
   - DON'T sign in before testing
   - Let the purchase sheet ask for credentials
   - Then enter sandbox account
4. **Verify Sandbox Account:**
   - App Store Connect → Users and Access → Sandbox
   - Check that test account exists
   - Email must be unique (not used for real Apple ID)
5. **Check Network:**
   - Device must have internet connection
   - Try disabling VPN if you have one

---

### Issue 4: "Product Not Available for Purchase"

**Symptoms:** Purchase button is grayed out or shows this error.

**Causes:**
- Subscriptions not approved in App Store Connect
- Agreements not signed
- Tax/banking info incomplete
- Bundle ID mismatch

**Solutions:**
1. **Check App Store Connect Agreements:**
   - App Store Connect → Agreements, Tax, and Banking
   - Accept all agreements
   - Complete tax forms
   - Add banking information (required even for sandbox!)
2. **Check Subscription Status:**
   - Your App → Monetization → Subscriptions
   - Both products should show "Ready to Submit" or "Waiting for Review"
   - If "Missing Metadata", add required fields
3. **Verify Bundle ID:**
   - App Store Connect → Your App → General
   - Check Bundle ID matches exactly: `com.today.panicrelief`
   - RevenueCat → Apps → Check Bundle ID
   - Xcode → Project → Bundle Identifier
4. **Re-submit Products:**
   - If products show errors, fix metadata
   - Re-submit for review
   - Wait for approval (usually 24 hours)

---

### Issue 5: "Restore Purchases" Finds Nothing

**Symptoms:** Tap Restore → Alert says "No purchases found."

**Causes:**
- Never purchased before
- Using different Apple ID than purchase
- Purchase hasn't synced yet
- Entitlement name mismatch

**Solutions:**
1. **Verify Previous Purchase:**
   - Make sure you completed a purchase first
   - Check RevenueCat dashboard → Customers
   - Should see your test user
2. **Same Apple ID:**
   - Must use SAME sandbox account for restore
   - Check Settings → App Store (shouldn't be signed in)
   - Restore will prompt for credentials
3. **Check Entitlement Name:**
   - RevenueCat → Entitlements
   - Must be exactly `pro` (lowercase)
   - Code references: `src/config/revenuecat.ts` line 7
   - If wrong, update in RevenueCat dashboard
4. **Wait and Retry:**
   - Sometimes takes a minute for purchase to sync
   - Wait 1-2 minutes after purchase
   - Try restore again

---

### Issue 6: App Crashes on Purchase

**Symptoms:** App crashes when tapping Subscribe button.

**Causes:**
- RevenueCat not initialized properly
- Missing API key
- Bundle ID mismatch
- Code error

**Solutions:**
1. **Check Console Logs:**
   - Xcode → Window → Devices and Simulators
   - Select your device → Open Console
   - Look for crash reason
2. **Verify API Key:**
   - `src/config/revenuecat.ts`
   - Should have real key starting with `appl_`
   - Not the test key
3. **Rebuild App:**
   - Close app completely
   - In terminal: `npm start` → `i` to rebuild
   - Clear cache if needed: `expo start -c`
4. **Check RevenueCat Initialization:**
   - Look for errors in console
   - Should see "RevenueCat initialized" or similar

---

### Issue 7: Wrong Currency Displayed

**Symptoms:** Prices show in wrong currency (not USD).

**Causes:**
- Device region set to different country
- App Store account region
- Test account region

**Solutions:**
1. **Set Device Region:**
   - Settings → General → Language & Region
   - Set to "United States"
2. **Test Account Region:**
   - App Store Connect → Sandbox Testers
   - Edit test account
   - Set "App Store Territory" to United States
3. **App Store Connect Pricing:**
   - Your App → Subscriptions → Monthly/Yearly
   - Check that US pricing is set correctly
   - Add more regions if needed

---

## Critical Configuration Values

These MUST match EXACTLY everywhere:

| Configuration | Value | Where Used |
|--------------|-------|------------|
| **Monthly Product ID** | `monthly` | App Store Connect, RevenueCat Products, RevenueCat Offering Packages, Code |
| **Yearly Product ID** | `yearly` | App Store Connect, RevenueCat Products, RevenueCat Offering Packages, Code |
| **Entitlement ID** | `pro` | RevenueCat Entitlements, `src/config/revenuecat.ts` line 7 |
| **Offering ID** | `default` | RevenueCat Offerings |
| **Bundle ID** | `com.today.panicrelief` | App Store Connect, RevenueCat Apps, Xcode Project |
| **Monthly Price** | $14.99 | App Store Connect pricing |
| **Yearly Price** | $59.99 | App Store Connect pricing |

**⚠️ If ANY of these don't match → Subscriptions won't work!**

---

## Testing Checklist

Before launching to production, test all of these:

### Basic Functionality
- [ ] App launches successfully
- [ ] Navigate through onboarding to paywall
- [ ] Paywall UI displays correctly
- [ ] Purple gradient background visible
- [ ] "today" logo displays
- [ ] Phone mockup image shows
- [ ] Both pricing cards visible

### Pricing Display
- [ ] Monthly plan shows $14.99/month
- [ ] Yearly plan shows $4.99/month
- [ ] Yearly plan subtitle shows "Billed as $59.99/year"
- [ ] SAVE badge appears on yearly plan
- [ ] SAVE percentage is correct (~67%)

### Interaction
- [ ] Can tap Monthly card (checkmark appears)
- [ ] Can tap Yearly card (checkmark appears)
- [ ] Only one plan selected at a time
- [ ] Haptic feedback on selection (physical device)
- [ ] Subscribe button is visible and enabled

### Purchase Flow (Physical Device Only)
- [ ] Signed out of App Store beforehand
- [ ] Tap Subscribe Now
- [ ] App Store payment sheet appears
- [ ] Shows [Sandbox] in title
- [ ] Shows correct plan (Monthly or Yearly)
- [ ] Shows correct price
- [ ] Can enter sandbox credentials
- [ ] Purchase completes without errors
- [ ] Shows success (navigates to UserInfo screen)
- [ ] Haptic success feedback (physical device)

### Restore Purchases
- [ ] Delete app from device
- [ ] Reinstall app
- [ ] Navigate to paywall
- [ ] Tap "Restore Purchases" in footer
- [ ] Sign in with sandbox account (if prompted)
- [ ] Shows "Restore Successful" alert
- [ ] Navigates to UserInfo screen

### Error Handling
- [ ] Cancel purchase → No error, stays on paywall
- [ ] Restore with no purchases → "No purchases found" alert
- [ ] No internet → Shows appropriate error
- [ ] Products not loaded → Shows loading state

### RevenueCat Dashboard
- [ ] Transaction appears in Customers
- [ ] Customer has `pro` entitlement
- [ ] Subscription is marked as active
- [ ] Correct product (monthly or yearly) shown
- [ ] Correct price recorded

### Footer Links
- [ ] Terms of Use link works (opens URL)
- [ ] Privacy Policy link works (opens URL)
- [ ] Restore Purchases link works (runs restore)

---

## Next Steps After Configuration

Once all tests pass, you're ready for production:

### 1. Prepare App for Submission
- [ ] Add app screenshots
- [ ] Write app description
- [ ] Set app category
- [ ] Add keywords
- [ ] Set age rating
- [ ] Add support URL
- [ ] Add marketing URL (optional)

### 2. Build for Production
```bash
# Generate production build
npx expo build:ios
# Or use EAS Build
eas build --platform ios
```

### 3. Upload to App Store Connect
- [ ] Use Xcode or Application Loader
- [ ] Upload IPA file
- [ ] Wait for processing (~15 minutes)

### 4. Submit for Review
- [ ] Fill in "What's New" text
- [ ] Add demo account for reviewers (sandbox account)
- [ ] Select "Manually release this version"
- [ ] Submit for review

### 5. Monitor Launch
- [ ] Check App Store Connect for review status
- [ ] Watch RevenueCat dashboard for first real purchases
- [ ] Monitor analytics (conversion rate, MRR)
- [ ] Set up alerts for failed payments

---

## Support & Resources

### RevenueCat
- **Dashboard:** https://app.revenuecat.com
- **Documentation:** https://docs.revenuecat.com
- **Community:** https://community.revenuecat.com
- **Support:** support@revenuecat.com

### Apple
- **App Store Connect:** https://appstoreconnect.apple.com
- **Developer Portal:** https://developer.apple.com/account
- **StoreKit Documentation:** https://developer.apple.com/storekit
- **Support:** https://developer.apple.com/support

### Your Documentation
- `REVENUECAT_SETUP_GUIDE.md` - Original detailed guide
- `SETUP_DIAGRAM.md` - Visual flow diagrams
- `PAYWALL_TESTING_GUIDE.md` - Testing procedures
- `PAYWALL_IMPLEMENTATION.md` - Implementation details

---

## Cost Breakdown

### Development Tools
- **Apple Developer Program:** $99/year (required)
- **RevenueCat:** Free until $10,000 monthly tracked revenue
  - After $10K: Starting at $300/month or revenue-based pricing

### Revenue Share
- **Apple's Cut (Year 1):** 30% of subscription revenue
- **Apple's Cut (Year 2+):** 15% of subscription revenue (same subscriber)
- **Your Revenue:** 70% (year 1) or 85% (year 2+)

### Example Scenarios

**Scenario 1: 50 Yearly Subscribers**
- Gross Revenue: $2,995 (50 × $59.99)
- RevenueCat Fee: $0 (under $10K threshold)
- Apple's Cut (30%): $899
- **Your Net Revenue: $2,096**

**Scenario 2: 200 Yearly Subscribers**
- Gross Revenue: $11,998 (200 × $59.99)
- RevenueCat Fee: ~$300/month = $3,600/year
- Apple's Cut (30%): $3,599
- **Your Net Revenue: $4,799**

**Scenario 3: After 1 Year (Same 200 Subscribers)**
- Gross Revenue: $11,998
- RevenueCat Fee: ~$300/month = $3,600/year
- Apple's Cut (15%): $1,800
- **Your Net Revenue: $6,598**

---

## Timeline Summary

**Total Time: 2-4 days** (mostly waiting for Apple)

### Day 1
- ⏰ 10 min: Sign up for Apple Developer Program
- ⏳ **Wait 24-48 hours** for Apple approval

### Day 2-3 (After Apple Approval)
- ⏰ 10 min: Create app in App Store Connect
- ⏰ 20 min: Create subscriptions
- ⏰ 5 min: Create sandbox test account
- ⏰ 15 min: Configure RevenueCat
- ⏰ 2 min: Update API key in code
- ⏰ 5 min: Update legal links (optional)
- ⏳ **Wait 2-4 hours** for product sync

### Day 3-4 (After Product Sync)
- ⏰ 15 min: Test everything end-to-end
- ✅ Ready for production!

**Active Work Time:** ~1 hour
**Waiting Time:** 1-3 days

---

## Success Criteria

You're ready for production when:

✅ **Configuration Complete:**
- [ ] All steps 0-6 completed
- [ ] All values in "Critical Configuration Values" match
- [ ] API key updated in code

✅ **Testing Passed:**
- [ ] All items in "Testing Checklist" checked
- [ ] Purchase works on physical device
- [ ] Restore works after reinstall
- [ ] RevenueCat dashboard shows transactions

✅ **Production Ready:**
- [ ] Legal URLs point to real policies
- [ ] App builds without errors
- [ ] No test/placeholder data in code
- [ ] Ready to submit to App Store

---

## Need Help?

If you get stuck:

1. **Check "Common Issues & Solutions"** section above
2. **Review RevenueCat Dashboard:**
   - Overview → Check for warnings
   - Debug → Product Entitlement Mapping
3. **Check App Logs:**
   - Xcode → Devices → Console
   - Filter for "RevenueCat" or "StoreKit"
4. **RevenueCat Community:**
   - https://community.revenuecat.com
   - Search for your error message
5. **Contact Support:**
   - RevenueCat: support@revenuecat.com
   - Apple: https://developer.apple.com/support

---

**You've got this! Your paywall is already built - just need to configure the backend services and you're ready to launch! 🚀**
