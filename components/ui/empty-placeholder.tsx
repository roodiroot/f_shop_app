import { Text, View } from "react-native";
import CastomIcon from "./icons/castom-icon";

type Props = {
  title: string;
  icon?: React.ReactNode;
};

export default function EmptyPlaceholder({
  icon = <CastomIcon name="logo" size={50} />,
  title,
}: Props) {
  return (
    <View className="gap-4 items-center mt-20">
      {icon}
      <Text className="text-gray-500 text-lg">{title}</Text>
    </View>
  );
}
