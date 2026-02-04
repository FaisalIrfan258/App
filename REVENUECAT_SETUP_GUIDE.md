# RevenueCat Complete Setup Guide

## Why You Can't Edit Pricing in RevenueCat

**Important**: RevenueCat doesn't manage pricing - it only **reads** pricing from App Store Connect or Google Play Console. You must create your products in Apple's or Google's systems first, then connect them to RevenueCat.

---

## Complete Setup Process

### STEP 1: Create Products in App Store Connect (20 minutes)

#### 1.1 Access App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Sign in with your Apple Developer account
3. Click "My Apps"
4. Select your "Today" app

#### 1.2 Create Subscription Group
1. Click "Features" → "In-App Purchases"
2. Click the "+" button or "Manage" under Subscriptions
3. Click "Create Subscription Group"
4. Enter details:
   - **Reference Name**: "Today Premium Membership"
   - Click "Create"

#### 1.3 Create Monthly Subscription Product
1. Inside your subscription group, click "Create Subscription"
2. Fill in the form:

   **Product Information:**
   - **Reference Name**: "Monthly Subscription"
   - **Product ID**: `monthly` ← **CRITICAL: Must be exactly this**
   - Click "Create"

3. **Add Subscription Duration**:
   - Duration: **1 Month**

4. **Add Subscription Pricing**:
   - Click "Set Pricing"
   - **Base Region**: United States
   - **Price**: $14.99
   - Click "Next"
   - Review other regions (auto-converted)
   - Click "Review Pricing" → "Continue"

5. **Add Localization**:
   - Click "Add Localization"
   - **Language**: English (U.S.)
   - **Subscription Display Name**: "Monthly Plan"
   - **Description**: "Get unlimited access to all Today features with a monthly subscription. Cancel anytime."
   - Click "Save"

6. **App Store Promotion** (Optional):
   - Add promotional image (1024x1024)
   - Skip for now if testing

7. **Review Information**:
   - Click "Save" at the top right

#### 1.4 Create Yearly Subscription Product
Repeat the same process:

1. Click "Create Subscription" (in the same subscription group)
2. Fill in:
   - **Reference Name**: "Yearly Subscription"
   - **Product ID**: `yearly` ← **CRITICAL: Must be exactly this**
   - **Duration**: 1 Year
   - **Price**: $59.99
   - **Display Name**: "Yearly Plan"
   - **Description**: "Get unlimited access to all Today features with yearly savings. Cancel anytime."
3. Click "Save"

#### 1.5 Submit for Review (Later)
- Don't submit yet - wait until your app is ready
- For testing, products work immediately in Sandbox mode

---

### STEP 2: Create Sandbox Test Account (5 minutes)

You need a test account to test purchases without real money.

1. In App Store Connect, click "Users and Access"
2. Click "Sandbox Testers" in the left sidebar
3. Click the "+" button
4. Fill in the form:
   - **First Name**: Test
   - **Last Name**: User
   - **Email**: Create a new email (can be fake, e.g., `todaytest@example.com`)
   - **Password**: Create a strong password (save it!)
   - **Security Question**: Pick any
   - **Country/Region**: United States
   - **App Store Territory**: United States
5. Click "Invite"
6. **Save these credentials** - you'll need them for testing

---

### STEP 3: Set Up RevenueCat (15 minutes)

#### 3.1 Create RevenueCat Account
1. Go to https://app.revenuecat.com
2. Sign up or log in
3. Create a new project or select existing

#### 3.2 Add iOS App
1. In RevenueCat dashboard, click "Apps"
2. Click "Add App" or select your existing app
3. Fill in:
   - **App Name**: Today
   - **Bundle ID**: Your app's bundle ID (from app.json)
   - **Platform**: iOS
4. Click "Save"

#### 3.3 Get App Store Connect API Key (StoreKit 2)

**Option A: Shared Secret (Simple, less secure)**
1. In App Store Connect, go to "My Apps" → Your App
2. Click "App Information" → "App-Specific Shared Secret"
3. Click "Generate" and copy the secret
4. In RevenueCat:
   - Go to your app → "App Settings"
   - Paste the shared secret
   - Click "Save"

**Option B: App Store Connect API Key (Recommended)**
1. In App Store Connect, go to "Users and Access"
2. Click "Keys" tab → "In-App Purchase" section
3. Click "Generate API Key"
4. Copy the key and download the .p8 file
5. In RevenueCat:
   - Go to your app → "App Settings" → "Apple App Store"
   - Upload the .p8 file
   - Enter Issuer ID and Key ID
   - Click "Save"

#### 3.4 Add Products to RevenueCat
1. In RevenueCat dashboard, go to "Products" tab
2. Click "New Product"
3. Enter:
   - **Product Identifier**: `monthly` (must match App Store Connect)
   - **Store**: App Store
   - **Type**: Subscription
