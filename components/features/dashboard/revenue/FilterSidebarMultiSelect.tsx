import { ExpandMoreIcon } from "@/components/icons";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  createListCollection,
  Fieldset,
  For,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

type FilterItem = {
  label: string;
  value: string;
};

interface FilterSidebarMultiSelectProps {
  label: string;
  placeholder: string;
  items: FilterItem[];
  name: string;
  menuWidth?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[], selectedItems: FilterItem[]) => void;
}

export function FilterSidebarMultiSelect({
  label,
  placeholder,
  items,
  name,
  menuWidth = "404px",
  value,
  defaultValue,
  onChange,
}: FilterSidebarMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue ?? []
  );

  const collection = useMemo(() => createListCollection({ items }), [items]);

  const selectedValue = value ?? internalValue;

  const selectedLabels = useMemo(
    () =>
      collection.items
        .filter((item) => selectedValue.includes(item.value))
        .map((item) => item.label),
    [collection.items, selectedValue]
  );

  const handleChange = (nextValue: string[]) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    const selectedItems = collection.items.filter((item) =>
      nextValue.includes(item.value)
    );
    onChange?.(nextValue, selectedItems);
  };

  return (
    <Container maxW="none" w="full" p="0">
      <VStack justifyContent="flex-start" alignItems="flex-start" gap="8px">
        <Text textStyle="subtitleSixXSmall" color="brandBlack.300">
          {label}
        </Text>

        <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Menu.Trigger asChild>
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
                color={
                  selectedLabels.length > 0 ? "brandBlack.300" : "gray.400"
                }
                whiteSpace="nowrap"
                textAlign="left"
                lineClamp={1}
              >
                {selectedLabels.length > 0
                  ? selectedLabels.join(", ")
                  : placeholder}
              </Text>

              <ExpandMoreIcon />
            </Button>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner
              rounded="12px"
              bg="white"
              boxShadow="0 4px 8px 0 rgba(92, 115, 131, 0.08), 0 6px 12px 0 rgba(92, 115, 131, 0.08);"
              zIndex={"91600 !important"}
              overflow="hidden"
              w={menuWidth}
            >
              <Menu.Content>
                <Fieldset.Root>
                  <CheckboxGroup
                    value={selectedValue}
                    onValueChange={handleChange}
                    name={name}
                  >
                    <Fieldset.Content gap="0" padding="8px">
                      <For each={collection.items}>
                        {(item) => (
                          <Checkbox.Root
                            gap="12px"
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-start"
                            h="48px"
                            padding="14px"
                            key={item.value}
                            value={item.value}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />

                            <Checkbox.Label
                              textStyle="subtitleSixXSmall"
                              color="brandBlack.300"
                            >
                              {item.label}
                            </Checkbox.Label>
                          </Checkbox.Root>
                        )}
                      </For>
                    </Fieldset.Content>
                  </CheckboxGroup>
                </Fieldset.Root>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </VStack>
    </Container>
  );
}
