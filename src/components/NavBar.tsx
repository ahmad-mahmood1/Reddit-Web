import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [{ fetching: logoutLoading }, logout] = useMutation(logoutUser);
  const body = !loggedInUser ? (
    <>
      <Link as={NextLink} mr={2} href="/login">
        Login
      </Link>
      <Link as={NextLink} href="/register">
        Register
      </Link>
    </>
  ) : (
    <Flex align="center">
      <Button as={NextLink} href="/createPost" mr={4}>
        create post
      </Button>
      <Box mr={2}>{loggedInUser.username}</Box>
      <Button
        onClick={async () => {
          await logout({});
          router.reload();
        }}
        isLoading={logoutLoading}
        variant="link"
      >
        Logout
      </Button>
    </Flex>
  );
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} justify={"space-between"} align="center">
        <Link as={NextLink} href="/">
          <Heading>AiReddit</Heading>
        </Link>
        <Box>{body}</Box>
      </Flex>
    </Flex>
  );
};
