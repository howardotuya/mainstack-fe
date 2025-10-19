import { apiClient } from "./apiClient";

export interface WalletSnapshot {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

export const fetchWalletSnapshot = async (): Promise<WalletSnapshot> => {
  const response = await apiClient.get<WalletSnapshot>("/wallet");
  return response.data;
};
