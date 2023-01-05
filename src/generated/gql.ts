/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    fragment LoggedInUser on User {\n      id\n      username\n    }\n  ": types.LoggedInUserFragmentDoc,
    "\n  mutation Login($options: UsernamePasswordInput!) {\n    login(options: $options) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n": types.LoginDocument,
    "\n    mutation Logout {\n      logout\n    }\n  ": types.LogoutDocument,
    "\n  mutation Register($username: String!, $password: String!) {\n    registeration(options: { username: $username, password: $password }) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  query loggedInUser {\n    me {\n      ...LoggedInUser\n    }\n  }\n": types.LoggedInUserDocument,
    "\n  query Posts {\n    posts {\n      id\n      title\n      createdAt\n      updatedAt\n    }\n  }\n": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment LoggedInUser on User {\n      id\n      username\n    }\n  "): (typeof documents)["\n    fragment LoggedInUser on User {\n      id\n      username\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($options: UsernamePasswordInput!) {\n    login(options: $options) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($options: UsernamePasswordInput!) {\n    login(options: $options) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Logout {\n      logout\n    }\n  "): (typeof documents)["\n    mutation Logout {\n      logout\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($username: String!, $password: String!) {\n    registeration(options: { username: $username, password: $password }) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($username: String!, $password: String!) {\n    registeration(options: { username: $username, password: $password }) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query loggedInUser {\n    me {\n      ...LoggedInUser\n    }\n  }\n"): (typeof documents)["\n  query loggedInUser {\n    me {\n      ...LoggedInUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts {\n    posts {\n      id\n      title\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Posts {\n    posts {\n      id\n      title\n      createdAt\n      updatedAt\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;