import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products(
    $filters: ProductFiltersInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    products_connection(
      filters: $filters
      sort: $sort
      pagination: $pagination
    ) {
      nodes {
        slug
        documentId
        shortName
        subcategory
        vendor
        categoryParam

        product_variants {
          documentId
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
      pageInfo {
        page
        pageCount
        pageSize
        total
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Product($documentId: ID!) {
    product(documentId: $documentId) {
      slug
      categoryParam
      composition
      denomination
      description
      documentId
      fitBottom
      gender
      manufaktura
      rise
      season
      seasonality
      shortName
      sku
      subcategory
      topBottom
      vendor
      waist
      product_variants {
        documentId
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
`;
export const GET_PRODUCT_BY_SLUG = gql`
  query Products($filters: ProductFiltersInput) {
    products(filters: $filters) {
      slug
      categoryParam
      composition
      denomination
      description
      documentId
      fitBottom
      gender
      manufaktura
      rise
      season
      seasonality
      shortName
      sku
      subcategory
      topBottom
      vendor
      waist
      product_variants {
        documentId
        price
        size
        color
        colorHex
        stock
        images {
          formats
        }
      }
      categories {
        name
        slug
        parent {
          name
          slug
          parent {
            name
            slug
          }
        }
      }
    }
  }
`;
