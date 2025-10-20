"use client";

import { useState } from "react";
import { Container, Grid } from "@chakra-ui/react";
import { DatePicker } from "@/components/ui";

function FilterSidebarDateRange() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <Container maxW="none" w="full" p="0">
      <Grid templateColumns="1fr 1fr" gap="8px">
        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          value={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          label="End Date"
          placeholder="Select end date"
          value={endDate}
          onChange={setEndDate}
        />
      </Grid>
    </Container>
  );
}

export default FilterSidebarDateRange;
