"use client";

import { InfoIcon } from "@/components/icons";
import {
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import WalletBalanceGraph from "./WalletBalanceGraph";

const revenueData = [
  {
    label: "Ledger Balance",
    value: 0,
  },
  {
    label: "Total Payout",
    value: 55080,
  },
  {
    label: "Total Revenue",
    value: 175580,
  },
  {
    label: "Pending Payout",
    value: 0,
  },
];

const availableBalance = {
  label: "Available Balance",
  value: 100000,
};

const textStyles = {
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "16px",
  letterSpacing: "-0.2px",
};
const headingStyles = {
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "38px",
  letterSpacing: "-0.6px",
  color: "brandBlack.300",
};

function WalletBalance() {
  return (
    <Grid templateColumns="1fr 271px" alignItems="flex-start" gap="124px">
      <Grid>
        <Flex maxWidth="443px" gap="64px" alignItems="center">
          <Grid gap="8px">
            <Text {...textStyles}>{availableBalance.label}</Text>

            <Heading {...headingStyles}>
              USD{" "}
              {availableBalance.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Heading>
          </Grid>

          <Button
            padding="14px 52px"
            height="52px"
            justifyContent="center"
            alignItems="center"
            alignSelf="stretch"
            rounded="100px"
            bg="brandBlack.300"
            _hover={{
              bg: "gray.800",
            }}
          >
            Withdraw
          </Button>
        </Flex>
        <WalletBalanceGraph />
      </Grid>

      <Grid gap="32px">
        {revenueData.map((item) => (
          <Grid key={item.label} gap="8px">
            <Flex justifyContent="space-between" alignItems="center">
              <Text {...textStyles}>{item.label}</Text>

              <IconButton
                variant="ghost"
                width="20px"
                height="20px"
                minWidth="20px"
              >
                <InfoIcon />
              </IconButton>
            </Flex>

            <Heading {...headingStyles}>
              USD{" "}
              {item.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Heading>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default WalletBalance;
