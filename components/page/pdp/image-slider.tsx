import { useImageSource } from "@/hooks/useImageSource";
import { Image, View } from "react-native";

export const NO_IMAGE = require("@/assets/images/no-image.jpg");

type ImageSliderProps = {
  currentVariant: any | null;
};

export default function ImageSlider({ currentVariant }: ImageSliderProps) {
  const source = useImageSource(currentVariant?.images?.[0], "large");
  return (
    <View className="bg-gray-300 aspect-[4/5] -mx-4">
      <Image source={source} className="size-full object-cover" />
    </View>
  );
}
