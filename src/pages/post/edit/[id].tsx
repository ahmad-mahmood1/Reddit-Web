import { useMutation, useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import InputField from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { updatePostMutation } from "../../../graphql/mutations/updatePost";
import { postQuery } from "../../../graphql/queries/post";
import { useGetIntId } from "../../../utils";
import {
  addApolloState,
  initializeApollo,
} from "../../../utils/apollo/apolloClient";

const EditPost = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = useQuery(postQuery, {
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [updatePost] = useMutation(updatePostMutation);
  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ variables: { id: intId, ...values } });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting} color="teal">
              Update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({ ctx });

  if (ctx.query.id) {
    let id = parseInt(ctx.query.id as string);
    await apolloClient.query({ query: postQuery, variables: { id } });
  }
  return addApolloState(apolloClient, {
    props: {},
  });
};

export default EditPost;
