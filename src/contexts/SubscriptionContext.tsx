import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode, useMemo } from 'react';
import { CustomerInfo, PurchasesOfferings, PurchasesPackage } from 'react-native-purchases';
import { revenueCatService } from '../services/revenueCatService';
import { SubscriptionContextType, PurchaseResult } from '../types/subscription';
import { ENTITLEMENTS } from '../config/revenuecat';
import { hapticService } from '../services/hapticService';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize and load customer info
  useEffect(() => {
    const loadCustomerInfo = async () => {
      try {
        setIsLoading(true);
        const info = await revenueCatService.getCustomerInfo();
        setCustomerInfo(info);

        // Load offerings
        const offers = await revenueCatService.getOfferings();
        setOfferings(offers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomerInfo();
  }, []);

  // Computed value: Check if user is Pro
  const isProUser = useMemo(() => {
    return revenueCatService.isProUser();
  }, [customerInfo]);

  // Purchase a package
  const purchasePackage = useCallback(async (packageId: string): Promise<PurchaseResult> => {
    setIsLoading(true);
    setError(null);

    try {
      // Find the package in offerings
      const currentOffering = offerings?.current;
      if (!currentOffering) {
        throw new Error('No offerings available');
      }

      const pkg = currentOffering.availablePackages.find(
        (p) => p.identifier === packageId
      );

      if (!pkg) {
        throw new Error('Package not found');
      }

      const result = await revenueCatService.purchasePackage(pkg);

      if (result.success && result.customerInfo) {
        setCustomerInfo(result.customerInfo);
        await hapticService.sessionComplete(); // Success haptic
      } else if (result.userCancelled) {
        await hapticService.warning(); // Cancellation haptic
      } else {
        await hapticService.error(); // Error haptic
      }

      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Purchase failed';
      setError(errorMessage);
      await hapticService.error();

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, [offerings]);

  // Restore purchases
  const restorePurchases = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const info = await revenueCatService.restorePurchases();
      setCustomerInfo(info);
      await hapticService.sessionComplete(); // Success haptic
    } catch (err: any) {
      const errorMessage = err.message || 'Restore failed';
      setError(errorMessage);
      await hapticService.error();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh customer info
  const refreshCustomerInfo = useCallback(async () => {
    try {
      const info = await revenueCatService.getCustomerInfo();
      setCustomerInfo(info);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Check specific entitlement
  const checkEntitlement = useCallback((entitlementId: string): boolean => {
    return revenueCatService.isEntitled(entitlementId);
  }, [customerInfo]);

  return (
    <SubscriptionContext.Provider
      value={{
        isProUser,
        customerInfo,
        offerings,
        isLoading,
        error,
        purchasePackage,
        restorePurchases,
        refreshCustomerInfo,
        checkEntitlement,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
