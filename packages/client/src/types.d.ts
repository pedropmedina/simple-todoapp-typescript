import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type Auth = {
   __typename?: 'Auth',
  token: Scalars['String'],
  user: User,
};

export type CreateTodoInput = {
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  isDone?: Maybe<Scalars['Boolean']>,
};


export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createTodo: Todo,
  deleteTodo: Scalars['Boolean'],
  updateTodo: Todo,
  login: Auth,
  signup: Auth,
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput
};


export type MutationDeleteTodoArgs = {
  todoId: Scalars['Float']
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationSignupArgs = {
  input: SingupInput
};

export type Query = {
   __typename?: 'Query',
  getTodos: Array<Todo>,
  getUsers: Array<User>,
  me: User,
};

export type SingupInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Todo = {
   __typename?: 'Todo',
  id: Scalars['Float'],
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  isDone?: Maybe<Scalars['Boolean']>,
  user: User,
  createdAt: Scalars['DateTime'],
};

export type UpdateTodoInput = {
  todoId: Scalars['Float'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  isDone?: Maybe<Scalars['Boolean']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  todos?: Maybe<Array<Todo>>,
  createdAt: Scalars['DateTime'],
};

export type GetTodosQueryVariables = {};


export type GetTodosQuery = (
  { __typename?: 'Query' }
  & { getTodos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'isDone' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ) }
  )> }
);


export const GetTodosDocument = gql`
    query GetTodos {
  getTodos {
    id
    title
    description
    isDone
    createdAt
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, baseOptions);
      }
export function useGetTodosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, baseOptions);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosQueryResult = ApolloReactCommon.QueryResult<GetTodosQuery, GetTodosQueryVariables>;