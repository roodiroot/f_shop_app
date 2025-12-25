import { requestResetPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { useResetPass } from "@/data/mutations/use-reset-pass";
import { router } from "expo-router";
import { useState } from "react";
import z from "zod";
import Button from "../ui/button/button";
import InputGroup from "../ui/input/input-group";

const RequestPasswordResetForm = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { mutate, error } = useResetPass();
  const { control, handleSubmit, reset } = useForm<
    z.infer<typeof requestResetPasswordSchema>
  >({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof requestResetPasswordSchema>) => {
    mutate(data.email);
    reset();
    setMessage("Инструкции были отправлены к вам на почту.");
    router.push("/(tabs)/profile/(auth)/login");
  };

  return (
    <View>
      <View className="gap-6">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <InputGroup
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              label="Почта"
            />
          )}
        />

        <View className="relative">
          <Button onPress={handleSubmit(onSubmit)}>Сбросить пароль</Button>
          {error ? (
            <View className="absolute -bottom-5 left-0 ">
              <Text className="text-sm text-red-500">{error?.message}!</Text>
            </View>
          ) : null}
          {message ? (
            <View className="absolute -bottom-5 left-0 ">
              <Text className="text-sm text-green-700">{message}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default RequestPasswordResetForm;
