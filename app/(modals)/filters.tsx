import { FiltersRN } from "@/components/page/catalog/filters_sort/filters/filtersRN";
import Button from "@/components/ui/button/button";
import WrapperList from "@/components/ui/wrapper-list";
import { useGetFilters } from "@/hooks/query/use-get-filters";
import {
  SelectedFilters,
  useCatalogFilters,
} from "@/hooks/use-catalog-filters";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Filters() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();
  const insets = useSafeAreaInsets();
  const { data, error, isLoading } = useGetFilters(categoryId);
  const { applied, setApplied } = useCatalogFilters();

  const [draft, setDraft] = useState<SelectedFilters>({});

  useEffect(() => {
    setDraft(applied ?? {});
  }, []);

  const onApply = () => {
    setApplied(draft);
    router.back();
  };

  if (error || isLoading || !data?.filters) {
    return (
      <WrapperList>
        <View>
          <Text>LOADING...</Text>
        </View>
      </WrapperList>
    );
  }

  return (
    <>
      <WrapperList className="px-2">
        <FiltersRN filters={data.filters} value={draft} onChange={setDraft} />
      </WrapperList>
      <View
        style={{ paddingBottom: insets.bottom }}
        className="border-t border-gray-200 bg-white px-4 pt-6"
      >
        <Button onPress={onApply} variant="big">
          Применить
        </Button>
      </View>
    </>
  );
}
