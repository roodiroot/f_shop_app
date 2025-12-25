import { GET_ORDERS_BY_USER_ID } from "@/graphql/order";
import { Order } from "@/types/order";
import { useQuery } from "@apollo/client/react";

export const useHistoryOrders = (
  userId?: string,
  sort?: string,
  limit = 10
) => {
  const { data, loading, error, refetch, networkStatus } = useQuery<{
    orders: Order[];
  }>(GET_ORDERS_BY_USER_ID, {
    variables: {
      filters: {
        user: {
          documentId: {
            eq: userId,
          },
        },
      },
      sort,
      pagination: {
        limit,
      },
    },
    fetchPolicy: "no-cache",
  });

  return {
    data: data?.orders,
    loading,
    error,
    refetch,
    networkStatus,
  };
};
