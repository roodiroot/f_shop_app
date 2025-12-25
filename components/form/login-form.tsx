import { loginFormSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { useLogin } from "@/data/mutations/use-login";
import z from "zod";
import Button from "../ui/button/button";
import InputGroup from "../ui/input/input-group";
import InputPasswordGroup from "../ui/input/input-password-group";

const LoginForm = () => {
  const { mutate, error } = useLogin();
  const { control, handleSubmit } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    mutate(data);
  };

  return (
    <View>
      <View className="gap-6">
        <Controller
          control={control}
          name="identifier"
          render={({ field, fieldState }) => (
            <InputGroup
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              label="Логин/Почта"
            />
          )}
        />

        <View className="gap-6 relative">
          <Pressable
            onPress={() => {
              router.push("/(tabs)/profile/(auth)/request-password-reset");
            }}
            className="absolute z-10 top-0 right-0"
          >
            <Text className="font-bold">Забыли пароль?</Text>
          </Pressable>
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <InputPasswordGroup
                value={field.value}
                onChange={field.onChange}
                errorText={fieldState.error?.message}
                label="Пароль"
              />
            )}
          />

          <View className="relative">
            <Button onPress={handleSubmit(onSubmit)}>Войти</Button>
            {error ? (
              <View className="absolute -bottom-5 left-0 ">
                <Text className="text-sm text-red-500">{error?.message}!</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View className="mt-10 flex-row gap-1 justify-center">
          <Text className="text-center text-gray-500">Еще нет аккаунта? </Text>
          <Pressable
            onPress={() => router.push("/(tabs)/profile/(auth)/register")}
          >
            <Text className="font-semibold text-gray-900">Создать</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