4. Click "Add"

5. Repeat for yearly:
   - Click "New Product"
   - **Product Identifier**: `yearly`
   - **Store**: App Store
   - **Type**: Subscription
   - Click "Add"

#### 3.5 Create Entitlement
1. Go to "Entitlements" tab
2. Click "New Entitlement"
3. Enter:
   - **Entitlement Identifier**: `pro` ← **CRITICAL: Must match your code**
4. Click "Add"

5. **Attach Products to Entitlement**:
   - Click on the "pro" entitlement
   - Click "Attach Product"
   - Select `monthly` from dropdown
   - Click "Attach"
   - Click "Attach Product" again
   - Select `yearly`
   - Click "Attach"

#### 3.6 Create Offering
1. Go to "Offerings" tab
2. Click "New Offering"
3. Enter:
   - **Offering Identifier**: `default`
   - **Description**: "Default paywall offering"
4. Click "Add"

5. **Add Packages to Offering**:
   - Click on "default" offering
   - Click "New Package"
   - **Package Identifier**: `monthly`
   - **Product**: Select `monthly` (App Store)
   - Click "Add"

   - Click "New Package" again
   - **Package Identifier**: `yearly`
   - **Product**: Select `yearly` (App Store)
   - Click "Add"

6. **Make it Current**:
   - Click the "..." menu next to "default" offering
   - Click "Make Current Offering"
   - Confirm

---

### STEP 4: Get RevenueCat API Key (2 minutes)

1. In RevenueCat dashboard, click your app name
2. Click "API Keys" in the left sidebar
3. Under "Public app-specific API keys"
4. **iOS**: Copy the API key that starts with `appl_...`
5. Keep this ready for the next step

---

### STEP 5: Update Your App Configuration (5 minutes)

#### 5.1 Update API Key in Your Code

Open `src/config/revenuecat.ts` and replace the test API key with your real one:

```typescript
export const revenueCatConfig = {
  apiKey: 'appl_XXXXXXXXXX', // ← Paste your iOS API key from RevenueCat here
  observerMode: false,
};
```

**Your Bundle ID**: `com.today.panicrelief` (make sure this matches in App Store Connect)

---

### STEP 6: Test the Setup (15 minutes)

#### 6.1 Build and Run Your App
```bash
cd "/Users/romanahmed/Desktop/Today App/today-app"
npm start
# Press 'i' for iOS simulator
```

#### 6.2 Test Sandbox Purchase (on Physical Device)

**Important**: Sandbox testing only works on real devices, not simulators!

1. **Sign out of App Store on your iPhone**:
   - Settings → Your Name → Sign Out
   - OR Settings → App Store → Sign Out

2. **Install your app**:
   - Build with EAS: `eas build --profile development --platform ios`
   - Or use Expo Go (limited RevenueCat support)

3. **Navigate to Paywall**:
   - Open app and go through onboarding
   - You should see your paywall with pricing

4. **Check if Pricing Loads**:
   - ✅ If you see "$14.99" and "$59.99" → Success! Products are configured correctly
   - ❌ If you see "$0.00" or loading forever → Products not configured properly (see troubleshooting)

5. **Test Purchase**:
   - Tap "Subscribe Now"
   - **Sign in when prompted** with your sandbox account:
     - Email: The sandbox email you created
     - Password: The sandbox password
   - Apple will show **[Sandbox Environment]** at the top
   - Confirm purchase (no real charge)
   - App should navigate to UserInfo screen

6. **Verify Subscription**:
   - Check Settings → Your Name → Subscriptions
   - You should see "Today" subscription as "[Sandbox]"

#### 6.3 Test Restore Purchases

1. Delete and reinstall the app
2. Go to paywall
3. Tap "Restore Purchases" in footer
4. Should restore your subscription
5. Should navigate to UserInfo screen

---

### STEP 7: Verify Everything Works

#### Checklist

```
✅ Products created in App Store Connect
   - monthly: $14.99/month
   - yearly: $59.99/year

✅ Products added to RevenueCat
   - monthly (App Store)
   - yearly (App Store)

✅ Entitlement created in RevenueCat
   - Identifier: "pro"
   - Both products attached

✅ Offering created in RevenueCat
   - Identifier: "default"
   - Marked as "Current"
   - Has monthly package
   - Has yearly package

✅ API key updated in code
   - src/config/revenuecat.ts has real API key

✅ Sandbox account created
   - Email and password saved

✅ Pricing loads in app
   - Shows $14.99 for monthly
   - Shows $4.99/month for yearly
   - Shows "SAVE X%" badge

✅ Purchase works
   - Sandbox purchase completes
   - App navigates to UserInfo
   - Subscription visible in Settings

✅ Restore works
   - Restores previous purchase
   - Recognizes active subscription
```

