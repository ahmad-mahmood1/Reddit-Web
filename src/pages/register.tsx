import { useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { LoggedInUserDocument, LoggedInUserQuery } from "../generated/graphql";
import { registerMutation } from "../graphql/mutations/register";
import apolloClient from "../utils/apollo/apolloClient";
import { errorMapper } from "../utils/index";

export const Register = () => {
  const [register] = useMutation(registerMutation);
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const resp = await register({
            variables: values,

            update: (cache, { data }) => {
              cache.writeQuery<LoggedInUserQuery>({
                query: LoggedInUserDocument,
                data: {
                  __typename: "Query",
                  me: data?.registeration?.user,
                },
              });
            },
          });
          if (resp.data?.registeration.error) {
            setErrors(errorMapper(resp.data.registeration.error));
          } else if (resp.data?.registeration?.user) {
            router.push("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="Username"
              value={values.username}
            />
            <Box mt={4}>
              <InputField
                name="email"
                label="Email"
                placeholder="Email"
                value={values.email}
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                label="Password"
                placeholder="Password"
                value={values.password}
                type={"password"}
              />
            </Box>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default apolloClient({ ssr: false })(Register);
