# Troubleshooting Guide

Quick solutions to common RevenueCat and in-app purchase issues.

---

## 🔍 Diagnostic First Steps

Before diving into specific issues, run these checks:

### 1. Verify Critical Configuration
```
✓ Bundle ID matches everywhere: com.today.panicrelief
✓ Product IDs are: monthly, yearly (lowercase, exact)
✓ Entitlement ID is: pro (lowercase, exact)
✓ Offering ID is: default
✓ API key starts with: appl_
```

### 2. Check Service Status
- [ ] App Store Connect is accessible
- [ ] RevenueCat Dashboard is accessible
- [ ] Device has internet connection
- [ ] No VPN blocking App Store

### 3. Check Timing
- [ ] Products created at least 2-4 hours ago?
- [ ] Subscriptions approved in App Store Connect?
- [ ] Waited after changes before testing?

---

## 💰 Issue: Pricing Shows $0.00

### Symptoms
- Paywall displays but prices show "$0.00"
- Or prices show but are missing
- Monthly/Yearly labels correct but amounts wrong

### Causes & Solutions

#### Cause 1: Products Not Synced Yet
**Time-based issue** - Most common for new setups

**Check:**
- When did you create products in App Store Connect?
- Has it been at least 2-4 hours?

**Solution:**
```
1. Note current time
2. Wait full 2-4 hours from product creation
3. Close and reopen app
4. Check RevenueCat Dashboard → Overview → Product Status
5. Should show "Available" not "Waiting"
```

#### Cause 2: Product IDs Don't Match
**Configuration mismatch**

**Check:**
```
App Store Connect → Your App → Subscriptions:
  Monthly Product ID: _____________ (must be "monthly")
  Yearly Product ID: _____________ (must be "yearly")

RevenueCat → Products:
  Monthly Identifier: _____________ (must be "monthly")
  Yearly Identifier: _____________ (must be "yearly")

Code → src/config/revenuecat.ts:
  Line 11: MONTHLY: 'monthly'
  Line 12: YEARLY: 'yearly'
```

**Solution:**
```
1. Find the mismatch
2. Update to match everywhere
3. If changing App Store: create new products
4. If changing RevenueCat: update product identifiers
5. If changing code: edit src/config/revenuecat.ts
6. Wait 2-4 hours after changes
7. Rebuild app
```

#### Cause 3: App Store Connect Not Connected
**RevenueCat can't fetch products**

**Check:**
```
RevenueCat → Apps → Your App → Edit
  - Is "App-Specific Shared Secret" field filled?
  - Does it show "Connected" status?
```

**Solution:**
```
1. Go to App Store Connect
2. Your App → General → App Information
3. Scroll to "App-Specific Shared Secret"
4. Click "Manage" → "Generate" (if empty)
5. Copy the secret
6. Go to RevenueCat → Apps → Your App → Edit
7. Paste secret in "App-Specific Shared Secret"
8. Save
9. Wait 2-4 hours
10. Check RevenueCat → Products → Should show "Synced"
```

#### Cause 4: Subscriptions Not Approved
**Apple hasn't approved your products**

**Check:**
```
App Store Connect → Your App → Subscriptions:
  Monthly status: _____________ (should be "Ready to Submit" or "Approved")
  Yearly status: _____________ (should be "Ready to Submit" or "Approved")
```

**Solution:**
```
1. If status is "Missing Metadata":
   - Add required screenshots
   - Fill in all descriptions
   - Submit for review

2. If status is "Waiting for Review":
   - Wait (usually 24 hours)
   - Can test in sandbox while waiting

3. If status is "Rejected":
   - Read rejection reason
   - Fix issues
   - Resubmit
```

---

## 📦 Issue: "No Offerings Available"

### Symptoms
- App shows loading spinner forever
- Error message: "No offerings available"
- Or paywall shows but no pricing cards

### Causes & Solutions

#### Cause 1: Offering Not Marked as Current
**Most common** - Offering exists but not active

**Check:**
```
RevenueCat → Offerings → default
  - Is toggle "Current" switched ON?
  - Does it show "Current Offering" badge?
```

**Solution:**
```
1. RevenueCat → Offerings
2. Click on "default"
3. Toggle "Current" to ON (top right)
4. Verify badge appears
5. Close and reopen app
6. Should now load offerings
```

#### Cause 2: No Packages in Offering
**Offering exists but empty**

**Check:**
```
RevenueCat → Offerings → default → Packages
  - Should have "monthly" package
  - Should have "yearly" package
  - Each should link to a product
```

