import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useQuery } from "urql";
import { currentUser } from "../graphql/queries/me";
type Props = {};

export const NavBar: React.FC<Props> = ({}: Props) => {
  const [{ data, fetching }] = useQuery({ query: currentUser });

  const body = fetching ? null : !data?.me ? (
    <>
      <Link as={NextLink} mr={2} href="/login">
        Login
      </Link>
      <Link as={NextLink} href="/login">
        Registration
      </Link>
    </>
  ) : (
    <Flex>
      <Box mr={2}>{data.me.username}</Box>
      <Button variant={"link"}>Logout</Button>
    </Flex>
  );
  return (
    <Flex bg={"tomato"} p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
