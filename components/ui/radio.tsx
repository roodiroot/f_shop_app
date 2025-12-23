import cn from "clsx";
import { useState } from "react";
import { View } from "react-native";
import CheckSvg from "./icons/check";

type Props = Omit<React.ComponentProps<typeof View>, "onPress"> & {
  checked?: boolean;
  onCheckedChange?: (v: boolean) => void;
};

export default function Radio({ onCheckedChange, checked, ...props }: Props) {
  const isControlled = typeof checked === "boolean";
  const [inner, setInner] = useState(false);

  const isChecked = isControlled ? checked : inner;

  // const toggle = () => {
  //   const next = !isChecked;
  //   if (!isControlled) setInner(next);
  //   onCheckedChange?.(next);
  // };

  return (
    <View
      {...props}
      className={cn(
        "relative size-6 rounded-full border",
        isChecked
          ? "bg-neutral-800 border-neutral-600"
          : "bg-white border-gray-300"
      )}
    >
      {isChecked ? (
        <View className="absolute inset-0 justify-center items-center">
          <CheckSvg stroke={"#fff"} width={16} height={16} />
        </View>
      ) : null}
    </View>
  );
}
