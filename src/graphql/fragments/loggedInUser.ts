import { graphql } from "../../generated";

export const loggedInUserFragment = graphql(
  `
    fragment LoggedInUser on User {
      id
      username
    }
  `
);
