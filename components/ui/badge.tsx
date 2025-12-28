import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type Props = {
  sale?: number;
  hit?: boolean;
};

export default function Badge({ sale, hit }: Props) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (hit) {
      setContent("hit");
    }
    if (sale) {
      setContent(`sale ${sale}%`);
    }
  }, [sale, hit]);

  if (!content) return null;

  return (
    <View className="bg-[#F75522] px-2 py-1 rounded-lg self-start">
      <Text className="font-bold text-white uppercase">{content}</Text>
    </View>
  );
}
