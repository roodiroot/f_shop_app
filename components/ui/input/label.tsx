import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

type LabelProps = PropsWithChildren<{}>;

export default function Label({ children, ...props }: LabelProps) {
  return (
    <View {...props}>
      <Text className="font-medium">{children}</Text>
    </View>
  );
}
