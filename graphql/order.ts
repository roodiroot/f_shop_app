import { gql } from "@apollo/client";

export const GET_ORDER_BY_ID = gql`
  query Order($documentId: ID!) {
    order(documentId: $documentId) {
      deliveryAddress
      comment
      email
      totalPrice
      statusOrder
      phone
      paymentMethod
      paymentId
      createdAt
      updatedAt
      order_items {
        documentId
        title
        sku
        quantity
        product_variant {
          size
          price
          colorHex
          images {
            formats
          }
        }
        product {
          slug
        }
      }
    }
  }
`;
export const GET_ORDERS_BY_USER_ID = gql`
  query Order(
    $filters: OrderFiltersInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    orders(filters: $filters, sort: $sort, pagination: $pagination) {
      documentId
      createdAt
      updatedAt
      totalPrice
      statusOrder
      order_items {
        documentId
        title
        sku
        quantity
        product_variant {
          size
          price
          colorHex
          images {
            formats
          }
        }
        product {
          slug
        }
      }
    }
  }
`;
