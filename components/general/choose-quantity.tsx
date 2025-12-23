import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  count?: number;
  min?: number;
  max?: number;
  onChangeQuantity?: (value: number) => void;
  style?: ViewStyle;
};

const clamp = (v: number, min: number, max?: number) => {
  let x = v;
  if (x < min) x = min;
  if (typeof max === "number" && x > max) x = max;
  return x;
};

export default function ChooseQuantity({
  count = 1,
  min = 1,
  max = 10,
  onChangeQuantity,
  style,
}: Props) {
  const [value, setValue] = useState<number>(count);

  useEffect(() => {
    setValue(count);
  }, [count]);

  const updateValue = (next: number) => {
    const v = clamp(next, min, max);
    setValue(v);
    onChangeQuantity?.(v);
  };

  const decDisabled = useMemo(() => value <= min, [value, min]);
  const incDisabled = useMemo(
    () => typeof max === "number" && value >= max,
    [value, max]
  );

  const handleDecrement = () => {
    updateValue(value - 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  const handleIncrement = () => {
    updateValue(value + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleInputChange = (text: string) => {
    const raw = text.replace(/\D/g, "");
    if (raw === "") {
      // даём пустое поле во время ввода, но значение не роняем
      setValue(min);
      onChangeQuantity?.(min);
      return;
    }
    updateValue(Number(raw));
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.container}>
        <Pressable
          onPress={handleDecrement}
          disabled={decDisabled}
          className="pl-2"
          style={({ pressed }) => [
            styles.button,
            styles.leftButton,
            pressed && !decDisabled && styles.pressed,
            decDisabled && styles.disabled,
          ]}
          hitSlop={8}
        >
          <Feather name="minus" size={14} />
        </Pressable>

        <TextInput
          value={String(value)}
          onChangeText={handleInputChange}
          keyboardType="number-pad"
          style={styles.input}
          textAlign="center"
          maxLength={4}
        />

        <Pressable
          onPress={handleIncrement}
          disabled={incDisabled}
          style={({ pressed }) => [
            styles.button,
            styles.rightButton,
            pressed && !incDisabled && styles.pressed,
            incDisabled && styles.disabled,
          ]}
          className="pr-2"
          hitSlop={8}
        >
          <Feather name="plus" size={14} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
  },
  button: {
    height: 32,
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  leftButton: {
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  rightButton: {
    borderLeftWidth: 1,
    borderLeftColor: "#e5e7eb",
  },
  pressed: {
    backgroundColor: "#f3f4f6",
  },
  disabled: {
    opacity: 0.45,
  },
  input: {
    height: 32,
    minWidth: 44,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
