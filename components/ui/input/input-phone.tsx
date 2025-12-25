import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  value?: string;
  setValue?: (text: string) => void;
  placeholder?: string;
  errorText?: string;
};

export default function InputPhone({
  value = "",
  setValue,
  placeholder,

  errorText,
}: Props) {
  const handleChangeText = (text: string) => {
    let numbersValue = getNumbersValue(text);

    if (!numbersValue) {
      setValue?.("");
      return;
    }

    let formattedValue = "";

    if (["7", "8", "9"].includes(numbersValue[0])) {
      if (numbersValue[0] === "9") {
        numbersValue = "7" + numbersValue;
      }

      const firstSymbol = numbersValue[0] === "8" ? "8" : "+7";
      formattedValue = firstSymbol + " ";

      if (numbersValue.length > 1) {
        formattedValue += "(" + numbersValue.substring(1, 4);
      }
      if (numbersValue.length >= 5) {
        formattedValue += ") " + numbersValue.substring(4, 7);
      }
      if (numbersValue.length >= 8) {
        formattedValue += "-" + numbersValue.substring(7, 9);
      }
      if (numbersValue.length >= 10) {
        formattedValue += "-" + numbersValue.substring(9, 11);
      }
    } else {
      formattedValue = "+" + numbersValue.substring(0, 16);
    }

    setValue?.(formattedValue);
  };

  return (
    <View className="w-full">
      <View
        className={`w-full flex-row items-center rounded-lg border px-4 ${
          errorText ? "border-red-500" : "border-gray-300"
        }`}
      >
        <TextInput
          value={value}
          placeholder={placeholder ?? "8 (000) 000-00-00"}
          keyboardType="phone-pad"
          onChangeText={handleChangeText}
          maxLength={18}
          style={{
            flex: 1,
            fontSize: 16,
            height: 42,
            textAlignVertical: "center",
            paddingVertical: 0,
          }}
        />
      </View>
      {!!errorText && (
        <Text className="mt-1 text-xs text-red-500">{errorText}</Text>
      )}
    </View>
  );
}

const getNumbersValue = (text: string) => text.replace(/\D/g, "");
