import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Link,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "urql";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { changePassword } from "../../graphql/mutations/changePassword";
import { errorMapper } from "../../utils";

const ChangePassword: NextPage = () => {
  const [, setNewPassword] = useMutation(changePassword);
  const [tokenError, setTokenError] = useState<any | null>(null);
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const resp = await setNewPassword({
            token:
              typeof router.query.token === "string" ? router.query.token : "",
            newPassword: values.newPassword,
          });
          if (resp.data?.changePassword.error) {
            const errors = errorMapper(resp.data.changePassword.error);
            setErrors(errors);
            if ("token" in errors) {
              setTokenError(errors.token);
            }
          } else if (resp.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              value={values.newPassword}
              type="password"
            />
            {tokenError && (
              <Alert mt={2} status="error">
                <AlertIcon />
                <AlertDescription>
                  <Flex>
                    <Box>{tokenError}--</Box>
                    <Link
                      as={NextLink}
                      href="/forgotPassword"
                      color={"cyan.700"}
                    >
                      Forgot Password?
                    </Link>
                  </Flex>
                </AlertDescription>
              </Alert>
            )}
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangePassword;
