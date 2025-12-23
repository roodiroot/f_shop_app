import FilterSortComponnt from "@/components/page/catalog/filters_sort/filters-sort-component";
import { ProductCard } from "@/components/page/catalog/product-card/product-card";
import SkeletonCard from "@/components/page/catalog/product-card/skeleton-card";
import SkeletonFilters from "@/components/page/catalog/product-card/skeleton-filters";
import EmptyPlaceholder from "@/components/ui/empty-placeholder";
import WrapperCatalog from "@/components/ui/wrapper-catalog";
import WrapperList from "@/components/ui/wrapper-list";
import { useProduct } from "@/hooks/query/use-products";
import { useCatalogSort } from "@/hooks/use-catalog-sort";
import { useFavorite } from "@/hooks/use-favorites";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from "react-native";

export default function Favorites() {
  const PAGE_SIZE = 2;

  const GAP = 12;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = (SCREEN_WIDTH - GAP * 3) / 2;

  const { items } = useFavorite();
  const { sortType, resetSort } = useCatalogSort();

  const ids = useMemo(() => [...items].sort(), [items]);

  const { productsList, pageInfo, loading, error, isFetchingMore, fetchMore } =
    useProduct({
      skip: !ids.length,
      filters: {
        documentId: { in: ids },
      },
      sort: [sortType],
      pagination: { page: 1, pageSize: PAGE_SIZE },
    });

  const isInitialLoading = loading && productsList.length === 0;

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetSort();
      };
    }, [])
  );

  const loadMoreProducts = () => {
    if (!pageInfo) return;
    if (isFetchingMore) return;
    if (pageInfo.page >= pageInfo.pageCount) return;

    fetchMore({
      variables: {
        filters: { documentId: { in: ids } },
        sort: [sortType],
        pagination: {
          page: pageInfo.page + 1,
          pageSize: PAGE_SIZE,
        },
      },
    });
  };

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>ERROR DET DATA...</Text>
      </View>
    );
  }

  if (isInitialLoading) {
    return (
      <WrapperCatalog headerSown headerTitle="Избранное">
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

  if (!ids.length) {
    return (
      <WrapperList headerSown headerTitle="Избранное">
        <EmptyPlaceholder title="В избранном пока нет товаров" />
      </WrapperList>
    );
  }

  return (
    <WrapperCatalog headerSown headerTitle="Избранное">
      <FlatList
        data={productsList}
        numColumns={2}
        keyExtractor={(item) => item.documentId}
        contentContainerStyle={{ padding: GAP }}
        columnWrapperStyle={{ gap: GAP }}
        ListHeaderComponent={<FilterSortComponnt />}
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
