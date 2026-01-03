import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const itemsImages = [
  {
    id: "1",
    uri: require("@/assets/images/hero-screens/hero.webp"),
    categorySlug: "verhnyaya-odezhda",
  },
  {
    id: "2",
    uri: require("@/assets/images/hero-screens/hero2.webp"),
    categorySlug: "dzhinsovye-shorty",
  },
  {
    id: "2",
    uri: require("@/assets/images/hero-screens/hero3_1.webp"),
    categorySlug: "dzhinsy-muzhskie",
  },
];

export default function HeroSection() {
  const { width } = Dimensions.get("window");
  const GAP = 16;
  const WIDTH = width;
  const progress = useSharedValue<number>(0);

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View className="mt-4 aspect-[2/1] mb-2">
      <Carousel
        ref={ref}
        width={WIDTH}
        loop
        autoPlay
        autoPlayInterval={5000}
        data={itemsImages}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push(`/(tabs)/catalog/category/${item.categorySlug}`)
            }
            style={{ marginHorizontal: GAP }}
            className="h-full bg-gray-100 rounded-3xl overflow-hidden"
          >
            <Image
              source={item.uri}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </Pressable>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={itemsImages}
        dotStyle={{
          width: 20,
          height: 4,
          backgroundColor: "#e5e7eb",
          borderRadius: 2,
        }}
        activeDotStyle={{ overflow: "hidden", backgroundColor: "#6b7280" }}
        containerStyle={{
          gap: 5,
          marginTop: 5,
          alignItems: "flex-start",
        }}
        onPress={onPressPagination}
        horizontal
      />
    </View>
  );
}
