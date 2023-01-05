import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "urql";
import { FragmentType, useFragment } from "../generated";
import { LoggedInUserQuery } from "../generated/graphql";
import { loggedInUserFragment } from "../graphql/fragments/loggedInUser";
import { logoutUser } from "../graphql/mutations/logout";
import { currentUser } from "../graphql/queries/me";
type Props = {
  user: LoggedInUserQuery | undefined;
  loading: boolean;
};

export const NavBar: React.FC<Props> = ({ user, loading }: Props) => {
  const loggedInUser = useFragment(loggedInUserFragment, user?.me);
  const [{ fetching: logoutLoading, data: logoutData }, logout] =
    useMutation(logoutUser);
  const body = loading ? null : !loggedInUser ? (
    <>
      <Link as={NextLink} mr={2} href="/login">
        Login
      </Link>
      <Link as={NextLink} href="/register">
        Registration
      </Link>
    </>
  ) : (
    <Flex>
      <Box mr={2}>{loggedInUser.username}</Box>
      <Button
        variant={"link"}
        onClick={() => {
          logout({});
        }}
        isLoading={logoutLoading}
      >
        Logout
      </Button>
    </Flex>
  );
  return (
    <Flex bg={"tan"} p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
