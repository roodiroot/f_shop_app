import CastomIcon from "@/components/ui/icons/castom-icon";
import { useCart } from "@/hooks/use-cart";
import { shadowSoft } from "@/theme/colors";
import { TabTriggerSlotProps } from "expo-router/ui";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const TabButtonCart = React.forwardRef<View, TabTriggerSlotProps>(
  ({ isFocused, ...props }, ref) => {
    const { items } = useCart();
    return (
      <Pressable className="flex-1  py-2" ref={ref} {...props}>
        <View className={"flex-1 shrink items-center justify-center relative"}>
          {items.length ? (
            <View
              style={shadowSoft}
              className="absolute z-10 right-2 top-1 bg-rose-600 rounded-full size-6 items-center justify-center"
            >
              <Text className="text-white text-sm font-bold">
                {items.length}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              borderRadius: 16,
              overflow: "hidden",
              padding: 10,
              backgroundColor: isFocused ? "#ffffff" : "#ffffff00",
            }}
          >
            <CastomIcon name="cart" color="#111827" />
          </View>
        </View>
      </Pressable>
    );
  }
);
