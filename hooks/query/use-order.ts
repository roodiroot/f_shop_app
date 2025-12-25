import { GET_ORDER_BY_ID } from "@/graphql/order";
import { Order } from "@/types/order";
import { useQuery } from "@apollo/client/react";

export const useOrder = (documentId: string) => {
  const { data, loading, error, refetch, networkStatus } = useQuery<{
    order: Order;
  }>(GET_ORDER_BY_ID, {
    variables: {
      documentId,
    },
    fetchPolicy: "no-cache",
  });

  return {
    data: data?.order,
    loading,
    error,
    refetch,
    networkStatus,
  };
};
