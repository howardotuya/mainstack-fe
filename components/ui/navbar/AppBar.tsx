import { ProductsIcon } from "@/components/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";

export const AppBar = () => {
  return (
    <ButtonGroup
      position="fixed"
      padding="4px"
      top="50%"
      left="16px"
      transform="translateY(-50%)"
      display="flex"
      flexDirection="column"
      gap="8px"
      rounded="100px"
      bg="white"
      boxShadow="0 4px 8px 0 rgba(92, 115, 131, 0.08), 0 6px 12px 0 rgba(92, 115, 131, 0.08)"
    >
      <IconButton variant="ghost" mixBlendMode="luminosity">
        <ProductsIcon />
      </IconButton>
      <IconButton variant="ghost" mixBlendMode="luminosity">
        <ProductsIcon variant="type2" />
      </IconButton>
      <IconButton variant="ghost" mixBlendMode="luminosity">
        <ProductsIcon variant="type3" />
      </IconButton>
      <IconButton variant="ghost" mixBlendMode="luminosity">
        <ProductsIcon variant="type4" />
      </IconButton>
    </ButtonGroup>
  );
};
