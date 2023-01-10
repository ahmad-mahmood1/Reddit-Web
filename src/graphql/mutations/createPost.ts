import { graphql } from "../../generated";

export const createPostMutation = graphql(`
  mutation CreatePost($options: PostInput!) {
    createPost(options: $options) {
      error {
        field
        message
      }
      post {
        id
        creatorId
        title
        text
      }
    }
  }
`);
