import { useQuery } from "@apollo/client/react";

import { GET_PRODUCT_BY_SLUG } from "@/graphql/products";
import { Product } from "@/types/products";

export const useProductBySlug = ({ slug }: { slug: string }) => {
  const { data, loading, error, refetch } = useQuery<{ products: Product[] }>(
    GET_PRODUCT_BY_SLUG,
    {
      variables: {
        filters: {
          slug: {
            eq: slug,
          },
        },
      },
      fetchPolicy: "no-cache",
    }
  );

  return {
    product: data?.products[0],
    loading,
    error,
    refetch,
  };
};
