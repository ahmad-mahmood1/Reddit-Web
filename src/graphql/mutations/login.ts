import { graphql } from "../../generated";
export const loginMutation = graphql(`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
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
