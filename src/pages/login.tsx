import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "urql";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { loginMutation } from "../graphql/mutations/login";
import { registerMutation } from "../graphql/mutations/register";
// import { useRegisterMutation } from "../generated/graphql";
import { errorMapper } from "../utils/index";

export const Login: React.FC = () => {
  const [, login] = useMutation(loginMutation);
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const resp = await login({ options: values });
          console.log("===  resp", resp);
          if (resp.data?.login.error) {
            setErrors(errorMapper(resp.data.login.error));
          } else if (resp.data?.login.user) {
            console.log("===here", resp);
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

export default Login;
