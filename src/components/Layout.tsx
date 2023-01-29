import { useQuery } from "@apollo/client";
import React, { ReactNode } from "react";
import { currentUser } from "../graphql/queries/me";
// import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";
import Wrapper, { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  const { data: user, loading } = useQuery(currentUser);
  return (
    <>
      <NavBar user={user} loading={loading} />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
