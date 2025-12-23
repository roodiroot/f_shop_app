import CartSvg from "@/components/ui/icons/cart";
import FavoriteSvg from "@/components/ui/icons/favorites";
import HomeSvg from "@/components/ui/icons/home";
import ProfileSvg from "@/components/ui/icons/profile";
import SquaresSvg from "@/components/ui/icons/squares";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#262626",
        tabBarInactiveTintColor: "#6b7280",

        tabBarStyle: {
          height: 88,
          paddingTop: 10,
          paddingBottom: 28,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "#f3f4f6",
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
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
        options={{
          title: "Профиль",
          tabBarIcon: ({ color }) => (
            <ProfileSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
