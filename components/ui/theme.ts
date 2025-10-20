"use client";

import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineTokens,
} from "@chakra-ui/react";
import { textStyles } from "@/styles";

const colors = {
  brandBlack: {
    300: { value: "var(--chakra-colors-brandBlack-300)" },
  },
  jade: {
    100: { value: "var(--chakra-colors-jade-100)" },
    400: { value: "var(--chakra-colors-jade-400)" },
    500: { value: "var(--chakra-colors-jade-500)" },
  },
};

const fonts = {
  body: { value: "var(--font-degular, sans-serif)" },
  heading: { value: "var(--font-degular, sans-serif)" },
};

const tokens = defineTokens({
  fonts: fonts,
  colors: colors,
});

const config = defineConfig({
  strictTokens: true,
  theme: {
    tokens,
    textStyles,
  },
  globalCss: {
    body: {
      bg: "{colors.white}",
      color: "{colors.gray.400}",
    },
  },
});

export const system = createSystem(defaultConfig, config);
