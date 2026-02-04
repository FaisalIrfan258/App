export const revenueCatConfig = {
  // TODO: Replace with your actual RevenueCat API key from https://app.revenuecat.com
  // Get it from: RevenueCat Dashboard → API Keys → iOS Public Key (starts with appl_)
  apiKey: process.env.REVENUECAT_API_KEY || 'test_VAgCumvulhWoUwVSTsYSdxXkTqR',
  observerMode: false,
};

export const ENTITLEMENTS = {
  PRO: 'pro', // Must match RevenueCat entitlement identifier
} as const;

export const PRODUCT_IDS = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;
