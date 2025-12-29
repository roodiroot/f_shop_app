import { useImageSource } from "@/hooks/useImageSource";
import { ProductImage } from "@/types/products";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

export const NO_IMAGE = require("@/assets/images/no-image.jpg");

type ImagesArray = {
  id: number;
  source: { uri: string };
}[];
type ImageSliderProps = {
  currentVariant: any | null;
};

export default function ImageSlider({ currentVariant }: ImageSliderProps) {
  const { width } = Dimensions.get("window");
  const WIDTH = width;

  const images: ImagesArray =
    currentVariant?.images?.map((image: ProductImage, index: number) => {
      return {
        id: index,
        source: useImageSource(image, "medium"),
      };
    }) || [];

  const progress = useSharedValue<number>(0);

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <>
      <View className="bg-gray-100 aspect-[4/5] -mx-4">
        <Carousel
          ref={ref}
          width={WIDTH}
          loop
          data={images}
          onProgressChange={(absoluteProgress) => {
            progress.value = absoluteProgress;
          }}
          renderItem={({ item }) => (
            <View className="h-full bg-gray-100 overflow-hidden">
              <Image
                source={item?.source}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>

      <View className="relative -mt-4">
        <Pagination.Basic
          progress={progress}
          data={images}
          dotStyle={{
            width: 25,
            height: 4,
            backgroundColor: "#e5e7eb",
            borderRadius: 2,
          }}
          activeDotStyle={{ overflow: "hidden", backgroundColor: "#6b7280" }}
          containerStyle={{
            position: "absolute",
            left: 0,
            top: 0,
            gap: 10,
            marginTop: 5,
            alignItems: "flex-start",
          }}
          onPress={onPressPagination}
          horizontal
        />
      </View>
    </>
  );
}
