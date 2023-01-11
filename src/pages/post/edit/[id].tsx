import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "urql";
import InputField from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { updatePostMutation } from "../../../graphql/mutations/updatePost";
import { postQuery } from "../../../graphql/queries/post";
import { useGetIntId } from "../../../utils";
import { urqlClient } from "../../../utils/urql/urqlClient";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useQuery({
    query: postQuery,
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useMutation(updatePostMutation);
  if (fetching) {
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
          await updatePost({ id: intId, ...values });
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

export default withUrqlClient(urqlClient)(EditPost);
