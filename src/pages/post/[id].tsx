import { withUrqlClient } from "next-urql";
import { Box, Heading } from "@chakra-ui/react";
import { EditDeletePostButtons } from "../../components/EditDeletePostsButton";
import { Layout } from "../../components/Layout";
import { postQuery } from "../../graphql/queries/post";
import { useGetIntId } from "../../utils";
import { urqlClient } from "../../utils/urql/urqlClient";
import { useQuery } from "@apollo/client";
import apolloClient from "../../utils/apollo/apolloClient";

const Post = () => {
  const intId = useGetIntId();
  const { data, error, loading } = useQuery(postQuery, {
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default apolloClient({ ssr: true })(Post);
