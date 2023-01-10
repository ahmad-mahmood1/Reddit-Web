import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useMutation } from "urql";
import { useFragment } from "../generated";
import { LoggedInUserQuery } from "../generated/graphql";
import { loggedInUserFragment } from "../graphql/fragments/loggedInUser";
import { logoutUser } from "../graphql/mutations/logout";
type Props = {
  user: LoggedInUserQuery | undefined;
  loading: boolean;
};

export const NavBar: React.FC<Props> = ({ user, loading }: Props) => {
  const loggedInUser = useFragment(loggedInUserFragment, user?.me);
  const [{ fetching: logoutLoading }, logout] = useMutation(logoutUser);
  const body = !loggedInUser ? (
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
      <Box mr={2}>{loggedInUser?.username}</Box>
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
    <Flex bg={"tan"} p={4} minH={10}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
