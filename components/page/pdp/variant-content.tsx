import Button from "@/components/ui/button/button";
import FavoriteSvg from "@/components/ui/icons/favorites";
import { useCart } from "@/hooks/use-cart";
import { useFavorite } from "@/hooks/use-favorites";
import { useProductVariantPicker } from "@/hooks/useProductVariantPicker";
import { Product } from "@/types/products";
import { getPriceFormat } from "@/utils/get-price-format";
import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import StockInfo from "./stok-info";

type VariantContentProps = {
  product: Product;
  onVariantChange?: (v: any | null) => void;
};

export default function VariantContent({
  product,
  onVariantChange,
}: VariantContentProps) {
  const variants = product?.product_variants ?? [];
  const {
    colors,
    variantsByColor,
    sizes,
    selectedColor,
    selectedSize,
    currentVariant,
    selectColor,
    selectSize,
  } = useProductVariantPicker(variants, onVariantChange);
  const { addToCart, items } = useCart();
  const {
    addToFavotite,
    items: itemsFavorite,
    removeFromFavorite,
  } = useFavorite();

  const price = currentVariant?.price ?? 0;

  const favoriteCurent = itemsFavorite.includes(product.documentId);

  const cartProduct = {
    documentId: product.documentId,
    slug: product.slug,
    name: product.shortName,
    imageUrl: currentVariant?.images?.[0],
    price: currentVariant?.price || 0,
    size: currentVariant?.size || "S",
    color: currentVariant?.colorHex || "#FFF",
    variantId: currentVariant?.documentId || "",
    stock: currentVariant?.stock || 0,
    quantity: 1,
  };

  const addProductToFavorite = () => {
    addToFavotite(product.documentId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const removeFavorite = () => {
    removeFromFavorite(product.documentId);
  };

  const addProductCart = () => {
    addToCart(cartProduct);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const curentItemCart = items
    .map((i) => i.variantId)
    .includes(currentVariant?.documentId || "");

  return (
    <View className="pt-10">
      <Text className="text-3xl font-bold tracking-tight text-gray-900">
        {product.shortName}
      </Text>
      <Text className="mt-4 text-3xl">{getPriceFormat(price)}</Text>

      {/* COLORS */}
      <View className="mt-6">
        <View>
          <Text className="font-medium text-gray-900">Цвета</Text>
          <View className="flex-row mt-4 items-center gap-3">
            {colors.map((color) => {
              const list = variantsByColor[color] ?? [];
              const colorHasStock = list.some((v) => (v.stock || 0) > 0);
              const isSelected = color === selectedColor;

              return (
                <Pressable
                  key={color}
                  onPress={() => selectColor(color)}
                  disabled={!colorHasStock}
                  className={cn(
                    "bg-white size-12 justify-center items-center rounded-full border-2",
                    isSelected ? "border-gray-900" : "border-gray-300",
                    !colorHasStock ? "opacity-40" : ""
                  )}
                >
                  <View
                    className="rounded-full size-10 opacity-40"
                    style={{ backgroundColor: color }}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* SIZES */}
        <View className="relative mt-6">
          <View className="flex-row flex-1 justify-between">
            <Text className="font-medium text-gray-900">Размер</Text>
            <Text className="font-medium text-gray-900">Гайд по размерам</Text>
          </View>
          <View className="flex-row mt-4 -mx-1.5 flex-wrap">
            {sizes.map((size) => {
              const v = selectedColor
                ? (variantsByColor[selectedColor] ?? []).find(
                    (x) => (x.size || "") === size
                  )
                : null;

              const isDisabled = (v?.stock || 0) <= 0;
              const isSelected = size === selectedSize;

              return (
                <View
                  key={size}
                  className="w-1/4 items-center flex-row justify-center p-1.5"
                >
                  <Pressable
                    onPress={() => selectSize(size)}
                    disabled={isDisabled}
                    className={[
                      "flex-1 items-center justify-center rounded-lg border bg-white py-5",
                      isSelected ? "border-gray-900" : "border-gray-300",
                      isDisabled ? "opacity-40" : "",
                    ].join(" ")}
                  >
                    <Text className="text-gray-900 font-medium">{size}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
          <StockInfo
            stock={currentVariant?.stock}
            className="mt-4 absolute -bottom-6 left-0"
          />
          <View className="mt-10 flex-row gap-4">
            {curentItemCart ? (
              <Button
                variant="big"
                className="bg-neutral-700 flex-1"
                onPress={() => router.push("/(tabs)/cart")}
              >
                Перейти в корзину
              </Button>
            ) : (
              <Button
                variant="big"
                className="flex-1"
                disabled={!currentVariant?.stock}
                onPress={() => addProductCart()}
              >
                {currentVariant?.stock ? "Добавить в корзину" : "Кончился"}
              </Button>
            )}
            <Pressable
              onPress={favoriteCurent ? removeFavorite : addProductToFavorite}
              className="items-center justify-center w-[52] aspect-square"
            >
              {favoriteCurent ? (
                <FavoriteSvg width={24} height={24} />
              ) : (
                <Feather name="heart" size={24} stroke={"#000"} />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
