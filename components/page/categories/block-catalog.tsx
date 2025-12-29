import { useImageSource } from "@/hooks/useImageSource";
import { CategoryRootType } from "@/types/category";
import { router } from "expo-router";
import { Dimensions, Image, Pressable, View } from "react-native";
import SubCategoryItem from "./sub-category-item";

type Props = {
  slug: string;
  categories: CategoryRootType;
};
export default function BlockCatalog({ slug, categories }: Props) {
  const GAP = 12;
  const PADDING_HORIZONTAL = 16;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const WIDTH_ITEM = (SCREEN_WIDTH - PADDING_HORIZONTAL * 2 - GAP * 2) / 3;

  const source = useImageSource(categories.image, "medium");

  return (
    <View>
      <Pressable
        onPress={() => router.push(`/(tabs)/catalog/category/${slug}`)}
        className="aspect-[2.6/1] bg-gray-100 rounded-3xl overflow-hidden"
      >
        <Image
          source={source}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </Pressable>
      <View style={{ gap: GAP }} className="flex-row flex-wrap mt-4">
        {categories.children.map((subCategory) => (
          <View key={subCategory.documentId} style={{ width: WIDTH_ITEM }}>
            <SubCategoryItem
              slug={subCategory.slug}
              name={subCategory.name}
              svgUrl={subCategory.icon.url}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
