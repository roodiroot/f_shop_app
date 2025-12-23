import { PropsWithChildren } from "react";
import { View } from "react-native";

import cn from "clsx";
import Header from "../layout/header";

type WrapperCatalogProps = PropsWithChildren & {
  headerSown?: boolean;
  headerTitle?: string;
  className?: string;
};
export default function WrapperCatalog({
  headerSown,
  headerTitle,
  className,
  children,
}: WrapperCatalogProps) {
  return (
    <View className={cn("flex-1 bg-white", className)}>
      {headerSown ? <Header title={headerTitle} /> : null}
      {children}
    </View>
  );
}
