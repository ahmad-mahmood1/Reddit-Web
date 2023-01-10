import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery } from "urql";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { createPostMutation } from "../graphql/mutations/createPost";
import { currentUser } from "../graphql/queries/me";
import { errorMapper } from "../utils";
import { urqlClient } from "../utils/urql/urqlClient";
type Props = {};

const CreatePost = (props: Props) => {
  const router = useRouter();
  const [{ data: user, fetching }] = useQuery({
    query: currentUser,
  });
  useEffect(() => {
    !fetching && !user?.me && router.push("/login?next=/createPost");
  }, []);

  const [, makePost] = useMutation(createPostMutation);

  return (
    <Wrapper>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const resp = await makePost({ options: values });
          if (resp.data?.createPost.error) {
            setErrors(errorMapper(resp.data?.createPost.error));
          }
          if (resp.data?.createPost.post) {
            router.push("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              label="Title"
              placeholder="Make a post title"
            />
            <Box mt={4}>
              <InputField
                name="text"
                label="Text"
                placeholder="Enter post text"
                textArea
              />
            </Box>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(urqlClient)(CreatePost);
