"use client";

import { Feather } from "@expo/vector-icons";
import { useState } from "react";

import { Pressable, Text, TextInput, View } from "react-native";

type InputPasswordProps = {
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorText?: string;
};

const InputPassword: React.FC<InputPasswordProps> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  secureTextEntry,
  errorText,
  ...props
}) => {
  const [hide, setHide] = useState(true);
  return (
    <View className="w-full">
      <View
        className={`w-full flex-row items-center rounded-lg border px-4 ${
          errorText ? "border-red-500" : "border-gray-300"
        }`}
      >
        <View className="w-full relative">
          <TextInput
            secureTextEntry={hide ? true : false}
            value={value ?? ""}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor="#9CA3AF"
            style={{
              flex: 1,
              fontSize: 16,
              height: 42,
              textAlignVertical: "center",
              paddingVertical: 0,
            }}
            {...props}
          />
          <View className="absolute h-full right-0 inset-y-0 justify-center items-center">
            <Pressable
              onPress={() => setHide(!hide)}
              className="justify-center items-center"
            >
              {hide ? (
                <Feather name="eye" size={24} color={"#9ca3af"} />
              ) : (
                <Feather name="eye-off" size={24} color={"#9ca3af"} />
              )}
            </Pressable>
          </View>
        </View>
      </View>
      {!!errorText && (
        <Text className="mt-1 text-xs text-red-500">{errorText}</Text>
      )}
    </View>
  );
};

export default InputPassword;
