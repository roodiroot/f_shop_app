import HeadProductBlock from "@/components/page/main-page/product-block/head-product-block";
import { ProductItem } from "@/components/page/main-page/product-block/product-item";
import CastomIcon from "@/components/ui/icons/castom-icon";
import { Input } from "@/components/ui/input/input";
import { useDebouncedValue } from "@/hooks/query/use-debounced-value";
import { useProduct } from "@/hooks/query/use-products";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Dimensions, FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchPage() {
  const PADDING_HORIZONT = 16;
  const GAP = 12;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = (SCREEN_WIDTH - (GAP + PADDING_HORIZONT * 2)) / 2;

  const insets = useSafeAreaInsets();
  const [value, setValue] = useState<string>("");

  const query = value.trim();
  const debouncedQuery = useDebouncedValue(query, 150);

  const skip = debouncedQuery.length < 2;

  const filters = useMemo(() => {
    if (skip) return {};
    return {
      or: [
        { shortName: { containsi: debouncedQuery } },
        { subcategory: { containsi: debouncedQuery } },
        { waist: { containsi: debouncedQuery } },
        { categoryParam: { containsi: debouncedQuery } },
      ],
    };
  }, [debouncedQuery, skip]);

  const { productsList, loading } = useProduct({
    filters,
    skip,
    pagination: { page: 1, pageSize: 12 },
    sort: ["createdAt:desc"],
  });

  const searchTitle = loading
    ? "Поиск…"
    : debouncedQuery.length === 0
      ? "Начните ввод"
      : debouncedQuery.length < 2
        ? "Продолжите ввод"
        : productsList.length > 0
          ? "Результаты"
          : "Совпадений не найдено";

  const clearSearch = () => {
    setValue("");
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <View className="flex-row gap-4 items-center px-4 pb-2">
        <Pressable onPress={() => router.back()}>
          <CastomIcon name="arrowBack" />
        </Pressable>
        <View className="flex-1">
          <Input
            value={value}
            onChange={setValue}
            placeholder="Введите запрос"
            iconEnd="x"
            iconEndFunc={clearSearch}
          />
        </View>
      </View>

      <FlatList
        data={productsList}
        keyExtractor={(product) => product.documentId}
        numColumns={2}
        contentContainerStyle={{ padding: PADDING_HORIZONT }}
        columnWrapperStyle={{ gap: GAP }}
        ListHeaderComponent={<HeadProductBlock title={searchTitle} />}
        ListHeaderComponentStyle={{ marginBottom: 16 }}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH }} className="mb-4">
            <ProductItem
              key={item.documentId}
              slug={item.slug}
              title={item.shortName}
              sale={item.sale}
              hit={item.hit}
              product_variants={item.product_variants}
              image={item.product_variants?.[0].images?.[0]}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[150]"
      />
    </View>
  );
}
