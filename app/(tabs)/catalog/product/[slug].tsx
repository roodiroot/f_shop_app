import ProductBody from "@/components/page/pdp/product-body";
import WrapperList from "@/components/ui/wrapper-list";
import { useProductBySlug } from "@/hooks/query/use-product-by-slug";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function ProductPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { product, loading, error } = useProductBySlug({ slug });

  if (loading || error || !product?.shortName) {
    return (
      <WrapperList headerSown>
        <View className="flex-1 items-center justify-center">
          <Text>LOADING PRODUCT...</Text>
        </View>
      </WrapperList>
    );
  }

  return (
    <WrapperList headerSown headerTitle={product?.shortName}>
      <ProductBody product={product} />
      <View className="mt-10 text-gray-700">
        <Markdown style={mdStyles}>
          {product?.description?.replace(/<br\s*\/?>/gi, "\n")}
        </Markdown>
      </View>
    </WrapperList>
  );
}

const mdStyles = StyleSheet.create({
  body: { color: "#374151", fontSize: 16, lineHeight: 22 },
  heading1: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  heading2: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  paragraph: { marginTop: 0, marginBottom: 10 },
  strong: { fontWeight: "700" },
  em: { fontStyle: "italic" },

  link: { color: "#2563eb" },

  bullet_list: { marginBottom: 10 },
  list_item: { flexDirection: "row" },
  bullet_list_icon: { marginRight: 8 },
  bullet_list_content: { flex: 1 },

  code_inline: {
    fontFamily: "Menlo",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  code_block: {
    fontFamily: "Menlo",
    backgroundColor: "#0B1220",
    padding: 12,
    borderRadius: 12,
  },
  fence: {
    fontFamily: "Menlo",
    backgroundColor: "#0B1220",
    padding: 12,
    borderRadius: 12,
  },
});
