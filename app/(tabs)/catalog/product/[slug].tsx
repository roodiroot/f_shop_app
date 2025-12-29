import Header from "@/components/layout/header";
import ReturnError from "@/components/layout/return-error";
import ProductBody from "@/components/page/pdp/product-body";
import WrapperList from "@/components/ui/wrapper-list";
import { useProductBySlug } from "@/hooks/query/use-product-by-slug";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";

const fish = `
Эта модель создана для тех, кто ценит простоту, качество и внимание к деталям. Лаконичный силуэт и выверенные пропорции делают изделие универсальной основой современного гардероба — вне времени и быстрых трендов.

Ткань приятна на ощупь и комфортна в носке. Материал хорошо держит форму, дышит и сохраняет аккуратный внешний вид даже при активном использовании в течение дня.

## Особенности
- Ручной крой и пошив
- Качественная ткань с мягкой текстурой
- Предварительная обработка для сохранения формы
- Комфортный состав из натуральных волокон

## Детали
Модель легко сочетается с базовыми элементами гардероба и подходит для повседневных образов. Продуманная посадка обеспечивает свободу движений и комфорт на протяжении всего дня.
`;

export default function ProductPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [refreshing, setRefreshing] = useState(false);
  const { product, loading, error, refetch } = useProductBySlug({ slug });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch({ slug });
    setRefreshing(false);
  };

  if (error) {
    return <ReturnError />;
  }

  if (loading || !product?.shortName) {
    return (
      <View>
        <Header />
        <View
          style={{ aspectRatio: 4 / 5 }}
          className="bg-gray-200 animate-pulse"
        ></View>
        <View className="mt-8 h-8 bg-gray-200 rounded-lg max-w-28" />
        <View className="mt-3.5  h-8 bg-gray-200 rounded-lg max-w-24" />
      </View>
    );
  }

  return (
    <WrapperList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      headerSown
      headerTitle={product?.shortName}
    >
      <ProductBody product={product} />
      <View className="mt-10">
        <Markdown style={mdStyles}>
          {/* {product?.description?.replace(/<br\s*\/?>/gi, "\n")}
           */}
          {fish}
        </Markdown>
      </View>
    </WrapperList>
  );
}

const mdStyles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
  },

  paragraph: {
    marginTop: 0,
    marginBottom: 18,
    color: "#0F172A",
    fontSize: 16,
    lineHeight: 24,
  },

  heading2: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: "#374151",
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  heading3: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: "#374151",
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 0.2,
  },

  bullet_list: {
    marginTop: 0,
    marginBottom: 18,
    paddingLeft: 4,
  },
  list_item: {
    marginVertical: 4,
  },

  bullet_list_icon: {
    color: "#374151",
    fontSize: 18,
    lineHeight: 24,
  },
  bullet_list_content: {
    flex: 1,
    color: "#374151",
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 6,
  },

  strong: {
    fontWeight: "500",
    color: "#374151",
  },
});
