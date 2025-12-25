import ReturnError from "@/components/layout/return-error";
import FuterOrder from "@/components/page/order/footer-order";
import OrderClientInfo from "@/components/page/order/order-client-info";
import OrderHead from "@/components/page/order/order-head";
import OrderProductItem from "@/components/page/order/order-product-item";
import OrderSammerySumm from "@/components/page/order/order-summery-summ";
import SkeletonOrder from "@/components/page/order/sceleton-order";
import WrapperList from "@/components/ui/wrapper-list";
import { useOrder } from "@/hooks/query/use-order";
import { shadowSoft } from "@/theme/colors";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function OrderIdModalPage() {
  const { documentId } = useLocalSearchParams<{
    documentId: string;
  }>();
  const { data, loading, error } = useOrder(documentId);

  if (error) {
    return <ReturnError />;
  }

  if (loading) {
    return <SkeletonOrder />;
  }

  return (
    <WrapperList className="bg-gray-50">
      <OrderHead documentId={documentId} createdAt={data?.createdAt || ""} />
      <View
        style={shadowSoft}
        className="border border-gray-200 rounded-xl bg-white mt-4 mb-10"
      >
        <View className="p-4">
          {data?.order_items.map((i, index) => (
            <OrderProductItem
              key={i.documentId}
              index={index}
              documentId={i.documentId}
              productVariantImg={i.product_variant.images[0]}
              productSlug={i.product.slug}
              title={i.title}
              quantity={i.quantity}
              price={i.product_variant.price}
              size={i.product_variant.size}
              colorHex={i.product_variant.colorHex}
            />
          ))}
          <OrderSammerySumm
            totalPrice={data?.totalPrice || 0}
            totalLength={data?.order_items.length || 0}
          />
          <OrderClientInfo
            deliveryAddress={data?.deliveryAddress}
            phone={data?.phone}
            email={data?.email}
            paymentMethod={data?.paymentMethod}
            comment={data?.comment}
          />
        </View>
        <FuterOrder
          statusOrder={data?.statusOrder}
          updatedAt={data?.updatedAt}
        />
      </View>
    </WrapperList>
  );
}
