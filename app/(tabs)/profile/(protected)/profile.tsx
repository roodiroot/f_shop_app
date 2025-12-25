import { useAuth } from "@/auth/auth-context";
import Label from "@/components/ui/input/label";
import WrapperList from "@/components/ui/wrapper-list";
import { shadowSoft } from "@/theme/colors";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ProfilePage() {
  const { auth, logout, refreshMe } = useAuth();
  return (
    <>
      <WrapperList className="bg-grey-50" headerSown headerTitle="Профиль">
        <View className="flex-1 gap-4">
          <View
            style={shadowSoft}
            className="mt-6 gap-6 bg-white px-4 py-6 rounded-2xl"
          >
            <View>
              <Label>Имя пользователя</Label>
              <Text className="text-lg font-medium mt-2">
                {auth.user?.username}
              </Text>
            </View>
            <View>
              <Label>Email</Label>
              <Text className="text-lg font-medium  mt-2">
                {auth.user?.email}
              </Text>
            </View>
            <View>
              <Label>Дата регистрации</Label>
              <Text className="text-lg font-medium mt-2">
                {new Date(auth.user?.createdAt || 0).toLocaleDateString(
                  "ru-RU",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </Text>
            </View>
          </View>
          <View style={shadowSoft} className="gap-6 bg-white p-4 rounded-2xl">
            <Pressable
              onPress={() =>
                router.push("/(tabs)/profile/(protected)/order-history")
              }
            >
              <Text className="text-lg font-medium">История заказов</Text>
            </Pressable>
          </View>

          <View className="p-4 justify-end bg-white flex-1">
            <Pressable className="" onPress={() => logout()}>
              <Text className="text-center underline">Выйти</Text>
            </Pressable>
          </View>
        </View>
      </WrapperList>
    </>
  );
}
