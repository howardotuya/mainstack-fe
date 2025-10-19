import { ReceiptLongIcon } from "@/components/icons";
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";

function TransactionsEmptyState() {
  return (
    <Grid maxWidth="369px" margin="40px auto">
      <Box
        width="48px"
        height="48px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="16px"
        bg="linear-gradient(135deg, #DBDEE5 1.89%, #F6F7F9 98.77%)"
      >
        <ReceiptLongIcon />
      </Box>

      <Heading
        fontSize="28px"
        fontWeight="700"
        lineHeight="40px"
        letterSpacing="-0.6px"
        color="brandBlack.300"
        mt="20px"
      >
        No matching transaction found for the selected filter
      </Heading>

      <Text
        fontSize="16px"
        fontWeight="500"
        lineHeight="24px"
        letterSpacing="-0.2px"
        color="gray.400"
        mt="8px"
      >
        Change your filters to see more results, or add a new product.
      </Text>

      <Grid justifyContent="flex-start">
        <Button
          mt="32px"
          borderRadius="100px"
          bg="gray.50"
          padding="12px 24px"
          justifyContent="center"
          alignItems="center"
          gap="8px"
          _hover={{
            bg: "gray.100",
          }}
        >
          <Text
            fontSize="16px"
            fontWeight="600"
            lineHeight="24px"
            letterSpacing="-0.4px"
            color="brandBlack.300"
            textAlign="center"
          >
            Clear Filter
          </Text>
        </Button>
      </Grid>
    </Grid>
  );
}

export default TransactionsEmptyState;
