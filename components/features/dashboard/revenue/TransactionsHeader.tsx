import { DownloadIcon } from "@/components/icons";
import { Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import FilterSidebar from "./FilterSidebar";
import useFilterSidebar, {
  FilterSidebarProvider,
} from "./hooks/useFilterSidebar";

type TransactionsHeaderProps = {
  totalCount: number;
  isLoading?: boolean;
};

const buttonStyles = {
  rounded: "100px",
  padding: "12px 14px 12px 30px",
  height: "52px",
  justifyContent: "center",
  alignItems: "center",
  color: "brandBlack.300",
  textStyle: "subtitleSixXSmall",
  bg: "gray.50",
  _hover: {
    bg: "gray.100",
  },
  gap: "4px",
};

const formatCountLabel = (count: number) =>
  `${count} Transaction${count === 1 ? "" : "s"}`;

function TransactionsHeader({
  totalCount,
  isLoading,
}: TransactionsHeaderProps) {
  return (
    <FilterSidebarProvider>
      <TransactionsHeaderContent
        totalCount={totalCount}
        isLoading={isLoading}
      />
    </FilterSidebarProvider>
  );
}

function TransactionsHeaderContent({
  totalCount,
  isLoading,
}: TransactionsHeaderProps) {
  const { activeFilterCount } = useFilterSidebar();
  const headingText = isLoading
    ? "Fetching your transactions"
    : activeFilterCount > 0
    ? "0 Transactions"
    : formatCountLabel(totalCount);

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
        <Heading textStyle="headersThreeXSmall" color="brandBlack.300">
          {headingText}
        </Heading>

        <Text textStyle="paragraphXXSmall" color="gray.400">
          Your transactions for the last 7 days
        </Text>
      </Flex>

      <ButtonGroup gap="12px">
        <FilterSidebar buttonStyles={buttonStyles} />

        <Button {...buttonStyles}>
          Export list <DownloadIcon />
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export default TransactionsHeader;
