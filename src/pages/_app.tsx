import { ChakraProvider } from "@chakra-ui/react";

import { AppProps } from "next/app";
import theme from "../theme";

import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  LoginDocument,
  LoginMutation,
  RegisterDocument,
  RegisterMutation,
} from "../generated/graphql";

const updateCache = <Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) => {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
};

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            updateCache<LoginMutation, LoggedInUserQuery>(
              cache,
              { query: LoggedInUserDocument },
              _result,
              (result, query) => {
                if (result.login.error) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          registeration: (_result, args, cache, info) => {
            updateCache<RegisterMutation, LoggedInUserQuery>(
              cache,
              { query: RegisterDocument },
              _result,
              (result, query) => {
                if (result.registration.user) {
                  return {
                    me: result.registration.user,
                  };
                } else {
                  return query;
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
