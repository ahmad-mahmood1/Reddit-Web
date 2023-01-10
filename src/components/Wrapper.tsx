import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";

interface WrapperProps extends ChakraProps {
  variant?: "regular" | "small";
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "small",
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