**Solution:**
```
1. RevenueCat → Offerings → default
2. Click "+ Add Package"
3. Create monthly:
   - Identifier: monthly
   - Product: monthly
4. Click "+ Add Package"
5. Create yearly:
   - Identifier: yearly
   - Product: yearly
6. Verify both appear
7. Rebuild and test app
```

#### Cause 3: Wrong API Key
**App can't authenticate with RevenueCat**

**Check:**
```
1. Open src/config/revenuecat.ts
2. Line 2: apiKey value
3. Should start with "appl_" not "test_"
4. Should be 30+ characters

RevenueCat → API Keys:
  - Find iOS app key
  - Click "Show"
  - Does it match code exactly?
```

**Solution:**
```
1. RevenueCat → Project Settings → API Keys
2. Under "Public app-specific API keys"
3. Find iOS app (com.today.panicrelief)
4. Click "Show" → Copy key
5. Open src/config/revenuecat.ts
6. Replace line 2:
   apiKey: 'paste_key_here',
7. Save file
8. Rebuild app completely (npm start)
9. Test again
```

#### Cause 4: Network/RevenueCat Service Issue
**Temporary connectivity problem**

**Check:**
```
1. Device has internet?
2. Can access revenuecat.com in browser?
3. Check RevenueCat status: https://status.revenuecat.com
```

**Solution:**
```
1. Check device WiFi/cellular
2. Disable VPN if using one
3. Try different network
4. Check RevenueCat service status
5. Wait 10 minutes and retry
```

---

## ❌ Issue: Purchase Fails

### Symptoms
- Tap Subscribe → Error dialog
- "Cannot Connect to iTunes Store"
- "Purchase Failed"
- Payment sheet doesn't appear

### Causes & Solutions

#### Cause 1: Testing on Simulator
**Simulators cannot make purchases**

**Check:**
```
Are you testing on:
  [ ] iOS Simulator (Mac)
  [ ] Physical iPhone/iPad
```

**Solution:**
```
❌ iOS Simulator - WILL NOT WORK for purchases
✅ Physical Device - REQUIRED

Steps:
1. Connect iPhone/iPad via USB
2. Trust computer if prompted
3. npm start → i → Select your device
4. App installs on device
5. Test purchase on device
```

#### Cause 2: Signed Into Regular Apple ID
**Must be signed OUT for sandbox testing**

**Check:**
```
On device: Settings → App Store
  - What does it show at top?
  - [ ] "Sign In" ✓ Correct
  - [ ] Your name ✗ Wrong - sign out first
```

**Solution:**
```
1. Settings → App Store
2. Tap your name (if signed in)
3. Scroll down → "Sign Out"
4. Confirm sign out
5. Do NOT sign back in
6. Close Settings
7. Launch app
8. Try purchase
9. Payment sheet will ask for credentials
10. Enter SANDBOX account email/password
```

#### Cause 3: Sandbox Account Issues
**Sandbox account not working**

**Check:**
```
App Store Connect → Users and Access → Sandbox
  - Does your test account exist?
  - Email: _________________
  - Territory: United States?
  - Verified email?
```

**Solution:**
```
If account doesn't exist:
  1. Create new sandbox tester
  2. Use UNIQUE email (never used for Apple ID)
  3. Save credentials
  4. Try again

If account exists but fails:
  1. Delete old sandbox account
  2. Create new one with different email
  3. Use new credentials
  4. Try again
```

#### Cause 4: Agreements Not Signed
**App Store Connect agreements incomplete**

**Check:**
```
App Store Connect → Agreements, Tax, and Banking
  - Paid Apps agreement: [ ] Accepted?
  - Tax forms: [ ] Completed?
  - Banking: [ ] Added?
```

**Solution:**
```
1. Accept all agreements (even for sandbox!)
2. Complete tax information
3. Add banking info (required even for testing)
4. Wait 24 hours for processing
5. Try purchase again
```

#### Cause 5: Product Not Available
**Product exists but not purchasable**

**Check:**
```
App Store Connect → Subscriptions:
  - Monthly status: _____________
  - Yearly status: _____________
  - Both should be "Ready to Submit" or "Approved"
```

**Solution:**
```
1. If "Missing Metadata":
   - Add screenshots
   - Complete all fields
   - Submit for review

2. If "Rejected":
   - Read rejection notes
   - Fix issues
   - Resubmit

3. If "Waiting for Review":
   - Wait (usually 24 hours)
   - Can test in sandbox while waiting
```

---

## 🔄 Issue: Restore Purchases Fails

### Symptoms
- Tap "Restore Purchases"
- Shows "No purchases found"
- But you did purchase with sandbox account

### Causes & Solutions

#### Cause 1: Never Purchased
**No purchase history exists**

