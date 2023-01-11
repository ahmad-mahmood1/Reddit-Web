import { graphql } from "../../generated";

export const postsQuery = graphql(`
  query Posts($limit: Int!, $cursor: DateTime) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
        ...PostSnippet
      }
      hasMore
    }
  }
`);
