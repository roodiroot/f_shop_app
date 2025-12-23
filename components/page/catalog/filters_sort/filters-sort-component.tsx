import FilterSvg from "@/components/ui/icons/filter";
import { SORT_TYPES, useCatalogSort } from "@/hooks/use-catalog-sort";
import { FilterId, prepareActiveFilters } from "@/utils/prepare-filters";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SortModal } from "./sort/sort-modal";

type FilterSortComponntProps = {
  categoryId?: string;
  activFilters?: Partial<Record<FilterId, string[]>>;
  resetFilterById?: (id: FilterId) => void;
};

export default function FilterSortComponnt({
  activFilters,
  categoryId,
  resetFilterById,
}: FilterSortComponntProps) {
  const activeFilters = prepareActiveFilters(activFilters) || [];
  const { setSortType, sortType } = useCatalogSort();
  const [open, setOpen] = useState(false);

  const sortNameCurent = Object.entries(SORT_TYPES).filter(
    ([key, value]) => value.value === sortType
  )[0][1].name;
  const sortName =
    sortNameCurent === "По умолчанию" ? "Сортировка" : sortNameCurent;

  return (
    <>
      <View className="flex-row items-center justify-between gap-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ height: 30 }} className="flex-row gap-2">
            {activeFilters?.map((key) => (
              <Pressable
                key={key.id}
                onPress={() => resetFilterById && resetFilterById(key.id)}
                className="px-2 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 flex-row gap-2 items-center"
              >
                <Text className="font-medium text-gray-600">{key.name}</Text>
                <Feather name="x" size={15} color={"#9ca3af"} />
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <Pressable
          onPress={
            () => setOpen(true)
            // onPress={() => router.push("/(modals)/sort")
          }
        >
          <View className="flex-row gap-1 items-center">
            <Text className="text-gray-700 font-medium">{sortName}</Text>
            <Feather name="chevron-down" size={15} color={"#99a1af"} />
          </View>
          {/* <SortSvg width={24} height={24} fill={"#1f2937"} /> */}
        </Pressable>

        {categoryId ? (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(modals)/filters",
                params: { categoryId },
              })
            }
          >
            <FilterSvg width={24} height={24} fill={"#1f2937"} />
          </Pressable>
        ) : null}
      </View>
      <SortModal
        visible={open}
        onClose={() => setOpen(false)}
        selectedValue={sortType}
        onSelect={setSortType}
        // items={SORT_ITEMS}
        // selectedValue={sortValue}
        // onSelect={(v) => setSortValue(v)}
      />
    </>
  );
}
