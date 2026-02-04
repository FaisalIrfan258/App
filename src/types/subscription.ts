import Purchases, { CustomerInfo, PurchasesOfferings } from 'react-native-purchases';

export interface SubscriptionContextType {
  // State
  isProUser: boolean;
  customerInfo: CustomerInfo | null;
  offerings: PurchasesOfferings | null;
  isLoading: boolean;
  error: string | null;

  // Methods
  purchasePackage: (packageId: string) => Promise<PurchaseResult>;
  restorePurchases: () => Promise<void>;
  refreshCustomerInfo: () => Promise<void>;
  checkEntitlement: (entitlementId: string) => boolean;
}

export interface PurchaseResult {
  success: boolean;
  customerInfo?: CustomerInfo;
  error?: string;
  userCancelled?: boolean;
}

export enum SubscriptionStatus {
  NONE = 'none',
  TRIAL = 'trial',
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  description: string;
  isPopular?: boolean;
}
