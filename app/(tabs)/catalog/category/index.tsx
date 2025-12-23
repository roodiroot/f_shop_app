// app/(tabs)/index.tsx
import WrapperList from "@/components/ui/wrapper-list";
import { useRootCategories } from "@/hooks/query/use-root-categories";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function CategoriesPage() {
  const { categories, loading, error, refetch } = useRootCategories();

  return (
    <WrapperList headerSown headerTitle="Каталог">
      <View className="py-4">
        {categories.map((category) => (
          <View
            key={category.documentId}
            className="mb-4 border-b pb-4 border-gray-200"
          >
            <Pressable
              onPress={() =>
                router.push(`/(tabs)/catalog/category/${category.slug}`)
              }
              className=""
            >
              <Text className="text-lg">{category.name}</Text>
            </Pressable>
            {category.children && category.children.length > 0 && (
              <View className="pl-4 mt-2 gap-2">
                {category.children.map((child) => (
                  <Pressable
                    key={child.documentId}
                    className="bg-gray-100 rounded-xl px-4"
                    onPress={() =>
                      router.push(
                        `/(tabs)/catalog/category/${category.slug}/${child.slug}`
                      )
                    }
                  >
                    <Text className="text-base py-3 font-medium">
                      {child.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        ))}
        {categories.map((category) => (
          <View
            key={category.documentId}
            className="mb-4 border-b pb-4 border-gray-200"
          >
            <Pressable
              onPress={() =>
                router.push(`/(tabs)/catalog/category/${category.slug}`)
              }
              className=""
            >
              <Text className="text-lg">{category.name}</Text>
            </Pressable>
            {category.children && category.children.length > 0 && (
              <View className="pl-4 mt-2 gap-2">
                {category.children.map((child) => (
                  <Pressable
                    key={child.documentId}
                    className="bg-gray-100 rounded-xl px-4"
                    onPress={() =>
                      router.push(
                        `/(tabs)/catalog/category/${category.slug}/${child.slug}`
                      )
                    }
                  >
                    <Text className="text-base py-3 font-medium">
                      {child.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </WrapperList>
  );
}
