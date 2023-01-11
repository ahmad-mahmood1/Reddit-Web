import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, fetchExchange, gql, mapExchange } from "urql";
import { isServer } from "..";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  LoginMutation,
  LogoutMutation,
  MutationDeletePostArgs,
  RegisterMutation,
  VoteMutationVariables,
} from "../../generated/graphql";
import { cursorPagination } from "./cursorPagination";
import { updateCache } from "./updateQuery";

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments || {});
  });
}

export const urqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
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
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                id: (args as MutationDeletePostArgs).id,
              });
            },
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId } as any
              );

              if (data) {
                if (data.voteStatus === value) {
                  return;
                }
                const newPoints =
                  (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value } as any
                );
              }
            },
            createPost: (_result, args, cache, info) => {
              invalidateAllPosts(cache);
            },
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
              invalidateAllPosts(cache);
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
