import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "regular" | "small";

interface WrapperProps extends ChakraProps {
  variant?: WrapperVariant;
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  ...rest
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w={"100%"}
      mt={8}
      mx="auto"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
