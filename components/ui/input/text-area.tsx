import { Text, TextInput, View } from "react-native";

export type InputProps = {
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorText?: string;
};

export function TextArea({
  value,
  onChange,
  onBlur,
  placeholder,
  secureTextEntry,
  errorText,
  ...props
}: InputProps) {
  return (
    <View className="w-full">
      <View
        className={`w-full flex-row items-center rounded-lg border px-4 ${
          errorText ? "border-red-500" : "border-gray-300"
        }`}
      >
        <TextInput
          value={value ?? ""}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          style={{
            flex: 1,
            fontSize: 16,
            height: 42,
            textAlignVertical: "center",
            paddingVertical: 4,
            minHeight: 120,
          }}
          {...props}
        />
      </View>

      {!!errorText && (
        <Text className="mt-1 text-xs text-red-500">{errorText}</Text>
      )}
    </View>
  );
}
