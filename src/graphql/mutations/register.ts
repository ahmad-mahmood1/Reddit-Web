import { graphql } from "../../generated";

export const registerMutation = graphql(`
  mutation Register($username: String!, $password: String!, $email: String!) {
    registeration(
      options: { username: $username, password: $password, email: $email }
    ) {
      error {
        message
        field
      }
      user {
        ...LoggedInUser
      }
    }
  }
`);
