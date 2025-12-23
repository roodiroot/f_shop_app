import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderProps = PropsWithChildren & {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-row items-baseline justify-between w-full px-4 pb-2 bg-gray-100"
    >
      <Pressable onPress={() => router.back()}>
        <Feather name="chevron-left" size={30} color="#6b7280" />
      </Pressable>
      {title ? (
        <View className="h-8">
          <Text className="text-xl text-gray-900 font-medium">{title}</Text>
        </View>
      ) : (
        <View className="h-8 rounded animate-pulse " />
      )}
      <Pressable onPress={() => router.push("/(tabs)/catalog/search")}>
        <Feather name="search" size={26} color="#6b7280" />
      </Pressable>
    </View>
  );
}
