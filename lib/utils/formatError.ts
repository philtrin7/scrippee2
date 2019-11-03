import { ApolloError } from 'apollo-client'

export const formatValidationErrors = (error: ApolloError) => {
  const formattedError: { [key: string]: string } = {}
  if (
    error.graphQLErrors[0].extensions &&
    error.graphQLErrors[0].extensions.exception.name === 'ValidationError'
  ) {
    error.graphQLErrors[0].extensions.exception.inner.forEach(
      (validationErr: any) => {
        formattedError[validationErr.path] = validationErr.message
      }
    )
    return formattedError
  } else {
    throw new Error('Unexpected error["createOrder"]')
  }
}
