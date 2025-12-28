import { shadowSoft } from "@/theme/colors";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const itemsImages = [
  { id: "1", uri: require("@/assets/images/hero-screens/hero.webp") },
  { id: "2", uri: require("@/assets/images/hero-screens/hero2.webp") },
  {
    id: "2",
    uri: require("@/assets/images/hero-screens/hero3_1.webp"),
  },
];

export default function HeroSection() {
  const { width } = Dimensions.get("window");
  const GAP = 16;
  const WIDTH = width;
  return (
    <View className="mt-4 aspect-[2/1]">
      <Carousel
        width={WIDTH}
        loop
        autoPlay
        autoPlayInterval={5000}
        data={itemsImages}
        renderItem={({ item }) => (
          <View
            style={{ ...shadowSoft, marginHorizontal: GAP }}
            className="h-full bg-gray-100 rounded-3xl overflow-hidden"
          >
            <Image
              source={item.uri}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
}
