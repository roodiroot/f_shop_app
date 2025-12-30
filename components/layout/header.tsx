import { icons } from "@/components/ui/icons/icons";
import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CastomIcon from "../ui/icons/castom-icon";

export type HeaderOptions = {
  titleElement?: React.ReactNode;
  leftButtonIcon?: keyof typeof icons;
  leftButtonFunc?: () => void;
  rightButtonIcon?: keyof typeof icons;
  rightButtonFunc?: () => void;
};

type HeaderProps = PropsWithChildren & {
  title?: string;
  headerOptions?: HeaderOptions;
};

export default function Header({ title, headerOptions }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const leftButtonFunction = () => {
    if (headerOptions?.leftButtonFunc) {
      return headerOptions.leftButtonFunc();
    }
    return router.back();
  };
  const rightButtonFunction = () => {
    if (headerOptions?.rightButtonFunc) {
      return headerOptions.rightButtonFunc();
    }
    return router.push("/search");
  };
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-row items-center justify-between w-full px-4 pb-2 bg-white"
    >
      <Pressable
        onPress={leftButtonFunction}
        className="size-14 bg-white border-gray-200 border-2 rounded-full justify-center items-center"
      >
        <CastomIcon
          name={
            headerOptions?.leftButtonIcon
              ? headerOptions.leftButtonIcon
              : "arrowBack"
          }
        />
      </Pressable>
      {headerOptions?.titleElement ? (
        headerOptions?.titleElement
      ) : (
        <Text className="text-xl text-gray-900 font-medium uppercase">
          {title}
        </Text>
      )}

      <Pressable
        onPress={rightButtonFunction}
        className="size-14 bg-white border-gray-200 border-2 rounded-full justify-center items-center"
      >
        <CastomIcon
          name={
            headerOptions?.rightButtonIcon
              ? headerOptions?.rightButtonIcon
              : "search"
          }
        />
      </Pressable>
    </View>
  );
}
