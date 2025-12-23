import { GET_PRODUCTS } from "@/graphql/products";
import { ProductsQueryResponse } from "@/types/products";
import {
  PaginationParams,
  ProductFilters,
  SortParams,
} from "@/types/sort-filter-pagination";
import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface UseProductParams {
  filters?: ProductFilters;
  sort?: SortParams;
  pagination?: PaginationParams;
  skip?: boolean;
}

export const useProduct = ({
  filters = {},
  skip = false,
  sort = ["createdAt:desc"],
  pagination = { page: 1, pageSize: 12 },
}: UseProductParams) => {
  const { data, loading, error, refetch, fetchMore, networkStatus } =
    useQuery<ProductsQueryResponse>(GET_PRODUCTS, {
      skip,
      variables: {
        filters,
        sort,
        pagination,
      },
      notifyOnNetworkStatusChange: true,
    });

  return {
    productsList: data?.products_connection.nodes ?? [],
    pageInfo: data?.products_connection.pageInfo,
    loading,
    error,
    refetch,
    fetchMore,
    isFetchingMore: networkStatus === NetworkStatus.fetchMore,
  };
};
