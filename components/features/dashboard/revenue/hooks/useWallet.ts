import { useEffect, useMemo, useState } from "react";
import { fetchWalletSnapshot, type WalletSnapshot } from "@/services";

type WalletMetricKey =
  | "ledger_balance"
  | "total_payout"
  | "total_revenue"
  | "pending_payout";

export type WalletMetric = {
  key: WalletMetricKey;
  label: string;
  value: number;
};

export type WalletViewModel = {
  availableBalance: {
    label: string;
    value: number;
  };
  metrics: WalletMetric[];
};

export type UseWalletResult = {
  snapshot: WalletSnapshot | null;
  viewModel: WalletViewModel;
  isLoading: boolean;
  error: Error | null;
};

const EMPTY_SNAPSHOT: WalletSnapshot = {
  balance: 0,
  total_payout: 0,
  total_revenue: 0,
  pending_payout: 0,
  ledger_balance: 0,
};

const METRIC_CONFIG: Array<{ key: WalletMetricKey; label: string }> = [
  { key: "ledger_balance", label: "Ledger Balance" },
  { key: "total_payout", label: "Total Payout" },
  { key: "total_revenue", label: "Total Revenue" },
  { key: "pending_payout", label: "Pending Payout" },
];

export const useWallet = (): UseWalletResult => {
  const [snapshot, setSnapshot] = useState<WalletSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadWalletSnapshot = async () => {
      try {
        const snapshot = await fetchWalletSnapshot();
        if (isMounted) {
          setSnapshot(snapshot);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to load wallet data")
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadWalletSnapshot();

    return () => {
      isMounted = false;
    };
  }, []);

  const viewModel = useMemo<WalletViewModel>(() => {
    const resolvedSnapshot = snapshot ?? EMPTY_SNAPSHOT;

    return {
      availableBalance: {
        label: "Available Balance",
        value: resolvedSnapshot.balance,
      },
      metrics: METRIC_CONFIG.map(({ key, label }) => ({
        key,
        label,
        value: resolvedSnapshot[key],
      })),
    };
  }, [snapshot]);

  return {
    snapshot,
    viewModel,
    isLoading,
    error,
  };
};

export default useWallet;
