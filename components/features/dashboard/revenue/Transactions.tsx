import { Grid } from "@chakra-ui/react";
import React from "react";
import TransactionsHeader from "./TransactionsHeader";
import TransactionList from "./TransactionList";
import { useTransactions } from "./hooks/useTransactions";
import { FilterSidebarProvider } from "./hooks/useFilterSidebar";

function Transactions() {
  const { transactions, isLoading } = useTransactions();
  const totalCount = transactions.length;

  return (
    <FilterSidebarProvider>
      <Grid gap="32px" paddingBottom="164px">
        <TransactionsHeader totalCount={totalCount} isLoading={isLoading} />
        <TransactionList
          transactions={transactions}
          isLoading={isLoading}
          skeletonCount={5}
        />
      </Grid>
    </FilterSidebarProvider>
  );
}

export default Transactions;
