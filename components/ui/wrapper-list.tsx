import { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

import cn from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header, { HeaderOptions } from "../layout/header";

type WrapperListProps = PropsWithChildren & {
  headerSown?: boolean;
  headerTitle?: string;
  className?: string;
  refreshControl?: React.ReactNode;
  headerOptions?: HeaderOptions;
};
export default function WrapperList({
  headerOptions,
  headerSown,
  headerTitle,
  refreshControl,
  className,
  children,
}: WrapperListProps) {
  const insets = useSafeAreaInsets();
  return (
    <View className={cn("flex-1 bg-white", className)}>
      {headerSown ? (
        <Header title={headerTitle} headerOptions={headerOptions} />
      ) : null}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
        }}
        refreshControl={refreshControl as any}
      >
        {children}
      </ScrollView>
    </View>
  );
}
