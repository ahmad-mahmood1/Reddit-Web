import { graphql } from "../../generated";

export const forgotPassword = graphql(`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`);
