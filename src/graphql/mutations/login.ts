import { graphql } from "../../generated";
export const loginMutation = graphql(`
  mutation Login($options: LoginInput!) {
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
