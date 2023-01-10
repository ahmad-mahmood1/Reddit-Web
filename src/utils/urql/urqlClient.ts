import { cacheExchange } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, fetchExchange, mapExchange } from "urql";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
} from "../../generated/graphql";
import { cursorPagination } from "./cursorPagination";
import { updateCache } from "./updateQuery";

export const urqlClient = (ssrExchange: any) => {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [
      dedupExchange,
      mapExchange({
        onError(error, operation) {
          if (error.message.includes("Not Authenticated")) {
            Router.replace("/login");
          }
        },
      }),
      cacheExchange({
        resolvers: {
          keys: {
            PaginatedPosts: () => null,
          },
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            logout: (_result, args, cache, info) => {
              updateCache<LogoutMutation, LoggedInUserQuery>(
                cache,
                { query: LoggedInUserDocument },
                _result,
                (result, query) => {
                  if (result.logout) {
                    return {
                      me: null,
                    };
                  } else {
                    return query;
                  }
                }
              );
            },
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
                { query: LoggedInUserDocument },
                _result,
                (result, query) => {
                  if (result.registeration.error) {
                    return query;
                  } else {
                    return {
                      me: result.registeration.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};
