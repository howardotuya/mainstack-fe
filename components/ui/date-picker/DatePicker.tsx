"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  Container,
  Flex,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Calendar } from "@/components/ui";
import { ExpandLessIcon, ExpandMoreIcon } from "@/components/icons";
import { Popover } from "@chakra-ui/react";

interface DatePickerProps {
  label: string;
  placeholder: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

function DatePicker({ label, placeholder, value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const formattedDate = selectedDate
    ? format(selectedDate, "dd MMM yyyy")
    : placeholder;

  return (
    <Container maxW="none" w="full" p="0">
      <VStack align="flex-start" gap="8px">
        <Text textStyle="subtitleSixXSmall" color="brandBlack.300">
          {label}
        </Text>

        <Popover.Root
          positioning={{
            placement: "bottom-start",
            //  sameWidth: true
          }}
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <Popover.Trigger asChild>
            <Flex gap="8px" w="full">
              <Button
                maxW="none"
                bg={open ? "white" : "gray.50"}
                rounded="12px"
                height="48px"
                padding="14px 16px"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                _hover={{
                  bg: open ? "white" : "gray.100",
                }}
                border="3px solid"
                borderColor={open ? "brandBlack.300" : "gray.50"}
              >
                <Text
                  textStyle="paragraphXSmall"
                  color={selectedDate ? "brandBlack.300" : "gray.400"}
                  whiteSpace="nowrap"
                  textAlign="left"
                  lineClamp={1}
                >
                  {formattedDate}
                </Text>

                {open ? (
                  <ExpandLessIcon variant="type2" />
                ) : (
                  <ExpandMoreIcon
                    variant="type2"
                    color="var(--chakra-colors-gray-500)"
                  />
                )}
              </Button>
            </Flex>
          </Popover.Trigger>

          <Portal>
            <Popover.Positioner
              bg="white"
              zIndex="91600 !important"
              rounded="16.851px"
              boxShadow="0 4px 8px 0 rgba(92, 115, 131, 0.08), 0 6px 12px 0 rgba(92, 115, 131, 0.08);"
              overflow="hidden"
            >
              <Popover.Content
                // width="auto"
                width="404px"
                border="none"
                bg="transparent"
                p="0"
              >
                <Box w="full">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      onChange(date);
                    }}
                  />
                </Box>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </VStack>
    </Container>
  );
}

export { DatePicker };
