import { Button, Container, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const timeline = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Last 7 days",
    value: "last_7_days",
  },
  {
    label: "This month",
    value: "this_month",
  },
  {
    label: "Last 3 months",
    value: "last_3_months",
  },
  {
    label: "This year",
    value: "this_year",
  },
  {
    label: "Last year",
    value: "last_year",
  },
  {
    label: "All time",
    value: "all_time",
  },
];

function FilterSidebarTags() {
  const [selectedTimeline, setSelectedTimeline] = useState(timeline[0].value);

  return (
    <Container padding="8px 0 8px 22px" overflowX="auto" scrollbarWidth="none">
      <Flex
        overflowX="auto"
        scrollbarWidth="none"
        flexWrap="nowrap"
        gap="8px"
        paddingRight="22px"
      >
        {timeline.map((item) => (
          <Button
            key={item.value}
            variant={selectedTimeline === item.value ? "solid" : "outline"}
            padding="10px 18px"
            rounded="100px"
            onClick={() => setSelectedTimeline(item.value)}
          >
            <Text
              textStyle="subtitleSevenXSmall"
              color={
                selectedTimeline === item.value ? "white" : "brandBlack.300"
              }
            >
              {item.label}
            </Text>
          </Button>
        ))}
      </Flex>
    </Container>
  );
}

export default FilterSidebarTags;
