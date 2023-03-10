import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { useMutation } from "urql";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { forgotPassword } from "../graphql/mutations/forgotPassword";
import { urqlClient } from "../utils/urql/urqlClient";

type Props = {};

const ForgotPassword: React.FC = (props: Props) => {
  const [, sendForgotPasswordEmail] = useMutation(forgotPassword);
  const [formComplete, setFormComplete] = useState(false);
  return (
    <Wrapper>
      {formComplete ? (
        <Box>A reset password link has been sent on this email!</Box>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { setErrors }) => {
            const resp = await sendForgotPasswordEmail({ email: values.email });
            setFormComplete(true);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <InputField
                name="email"
                label="Email"
                placeholder="Email "
                value={values.email}
              />

              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default withUrqlClient(urqlClient)(ForgotPassword);
