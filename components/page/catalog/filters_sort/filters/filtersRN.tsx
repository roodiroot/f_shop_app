import Checked from "@/components/ui/checked";
import { SelectedFilters } from "@/hooks/use-catalog-filters";
import { Filters } from "@/types/filters";
import { FilterId, prepareFilters } from "@/utils/prepare-filters";
import { Pressable, Text, View } from "react-native";

type Props = {
  filters: Filters;
  value: SelectedFilters;
  onChange: (updater: (prev: SelectedFilters) => SelectedFilters) => void;
};

export function FiltersRN({ filters, value, onChange }: Props) {
  const fassets = prepareFilters(filters);

  const toggle = (sectionId: FilterId, item: string) => {
    onChange((prev) => {
      const arr = prev[sectionId] ?? [];
      const exists = arr.includes(item);
      const next = exists ? arr.filter((v) => v !== item) : [...arr, item];

      const copy = { ...prev };
      if (next.length) copy[sectionId] = next;
      else delete copy[sectionId];
      return copy;
    });
  };

  const isChecked = (sectionId: FilterId, item: string) => {
    return (value[sectionId] ?? []).includes(item);
  };

  return (
    <View>
      {fassets?.map((section) => {
        return (
          <View key={section.id} className="border-b border-gray-200 py-6">
            <Text className="font-medium text-gray-900 text-xl">
              {section.name}
            </Text>
            <View className="pt-6 gap-4">
              {section.items.map((i: string) => {
                const checked = isChecked(section.id as FilterId, i);
                return (
                  <Pressable
                    key={i}
                    onPress={() => toggle(section.id as FilterId, i)}
                    className="flex-row items-start gap-4"
                  >
                    <Checked checked={checked} />
                    <Text className="font-medium text-gray-500 text-lg line-clamp-2">
                      {i}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}
