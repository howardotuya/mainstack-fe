import { Grid } from "@chakra-ui/react";
import React from "react";
import TransactionsHeader from "./TransactionsHeader";
import TransactionList from "./TransactionList";
import { useTransactions } from "./hooks/useTransactions";

function Transactions() {
  const { transactions, isLoading } = useTransactions();
  const totalCount = transactions.length;

  return (
    <Grid gap="32px" paddingBottom="164px">
      <TransactionsHeader totalCount={totalCount} isLoading={isLoading} />
      {isLoading ? null : <TransactionList transactions={transactions} />}
    </Grid>
  );
}

export default Transactions;
