import cn from "clsx";
import { useState } from "react";
import { View } from "react-native";
import CastomIcon from "./icons/castom-icon";

type Props = Omit<React.ComponentProps<typeof View>, "onPress"> & {
  checked?: boolean;
  onCheckedChange?: (v: boolean) => void;
};

export default function Checked({ onCheckedChange, checked, ...props }: Props) {
  const isControlled = typeof checked === "boolean";
  const [inner, setInner] = useState(false);

  const isChecked = isControlled ? checked : inner;

  return (
    <View
      {...props}
      className={cn(
        "relative size-6 rounded-md border",
        isChecked
          ? "bg-neutral-800 border-neutral-600"
          : "bg-white border-gray-300"
      )}
    >
      {isChecked ? (
        <View className="absolute inset-0 justify-center items-center">
          <CastomIcon size={16} name="check" />
        </View>
      ) : null}
    </View>
  );
}
