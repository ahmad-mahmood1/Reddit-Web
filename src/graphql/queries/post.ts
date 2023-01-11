import { graphql } from "../../generated";

export const postQuery = graphql(`
  query Post($id: Int!) {
    post(id: $id) {
      id
      createdAt
      updatedAt
      title
      points
      text
      voteStatus
      creator {
        id
        username
        email
      }
    }
  }
`);
