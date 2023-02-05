import { graphql } from "../../generated";

export const postsQuery = graphql(`
  query PaginatedPosts($limit: Int!, $cursor: DateTime) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
        ...PostSnippet
      }
      hasMore
      cursor
    }
  }
`);
