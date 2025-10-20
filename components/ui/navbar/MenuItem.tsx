import { IconProps } from "@/components/icons/IconProps";
import { Text, Link as ChakraLink, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

interface MenuItemProps {
  label: string;
  icon: FC<IconProps>;
  href: string;
  state: "default" | "active";
}

const containerStyles = (state: "default" | "active") => ({
  backgroundColor: state === "active" ? "brandBlack.300" : "white",
  p: "8px 14px",
  borderRadius: "120px",
  asChild: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

export const MenuItem: FC<MenuItemProps> = ({ label, icon, href, state }) => {
  const Icon = icon;

  const content = () => {
    return (
      <>
        <Icon />
        <Text
          textStyle="subtitleSixXSmall"
          color={state === "active" ? "white" : "gray.400"}
        >
          {label}
        </Text>
      </>
    );
  };

  return (
    <>
      {state === "default" ? (
        <ChakraLink
          {...containerStyles(state)}
          _hover={{
            bg: "gray.50",
          }}
        >
          <NextLink key={label} href={href}>
            {content()}
          </NextLink>
        </ChakraLink>
      ) : (
        <Box {...containerStyles(state)}>
          <Box>{content()}</Box>
        </Box>
      )}
    </>
  );
};
