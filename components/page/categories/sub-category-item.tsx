import { useSVGSource } from "@/hooks/use-svg-source";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

type Props = {
  name: string;
  slug: string;
  svgUrl?: string;
};

export default function SubCategoryItem({ slug, name, svgUrl }: Props) {
  const uri = useSVGSource(svgUrl);
  return (
    <Pressable
      onPress={() => router.push(`/(tabs)/catalog/category/${slug}`)}
      className="aspect-[1/1.23] bg-gray-100 rounded-xl overflow-hidden"
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
