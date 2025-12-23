import { GET_CATEGORY_BY_SLUG } from "@/graphql/category";
import { CategoryDocumentIdType } from "@/types/category";
import { useQuery } from "@apollo/client/react";

export const useCategoryBySlug = ({ slug }: { slug: string }) => {
  const { data, loading, error, refetch } = useQuery<CategoryDocumentIdType>(
    GET_CATEGORY_BY_SLUG,
    {
      variables: {
        filters: {
          slug: { eq: slug },
        },
      },
      fetchPolicy: "no-cache",
    }
  );

  return {
    data: data?.categories[0],
    error,
    loading,
    refetch,
  };
};
