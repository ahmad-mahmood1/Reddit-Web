import { graphql } from "../../generated";
import { PostSnippetFragmentDoc } from "../../generated/graphql";
import { postSnippet } from "../fragments/postSnippet";

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
