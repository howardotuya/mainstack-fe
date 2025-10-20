"use client";

import { Container, Grid } from "@chakra-ui/react";
import { DatePicker } from "@/components/ui";
import { useFilterSidebar } from "./hooks/useFilterSidebar";

function FilterSidebarDateRange() {
  const {
    draft: { startDate, endDate },
    setStartDateDraft,
    setEndDateDraft,
  } = useFilterSidebar();

  return (
    <Container maxW="none" w="full" p="0">
      <Grid templateColumns="1fr 1fr" gap="8px">
        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          value={startDate}
          onChange={setStartDateDraft}
        />
        <DatePicker
          label="End Date"
          placeholder="Select end date"
          value={endDate}
          onChange={setEndDateDraft}
        />
      </Grid>
    </Container>
  );
}

export default FilterSidebarDateRange;
