import Purchases, {
  CustomerInfo,
  PurchasesOfferings,
  PurchasesPackage,
  LOG_LEVEL,
} from 'react-native-purchases';
import { Platform } from 'react-native';
import { revenueCatConfig, ENTITLEMENTS } from '../config/revenuecat';
import { PurchaseResult } from '../types/subscription';

class RevenueCatService {
  private isInitialized = false;
  private customerInfo: CustomerInfo | null = null;

  /**
   * Initialize RevenueCat SDK
   * Should be called once on app startup
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Enable debug logs in development
      if (__DEV__) {
        Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      }

      // Configure SDK
      Purchases.configure({
        apiKey: revenueCatConfig.apiKey,
      });

      // Set up customer info update listener
      Purchases.addCustomerInfoUpdateListener((info) => {
        this.customerInfo = info;
      });

      // Get initial customer info
      this.customerInfo = await Purchases.getCustomerInfo();

      this.isInitialized = true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get available offerings (products)
   */
  async getOfferings(): Promise<PurchasesOfferings | null> {
    try {
      const offerings = await Purchases.getOfferings();
      return offerings;
    } catch (error) {
      return null;
    }
  }

  /**
   * Purchase a package
   */
  async purchasePackage(pkg: PurchasesPackage): Promise<PurchaseResult> {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      this.customerInfo = customerInfo;

      return {
        success: true,
        customerInfo,
      };
    } catch (error: any) {
      // Handle user cancellation
      if (error.userCancelled) {
        return {
          success: false,
          userCancelled: true,
        };
      }

      return {
        success: false,
        error: error.message || 'Purchase failed',
      };
    }
  }

  /**
   * Restore previous purchases
   */
  async restorePurchases(): Promise<CustomerInfo> {
    try {
      const customerInfo = await Purchases.restorePurchases();
      this.customerInfo = customerInfo;
      return customerInfo;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current customer info
   */
  async getCustomerInfo(): Promise<CustomerInfo> {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      this.customerInfo = customerInfo;
      return customerInfo;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if user has active entitlement
   */
  isEntitled(entitlementId: string): boolean {
    if (!this.customerInfo) {
      return false;
    }

    const entitlement = this.customerInfo.entitlements.active[entitlementId];
    return entitlement?.isActive === true;
  }

  /**
   * Check if user is Today Pro member
   */
  isProUser(): boolean {
    return this.isEntitled(ENTITLEMENTS.PRO);
  }

  /**
   * Get cached customer info
   */
  getCachedCustomerInfo(): CustomerInfo | null {
    return this.customerInfo;
  }
}

// Export singleton instance
export const revenueCatService = new RevenueCatService();