---

## Common Issues & Solutions

### Issue 1: Pricing Shows $0.00 or Doesn't Load

**Causes:**
- Products not synced yet
- Wrong product IDs
- App Store Connect API not configured

**Solutions:**
1. Wait 2-4 hours for App Store Connect sync
2. Verify product IDs:
   - App Store Connect: `monthly` and `yearly`
   - RevenueCat Products: `monthly` and `yearly`
   - Must match exactly (case-sensitive)
3. Check RevenueCat App Settings for App Store Connect connection
4. In RevenueCat, go to your app → Debug → Check "Product Entitlement Mapping"

### Issue 2: "No Offerings Available"

**Causes:**
- Offering not marked as "Current"
- No packages in offering
- API key wrong

**Solutions:**
1. RevenueCat → Offerings → Make "default" current
2. Verify packages exist in default offering
3. Check API key in `src/config/revenuecat.ts`
4. Check network connection

### Issue 3: Purchase Fails

**Causes:**
- Not signed into sandbox account
- Sandbox account not verified
- Products not approved

**Solutions:**
1. Sign out of regular App Store
2. Only sign in when prompted during purchase
3. Verify sandbox account in App Store Connect
4. Products don't need approval for sandbox testing

### Issue 4: "Product Not Available for Purchase"

**Causes:**
- Agreements not signed
- Tax forms not completed
- Bundle ID mismatch

**Solutions:**
1. App Store Connect → Agreements, Tax, and Banking
2. Accept all agreements
3. Complete tax forms
4. Add banking information
5. Verify bundle ID: `com.today.panicrelief`

### Issue 5: Can't See Products in RevenueCat

**Causes:**
- App Store Connect API not configured
- Products not created in App Store Connect
- Wrong project selected

**Solutions:**
1. Create products in App Store Connect first
2. Configure App Store Connect API in RevenueCat
3. Wait up to 24 hours for sync
4. Manually add products using product IDs

---

## Quick Reference

### Product IDs (Must Match Everywhere)
- **Monthly**: `monthly`
- **Yearly**: `yearly`

### Entitlement ID
- **Pro Access**: `pro`

### Offering ID
- **Default**: `default`

### Package IDs (in Offering)
- **Monthly Package**: `monthly`
- **Yearly Package**: `yearly`

### Bundle ID
- **iOS**: `com.today.panicrelief`

### Pricing
- **Monthly**: $14.99/month
- **Yearly**: $59.99/year ($4.99/month equivalent)
- **Savings**: ~67-70%

---

## Testing Commands

### Check if RevenueCat is Initialized
In your app console (after app starts):
```javascript
// This should log customer info
import { revenueCatService } from './src/services/revenueCatService';
const info = await revenueCatService.getCustomerInfo();
console.log('Customer Info:', info);
```

### Check Offerings
```javascript
const offerings = await revenueCatService.getOfferings();
console.log('Current Offering:', offerings?.current);
console.log('Packages:', offerings?.current?.availablePackages);
```

### Check Entitlements
```javascript
const isPro = revenueCatService.isProUser();
console.log('Is Pro User:', isPro);
```

---

## What Happens in Production

### Before App Review
1. Complete all setup above
2. Test thoroughly with sandbox
3. Update Terms of Use and Privacy Policy URLs
4. Create screenshots for App Store
5. Prepare app for submission

### App Review Process
1. Submit app with in-app purchases
2. Provide test account (sandbox) to Apple
3. Apple reviews subscription flow
4. Usually approved within 1-3 days

### After Approval
1. Subscriptions go live
2. Users can purchase with real money
3. Monitor RevenueCat dashboard for analytics
4. Track conversion rates, churn, MRR

### Post-Launch Monitoring
- **RevenueCat Dashboard**: Track revenue, active subs, churn
- **App Store Connect**: View subscription analytics
- **Customer Support**: Handle refunds, restore issues
- **Webhooks**: Set up webhooks for real-time events

---

## Need Help?

### RevenueCat Support
- Documentation: https://docs.revenuecat.com
- Community: https://community.revenuecat.com
- Support: support@revenuecat.com

### Apple Support
- App Store Connect Help: https://help.apple.com/app-store-connect
- Developer Forums: https://developer.apple.com/forums

### Your Current Setup Summary

```
Bundle ID: com.today.panicrelief
Products: monthly ($14.99), yearly ($59.99)
Entitlement: pro
Offering: default
API Key: In src/config/revenuecat.ts (update with real key)
```

---

**Next Step**: Go to App Store Connect and create your subscription products following Step 1 above!

<function_calls>
<invoke name="Read">
<parameter name="file_path">/Users/romanahmed/Desktop/Today App/today-app/app.json