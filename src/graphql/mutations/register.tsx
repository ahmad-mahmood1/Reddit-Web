import { graphql } from "../../generated";

export const registerMutation = graphql(`
  mutation Register($username: String!, $password: String!) {
    registration(options: { username: $username, password: $password }) {
      error {
        message
        field
      }
      user {
        id
        username
      }
    }
  }
`);
