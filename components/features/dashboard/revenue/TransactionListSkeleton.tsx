import { Grid, HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

type TransactionListSkeletonProps = {
  count?: number;
};

const DEFAULT_ITEM_COUNT = 5;

const TransactionListSkeleton: React.FC<TransactionListSkeletonProps> = ({
  count = DEFAULT_ITEM_COUNT,
}) => {
  return (
    <Grid gap="24px">
      {Array.from({ length: count }).map((_, index) => (
        <HStack key={index} gap="14px" alignItems="center">
          <SkeletonCircle size="12" />

          <Grid gap="8px" flex="1">
            <Skeleton height="16px" width="60%" />
            <Skeleton height="12px" width="40%" />
          </Grid>

          <Grid gap="8px" textAlign="right">
            <Skeleton height="16px" width="120px" />
            <Skeleton height="12px" width="80px" />
          </Grid>
        </HStack>
      ))}
    </Grid>
  );
};

export default TransactionListSkeleton;
