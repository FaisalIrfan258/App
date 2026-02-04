# Configuration Quick Reference Card

Print this or keep it open while configuring!

---

## ⚡ Must-Know Values

```
Bundle ID:           com.today.panicrelief
Monthly Product:     monthly
Yearly Product:      yearly
Entitlement:         pro
Offering:            default
Monthly Price:       $14.99
Yearly Price:        $59.99
```

**These MUST match everywhere!**

---

## 📋 Setup Order

```
Day 1
├─ 1. Enroll Apple Developer ($99/year)
└─ 2. WAIT 24-48 hours ⏳

Day 2-3 (after Apple approval)
├─ 3. Create app in App Store Connect
├─ 4. Create subscriptions (monthly, yearly)
├─ 5. Create sandbox test account
├─ 6. Configure RevenueCat
├─ 7. Add API key to code
└─ 8. WAIT 2-4 hours for sync ⏳

Day 3-4 (after product sync)
└─ 9. Test on physical device
```

---

## 📝 File Changes Required

### File 1: `src/config/revenuecat.ts` (Line 4)
```typescript
// BEFORE
apiKey: process.env.REVENUECAT_API_KEY || 'test_VAgCumvulhWoUwVSTsYSdxXkTqR',

// AFTER
apiKey: 'appl_YOUR_KEY_FROM_REVENUECAT',
```

**Get key from:** https://app.revenuecat.com → API Keys → iOS Public Key

---

### File 2: `src/screens/onboarding/PaywallScreen.tsx` (Lines 242, 246)
```typescript
// BEFORE
Linking.openURL('https://yourwebsite.com/terms')
Linking.openURL('https://yourwebsite.com/privacy')

// AFTER
Linking.openURL('https://yourdomain.com/your-terms-page')
Linking.openURL('https://yourdomain.com/your-privacy-page')
```

**Can wait until App Store submission**

---

## 🎯 App Store Connect Setup

### Products to Create

**Monthly Subscription:**
```
Product ID:      monthly          ⚠️ EXACT
Duration:        1 Month
Price:           $14.99 (United States)
Display Name:    Monthly Plan
```

**Yearly Subscription:**
```
Product ID:      yearly           ⚠️ EXACT
Duration:        1 Year
Price:           $59.99 (United States)
Display Name:    Yearly Plan
```

### Sandbox Tester
```
First Name:      Test
Last Name:       User
Email:           test-today@yourdomain.com  (must be unique!)
Password:        [write it down!]
Territory:       United States
```

---

## 🔧 RevenueCat Setup

### Products
```
1. monthly
   - Type: Subscription
   - Store: App Store
   - Store Product ID: monthly

2. yearly
   - Type: Subscription
   - Store: App Store
   - Store Product ID: yearly
```

### Entitlement
```
ID: pro                           ⚠️ EXACT (lowercase)
Attached Products: monthly, yearly
```

### Offering
```
ID: default                       ⚠️ EXACT
Packages:
  - monthly → monthly product
  - yearly → yearly product
Current: ON                       ⚠️ MUST BE ON
```

---

## ✅ Pre-Test Checklist

**Device Prep:**
- [ ] Using iPhone/iPad (NOT simulator)
- [ ] Signed OUT of App Store (Settings → App Store → Sign Out)
- [ ] Device connected via USB
- [ ] Internet connection active

**Configuration:**
- [ ] API key updated in code
- [ ] Product IDs match everywhere
- [ ] Waited 2-4 hours after creating products
- [ ] RevenueCat offering marked "Current"

**Accounts:**
- [ ] Apple Developer account active
- [ ] Sandbox test account created
- [ ] Have sandbox credentials written down

---

## 🧪 Test Flow

```
1. Build app on device (npm start → i)
2. Navigate to paywall
3. Verify pricing: $14.99 and $59.99 ✓
4. Tap Subscribe Now
5. Sign in with SANDBOX account
6. Verify "[Sandbox]" in payment sheet ✓
7. Complete purchase
8. App navigates to UserInfo ✓
9. Delete app
10. Reinstall app
11. Tap Restore Purchases
12. Sign in with SAME sandbox account
13. Subscription restored ✓
```

---

## 🚨 Common Mistakes

### ❌ Wrong Product IDs
```
✗ Monthly, MONTHLY, month, m
✓ monthly (lowercase, exact)

✗ Yearly, YEARLY, year, y
✓ yearly (lowercase, exact)
```

### ❌ Wrong Entitlement
```
✗ Pro, PRO, premium, Premium
✓ pro (lowercase, exact)
```

