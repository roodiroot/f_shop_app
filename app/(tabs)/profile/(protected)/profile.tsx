import { useAuth } from "@/auth/auth-context";
import ItemMenuLink from "@/components/page/profile/hero/item-menu-link";
import CastomIcon from "@/components/ui/icons/castom-icon";
import { icons } from "@/components/ui/icons/icons";
import WrapperList from "@/components/ui/wrapper-list";
import { Href } from "expo-router";
import { Pressable, Text, View } from "react-native";

type ProfileMenuType = {
  title: string;
  icon: keyof typeof icons;
  link?: Href;
}[];

const profileMenu: ProfileMenuType = [
  { title: "Профиль", icon: "editProfile" },
  {
    title: "История заказов",
    icon: "orderHistory",
    link: "/(tabs)/profile/(protected)/order-history",
  },
  { title: "Гайд по размерам", icon: "dress" },
  { title: "О магазине", icon: "about" },
  { title: "Доставка и оплата", icon: "delivery" },
  { title: "Контакты", icon: "contacts" },
  { title: "Поддержка", icon: "support" },
  { title: "Политика конфиденциальности", icon: "policy" },
  { title: "Публичная оферта", icon: "policy" },
];

export default function ProfilePage() {
  const { auth, logout, refreshMe } = useAuth();
  return (
    <WrapperList>
      <View className="mt-[100] justify-center items-center">
        <CastomIcon name="logo" size={60} />

        <View className="w-full mt-4 gap-2 items-center pb-6 border-b border-gray-200">
          <Text className="text-gray-900 font-bold text-2xl">
            {auth.user?.username}
          </Text>
          <Text className="font-medium text-lg">{auth.user?.email}</Text>
        </View>
        <View className="pt-6 gap-3 flex-1">
          {profileMenu.map((i) => (
            <ItemMenuLink
              key={i.title}
              title={i.title}
              icon={i.icon}
              link={i.link}
            />
          ))}
          <Pressable
            onPress={logout}
            className="w-full px-4  py-2 flex-row gap-2.5 items-center justify-start"
          >
            <CastomIcon name="logout" color="#dc2626" />
            <Text className="text-lg text-red-600">Выйти</Text>
          </Pressable>
        </View>
      </View>
    </WrapperList>
  );
}
