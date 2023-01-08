import { graphql } from "../../generated";

export const changePassword = graphql(`
  mutation changePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      error {
        field
        message
      }
      user {
        ...LoggedInUser
      }
    }
  }
`);
