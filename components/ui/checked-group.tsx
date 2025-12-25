import cn from "clsx";
import { Pressable, Text } from "react-native";
import Checked from "./checked";

type Props = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  errorText?: string;
};

export default function CheckedGroup({
  checked,
  errorText,
  onCheckedChange,
}: Props) {
  return (
    <Pressable
      onPress={() => onCheckedChange && onCheckedChange(!checked)}
      className="flex-row items-start gap-4"
    >
      <Checked checked={checked} />
      <Text
        className={cn(
          "text-gray-600 shrink",
          errorText ? "text-red-500" : null
        )}
      >
        Я подтверждаю согласие с условиями оформления заказа и обработкой
        персональных данных
      </Text>
    </Pressable>
  );
}
