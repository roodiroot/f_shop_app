import cn from "clsx";
import { Text, View } from "react-native";
import { InputProps } from "./input";
import InputPhone from "./input-phone";
import Label from "./label";

type InputPhoneGroupProps = InputProps & {
  label?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function InputPhoneGroup({
  label,
  description,
  value,
  onChange,
  onBlur,
  placeholder,
  secureTextEntry,
  errorText,
  className,
  ...props
}: InputPhoneGroupProps) {
  return (
    <View className={cn("gap-2", className)}>
      <Label>{label}</Label>
      <InputPhone
        value={value}
        setValue={onChange}
        errorText={errorText}
        {...props}
      />
      {description && (
        <Text className="text-base mt-1 text-gray-500">{description}</Text>
      )}
    </View>
  );
}
