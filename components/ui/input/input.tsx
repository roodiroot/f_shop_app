import { Pressable, Text, TextInput, View } from "react-native";
import CastomIcon from "../icons/castom-icon";
import { icons } from "../icons/icons";

export type InputProps = {
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorText?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url";
  iconEnd?: keyof typeof icons;
  iconEndFunc?: () => void;
};

export function Input({
  value,
  onChange,
  onBlur,
  placeholder,
  secureTextEntry,
  errorText,
  keyboardType = "default",
  iconEnd,
  iconEndFunc,
  ...props
}: InputProps) {
  return (
    <View className="w-full">
      <View
        className={`relative w-full flex-row items-center rounded-xl border px-4 ${
          errorText ? "border-red-500" : "border-gray-300"
        }`}
      >
        <TextInput
          value={value ?? ""}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          placeholder={placeholder}
          style={{
            flex: 1,
            fontSize: 16,
            height: 42,
            textAlignVertical: "center",
            paddingVertical: 0,
          }}
          {...props}
        />
      </View>
      {iconEnd && (
        <Pressable
          style={{ height: 42 }}
          onPress={() => iconEndFunc && iconEndFunc()}
          className="absolute z-10 top-0 right-0 px-2 justify-center items-center"
        >
          <CastomIcon name={iconEnd} color="#9ca3af" />
        </Pressable>
      )}
      {!!errorText && (
        <Text className="mt-1 text-xs text-red-500">{errorText}</Text>
      )}
    </View>
  );
}
