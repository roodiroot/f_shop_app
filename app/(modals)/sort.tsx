import Radio from "@/components/ui/radio";
import WrapperList from "@/components/ui/wrapper-list";
import { SORT_TYPES, useCatalogSort } from "@/hooks/use-catalog-sort";
import { Pressable, Text, View } from "react-native";

export default function Sort() {
  const { setSortType, sortType } = useCatalogSort();
  const checked = sortType;

  return (
    <WrapperList>
      <View className="gap-4">
        {Object.entries(SORT_TYPES).map(([key, value]) => (
          <Pressable
            key={key}
            onPress={() => setSortType(value.value)}
            className="py-2 flex-row justify-between items-center"
          >
            <Text>{value.name}</Text>
            <Radio checked={sortType === value.value} />
          </Pressable>
        ))}
      </View>
    </WrapperList>
  );
}
