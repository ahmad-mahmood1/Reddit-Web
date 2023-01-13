import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { withApollo } from "next-apollo";
import { PaginatedPosts } from "../../generated/graphql";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  const qid = localStorage.getItem("qid");
  const cookie = typeof window === "undefined" ? qid : undefined;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
      cookie,
    },
  };
});

const apolloClient = new ApolloClient({
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
