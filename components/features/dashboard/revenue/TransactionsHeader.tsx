import { DownloadIcon, ExpandMoreIcon } from "@/components/icons";
import { Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const buttonStyles = {
  rounded: "100px",
  padding: "12px 14px 12px 30px",
  height: "52px",
  justifyContent: "center",
  alignItems: "center",
  color: "brandBlack.300",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  letterSpacing: "-0.4px",
  bg: "gray.50",
  _hover: {
    bg: "gray.100",
  },
};
function TransactionsHeader() {
  return (
    <Flex
      width="100%"
      borderBottom="1px solid"
      borderColor="gray.50"
      paddingBottom="24px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex flexDirection="column">
        <Heading
          fontSize="24px"
          fontWeight="700"
          lineHeight="32px"
          letterSpacing="-0.6px"
          color="brandBlack.300"
        >
          24 Transactions
        </Heading>

        <Text
          fontSize="14px"
          fontWeight="500"
          lineHeight="16px"
          letterSpacing="-0.2px"
          color="gray.400"
        >
          Your transactions for the last 7 days
        </Text>
      </Flex>

      <ButtonGroup gap="12px">
        <Button {...buttonStyles}>
          Filter <ExpandMoreIcon />
        </Button>

        <Button {...buttonStyles}>
          Export list <DownloadIcon />
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export default TransactionsHeader;
