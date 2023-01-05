import { graphql } from "../../generated";

export const posts = graphql(`
  query Posts {
    posts {
      id
      title
      createdAt
      updatedAt
    }
  }
`);
