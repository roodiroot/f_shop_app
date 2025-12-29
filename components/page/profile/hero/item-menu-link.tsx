import CastomIcon from "@/components/ui/icons/castom-icon";
import { icons } from "@/components/ui/icons/icons";
import { Href, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  icon: keyof typeof icons;
  link?: Href;
};
export default function ItemMenuLink({ title, icon, link }: Props) {
  return (
    <Pressable
      onPress={() => link && router.push(link)}
      className="w-full px-4  py-2 flex-row gap-2.5 items-center justify-start text-gray-700"
    >
      <CastomIcon name={icon} color="#374151" />
      <Text className="text-lg font-light">{title}</Text>
      <View className="flex-1 items-end">
        <CastomIcon name="arrowRight" size={18} />
      </View>
    </Pressable>
  );
}
