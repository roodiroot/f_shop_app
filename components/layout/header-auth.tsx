import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HeaderAuth() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }} className="w-full px-6 bg-inherit">
      <Pressable onPress={() => router.back()}>
        <Feather name="chevron-left" size={30} color="#6b7280" />
      </Pressable>
    </View>
  );
}
