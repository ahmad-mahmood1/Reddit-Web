import { useQuery } from "@apollo/client";
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
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import { EditDeletePostButtons } from "../components/EditDeletePostsButton";
import { Layout } from "../components/Layout";
import VoteSection from "../components/VoteSection";
import { useFragment } from "../generated/fragment-masking";
import { PostSnippetFragmentDoc } from "../generated/graphql";
import { currentUser } from "../graphql/queries/me";
import { postsQuery } from "../graphql/queries/posts";
import { addApolloState, initializeApollo } from "../utils/apollo/apolloClient";

const Index = (props: any) => {
  const {
    data,
    loading: fetchingPosts,
    error,
    fetchMore,
  } = useQuery(postsQuery, {
    variables: { limit: 10 },
  });
  if (error) {
    return (
      <>
        Error
        {error.message} {error.networkError?.cause}
      </>
    );
  }
  if (!fetchingPosts && !data) {
    return <div>No Data</div>;
  }

  return (
    <Layout>
      {!data && fetchingPosts ? (
        <div>Loading...</div>
      ) : (
        <Box mb={!data?.posts.hasMore ? "8" : ""}>
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
                          <Box ml="auto">
                            <EditDeletePostButtons
                              id={post.id}
                              creatorId={post.creator.id}
                            />
                          </Box>
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
              fetchMore({
                variables: {
                  cursor: data?.posts?.cursor,
                },
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({ ctx });
  // await apolloClient.query({
  //   query: postsQuery,
  //   variables: { limit: 10 },
  //   context: ctx,
  // });
  // await apolloClient.query({ query: currentUser, context: ctx });

  return addApolloState(apolloClient, {
    props: {},
  });
};
export default Index;
