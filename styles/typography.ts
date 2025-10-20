import { defineTextStyles } from "@chakra-ui/react";

const tokens = {
  paragraphXSmall: {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24px",
      letterSpacing: "-0.2px",
      color: "{colors.gray.400}",
    },
  },
  paragraphXXSmall: {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "16px",
      letterSpacing: "-0.2px",
      color: "{colors.gray.400}",
    },
  },
  subtitleSixXSmall: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "24px",
      letterSpacing: "-0.4px",
      color: "{colors.brandBlack.300}",
    },
  },
  subtitleSevenXSmall: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "16px",
      letterSpacing: "-0.4px",
      color: "{colors.brandBlack.300}",
    },
  },
  headersXXSmall: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "28px",
      fontWeight: "700",
      lineHeight: "38px",
      letterSpacing: "-0.6px",
      color: "{colors.brandBlack.300}",
    },
  },
  headersThreeXSmall: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "32px",
      letterSpacing: "-0.6px",
      color: "{colors.brandBlack.300}",
    },
  },
} satisfies Parameters<typeof defineTextStyles>[0];

export const textStyles = defineTextStyles(tokens);
