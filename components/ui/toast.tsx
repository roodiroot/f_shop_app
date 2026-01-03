import { useToastStore } from "@/hooks/use-toast-store";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLORS = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-neutral-900",
};

const ENTER_OPACITY_MS = 180;
const ENTER_MOVE_MS = 220;
const EXIT_MS = 160;

export function Toast() {
  const insets = useSafeAreaInsets();
  const { visible, message, type, hide } = useToastStore();

  const [mounted, setMounted] = useState(false);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-12);

  useEffect(() => {
    if (visible) {
      if (unmountTimer.current) {
        clearTimeout(unmountTimer.current);
        unmountTimer.current = null;
      }

      setMounted(true);

      opacity.value = withTiming(1, {
        duration: ENTER_OPACITY_MS,
        easing: Easing.out(Easing.cubic),
      });
      translateY.value = withTiming(0, {
        duration: ENTER_MOVE_MS,
        easing: Easing.out(Easing.cubic),
      });

      return;
    }

    if (mounted) {
      opacity.value = withTiming(0, {
        duration: EXIT_MS,
        easing: Easing.in(Easing.cubic),
      });
      translateY.value = withTiming(-12, {
        duration: EXIT_MS,
        easing: Easing.in(Easing.cubic),
      });

      unmountTimer.current = setTimeout(() => {
        setMounted(false);
        unmountTimer.current = null;
      }, EXIT_MS);
    }

    return () => {
      if (unmountTimer.current) {
        clearTimeout(unmountTimer.current);
        unmountTimer.current = null;
      }
    };
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!mounted) return null;

  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          top: insets.top + 12,
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      <Pressable
        onPress={hide}
        className={`rounded-lg px-4 py-1.5 bg-neutral-700`}
      >
        <Text className="text-white font-bold">{message}</Text>
      </Pressable>
    </Animated.View>
  );
}
