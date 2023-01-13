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
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { useMutation, useQuery } from "urql";
import { EditDeletePostButtons } from "../components/EditDeletePostsButton";
import { Layout } from "../components/Layout";
import VoteSection from "../components/VoteSection";
import { useFragment } from "../generated/fragment-masking";
import {
  LoggedInUserFragmentDoc,
  PostSnippetFragmentDoc,
  PostsQueryVariables,
} from "../generated/graphql";
import { deletePostMutation } from "../graphql/mutations/deletePost";
import { currentUser } from "../graphql/queries/me";
import { postsQuery } from "../graphql/queries/posts";
import { urqlClient } from "../utils/urql/urqlClient";

const Index = () => {
  const [variables, setQueryVariables] = useState<PostsQueryVariables>({
    limit: 10,
  });
  const [{ data, fetching: fetchingPosts }] = useQuery({
    query: postsQuery,
    variables,
  });

  const lastPost = useFragment(
    PostSnippetFragmentDoc,
    data?.posts.posts[data.posts.posts.length - 1]
  );

  const [{ data: user }] = useQuery({
    query: currentUser,
  });
  const loggedInUser = useFragment(LoggedInUserFragmentDoc, user?.me);

  if (!fetchingPosts && !data) {
    return <div>No Data</div>;
  }

  return (
    <Layout>
      {!data && fetchingPosts ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <Stack spacing={8} direction="column">
            {data?.posts?.posts.map((postObject, i) => {
              const post = useFragment(PostSnippetFragmentDoc, postObject);
              return (
                <Card shadow={"md"} borderWidth="1px" w={"auto"} key={post.id}>
                  <Flex>
                    <VoteSection post={post} />
                    <Box width={"100%"}>
                      <CardHeader>
                        <Link as={NextLink} href={`/post/${post.id}`} size="lg">
                          <Heading size={"lg"}>
                            {post.id}-{post.title}
                          </Heading>
                        </Link>
                      </CardHeader>
                      <CardBody py={0}>
                        <Text fontSize="lg">
                          Posted By {post.creator.username}
                        </Text>
                        <Text>{post.textSnippet}</Text>
                      </CardBody>
                      <CardFooter>
                        <Flex align={"center"} flex={1}>
                          <Text>
                            {moment(post.createdAt).format(
                              "DD-MM-YYYY HH:MM:SS"
                            )}
                          </Text>
                          <Spacer />
                          <EditDeletePostButtons
                            id={loggedInUser?.id}
                            creatorId={post.creator.id}
                          />
                        </Flex>
                      </CardFooter>
                    </Box>
                  </Flex>
                </Card>
              );
            })}
          </Stack>
        </Box>
      )}

      {data && data.posts.posts.length && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setQueryVariables({
                ...variables,
                cursor: lastPost?.createdAt,
              });
            }}
            m="auto"
            my="8"
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(Index);
