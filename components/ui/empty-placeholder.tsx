import { Text, View } from "react-native";
import Logo from "./icons/logo";

type Props = {
  title: string;
  icon?: React.ReactNode;
};

export default function EmptyPlaceholder({
  icon = <Logo width={50} height={50} />,
  title,
}: Props) {
  return (
    <View className="gap-4 items-center mt-20">
      {icon}
      <Text className="text-gray-500 text-lg">{title}</Text>
    </View>
  );
}
