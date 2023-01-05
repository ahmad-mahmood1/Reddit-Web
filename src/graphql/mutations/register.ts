import { graphql } from "../../generated";

export const registerMutation = graphql(`
  mutation Register($username: String!, $password: String!) {
    registeration(options: { username: $username, password: $password }) {
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
