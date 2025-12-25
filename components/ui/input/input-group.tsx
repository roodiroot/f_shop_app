import cn from "clsx";
import { Text, View } from "react-native";
import { Input, InputProps } from "./input";
import Label from "./label";

type InputGroupProps = InputProps & {
  label?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url";
};

export default function InputGroup({
  label,
  description,
  value,
  onChange,
  onBlur,
  placeholder,
  secureTextEntry,
  keyboardType,
  errorText,
  className,
  ...props
}: InputGroupProps) {
  return (
    <View className={cn("gap-2", className)}>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        errorText={errorText}
        {...props}
      />
      {description && (
        <Text className="text-base mt-1 text-gray-500">{description}</Text>
      )}
    </View>
  );
}
