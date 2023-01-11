import React, { ReactNode } from "react";
import { useQuery } from "urql";
import { currentUser } from "../graphql/queries/me";
// import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";
import Wrapper, { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  const [{ data: user, fetching }] = useQuery({
    query: currentUser,
  });
  return (
    <>
      <NavBar user={user} loading={fetching} />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
