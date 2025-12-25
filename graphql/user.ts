import { gql } from "@apollo/client";

export const GET_MY = gql`
  query Query {
    me {
      username
      email
      documentId
      confirmed
      blocked
    }
  }
`;
