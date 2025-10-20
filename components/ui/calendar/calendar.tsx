"use client";

import { Box, BoxProps, IconButton } from "@chakra-ui/react";
import {
  DayPicker,
  type DateRange,
  type DayPickerProps,
} from "react-day-picker";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import "react-day-picker/dist/style.css";
import "@/components/ui/calendar.css";

type CalendarBaseProps = Omit<DayPickerProps, "mode"> & {
  containerProps?: BoxProps;
};

interface CalendarSingleProps extends CalendarBaseProps {
  mode: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

interface CalendarRangeProps extends CalendarBaseProps {
  mode: "range";
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

export function Calendar({ containerProps, ...props }: CalendarProps) {
  const { mode, ...rest } = props;
  const { className: containerClassName, ...restContainerProps } =
    containerProps ?? {};

  const dayPickerProps: DayPickerProps = {
    navLayout: "around",
    showOutsideDays: true,
    captionLayout: "label",
    numberOfMonths: 1,
    formatters: {
      formatCaption: (date) => format(date, "MMMM, yyyy"),
      formatWeekdayName: (date) => format(date, "EEE"),
    },
    components: {
      Chevron: ({ orientation }) =>
        orientation === "left" ? (
          <IconButton variant="ghost" minWidth="auto" w="20px" h="20px">
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton variant="ghost" minWidth="auto" w="20px" h="20px">
            <ChevronRightIcon />
          </IconButton>
        ),
    },
    ...rest,
    ...(mode === "single"
      ? {
          mode: "single" as const,
          selected: props.selected,
          onSelect: props.onSelect,
        }
      : {
          mode: "range" as const,
          selected: props.selected,
          onSelect: props.onSelect,
        }),
  };

  return (
    <Box
      className={["ms-calendar", containerClassName].filter(Boolean).join(" ")}
      {...restContainerProps}
    >
      <DayPicker {...dayPickerProps} />
    </Box>
  );
}
