import { GET_CATEGORIES_ROOT } from "@/graphql/category";
import { CategoryRootType } from "@/types/category";
import { useQuery } from "@apollo/client/react";

export const useRootCategories = () => {
  const { data, loading, error, refetch } = useQuery<{
    categories: CategoryRootType[];
  }>(GET_CATEGORIES_ROOT, {
    variables: {
      filters: {
        parent: {
          documentId: null,
        },
      },
      productSort: ["createdAt:desc"],
    },
    fetchPolicy: "no-cache",
  });

  return {
    categories: data?.categories || [],
    loading,
    error,
    refetch,
  };
};
