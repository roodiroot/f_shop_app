import { gql } from "@apollo/client";

export const GET_CATEGORY_BY_SLUG = gql`
  query Categories($filters: CategoryFiltersInput) {
    categories(filters: $filters) {
      documentId
      name
      slug
      children {
        documentId
        name
        slug
        children {
          documentId
          name
          slug
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Query {
    categories {
      slug
      name
      documentId
      parent {
        documentId
        slug
        name
      }
    }
  }
`;

export const GET_CATEGORIES_ROOT = gql`
  query Categories(
    $filters: CategoryFiltersInput
    $categorySort: [String]
    $productSort: [String]
  ) {
    categories(sort: $categorySort, filters: $filters) {
      slug
      name
      documentId
      products(sort: $productSort, pagination: { limit: 4 }) {
        slug
        documentId
        shortName
      }
      children {
        slug
        name
        documentId
        products(pagination: { limit: 1 }) {
          slug
          documentId
          shortName
          product_variants {
            price
            size
            color
            stock
            colorHex
            images {
              formats
            }
          }
        }
      }
    }
  }
`;
