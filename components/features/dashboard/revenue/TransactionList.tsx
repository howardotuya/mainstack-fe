import { Grid } from "@chakra-ui/react";
import React from "react";
import TransactionListItem from "./TransactionListItem";
import { TransactionStatus, TransactionType } from "./txn";
import TransactionsEmptyState from "./TransactionsEmptyState";
import { Transaction } from "@/services/transactions";
import TransactionListSkeleton from "./TransactionListSkeleton";
import { useFilterSidebar } from "./hooks/useFilterSidebar";

type TransactionListProps = {
  transactions: Transaction[];
  isLoading?: boolean;
  skeletonCount?: number;
};

function TransactionList({
  transactions,
  isLoading = false,
  skeletonCount,
}: TransactionListProps) {
  let hasActiveFilters = false;

  try {
    const filterContext = useFilterSidebar();
    hasActiveFilters = filterContext.hasActiveFilters;
  } catch {
    hasActiveFilters = false;
  }

  if (isLoading) {
    return <TransactionListSkeleton count={skeletonCount} />;
  }

  if (!transactions.length || hasActiveFilters) {
    return (
      <Grid gap="24px">
        <TransactionsEmptyState />
      </Grid>
    );
  }

  return (
    <Grid gap="24px">
      {transactions.map((transaction, index) => {
        const key = transaction.payment_reference
          ? `${transaction.payment_reference}-${index}`
          : `${transaction.date}-${transaction.type}-${index}`;

        return (
          <TransactionListItem
            key={key}
            amount={transaction.amount}
            title={transaction.metadata?.product_name}
            type={transaction.type as unknown as TransactionType}
            deposit_from={transaction.metadata?.name}
            status={transaction.status as unknown as TransactionStatus}
            metadataType={transaction.metadata?.type}
            date={transaction.date}
          />
        );
      })}
    </Grid>
  );
}

export default TransactionList;
