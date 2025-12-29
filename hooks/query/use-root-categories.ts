import { GET_CATEGORIES_ROOT, GET_CATEGORIES_SHORT } from "@/graphql/category";
import { CategoryRootType, CategoryScreen } from "@/types/category";
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
      categorySort: ["categoryId:asc"],
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
export const useProductCategories = () => {
  const { data, loading, error, refetch } = useQuery<{
    categories: CategoryScreen[];
  }>(GET_CATEGORIES_SHORT, {
    variables: {
      filters: {
        products: {
          documentId: {
            notNull: true,
          },
        },
      },
    },
    fetchPolicy: "no-cache",
  });

  return {
    data: data?.categories || [],
    loading,
    error,
    refetch,
  };
};
