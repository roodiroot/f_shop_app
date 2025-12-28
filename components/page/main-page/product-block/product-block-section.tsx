import { ProductAttributes } from "@/types/products";
import { ErrorLike } from "@apollo/client";
import { Dimensions, View } from "react-native";
import HeadProductBlock from "./head-product-block";
import { ProductItem } from "./product-item";
import Sceleton from "./sceleton";

type Props = {
  title: string;
  products?: ProductAttributes[];
  loading?: boolean;
  error?: ErrorLike;
};

export default function ProductBlockSection({
  title,
  products,
  loading,
  error,
}: Props) {
  const PADDING_HORIZONT = 16;
  const GAP = 12;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = (SCREEN_WIDTH - (GAP + PADDING_HORIZONT * 2)) / 2;

  if (error) return null;

  return (
    <View style={{ paddingHorizontal: PADDING_HORIZONT }} className="mt-6">
      <HeadProductBlock title={title} />
      <View style={{ gap: GAP }} className="mt-4 flex-row flex-wrap">
        {loading
          ? new Array(4)
              .fill("")
              .map((_, index) => <Sceleton key={index} width={ITEM_WIDTH} />)
          : products?.map((i) => (
              <ProductItem
                key={i.documentId}
                width={ITEM_WIDTH}
                slug={i.slug}
                title={i.shortName}
                sale={i.sale}
                hit={i.hit}
                product_variants={i.product_variants}
                image={i.product_variants?.[0].images?.[0]}
              />
            ))}
      </View>
    </View>
  );
}
