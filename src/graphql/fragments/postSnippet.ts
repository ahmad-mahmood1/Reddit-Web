import { graphql } from "../../generated";

export const loggedInUserFragment = graphql(
  `
    fragment PostSnippet on Post {
      id
      createdAt
      updatedAt
      title
      points
      textSnippet
      voteStatus
      creator {
        id
        username
        email
      }
    }
  `
);
