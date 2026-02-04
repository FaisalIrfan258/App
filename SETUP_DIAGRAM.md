# RevenueCat Setup Visual Flow

## How It All Connects

```
┌─────────────────────────────────────────────────────────────────┐
│                     APP STORE CONNECT                            │
│  (Where you create products and set pricing)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Subscription Group: "Today Premium Membership"                 │
│  ├─ Product ID: "monthly"     → Price: $14.99/month            │
│  └─ Product ID: "yearly"      → Price: $59.99/year             │
│                                                                  │
│  Bundle ID: com.today.panicrelief                               │
│                                                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Products sync automatically
                         │ (via API key connection)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     REVENUECAT DASHBOARD                         │
│  (Where you organize products into offerings)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Products:                                                       │
│  ├─ monthly (App Store) ──┐                                     │
│  └─ yearly (App Store) ───┤                                     │
│                            │                                     │
│  Entitlement: "pro" <──────┴─ Both products attached            │
│                                                                  │
│  Offering: "default" (Current)                                  │
│  ├─ Package: "monthly"  → Product: monthly                      │
│  └─ Package: "yearly"   → Product: yearly                       │
│                                                                  │
│  API Key: appl_XXXXXXXXXXXX                                     │
│                                                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ API key in your code
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      YOUR APP CODE                               │
│  src/config/revenuecat.ts                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  apiKey: 'appl_XXXXXXXXXXXX'  ← Paste from RevenueCat          │
│  entitlement: 'pro'            ← Must match RevenueCat          │
│  products: ['monthly', 'yearly'] ← Must match App Store         │
│                                                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ At runtime
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PAYWALL SCREEN                              │
│  (What users see in your app)                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. App calls: revenueCatService.getOfferings()                 │
│  2. RevenueCat SDK fetches offering "default"                   │
│  3. RevenueCat returns packages with real pricing:              │
│     - monthly: $14.99/month                                     │
│     - yearly: $59.99/year                                       │
│  4. PaywallScreen displays pricing cards                        │
│  5. User taps "Subscribe Now"                                   │
│  6. RevenueCat SDK handles purchase with Apple                  │
│  7. On success, user gets "pro" entitlement                     │
│  8. App navigates to next screen                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Step-by-Step Setup Order

```
1. APP STORE CONNECT
   ↓
   Create subscription group
   ↓
   Create product: "monthly" ($14.99/month)
   ↓
   Create product: "yearly" ($59.99/year)
   ↓
   Create sandbox test account

2. REVENUECAT DASHBOARD
   ↓
   Add app (bundle: com.today.panicrelief)
   ↓
   Connect to App Store (API key)
   ↓
   Add products: "monthly" and "yearly"
   ↓
   Create entitlement: "pro"
   ↓
   Attach both products to "pro"
   ↓
   Create offering: "default"
   ↓
   Add packages: "monthly" and "yearly"
   ↓
   Mark "default" as current
   ↓
   Copy iOS API key

3. YOUR APP CODE
   ↓
   Update src/config/revenuecat.ts
   ↓
   Paste API key
   ↓
   Build and run app

4. TESTING
   ↓
   Open app on physical device
   ↓
   Navigate to paywall
   ↓
   Verify pricing loads
   ↓
   Test purchase with sandbox account
   ↓
   Verify subscription in Settings
```

## Product ID Mapping

**Everything must use the same IDs:**

| Location              | Monthly ID | Yearly ID | Entitlement |
|-----------------------|-----------|-----------|-------------|
| App Store Connect    | `monthly` | `yearly`  | N/A         |
| RevenueCat Products  | `monthly` | `yearly`  | N/A         |
| RevenueCat Entitlement| N/A      | N/A       | `pro`       |
| RevenueCat Packages  | `monthly` | `yearly`  | N/A         |
| Your Code (config)   | `monthly` | `yearly`  | `pro`       |
| Your Code (paywall)  | Uses package IDs from RevenueCat  |

## Data Flow During Purchase

```
User taps "Subscribe Now"
        ↓
PaywallScreen.handlePurchase()
        ↓
SubscriptionContext.purchasePackage("yearly")
        ↓
revenueCatService.purchasePackage(yearlyPackage)
        ↓
RevenueCat SDK → Apple StoreKit
        ↓
Apple processes payment (sandbox = instant)
        ↓
Apple confirms purchase
        ↓
RevenueCat receives webhook from Apple
        ↓
RevenueCat grants "pro" entitlement
        ↓
RevenueCat returns CustomerInfo
        ↓
revenueCatService.isProUser() → true
        ↓
App navigates to UserInfo screen
```

## Why Your Current ID "prod1efe8d4dd7" Won't Work

The ID you see (`prod1efe8d4dd7`) is likely:
- An auto-generated product ID from RevenueCat, OR
- A test product ID that doesn't exist in App Store Connect

**Problem**: RevenueCat can't fetch pricing for products that don't exist in App Store Connect.

**Solution**:
1. Create real products in App Store Connect with IDs: `monthly` and `yearly`
2. Add those exact product IDs to RevenueCat
3. RevenueCat will sync pricing automatically

## What Happens After Proper Setup

### Before Setup (Current State)
```
App requests offerings
  ↓
RevenueCat looks for "prod1efe8d4dd7"
  ↓
App Store Connect: "Product not found"
  ↓
RevenueCat returns no pricing
  ↓
Paywall shows $0.00 or loading forever
```

### After Setup (Target State)
```
App requests offerings
  ↓
RevenueCat looks for "monthly" and "yearly"
  ↓
App Store Connect: "Found! $14.99 and $59.99"
  ↓
RevenueCat returns real pricing
  ↓
Paywall shows $14.99 and $4.99/mo
  ↓
Purchase works correctly
```

## Summary

**The key point**:
- ✅ Pricing is set in App Store Connect
- ✅ RevenueCat reads that pricing
- ❌ You cannot set pricing in RevenueCat

**Your action items**:
1. Create products in App Store Connect
2. Use product IDs: `monthly` and `yearly`
3. Set prices: $14.99/month and $59.99/year
4. Connect to RevenueCat
5. Test and verify pricing loads correctly

---

See `REVENUECAT_SETUP_GUIDE.md` for detailed step-by-step instructions!
