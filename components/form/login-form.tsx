import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Button from "../ui/button/button";
import InputGroup from "../ui/input/input-group";

const LoginForm = () => {
  return (
    <View>
      <View className="gap-6">
        <InputGroup label="Логин/Почта" />
        <InputGroup label="Пароль" />
        <Button>Войти</Button>
      </View>
      <View className="mt-10 flex-row gap-1 justify-center">
        <Text className="text-center text-gray-500">Еще нет аккаунта? </Text>
        <Pressable onPress={() => router.push("/(tabs)/profile/register")}>
          <Text className="font-semibold text-gray-900">Создать</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginForm;
