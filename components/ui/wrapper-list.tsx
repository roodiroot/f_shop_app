import { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

import cn from "clsx";
import Header from "../layout/header";

type WrapperListProps = PropsWithChildren & {
  headerSown?: boolean;
  headerTitle?: string;
  className?: string;
  refreshControl?: React.ReactNode;
};
export default function WrapperList({
  headerSown,
  headerTitle,
  refreshControl,
  className,
  children,
}: WrapperListProps) {
  return (
    <View className={cn("flex-1 bg-white", className)}>
      {headerSown ? <Header title={headerTitle} /> : null}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="px-4"
        refreshControl={refreshControl as any}
      >
        {children}
      </ScrollView>
    </View>
  );
}
