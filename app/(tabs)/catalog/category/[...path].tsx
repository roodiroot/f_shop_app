import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from "react-native";

import FilterSortComponnt from "@/components/page/catalog/filters_sort/filters-sort-component";
import { ProductCard } from "@/components/page/catalog/product-card/product-card";
import SkeletonCard from "@/components/page/catalog/product-card/skeleton-card";
import SkeletonFilters from "@/components/page/catalog/product-card/skeleton-filters";
import WrapperCatalog from "@/components/ui/wrapper-catalog";
import { useCategoryBySlug } from "@/hooks/query/use-category-by-slug";
import { useProduct } from "@/hooks/query/use-products";
import { useCatalogFilters } from "@/hooks/use-catalog-filters";
import { useCatalogSort } from "@/hooks/use-catalog-sort";
import { buildTextFilters } from "@/utils/build-text-filters";
import { collectSlugs } from "@/utils/collect-slugs";

export default function CategoryPage() {
  const PAGE_SIZE = 16;

  const GAP = 12;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = (SCREEN_WIDTH - GAP * 3) / 2;

  const { path } = useLocalSearchParams<{
    path: string[];
  }>();
  const slug = path?.at(-1) ?? "";

  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    loading: loadingCategory,
    error: errorCategory,
  } = useCategoryBySlug({ slug });
  const { applied, reset, resetById } = useCatalogFilters();
  const { sortType, resetSort } = useCatalogSort();
  const categoryName = data?.name;

  const slugs = useMemo(() => collectSlugs(data), [data?.slug]);

  const filtersForQuery = useMemo(() => {
    const categoryFilter = {
      categories: { slug: { in: [...slugs] } },
    };
    const textFilters = buildTextFilters(applied);
    return { ...categoryFilter, ...textFilters };
  }, [slugs, applied]);

  const {
    productsList,
    pageInfo,
    loading,
    error,
    refetch,
    fetchMore,
    isFetchingMore,
  } = useProduct({
    filters: filtersForQuery,
    sort: [sortType],
    pagination: { page: 1, pageSize: PAGE_SIZE },
  });

  const isInitialLoading =
    (loadingCategory || loading) && productsList.length === 0;

  useEffect(() => {
    reset();
    resetSort();
  }, [slug, reset, resetSort]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch({
      filters: filtersForQuery,
      sort: [sortType],
      pagination: { page: 1, pageSize: PAGE_SIZE },
    });
    setRefreshing(false);
  };

  const loadMoreProducts = () => {
    if (!pageInfo) return;
    if (isFetchingMore) return;
    if (pageInfo.page >= pageInfo.pageCount) return;

    fetchMore({
      variables: {
        filters: filtersForQuery,
        sort: [sortType],
        pagination: {
          page: pageInfo.page + 1,
          pageSize: PAGE_SIZE,
        },
      },
    });
  };

  if (error || errorCategory) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>ERROR DET DATA...</Text>
      </View>
    );
  }

  if (isInitialLoading) {
    return (
      <WrapperCatalog headerSown>
        <FlatList
          data={new Array(6).fill(null)}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ padding: GAP }}
          columnWrapperStyle={{ gap: GAP }}
          ListHeaderComponent={<SkeletonFilters />}
          ListHeaderComponentStyle={{
            paddingBottom: 10,
          }}
          renderItem={() => <SkeletonCard itemWidth={ITEM_WIDTH} />}
        />
      </WrapperCatalog>
    );
  }

  return (
    <WrapperCatalog headerSown headerTitle={categoryName}>
      <FlatList
        data={productsList}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.documentId}
        contentContainerStyle={{ padding: GAP }}
        columnWrapperStyle={{ gap: GAP }}
        ListHeaderComponent={
          <View>
            <FilterSortComponnt
              categoryId={data?.documentId || ""}
              activFilters={applied}
              resetFilterById={resetById}
            />
          </View>
        }
        ListHeaderComponentStyle={{
          width: "100%",
          paddingBottom: 10,
        }}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH, height: 343.3 }} className="mb-6">
            <ProductCard
              title={item.shortName}
              slug={item.slug}
              image={item?.product_variants?.[0]?.images?.[0]}
              product_variants={item?.product_variants}
              // ===============
              // product={item}
            />
          </View>
        )}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </WrapperCatalog>
  );
}
