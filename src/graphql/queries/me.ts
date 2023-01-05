import { graphql } from "../../generated";

export const currentUser = graphql(`
  query loggedInUser {
    me {
      ...LoggedInUser
    }
  }
`);
