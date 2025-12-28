import Header from "@/components/layout/header";
import CatalogSection from "@/components/page/main-page/catalog/catalog-section";
import HeroSection from "@/components/page/main-page/hero/hero-section";
import ProductBlockSection from "@/components/page/main-page/product-block/product-block-section";
import CastomIcon from "@/components/ui/icons/castom-icon";
import { useProduct } from "@/hooks/query/use-products";
import { useProductCategories } from "@/hooks/query/use-root-categories";
import { CategoryScreen } from "@/types/category";
import { ProductAttributes } from "@/types/products";
import { ErrorLike } from "@apollo/client";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";

type Section =
  | { type: "hero" }
  | {
      type: "categories";
      data: CategoryScreen[];
      loading?: boolean;
      error?: ErrorLike;
    }
  | {
      type: "products";
      title: string;
      data: ProductAttributes[];
      loading: boolean;
      error?: ErrorLike;
    };

export default function Home() {
  const PAGE_SIZE_HITS = 10;

  const [refreshing, setRefreshing] = useState(false);

  const prodFilterArg = {
    filters: {
      or: [{ sale: { gt: "1" } }, { hit: { eq: true } }],
    },
    sort: ["updatedAt:desc"],
    pagination: { page: 1, pageSize: PAGE_SIZE_HITS },
  };
  const {
    productsList,
    pageInfo,
    loading: loadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useProduct({ ...prodFilterArg });

  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
    refetch: refetchCategoies,
  } = useProductCategories();

  const SECTIONS: Section[] = [
    { type: "hero" },
    {
      type: "categories",
      data: categories,
      loading: loadingCategories,
      error: errorCategories,
    },
    {
      type: "products",
      title: "Вам понравиться",
      data: productsList,
      loading: loadingProducts,
      error: errorProducts,
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchProducts({ ...prodFilterArg });
    await refetchCategoies();
    setRefreshing(false);
  };

  return (
    <View className="bg-white">
      <Header
        headerOptions={{
          titleElement: <CastomIcon size={40} name="logo" />,
          leftButtonIcon: "heart",
          leftButtonFunc: () => router.push("/(tabs)/favorites"),
        }}
      />
      <FlatList
        data={SECTIONS}
        keyExtractor={(_, i) => i.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => {
          switch (item.type) {
            case "hero":
              return <HeroSection />;

            case "categories":
              return (
                <CatalogSection
                  categories={item.data}
                  loading={item.loading}
                  error={item.error}
                />
              );

            case "products":
              return (
                <ProductBlockSection
                  title={item.title}
                  products={item.data}
                  loading={item.loading}
                  error={item.error}
                />
              );
          }
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
