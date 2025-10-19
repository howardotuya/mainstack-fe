import {
  Avatar,
  IconButton,
  Grid,
  HStack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import type { IconButtonProps } from "@chakra-ui/react";
import {
  ChatIcon,
  CRMIcon,
  HomeIcon,
  InsertChartIcon,
  MainstackLogo,
  MenuIcon,
  NotificationsIcon,
  PaymentsIcon,
  WidgetsIcon,
} from "../../icons";
import { MenuItem } from "./MenuItem";
import { IconProps } from "@/components/icons/IconProps";
import { FC } from "react";

const navItems = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
    state: "default",
  },
  {
    label: "Analytics",
    icon: InsertChartIcon,
    href: "/",
    state: "default",
  },
  {
    label: "Revenue",
    icon: PaymentsIcon,
    href: "/",
    state: "active",
  },
  {
    label: "CRM",
    icon: CRMIcon,
    href: "/",
    state: "default",
  },
  {
    label: "Apps",
    icon: WidgetsIcon,
    href: "/",
    state: "default",
  },
];

const IconbuttonProps: IconButtonProps = {
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  variant: "ghost",
};

export const Navbar = () => {
  return (
    <Grid
      padding="12px 24px"
      position="fixed"
      top="16px"
      left="16px"
      right="16px"
      zIndex={100}
      rounded="100px"
      border="2px solid"
      borderColor="white"
      boxShadow={
        "0 2px 6px 0 rgba(45, 59, 67, 0.06), 0 2px 4px 0 rgba(45, 59, 67, 0.05)"
      }
      bg="white"
    >
      <HStack justifyContent={"space-between"}>
        <MainstackLogo />

        <HStack gap={"20px"}>
          {navItems.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              icon={item.icon as FC<IconProps>}
              href={item.href}
              state={item.label === "Revenue" ? "active" : "default"}
            />
          ))}
        </HStack>

        <ButtonGroup display={"flex"} alignItems={"center"} gap={"8px"}>
          <IconButton {...IconbuttonProps}>
            <NotificationsIcon />
          </IconButton>

          <IconButton {...IconbuttonProps}>
            <ChatIcon />
          </IconButton>

          <Button
            rounded={"100px"}
            padding="4px 12px 4px 5px"
            bg="gray.50"
            _hover={{
              bg: "gray.200",
            }}
          >
            <HStack>
              <Avatar.Root
                rounded={"100px"}
                background={
                  "linear-gradient(139deg, #5C6670 2.33%, #131316 96.28%)"
                }
                color="white"
                height="32px"
                width="32px"
              >
                <Avatar.Fallback
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="16px"
                  letterSpacing="-0.4px"
                  name="Off James"
                />
                <Avatar.Image />
              </Avatar.Root>

              <MenuIcon />
            </HStack>
          </Button>
        </ButtonGroup>
      </HStack>
    </Grid>
  );
};
