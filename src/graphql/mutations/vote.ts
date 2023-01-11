import { graphql } from "../../generated";

export const vote = graphql(`
  mutation Vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId)
  }
`);
