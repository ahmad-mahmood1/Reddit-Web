import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { withApollo } from "next-apollo";
import { PaginatedPosts } from "../../generated/graphql";
import { setContext } from "@apollo/client/link/context";
// import withApollo from "./withApollo";
import { NextPageContext } from "next";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const apolloClient = (ctx: NextPageContext | undefined) =>
  new ApolloClient({
    link: httpLink,
    credentials: "include",
    ssrMode: true,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });

export default withApollo(apolloClient);
