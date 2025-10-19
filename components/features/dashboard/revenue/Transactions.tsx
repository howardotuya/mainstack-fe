import { Grid } from "@chakra-ui/react";
import React from "react";
import TransactionsHeader from "./TransactionsHeader";
import TransactionList from "./TransactionList";

function Transactions() {
  return (
    <Grid gap="32px" paddingBottom="164px">
      <TransactionsHeader />
      <TransactionList />
    </Grid>
  );
}

export default Transactions;
