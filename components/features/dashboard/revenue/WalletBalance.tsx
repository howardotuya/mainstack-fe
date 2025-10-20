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
import { useWallet } from "./hooks/useWallet";
import { formatCurrency } from "@/utils";

function WalletBalance() {
  const { viewModel, isLoading } = useWallet();
  const { availableBalance, metrics } = viewModel;

  return (
    <Grid templateColumns="1fr 271px" alignItems="flex-start" gap="124px">
      <Grid>
        <Flex maxWidth="443px" gap="64px" alignItems="center">
          <Grid gap="8px">
            <Text textStyle="paragraphXXSmall">{availableBalance.label}</Text>

            <Heading textStyle="headersXXSmall" color="brandBlack.300">
              USD {formatCurrency(availableBalance.value)}
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
            loading={isLoading}
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
        {metrics.map(({ key, label, value }) => (
          <Grid key={key} gap="8px">
            <Flex justifyContent="space-between" alignItems="center">
              <Text textStyle="paragraphXXSmall">{label}</Text>

              <IconButton
                variant="ghost"
                width="20px"
                height="20px"
                minWidth="20px"
              >
                <InfoIcon />
              </IconButton>
            </Flex>

            <Heading textStyle="headersXXSmall" color="brandBlack.300">
              USD {formatCurrency(value)}
            </Heading>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default WalletBalance;