### ❌ Testing Wrong
```
✗ Using iOS Simulator
✓ Using physical iPhone/iPad

✗ Signed into App Store
✓ Signed OUT of App Store

✗ Using real Apple ID
✓ Using sandbox test account
```

### ❌ Timing Issues
```
✗ Testing immediately after creating products
✓ Waiting 2-4 hours for Apple sync

✗ Expecting instant approval
✓ Waiting 24-48 hours for Apple Developer approval
```

---

## 💰 Pricing Display

**What Users See:**

```
┌─────────────────────┐  ┌─────────────────────┐
│ Monthly             │  │ Yearly    [SAVE 67%]│
│                     │  │                     │
│ $14.99              │  │ $4.99               │
│ per month           │  │ per month           │
│                     │  │                     │
│                     │  │ Billed as $59.99/yr │
└─────────────────────┘  └─────────────────────┘
```

**If shows $0.00:** Wait for product sync!

---

## 🔍 Verification Commands

### Check Product IDs
```bash
# In code
grep "MONTHLY\|YEARLY" src/config/revenuecat.ts
# Should show: MONTHLY: 'monthly', YEARLY: 'yearly'

# Check entitlement
grep "PRO:" src/config/revenuecat.ts
# Should show: PRO: 'pro'
```

### Test API Key Format
```bash
# Check API key
grep "apiKey:" src/config/revenuecat.ts
# Should start with: appl_ (not test_)
```

---

## 📞 Quick Help

### Pricing Shows $0.00
→ Wait 2-4 hours for sync
→ Check product IDs match
→ Verify RevenueCat connection

### "No Offerings Available"
→ Check offering is "Current"
→ Verify API key correct
→ Check packages exist in offering

### Purchase Fails
→ Use physical device (not simulator)
→ Sign OUT of App Store first
→ Use sandbox credentials

### Restore Fails
→ Use SAME sandbox account
→ Verify purchase completed first
→ Check entitlement is "pro"

**Full solutions:** `TROUBLESHOOTING.md`

---

## 🎯 Success Indicators

**You're ready when you see:**

✅ Paywall displays with purple gradient
✅ Pricing: $14.99/month and $59.99/year
✅ "SAVE 67%" badge on yearly
✅ Purchase completes successfully
✅ App navigates after purchase
✅ Restore works after reinstall
✅ Transaction in RevenueCat dashboard

---

## 📚 Documentation Files

```
README_REVENUECAT.md          ← Overview & what's included
QUICK_START.md                ← Quick summary & checklist
IMPLEMENTATION_GUIDE.md       ← Full step-by-step (READ THIS!)
CONFIG_CHECKLIST.md           ← Track progress checkbox by checkbox
TROUBLESHOOTING.md            ← Solutions to common problems
CONFIGURATION_REFERENCE.md    ← This file (quick reference)
```

---

## 🔗 Important URLs

```
App Store Connect:
https://appstoreconnect.apple.com

RevenueCat Dashboard:
https://app.revenuecat.com

Apple Developer:
https://developer.apple.com/account

RevenueCat Docs:
https://docs.revenuecat.com
```

---

## 📊 Write-Down Section

Use this space to record your credentials:

```
APPLE DEVELOPER
Email:     _________________________________
Password:  _________________________________


SANDBOX TEST ACCOUNT
Email:     _________________________________
Password:  _________________________________


REVENUECAT
Email:     _________________________________
Password:  _________________________________


API KEY (starts with appl_)
Key:       _________________________________
           _________________________________


APP STORE CONNECT SHARED SECRET
Secret:    _________________________________
           _________________________________
```

---

## ⏱️ Timeline Tracker

Use this to track your progress:

```
Day 1
[ ] Enrolled in Apple Developer Program
[ ] Time: ________  Date: ________
[ ] Waiting for approval...


Day 2-3
[ ] Apple approval received
[ ] Time: ________  Date: ________
[ ] App created in App Store Connect
[ ] Subscriptions created (monthly, yearly)
[ ] Sandbox account created
[ ] RevenueCat configured
[ ] API key added to code
[ ] Waiting 2-4 hours for sync...
[ ] Start wait time: ________


Day 3-4
[ ] Products synced (2-4 hours passed)
[ ] Built app on device
[ ] Pricing shows correctly
[ ] Purchase test passed
[ ] Restore test passed
[ ] Ready for production! 🎉
```

---

**Keep this handy while configuring!**

**For full details → `IMPLEMENTATION_GUIDE.md`**
