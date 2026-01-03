import CastomIcon from "@/components/ui/icons/castom-icon";
import { useFavorite } from "@/hooks/use-favorites";
import { shadowSoft } from "@/theme/colors";
import { TabTriggerSlotProps } from "expo-router/ui";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const TabButtonFavorite = React.forwardRef<View, TabTriggerSlotProps>(
  ({ isFocused, ...props }, ref) => {
    const { items } = useFavorite();
    return (
      <Pressable className="flex-1 py-2" ref={ref} {...props}>
        <View className={"flex-1 shrink items-center justify-center relative"}>
          {items.length ? (
            <View
              style={shadowSoft}
              className="absolute z-10 right-2 top-1 bg-rose-600 rounded-full size-6 items-center justify-center"
            >
              <Text className="text-white text-xs font-bold">
                {items.length}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              borderRadius: 16,
              overflow: "hidden",
              padding: 16,
              backgroundColor: isFocused ? "#ffffff" : "#ffffff00",
            }}
          >
            <CastomIcon name="heart" color="#111827" />
          </View>
        </View>
      </Pressable>
    );
  }
);
