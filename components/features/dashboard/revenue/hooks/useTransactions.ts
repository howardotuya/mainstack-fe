import { useEffect, useState } from "react";
import { fetchTransactions, type Transaction } from "@/services";

export type UseTransactionsResult = {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
};

export const useTransactions = (): UseTransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTransactions = async () => {
      try {
        const response = await fetchTransactions();
        if (isMounted) {
          setTransactions(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to load transactions")
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadTransactions();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    transactions,
    isLoading,
    error,
  };
};

export default useTransactions;
