import ReturnError from "@/components/layout/return-error";
import FuterOrder from "@/components/page/order/footer-order";
import OrderClientInfo from "@/components/page/order/order-client-info";
import OrderHead from "@/components/page/order/order-head";
import OrderProductItem from "@/components/page/order/order-product-item";
import OrderSammerySumm from "@/components/page/order/order-summery-summ";
import SkeletonOrder from "@/components/page/order/sceleton-order";
import Button from "@/components/ui/button/button";
import WrapperList from "@/components/ui/wrapper-list";

import { useOrder } from "@/hooks/query/use-order";
import { usePay } from "@/hooks/query/use-pay";
import { shadowSoft } from "@/theme/colors";
import { useLocalSearchParams } from "expo-router";
import { RefreshControl, Text, View } from "react-native";

export default function OrderIdPage() {
  const { documentId } = useLocalSearchParams<{
    documentId: string;
  }>();

  const { data, loading, error, refetch, networkStatus } = useOrder(documentId);
  const pay = usePay();

  const refreshing = networkStatus === 4;

  if (error) {
    return <ReturnError />;
  }

  if (loading && !data) {
    return <SkeletonOrder />;
  }

  return (
    <WrapperList
      headerSown
      headerTitle="Заказ"
      className="bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => refetch()} />
      }
    >
      <OrderHead documentId={documentId} createdAt={data?.createdAt || ""} />
      <View
        style={shadowSoft}
        className="border border-gray-200 rounded-xl bg-white mt-4"
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
      <View className="py-6">
        {data?.statusOrder === "waiting_for_payment" ||
        data?.statusOrder === "canceled" ? (
          <Button
            onPress={() => pay.mutate(documentId)}
            disabled={pay.isPending}
          >
            {pay.isPending ? "Открываем оплату..." : "Оплатить"}
          </Button>
        ) : null}
      </View>
      {pay.isError ? (
        <Text className="mt-2 text-red-800">
          {(pay.error as Error).message}
        </Text>
      ) : null}
    </WrapperList>
  );
}
