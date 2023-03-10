import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "urql";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { loginMutation } from "../graphql/mutations/login";
import { errorMapper } from "../utils/index";
import { urqlClient } from "../utils/urql/urqlClient";
export const Login: React.FC = () => {
  const [, login] = useMutation(loginMutation);
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ emailOrUsername: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const resp = await login({ options: values });
          if (resp.data?.login.error) {
            setErrors(errorMapper(resp.data.login.error));
          } else if (resp.data?.login.user) {
            router.query.next
              ? router.push(`${router.query.next}`)
              : router.push("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="emailOrUsername"
              label="Email/Username"
              placeholder="Email or Username"
              value={values.emailOrUsername}
            />
            <Box mt={4}>
              <InputField
                name="password"
                label="Password"
                placeholder="Password"
                value={values.password}
                type={"password"}
              />
            </Box>
            <Flex flex={"row"} flexDirection={"row-reverse"} mt={2}>
              <Link as={NextLink} href="/forgot-password">
                Forgot Password?
              </Link>
            </Flex>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(urqlClient)(Login);
