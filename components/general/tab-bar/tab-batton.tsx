import CastomIcon from "@/components/ui/icons/castom-icon";
import { icons } from "@/components/ui/icons/icons";
import { TabTriggerSlotProps } from "expo-router/ui";
import React from "react";
import { Pressable, View } from "react-native";

export const TabButton = React.forwardRef<
  View,
  TabTriggerSlotProps & { icon: keyof typeof icons; label: string }
>(({ isFocused, icon, label, ...props }, ref) => {
  return (
    <Pressable className="flex-1 py-2" ref={ref} {...props}>
      <View className={"flex-1 shrink items-center justify-center relative"}>
        <View
          style={{
            borderRadius: 16,
            overflow: "hidden",
            padding: 16,
            backgroundColor: isFocused ? "#ffffff" : "#ffffff00",
          }}
        >
          <CastomIcon name={icon} color="#111827" />
        </View>
      </View>
    </Pressable>
  );
});