**Check:**
```
1. Did you complete a purchase?
2. Did payment sheet show "[Sandbox]"?
3. Did app navigate after purchase?
4. RevenueCat → Customers → See any transactions?
```

**Solution:**
```
1. Complete a purchase first
2. Use sandbox account
3. Verify purchase succeeds
4. Then try restore
```

#### Cause 2: Different Apple ID
**Restoring with different account than purchased**

**Check:**
```
Purchase account: _________________
Restore account: _________________
  - Must be SAME sandbox account
```

**Solution:**
```
1. Remember which sandbox account you used to purchase
2. Sign out of App Store
3. When restoring, use SAME sandbox credentials
4. Should find previous purchase
```

#### Cause 3: Entitlement Name Mismatch
**Code looking for wrong entitlement**

**Check:**
```
RevenueCat → Entitlements:
  - Name: _____________ (must be "pro")

Code → src/config/revenuecat.ts line 7:
  - PRO: 'pro'
  - Must match exactly (case-sensitive)
```

**Solution:**
```
1. If RevenueCat shows different name:
   - Change entitlement ID to "pro"
   - Or update code to match

2. If code shows different:
   - Update src/config/revenuecat.ts line 7
   - Change to: PRO: 'pro',
   - Rebuild app
```

#### Cause 4: Purchase Not Synced Yet
**RevenueCat hasn't received purchase yet**

**Check:**
```
- Did purchase just happen (< 1 minute ago)?
- Any network issues?
```

**Solution:**
```
1. Wait 1-2 minutes after purchase
2. Ensure device has internet
3. Try restore again
4. Check RevenueCat dashboard → Customers
5. Should see transaction appear
```

---

## 💥 Issue: App Crashes on Purchase

### Symptoms
- Tap Subscribe → App crashes
- Console shows error logs
- App force quits

### Causes & Solutions

#### Cause 1: RevenueCat Not Initialized
**SDK not set up before use**

**Check Console Logs:**
```
Look for:
  "RevenueCat configured"
  OR
  "RevenueCat not configured"

Check src/contexts/SubscriptionContext.tsx:
  - Does it initialize RevenueCat?
  - Is API key valid?
```

**Solution:**
```
1. Verify API key in src/config/revenuecat.ts
2. Check that SubscriptionContext wraps your app
3. Look at App.tsx or root component
4. Should have:
   <SubscriptionProvider>
     <YourApp />
   </SubscriptionProvider>
5. Rebuild app
```

#### Cause 2: Bundle ID Mismatch
**App's bundle doesn't match RevenueCat config**

**Check:**
```
Xcode → Project → General → Bundle Identifier:
  Value: _________________

RevenueCat → Apps → Your App:
  Bundle ID: _________________

Must match exactly: com.today.panicrelief
```

**Solution:**
```
1. Check bundle ID in all three places:
   - Xcode project settings
   - App Store Connect → App Info
   - RevenueCat → Apps
2. Update to match: com.today.panicrelief
3. Rebuild app
4. Test again
```

#### Cause 3: Code Error in Purchase Handler
**Bug in purchase flow**

**Check Console:**
```
Look for JavaScript errors:
  - TypeError
  - Cannot read property
  - Undefined is not an object
```

**Solution:**
```
1. Check src/screens/onboarding/PaywallScreen.tsx
2. Look at handlePurchase function (line 80)
3. Verify purchasePackage is defined
4. Check that selectedPackageId is valid
5. If unsure, check git to restore original code
```

---

## 🌍 Issue: Wrong Currency Displayed

### Symptoms
- Prices show in euros (€) or pounds (£) instead of dollars ($)
- Amounts are correct but currency symbol wrong

### Causes & Solutions

#### Cause 1: Device Region
**Device set to different country**

**Check:**
```
Device: Settings → General → Language & Region
  Region: _____________ (should be "United States")
```

**Solution:**
```
1. Settings → General → Language & Region
2. Tap "Region"
3. Select "United States"
4. Restart app
5. Prices should show in USD
```

#### Cause 2: Sandbox Account Region
**Test account set to different territory**

**Check:**
```
App Store Connect → Sandbox → Your test account
  App Store Territory: _____________
```

**Solution:**
```
1. App Store Connect → Users and Access → Sandbox
2. Find your test account
3. Edit → Change territory to "United States"
4. Save
5. Delete app, reinstall, test again
```

#### Cause 3: Pricing Not Set for US
**Product only has pricing for other countries**

**Check:**
```
App Store Connect → Subscriptions → Monthly/Yearly → Pricing
  - Is United States in the list?
  - Does it show $14.99 / $59.99?
```

