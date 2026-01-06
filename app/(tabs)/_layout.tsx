import { TabButton } from "@/components/general/tab-bar/tab-batton";
import { TabButtonCart } from "@/components/general/tab-bar/tab-batton-cart";
import { TabButtonFavorite } from "@/components/general/tab-bar/tab-batton-favorite";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const extraIOS =
    Platform.OS === "ios" ? Math.min(insets.bottom, 10) : insets.bottom;
  console.log(insets.bottom);
  return (
    <Tabs>
      <TabSlot />
      <TabList
        style={{ paddingBottom: extraIOS }}
        className="h-auto bg-gray-100 border-t border-gray-200 pb-100"
      >
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon="home" label="Главная" />
        </TabTrigger>

        <TabTrigger name="Каталог" href="/catalog/category" asChild>
          <TabButton icon="squares" label="Каталог" />
        </TabTrigger>

        <TabTrigger name="Корзина" href="/cart" asChild>
          <TabButtonCart />
        </TabTrigger>
        <TabTrigger name="Избранное" href="/favorites" asChild>
          <TabButtonFavorite />
        </TabTrigger>
        <TabTrigger name="Профиль" href="/profile/login" asChild>
          <TabButton icon="user" label="Профиль" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
