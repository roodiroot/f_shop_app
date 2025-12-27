import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CastomIcon from "../ui/icons/castom-icon";

type HeaderProps = PropsWithChildren & {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-row items-center justify-between w-full px-4 pb-2 bg-white"
    >
      <Pressable
        onPress={() => router.back()}
        className="size-14 bg-white border-gray-200 border-2 rounded-full justify-center items-center"
      >
        <CastomIcon name="arrowBack" />
      </Pressable>
      <Text className="text-xl text-gray-900 font-medium uppercase">
        {title}
      </Text>
      <Pressable
        onPress={() => router.push("/(tabs)/catalog/search")}
        className="size-14 bg-white border-gray-200 border-2 rounded-full justify-center items-center"
      >
        <CastomIcon name="search" />
      </Pressable>
    </View>
  );
}
