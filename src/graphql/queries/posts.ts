import { graphql } from "../../generated";

export const postsQuery = graphql(`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
        id
        title
        text
        points
        creatorId
        textSnippet
        createdAt
        updatedAt
      }
      hasMore
    }
  }
`);
