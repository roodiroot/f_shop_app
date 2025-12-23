import Logo from "@/components/ui/icons/logo";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Login() {
  useEffect(() => {
    console.log("HELLO LOGIN");
  }, []);
  return (
    <View className=" justify-center items-center gap-12">
      <Logo width={50} height={50} />
      <Text style={{ fontSize: 24 }}>Login</Text>

      <Pressable
        onPress={() => router.replace("/(tabs)")}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: "black",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Go to tabs</Text>
      </Pressable>
      <Pressable
        onPress={() => router.replace("/modal")}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: "black",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Modal</Text>
      </Pressable>
    </View>
  );
}
