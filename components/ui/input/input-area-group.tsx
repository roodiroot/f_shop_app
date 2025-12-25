import cn from "clsx";
import { Text, View } from "react-native";
import { InputProps } from "./input";
import Label from "./label";
import { TextArea } from "./text-area";

type InputGroupProps = InputProps & {
  label?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function InputAreaGroup({
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
}: InputGroupProps) {
  return (
    <View className={cn("gap-2", className)}>
      <Label>{label}</Label>
      <TextArea
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
