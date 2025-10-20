import { CloseIcon, ExpandMoreIcon } from "@/components/icons";
import {
  Button,
  ButtonProps,
  Drawer,
  Flex,
  Grid,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FilterSidebarTags from "./FilterSidebarTags";
import FilterSidebarDateRange from "./FilterSidebarDateRange";
import FilterSidebarTransactionType from "./FilterSidebarTransactionType";
import FilterSidebarTransactionStatus from "./FilterSidebarTransactionStatus";
import {
  FilterSidebarProvider,
  useFilterSidebar,
} from "./hooks/useFilterSidebar";

const buttonTextStyles = {
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  letterSpacing: "-0.4px",
  rounded: "100px",
  h: "48px",
};

function FilterSidebarContent({ buttonStyles }: { buttonStyles: ButtonProps }) {
  const [open, setOpen] = useState(false);
  const { applyFilters, resetDraft, clearFilters, isDirty, activeFilterCount } =
    useFilterSidebar();

  const handleClose = () => {
    setOpen(false);
    resetDraft();
  };

  const handleApply = () => {
    applyFilters();
    setOpen(false);
  };

  const handleClear = () => {
    clearFilters();
    setOpen(false);
  };

  return (
    <Drawer.Root size="sm" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Drawer.Trigger asChild>
        <Button {...buttonStyles}>
          Filter
          {activeFilterCount > 0 && (
            <Text
              fontSize="12px"
              fontWeight={500}
              letterSpacing="-0.4px"
              rounded="100px"
              bg="brandBlack.300"
              width="20px"
              height="20px"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {activeFilterCount}
            </Text>
          )}
          <ExpandMoreIcon />
        </Button>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop />

        <Drawer.Positioner padding="4">
          <Drawer.Content
            boxShadow="0 16px 32px 0 rgba(219, 222, 229, 0.10), 0 12px 24px 0 rgba(219, 222, 229, 0.10), 0 8px 16px 4px rgba(188, 196, 204, 0.10);"
            backdropFilter="blur(8px)"
            bg="white"
            rounded="20px"
          >
            <Drawer.Header>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                padding="24px 20px"
                width="100%"
              >
                <Drawer.Title>
                  <Text
                    fontSize="24px"
                    fontWeight="700"
                    lineHeight="120%"
                    textTransform="capitalize"
                    color="brandBlack.300"
                  >
                    Filter
                  </Text>
                </Drawer.Title>

                <IconButton
                  variant="ghost"
                  minWidth="auto"
                  w="auto"
                  h="auto"
                  rounded="full"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Flex>
            </Drawer.Header>

            <Drawer.Body>
              <Grid gap="24px">
                <FilterSidebarTags />

                <Grid gap="24px" padding="0 22px">
                  <FilterSidebarDateRange />
                  <FilterSidebarTransactionType />
                  <FilterSidebarTransactionStatus />
                </Grid>
              </Grid>
            </Drawer.Body>

            <Drawer.Footer
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gap="12px"
              padding="20px 24px"
            >
              <Button
                variant="outline"
                border="1px solid"
                borderColor="gray.50"
                bg="white"
                {...buttonTextStyles}
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                {...buttonTextStyles}
                onClick={handleApply}
                disabled={!isDirty}
              >
                Apply
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

function FilterSidebar({ buttonStyles }: { buttonStyles: ButtonProps }) {
  return (
    <FilterSidebarProvider>
      <FilterSidebarContent buttonStyles={buttonStyles} />
    </FilterSidebarProvider>
  );
}

export default FilterSidebar;
