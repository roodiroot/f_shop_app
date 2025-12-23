import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Button from "../ui/button/button";
import InputGroup from "../ui/input/input-group";

const RegisterForm = () => {
  return (
    <View className="flex-1">
      <View className="gap-6">
        <InputGroup
          label="Логин"
          description="Придумайте уникальное имя пользователя (не менее 2 символов)."
        />
        <InputGroup
          label="Электронная почта"
          description="Введите действующий адрес электронной почты."
        />
        <InputGroup
          label="Пароль"
          description="Придумайте пароль (минимум 8 символов, буквы, цифры, символы)."
        />
        <InputGroup
          label="Подтверждение пароля"
          description="Введите пароль ещё раз."
        />
        <InputGroup label="Пароль" />
        <Button>Зарегестрироваться</Button>
      </View>

      <View className="mt-10 flex-row gap-1 justify-center">
        <Text className="text-center text-gray-500">Уже есть аккаунт?</Text>
        <Pressable onPress={() => router.push("/(tabs)/profile/login")}>
          <Text className="font-semibold text-gray-900">Войти</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterForm;
