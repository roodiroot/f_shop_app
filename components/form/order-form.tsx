import { useCreateOrder } from "@/data/mutations/use-create-order";
import { useCart } from "@/hooks/use-cart";
import { orderFormSchema } from "@/schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Haptics from "expo-haptics";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import z from "zod";
import Button from "../ui/button/button";
import CheckedGroup from "../ui/checked-group";
import InputAreaGroup from "../ui/input/input-area-group";
import InputGroup from "../ui/input/input-group";
import InputPhoneGroup from "../ui/input/input-phone-group";

const OrderCreateForm = () => {
  const { items, clearCart } = useCart();
  const { mutate, isPending, isError, error } = useCreateOrder();

  const { control, handleSubmit, reset } = useForm<
    z.infer<typeof orderFormSchema>
  >({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      agree: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof orderFormSchema>) => {
    if (items.map((i) => i.stock <= 0 || !i.stock)[0]) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    const payload = {
      customer: {
        phone: values.phone,
        email: values.email,
        deliveryAddress: values.address,
        comment: "Мое имя - " + values.name + ". " + values.comment,
      },
      paymentMethod: "card",
      items: items.map((i) => {
        return {
          variantId: i.variantId,
          quantity: i.quantity,
        };
      }),
    };

    mutate(payload);
    reset();
    clearCart();
  };

  return (
    <View className="pb-20">
      <View className="gap-6">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <InputGroup
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              label="Имя"
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <InputGroup
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              label="Адрес доставки"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <InputGroup
              value={field.value}
              onChange={field.onChange}
              keyboardType="email-address"
              errorText={fieldState.error?.message}
              label="Email"
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <InputPhoneGroup
              label="Телефон"
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="comment"
          render={({ field, fieldState }) => (
            <InputAreaGroup
              value={field.value}
              onChange={field.onChange}
              errorText={fieldState.error?.message}
              label="Комментарий к заказу"
            />
          )}
        />

        <Controller
          control={control}
          name="agree"
          render={({ field, fieldState }) => (
            <CheckedGroup
              checked={field.value}
              onCheckedChange={field.onChange}
              errorText={fieldState.error?.message}
            />
          )}
        />

        <View className="gap-6 relative">
          <View className="relative">
            <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
              {isPending ? "Открываем оплату..." : "Продолжить"}
            </Button>

            {isError ? (
              <View className="absolute -bottom-5 left-0 ">
                <Text className="text-sm text-red-500">
                  {(error as Error).message}
                </Text>
              </View>
            ) : null}
          </View>
          <Text>
            После нажатия на кнопку "Продолжить", вы будете перенаправлены на
            страницу оплаты.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderCreateForm;
