import cn from "clsx";
import { Text, View } from "react-native";
import { InputProps } from "./input";
import InputPassword from "./input-password";
import Label from "./label";

type InputPasswordGroupProps = InputProps & {
  label?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function InputPasswordGroup({
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
}: InputPasswordGroupProps) {
  return (
    <View className={cn("gap-2", className)}>
      <Label>{label}</Label>
      <InputPassword
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
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
