# Quick Start Guide - RevenueCat Setup

## TL;DR - What You Need to Do

Your paywall is already built! Just configure these backend services:

1. **Get Apple Developer Account** → $99/year, wait 24-48 hours
2. **Create products in App Store Connect** → 20 minutes
3. **Configure RevenueCat** → 15 minutes
4. **Update API key in code** → 2 minutes
5. **Test on physical device** → 15 minutes

**Total active work:** ~1 hour
**Total time:** 2-4 days (waiting for Apple)

---

## Critical Values - MUST MATCH EVERYWHERE

| What | Value | ⚠️ Must Match In |
|------|-------|------------------|
| Monthly Product ID | `monthly` | App Store Connect, RevenueCat, Code |
| Yearly Product ID | `yearly` | App Store Connect, RevenueCat, Code |
| Entitlement ID | `pro` | RevenueCat, Code |
| Offering ID | `default` | RevenueCat |
| Bundle ID | `com.today.panicrelief` | App Store, RevenueCat, Xcode |
| Monthly Price | $14.99/month | App Store Connect |
| Yearly Price | $59.99/year | App Store Connect |

**If these don't match → Nothing will work!**

---

## Quick Checklist

### Setup (Do Once)
- [ ] Apple Developer Account enrolled ($99/year)
- [ ] App created in App Store Connect
- [ ] Monthly subscription: ID `monthly`, price $14.99
- [ ] Yearly subscription: ID `yearly`, price $59.99
- [ ] Sandbox test account created
- [ ] RevenueCat account created
- [ ] iOS app added to RevenueCat (bundle: `com.today.panicrelief`)
- [ ] Products added: `monthly` and `yearly`
- [ ] Entitlement created: `pro`
- [ ] Both products attached to `pro`
- [ ] Offering created: `default` with both packages
- [ ] Offering marked as "Current"
- [ ] API key copied from RevenueCat

### Code Updates (2 minutes)
- [ ] Update `src/config/revenuecat.ts` with real API key
- [ ] Update legal URLs in `src/screens/onboarding/PaywallScreen.tsx` (lines 241, 245)

### Wait (2-4 hours)
- [ ] Products synced from App Store to RevenueCat
- [ ] Pricing shows real values in app (not $0.00)

### Testing (Physical Device Required!)
- [ ] Sign out of App Store on device
- [ ] App builds and runs
- [ ] Paywall displays correctly
- [ ] Pricing shows $14.99 and $59.99
- [ ] Can select plans
- [ ] Purchase works with sandbox account
- [ ] Navigates to UserInfo after purchase
- [ ] Restore purchases works after reinstall
- [ ] RevenueCat dashboard shows transaction

---

## Common Problems

### Problem: Pricing Shows $0.00
**Solution:** Wait 2-4 hours for App Store product sync

### Problem: "No Offerings Available"
**Solution:** Check RevenueCat → Offerings → Mark `default` as "Current"

### Problem: Purchase Fails
**Solution:** Must use physical device + sign out of App Store first

### Problem: Wrong API Key
**Solution:** RevenueCat → API Keys → Copy iOS key (starts with `appl_`)

---

## File Locations

**Configuration files you need to edit:**
- `src/config/revenuecat.ts` - Add API key (line 2)
- `src/screens/onboarding/PaywallScreen.tsx` - Legal URLs (lines 241, 245)

**Already implemented (don't touch):**
- `src/screens/onboarding/PaywallScreen.tsx` - Paywall UI
- `src/components/onboarding/PricingCard.tsx` - Pricing cards
- `src/contexts/SubscriptionContext.tsx` - Purchase logic
- `src/services/revenueCatService.ts` - RevenueCat wrapper

---

## Testing Must-Haves

### Before Testing
1. Signed OUT of App Store (Settings → App Store → Sign Out)
2. Using physical iPhone/iPad (simulator can't purchase!)
3. Waited 2-4 hours after creating products

### During Testing
1. Use sandbox account when prompted
2. Verify "[Sandbox]" shows in payment sheet
3. Check that pricing is correct ($14.99, $59.99)

### After Purchase
1. Should navigate to UserInfo screen
2. Check RevenueCat dashboard → Customers
3. Should see your test user with active subscription

---

## Next Steps After Testing

Once everything works:

1. **Prepare for App Store:**
   - Add screenshots
   - Write description
   - Set app info

2. **Build Production:**
   ```bash
   npx expo build:ios
   # or
   eas build --platform ios
   ```

3. **Submit for Review:**
   - Upload to App Store Connect
   - Provide demo account (sandbox credentials)
   - Submit

4. **Monitor Launch:**
   - Watch RevenueCat dashboard
   - Track conversions
   - Respond to reviews

---

## Resources

- **Full Guide:** `IMPLEMENTATION_GUIDE.md` - Complete step-by-step
- **RevenueCat Dashboard:** https://app.revenuecat.com
- **App Store Connect:** https://appstoreconnect.apple.com
- **Apple Developer:** https://developer.apple.com/account

---

## Cost Summary

**To Launch:**
- Apple Developer: $99/year
- RevenueCat: FREE until $10K/month revenue

**After Launch:**
- Apple takes 30% (year 1) or 15% (year 2+)
- RevenueCat FREE until 170 yearly subscribers

**Example (100 yearly subs):**
- Revenue: $5,990
- RevenueCat: $0
- Apple (30%): $1,797
- **You keep: $4,193**

---

**Full details in `IMPLEMENTATION_GUIDE.md` →**
