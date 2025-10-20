import { Grid } from "@chakra-ui/react";
import React from "react";
import TransactionListItem from "./TransactionListItem";
import { TransactionStatus, TransactionType } from "./txn";
import TransactionsEmptyState from "./TransactionsEmptyState";
import { Transaction } from "@/services/transactions";

type TransactionListProps = {
  transactions: Transaction[];
};

function TransactionList({ transactions }: TransactionListProps) {
  if (!transactions.length) {
    return (
      <Grid gap="24px">
        <TransactionsEmptyState />
      </Grid>
    );
  }

  return (
    <Grid gap="24px">
      {transactions.map((transaction) => (
        <TransactionListItem
          key={transaction.payment_reference}
          amount={transaction.amount}
          title={transaction.metadata?.product_name}
          type={transaction.type as unknown as TransactionType}
          deposit_from={transaction.metadata?.name}
          status={transaction.status as unknown as TransactionStatus}
          metadataType={transaction.metadata?.type}
          date={transaction.date}
        />
      ))}
    </Grid>
  );
}

export default TransactionList;
