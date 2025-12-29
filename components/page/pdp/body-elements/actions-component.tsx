import Button from "@/components/ui/button/button";
import CastomIcon from "@/components/ui/icons/castom-icon";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import StockInfo from "../stok-info";

type Props = {
  curentItemCart: boolean;
  favoriteCurent: boolean;
  stock?: number | null;
  addProductCart: () => void;
  removeFavorite: () => void;
  addProductToFavorite: () => void;
};

export default function ActionsComponent({
  stock = 0,
  curentItemCart,
  favoriteCurent,
  addProductCart,
  removeFavorite,
  addProductToFavorite,
}: Props) {
  return (
    <View className="mt-4 ">
      <StockInfo stock={stock} className="absolute -bottom-6 left-0" />
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
            disabled={!stock}
            onPress={() => addProductCart()}
          >
            {stock ? "Добавить в корзину" : "Кончился"}
          </Button>
        )}
        <Pressable
          onPress={favoriteCurent ? removeFavorite : addProductToFavorite}
          className="items-center justify-center w-[52] aspect-square"
        >
          <CastomIcon
            name="heart"
            size={24}
            color={favoriteCurent ? "#dc2626" : "#111827"}
          />
        </Pressable>
      </View>
    </View>
  );
}
