"use client";

import { AppBar, Navbar } from "@/components/ui";
import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import WalletBalance from "./WalletBalance";
import Transactions from "./Transactions";
import { useFetchUserProfile } from "./hooks/useFetchUserProfile";

function RevenuePage() {
  const { data, isLoading } = useFetchUserProfile();
  const userFullName = data
    ? `${data.first_name} ${data.last_name}`.trim()
    : undefined;

  return (
    <Grid maxWidth={"1440px"} margin={"0 auto"}>
      <Navbar userFullName={isLoading ? undefined : userFullName} />
      <AppBar />

      <Container display="grid" padding="0 140px" marginTop="145px" gap="82px">
        <WalletBalance />
        <Transactions />
      </Container>
    </Grid>
  );
}

export default RevenuePage;
