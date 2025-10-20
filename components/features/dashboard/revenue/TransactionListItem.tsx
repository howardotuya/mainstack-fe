import React from "react";
import { TransactionStatus, TransactionType } from "./txn";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { CallMadeIcon, CallReceivedIcon } from "@/components/icons/icons";

const formatMetadataType = (value?: string) => {
  if (!value) return value;

  const normalized = value.replace(/_/g, " ").toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const formatDate = (value?: string) => {
  if (!value) return value;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(parsed);
};

interface TransactionListItemProps {
  amount?: number;
  title?: string;
  type?: TransactionType;
  deposit_from?: string;
  status?: TransactionStatus;
  date?: string;
  metadataType?: string;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  amount,
  title,
  type,
  deposit_from,
  status,
  date,
  metadataType,
}) => {
  const formattedMetadataType = formatMetadataType(metadataType);
  const formattedDate = formatDate(date);
  const primaryText =
    type === "withdrawal"
      ? "Cash Withdrawal"
      : title ?? formattedMetadataType ?? "--";

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex gap="14px">
        <Box
          width="48px"
          height="48px"
          borderRadius="full"
          bg={type === "deposit" ? "jade.100" : "red.100"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {type === "deposit" ? <CallReceivedIcon /> : <CallMadeIcon />}
        </Box>

        <Grid gap="8px">
          <Text
            textStyle="paragraphXSmall"
            color="brandBlack.300"
            textTransform={type === "withdrawal" ? "capitalize" : "none"}
          >
            {primaryText}
          </Text>

          <Text
            textStyle="paragraphXXSmall"
            color={
              type === "withdrawal"
                ? status === "successful"
                  ? "jade.400"
                  : "red.400"
                : "gray.400"
            }
            textTransform={type === "withdrawal" ? "capitalize" : "none"}
          >
            {(type === "withdrawal" ? status : deposit_from) ?? "--"}
          </Text>
        </Grid>
      </Flex>

      <Grid gap="4px" textAlign="right">
        <Text
          textStyle="subtitleSixXSmall"
          fontWeight="700"
          textAlign="right"
          color="brandBlack.300"
        >
          USD{" "}
          {amount?.toLocaleString("en-US", { minimumFractionDigits: 2 }) ?? 0}
        </Text>

        <Text textStyle="paragraphXXSmall" textAlign="right">
          {formattedDate ?? "--"}
        </Text>
      </Grid>
    </Flex>
  );
};

export default TransactionListItem;
