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
    "\n    fragment LoggedInUser on User {\n      id\n      username\n      email\n    }\n  ": types.LoggedInUserFragmentDoc,
    "\n  mutation changePassword($token: String!, $newPassword: String!) {\n    changePassword(token: $token, newPassword: $newPassword) {\n      error {\n        field\n        message\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation CreatePost($options: PostInput!) {\n    createPost(options: $options) {\n      error {\n        field\n        message\n      }\n      post {\n        id\n        creatorId\n        title\n        text\n      }\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation Login($options: LoginInput!) {\n    login(options: $options) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n": types.LoginDocument,
    "\n    mutation Logout {\n      logout\n    }\n  ": types.LogoutDocument,
    "\n  mutation Register($username: String!, $password: String!, $email: String!) {\n    registeration(\n      options: { username: $username, password: $password, email: $email }\n    ) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  query loggedInUser {\n    me {\n      ...LoggedInUser\n    }\n  }\n": types.LoggedInUserDocument,
    "\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        title\n        text\n        points\n        creatorId\n        textSnippet\n        createdAt\n        updatedAt\n      }\n      hasMore\n    }\n  }\n": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment LoggedInUser on User {\n      id\n      username\n      email\n    }\n  "): (typeof documents)["\n    fragment LoggedInUser on User {\n      id\n      username\n      email\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changePassword($token: String!, $newPassword: String!) {\n    changePassword(token: $token, newPassword: $newPassword) {\n      error {\n        field\n        message\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation changePassword($token: String!, $newPassword: String!) {\n    changePassword(token: $token, newPassword: $newPassword) {\n      error {\n        field\n        message\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($options: PostInput!) {\n    createPost(options: $options) {\n      error {\n        field\n        message\n      }\n      post {\n        id\n        creatorId\n        title\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($options: PostInput!) {\n    createPost(options: $options) {\n      error {\n        field\n        message\n      }\n      post {\n        id\n        creatorId\n        title\n        text\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"): (typeof documents)["\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($options: LoginInput!) {\n    login(options: $options) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($options: LoginInput!) {\n    login(options: $options) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Logout {\n      logout\n    }\n  "): (typeof documents)["\n    mutation Logout {\n      logout\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($username: String!, $password: String!, $email: String!) {\n    registeration(\n      options: { username: $username, password: $password, email: $email }\n    ) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($username: String!, $password: String!, $email: String!) {\n    registeration(\n      options: { username: $username, password: $password, email: $email }\n    ) {\n      error {\n        message\n        field\n      }\n      user {\n        ...LoggedInUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query loggedInUser {\n    me {\n      ...LoggedInUser\n    }\n  }\n"): (typeof documents)["\n  query loggedInUser {\n    me {\n      ...LoggedInUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        title\n        text\n        points\n        creatorId\n        textSnippet\n        createdAt\n        updatedAt\n      }\n      hasMore\n    }\n  }\n"): (typeof documents)["\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        title\n        text\n        points\n        creatorId\n        textSnippet\n        createdAt\n        updatedAt\n      }\n      hasMore\n    }\n  }\n"];

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