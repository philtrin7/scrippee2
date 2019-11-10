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
  DateTime: any,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  accessToken: Scalars['String'],
  user?: Maybe<User>,
};

export type Comment = {
   __typename?: 'Comment',
  id: Scalars['ID'],
  convo: Convo,
  text: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Convo = {
   __typename?: 'Convo',
  id: Scalars['ID'],
  order: Order,
  comments: Array<Comment>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type InboxOrders = {
   __typename?: 'InboxOrders',
  todays: Array<Order>,
  others: Array<Order>,
};

export type Mutation = {
   __typename?: 'Mutation',
  signin: SigninData,
  signup: Scalars['Boolean'],
  logout: Scalars['Boolean'],
  createOrder: Order,
};


export type MutationSigninArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignupArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationCreateOrderArgs = {
  item: Scalars['String'],
  customerName: Scalars['String'],
  contactNum?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
  customerName: Scalars['String'],
  item: Scalars['String'],
  contactNum?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  belongsTo: User,
  archive: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Orders = {
   __typename?: 'Orders',
  inbox?: Maybe<InboxOrders>,
  archive?: Maybe<Array<Order>>,
};

export type Query = {
   __typename?: 'Query',
  bye: Scalars['String'],
  me?: Maybe<User>,
  user?: Maybe<User>,
};

export type SigninData = {
   __typename?: 'SigninData',
  auth: AuthPayload,
  orders: Orders,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  orders: Orders,
};

export type ByeQueryVariables = {};


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type CreateOrderMutationVariables = {
  item: Scalars['String'],
  customerName: Scalars['String'],
  contactNum?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>
};


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'customerName' | 'item' | 'contactNum' | 'email' | 'archive' | 'createdAt' | 'updatedAt'>
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type SigninMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { signin: (
    { __typename?: 'SigninData' }
    & { auth: (
      { __typename?: 'AuthPayload' }
      & Pick<AuthPayload, 'accessToken'>
      & { user: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      )> }
    ), orders: (
      { __typename?: 'Orders' }
      & { inbox: Maybe<(
        { __typename?: 'InboxOrders' }
        & { todays: Array<(
          { __typename?: 'Order' }
          & Pick<Order, 'id' | 'customerName' | 'item' | 'contactNum' | 'email' | 'archive' | 'createdAt' | 'updatedAt'>
        )>, others: Array<(
          { __typename?: 'Order' }
          & Pick<Order, 'id' | 'customerName' | 'item' | 'contactNum' | 'email' | 'archive' | 'createdAt' | 'updatedAt'>
        )> }
      )>, archive: Maybe<Array<(
        { __typename?: 'Order' }
        & Pick<Order, 'id' | 'customerName' | 'item' | 'contactNum' | 'email' | 'archive' | 'createdAt' | 'updatedAt'>
      )>> }
    ) }
  ) }
);

export type SignupMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signup'>
);

export type UserQueryVariables = {};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { orders: (
      { __typename?: 'Orders' }
      & { inbox: Maybe<(
        { __typename?: 'InboxOrders' }
        & { todays: Array<(
          { __typename?: 'Order' }
          & Pick<Order, 'id' | 'customerName' | 'item' | 'contactNum' | 'email' | 'archive' | 'createdAt' | 'updatedAt'>
        )>, others: Array<(
          { __typename?: 'Order' }
          & Pick<Order, 'id' | 'customerName' | 'item' | 'contactNum' | 'email' | 'archive' | 'createdAt' | 'updatedAt'>
        )> }
      )>, archive: Maybe<Array<(
        { __typename?: 'Order' }
        & Pick<Order, 'id' | 'customerName' | 'item' | 'contactNum' | 'email' | 'archive' | 'createdAt' | 'updatedAt'>
      )>> }
    ) }
  )> }
);


export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return ApolloReactHooks.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
export function useByeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($item: String!, $customerName: String!, $contactNum: String, $email: String) {
  createOrder(item: $item, customerName: $customerName, contactNum: $contactNum, email: $email) {
    id
    customerName
    item
    contactNum
    email
    archive
    createdAt
    updatedAt
  }
}
    `;
export type CreateOrderMutationFn = ApolloReactCommon.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      item: // value for 'item'
 *      customerName: // value for 'customerName'
 *      contactNum: // value for 'contactNum'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, baseOptions);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = ApolloReactCommon.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const SigninDocument = gql`
    mutation Signin($email: String!, $password: String!) {
  signin(email: $email, password: $password) {
    auth {
      accessToken
      user {
        id
        email
      }
    }
    orders {
      inbox {
        todays {
          id
          customerName
          item
          contactNum
          email
          archive
          createdAt
          updatedAt
        }
        others {
          id
          customerName
          item
          contactNum
          email
          archive
          createdAt
          updatedAt
        }
      }
      archive {
        id
        customerName
        item
        contactNum
        email
        archive
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export type SigninMutationFn = ApolloReactCommon.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        return ApolloReactHooks.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, baseOptions);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = ApolloReactCommon.MutationResult<SigninMutation>;
export type SigninMutationOptions = ApolloReactCommon.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!) {
  signup(email: $email, password: $password)
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    orders {
      inbox {
        todays {
          id
          customerName
          item
          contactNum
          email
          archive
          createdAt
          updatedAt
        }
        others {
          id
          customerName
          item
          contactNum
          email
          archive
          createdAt
          updatedAt
        }
      }
      archive {
        id
        customerName
        item
        contactNum
        email
        archive
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;