import { CategoryScreen } from "@/types/category";
import { ErrorLike } from "@apollo/client";
import { ScrollView, View } from "react-native";
import CatalogSectionItem from "./catalog-section-item";
import Sceleton from "./sceleton";

type Props = {
  categories: CategoryScreen[];
  loading?: boolean;
  error?: ErrorLike;
};

export default function CatalogSection({ categories, loading, error }: Props) {
  if (loading || error) {
    return (
      <View className="mt-6">
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View className="gap-3 flex-row px-4">
            {new Array(5).fill("").map((i, index) => (
              <Sceleton key={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="mt-6">
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View className="gap-3 flex-row px-4 pb-2">
          {categories?.map((i) => (
            <CatalogSectionItem
              key={i.documentId}
              name={i.name}
              slug={i.slug}
              svgUrl={i?.icon?.url}
              documentId={i.documentId}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
