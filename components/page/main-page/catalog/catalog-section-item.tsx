import { useSVGSource } from "@/hooks/use-svg-source";
import { shadowSoft } from "@/theme/colors";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

type Props = {
  slug: string;
  name: string;
  documentId: string;
  svgUrl?: string;
};

export default function CatalogSectionItem({
  documentId,
  slug,
  name,
  svgUrl,
}: Props) {
  const uri = useSVGSource(svgUrl);

  return (
    <Pressable
      key={documentId}
      onPress={() => router.push(`/(tabs)/catalog/category/${slug}`)}
      style={shadowSoft}
      className="aspect-[1/1.3] w-[110] bg-gray-100 rounded-xl overflow-hidden"
    >
      <View className="flex-1">
        <SvgUri
          width={75}
          height={75}
          uri={uri}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
          }}
        />
      </View>
      <Text className="w-full h-[30%] px-4 text-center pb-2 text-sm/4 text-gray-800">
        {name}
      </Text>
    </Pressable>
  );
}
