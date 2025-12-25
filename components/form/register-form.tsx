import { useRegister } from "@/data/mutations/use-register";
import { registrationFormSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import z from "zod";
import Button from "../ui/button/button";
import InputGroup from "../ui/input/input-group";
import InputPasswordGroup from "../ui/input/input-password-group";

const RegisterForm = () => {
  const { mutate, error } = useRegister();
  const { control, handleSubmit } = useForm<
    z.infer<typeof registrationFormSchema>
  >({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      username: "",
      // phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registrationFormSchema>) => {
    console.log(data);
    mutate({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <View className="flex-1">
      <View className="gap-6">
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <InputGroup
              label="Логин"
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              description="Придумайте уникальное имя пользователя (не менее 2 символов)."
            />
          )}
        />

        {/* <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <InputPhoneGroup
              label="Телефон"
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              description="Введите ваш номер телефона."
            />
          )}
        /> */}

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <InputGroup
              label="Электронная почта"
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              description="Введите действующий адрес электронной почты."
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <InputPasswordGroup
              label="Пароль"
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              description="Придумайте пароль (минимум 8 символов, буквы, цифры, символы)."
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <InputPasswordGroup
              label="Подтверждение пароля"
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              description="Введите пароль ещё раз."
            />
          )}
        />

        <View className="relative">
          <Button onPress={handleSubmit(onSubmit)}>Зарегестрироваться</Button>
          {error ? (
            <View className="absolute -bottom-5 left-0 ">
              <Text className="text-sm text-red-500">{error?.message}!</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="mt-10 flex-row gap-1 justify-center">
        <Text className="text-center text-gray-500">Уже есть аккаунт?</Text>
        <Pressable onPress={() => router.push("/(tabs)/profile/(auth)/login")}>
          <Text className="font-semibold text-gray-900">Войти</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterForm;
