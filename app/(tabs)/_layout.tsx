import { TabButton } from "@/components/general/tab-bar/tab-batton";
import { TabButtonCart } from "@/components/general/tab-bar/tab-batton-cart";
import { TabButtonFavorite } from "@/components/general/tab-bar/tab-batton-favorite";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

export default function TabsLayout() {
  return (
    <Tabs
    // screenOptions={{
    //   headerShown: false,

    //   tabBarActiveTintColor: "#262626",
    //   tabBarInactiveTintColor: "#6b7280",

    //   tabBarStyle: {
    //     height: 88,
    //     paddingTop: 10,
    //     paddingBottom: 28,
    //     borderTopWidth: 0,
    //     elevation: 0,
    //     backgroundColor: "#f3f4f6",
    //   },

    //   tabBarLabelStyle: {
    //     fontSize: 12,
    //     fontWeight: "500",
    //   },
    // }}
    >
      <TabSlot />
      <TabList className="h-24 bg-gray-100 border-t border-gray-200">
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

      {/* <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="catalog"
        options={{
          title: "Каталог",
          tabBarIcon: ({ color }) => (
            <SquaresSvg width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Корзина",
          tabBarIcon: ({ color }) => (
            <CartSvg width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Избранное",
          tabBarIcon: ({ color }) => (
            <FavoriteSvg width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(tabs)/profile/(auth)/login");
          },
        }}
        options={{
          title: "Профиль",
          tabBarIcon: ({ color }) => (
            <ProfileSvg width={24} height={24} fill={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
