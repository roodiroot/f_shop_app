import Header from "@/components/layout/header";
import ReturnError from "@/components/layout/return-error";
import BlockCatalog from "@/components/page/categories/block-catalog";
import SceletonCategory from "@/components/page/categories/sceleton";
import { useRootCategories } from "@/hooks/query/use-root-categories";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function CategoriesPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { categories, loading, error, refetch } = useRootCategories();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (error) {
    return <ReturnError />;
  }

  if (loading) {
    return (
      <View className="bg-white flex-1">
        <Header title="Каталог" />
        <SceletonCategory />
      </View>
    );
  }

  return (
    <View className="bg-white flex-1">
      <Header title="Каталог" />
      <FlatList
        data={categories}
        contentContainerClassName="mt-4 px-4 gap-8 pb-10"
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(i) => i.documentId.toString()}
        renderItem={({ item }) => (
          <BlockCatalog
            key={item.documentId}
            slug={item.slug}
            categories={item}
          />
        )}
      ></FlatList>
    </View>
  );
}
