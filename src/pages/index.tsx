import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { NavBar } from "../components/NavBar";
import Wrapper from "../components/Wrapper";
import { PostsQueryVariables } from "../generated/graphql";
import { currentUser } from "../graphql/queries/me";
import { postsQuery } from "../graphql/queries/posts";
import { urqlClient } from "../utils/urql/urqlClient";

const Index = () => {
  const [variables, setQueryVariables] = useState<PostsQueryVariables>({
    limit: 40,
  });
  const [{ data, fetching: fetchingPosts }] = useQuery({
    query: postsQuery,
    variables,
  });
  console.log("===  data", data);

  const [{ data: user, fetching }, fetchQuery] = useQuery({
    query: currentUser,
    pause: true,
  });
  useEffect(() => {
    !user?.me && fetchQuery();
  }, []);

  if (!fetchingPosts && !data) {
    return <div>No Data</div>;
  }

  return (
    <div>
      <NavBar user={user} loading={fetching} />

      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Wrapper variant="regular" {...(!data?.posts.hasMore && { mb: "8" })}>
          <Flex alignItems="center" justify={"space-between"}>
            <Heading>AReddit</Heading>
            <Link as={NextLink} href={"/createPost"}>
              Create Post
            </Link>
          </Flex>
          <Stack spacing={8} direction="column">
            {data?.posts?.posts.map((post, i) => (
              <Card shadow={"md"} borderWidth="1px">
                <CardHeader>
                  <Heading fontSize="xl">
                    {i + 1}----{post.id}-{post.title}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text>{post.textSnippet}</Text>
                </CardBody>
                <CardFooter>
                  <Text>{moment(post.createdAt).format("L LTS")}</Text>
                </CardFooter>
              </Card>
            ))}
          </Stack>
        </Wrapper>
      )}

      {data && data.posts.posts.length && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setQueryVariables({
                ...variables,
                cursor: moment(
                  data.posts.posts[data.posts.posts.length - 1].createdAt
                ).format(),
              });
            }}
            m="auto"
            my="8"
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </div>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(Index);