**Solution:**
```
1. Edit subscription
2. Click "Add Subscription Pricing"
3. Select "United States"
4. Enter price: $14.99 (monthly) or $59.99 (yearly)
5. Save
6. Wait 2-4 hours for sync
7. Test again
```

---

## 🐛 Debugging Tools

### RevenueCat Dashboard Debugger

**Location:** RevenueCat → Overview → Customer Lookup

**Use:**
```
1. Enter sandbox account email
2. Click "Search"
3. View:
   - All purchases
   - Active entitlements
   - Subscription status
   - Products owned
```

### Check Product Entitlement Mapping

**Location:** RevenueCat → Overview → Debug

**Use:**
```
1. Shows how products map to entitlements
2. Verify:
   - monthly → pro ✓
   - yearly → pro ✓
3. If broken, rebuild entitlement
```

### Device Console Logs

**For iOS Device:**
```
1. Connect device via USB
2. Open Xcode
3. Window → Devices and Simulators
4. Select your device
5. Click "Open Console"
6. Filter for:
   - "RevenueCat"
   - "StoreKit"
   - "Purchase"
7. Reproduce issue
8. Read error messages
```

### Test API Key

**Quick test in terminal:**
```bash
curl -X GET "https://api.revenuecat.com/v1/subscribers/test" \
  -H "Authorization: Bearer appl_YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json"

# Should return error (subscriber not found) but NOT "invalid API key"
# If says "invalid API key" → Wrong key!
```

---

## 📋 Pre-Test Checklist

Before reporting an issue, verify:

### Configuration
- [ ] Bundle ID matches everywhere: `com.today.panicrelief`
- [ ] Product IDs are: `monthly`, `yearly`
- [ ] Entitlement ID is: `pro`
- [ ] API key starts with: `appl_`
- [ ] API key is in code (not placeholder)

### Apple Setup
- [ ] Apple Developer account active
- [ ] App created in App Store Connect
- [ ] Products created with correct IDs
- [ ] Products submitted for review
- [ ] Sandbox account created
- [ ] Agreements signed
- [ ] Tax and banking completed

### RevenueCat Setup
- [ ] Account created
- [ ] App added with correct bundle
- [ ] Products created (monthly, yearly)
- [ ] Entitlement created (pro)
- [ ] Products attached to entitlement
- [ ] Offering created (default)
- [ ] Packages in offering
- [ ] Offering is "Current"

### Testing Setup
- [ ] Using physical device (not simulator)
- [ ] Signed OUT of App Store
- [ ] Sandbox account credentials known
- [ ] Internet connection active
- [ ] Waited 2-4 hours after product creation

---

## 🆘 Still Stuck?

### 1. Check Recent Changes
- What did you change last?
- Can you undo it and test?
- Did it work before the change?

### 2. Start Fresh
```
1. Delete app from device
2. Sign out of App Store
3. Restart device
4. Rebuild app: npm start
5. Reinstall on device
6. Test from beginning
```

### 3. Compare Configuration
```
Use CONFIG_CHECKLIST.md:
  - Go through each checkbox
  - Verify every single step
  - Don't skip anything
```

### 4. Check Sample Project
```
RevenueCat has official sample apps:
  - GitHub: revenuecat/purchases-ios
  - Compare your setup to theirs
  - Look for differences
```

### 5. Get Help
```
RevenueCat Community:
  - https://community.revenuecat.com
  - Search for your error
  - Post your issue with:
    ✓ What you're trying to do
    ✓ What's happening instead
    ✓ Error messages (exact text)
    ✓ Steps you've tried
    ✓ Console logs

RevenueCat Support:
  - support@revenuecat.com
  - Include app ID, bundle ID
  - Describe issue clearly

Apple Developer Forums:
  - https://developer.apple.com/forums
  - For App Store Connect issues
```

---

## 🔧 Emergency Reset

If everything is broken and you want to start over:

### RevenueCat Reset
```
1. RevenueCat → Apps → Delete app
2. Delete all products
3. Delete all entitlements
4. Delete all offerings
5. Start from STEP 3 in IMPLEMENTATION_GUIDE.md
```

### App Store Connect Reset
```
1. Can't delete subscriptions (Apple doesn't allow)
2. Instead: Create NEW products with different IDs
3. Example: monthly_v2, yearly_v2
4. Update code to match new IDs
5. Update RevenueCat to match new IDs
```

### Code Reset
```
git status
git diff src/config/revenuecat.ts

# If you have changes you want to keep:
git stash

# Restore original:
git checkout HEAD -- src/config/revenuecat.ts

# Then re-apply your API key
```

---

**Remember: Most issues are configuration mismatches. Double-check that all IDs match exactly everywhere!**
