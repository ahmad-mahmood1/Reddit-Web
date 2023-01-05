import { graphql } from "../../generated";

export const logoutUser = graphql(
  `
    mutation Logout {
      logout
    }
  `
);
