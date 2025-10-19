import { apiClient } from "./apiClient";

export type TransactionType = "deposit" | "withdrawal";

export interface TransactionMetadata {
  name?: string;
  type?: string;
  email?: string;
  quantity?: number;
  country?: string;
  product_name?: string;
}

export interface Transaction {
  amount: number;
  metadata?: TransactionMetadata;
  payment_reference?: string;
  status: "successful" | "pending" | "failed";
  type: TransactionType;
  date: string;
}

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get<Transaction[]>("/transactions");
  return response.data;
};
