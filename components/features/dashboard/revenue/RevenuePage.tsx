"use client";

import { AppBar, Navbar } from "@/components/ui";
import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import WalletBalance from "./WalletBalance";
import Transactions from "./Transactions";

function RevenuePage() {
  return (
    <Grid>
      <Navbar />
      <AppBar />

      <Container display="grid" padding="0 140px" marginTop="145px" gap="82px">
        <WalletBalance />
        <Transactions />
      </Container>
    </Grid>
  );
}

export default RevenuePage;
