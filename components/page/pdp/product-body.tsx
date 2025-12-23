import { Product } from "@/types/products";
import { useState } from "react";
import { View } from "react-native";
import ImageSlider from "./image-slider";
import VariantContent from "./variant-content";

type ProductBodyPros = {
  product: Product;
};

export default function ProductBody({ product }: ProductBodyPros) {
  const [currentVariant, setCurrentVariant] = useState<any | null>(null);
  return (
    <View>
      <ImageSlider currentVariant={currentVariant} />
      <VariantContent product={product} onVariantChange={setCurrentVariant} />
    </View>
  );
}
