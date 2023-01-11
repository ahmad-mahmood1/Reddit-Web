import { graphql } from "../../generated";

export const deletePostMutation = graphql(`
  mutation Delete($id: Int!) {
    deletePost(id: $id)
  }
`);
