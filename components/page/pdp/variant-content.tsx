import { useCart } from "@/hooks/use-cart";
import { useFavorite } from "@/hooks/use-favorites";
import { useProductVariantPicker } from "@/hooks/useProductVariantPicker";
import { Product } from "@/types/products";
import { toast } from "@/utils/toast";
import * as Haptics from "expo-haptics";
import { View } from "react-native";
import ActionsComponent from "./body-elements/actions-component";
import ChangeColor from "./body-elements/color-changer/change-color";
import TitleEndPrice from "./body-elements/color-changer/title-and-price";
import ChangeSize from "./body-elements/size-changer/change-size";

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
    toast.info("Товар добавлен в избранное");
  };

  const removeFavorite = () => {
    removeFromFavorite(product.documentId);
  };

  const addProductCart = () => {
    addToCart(cartProduct);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    toast.info("Товар добавлен в корзину");
  };

  const curentItemCart = items
    .map((i) => i.variantId)
    .includes(currentVariant?.documentId || "");

  return (
    <View className="pt-10">
      <TitleEndPrice price={price} title={product.shortName} />

      <View className="mt-6">
        <ChangeColor
          title="Цвета"
          colors={colors}
          variantsByColor={variantsByColor}
          selectedColor={selectedColor}
          selectColor={selectColor}
        />

        <ChangeSize
          title="Размер"
          sizes={sizes}
          selectedColor={selectedColor}
          selectSize={selectSize}
          variantsByColor={variantsByColor}
          selectedSize={selectedSize}
        />
      </View>

      <ActionsComponent
        stock={currentVariant?.stock}
        curentItemCart={curentItemCart}
        favoriteCurent={favoriteCurent}
        addProductCart={addProductCart}
        removeFavorite={removeFavorite}
        addProductToFavorite={addProductToFavorite}
      />
    </View>
  );
}
