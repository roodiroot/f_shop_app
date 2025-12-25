import { useAuth } from "@/auth/auth-context";
import ReturnError from "@/components/layout/return-error";
import OrderItemComponent from "@/components/page/order-history/order-item";
import SkeletonOrderHisory from "@/components/page/order-history/skeleton-order-history";
import WrapperCatalog from "@/components/ui/wrapper-catalog";
import WrapperList from "@/components/ui/wrapper-list";
import { useHistoryOrders } from "@/hooks/query/use-history-orders";
import { FlatList, RefreshControl } from "react-native";

export default function OrderHistoryPage() {
  const { auth } = useAuth();

  const { data, loading, error, refetch, networkStatus } = useHistoryOrders(
    auth.user?.documentId,
    "createdAt:desc",
    10
  );
  const refreshing = networkStatus === 4;

  if (loading && !data) {
    return (
      <WrapperList headerSown headerTitle="История покупок">
        <SkeletonOrderHisory />
      </WrapperList>
    );
  }

  if (error) {
    return (
      <WrapperList headerSown headerTitle="История покупок">
        <ReturnError />
      </WrapperList>
    );
  }

  return (
    <WrapperCatalog
      className="bg-gray-50"
      headerSown
      headerTitle="История покупок"
    >
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => refetch()} />
        }
        contentContainerStyle={{ padding: 16, gap: 32 }}
        keyExtractor={(item) => item.documentId}
        renderItem={({ item }) => (
          <OrderItemComponent
            documentId={item.documentId}
            totalPrice={item.totalPrice}
            statusOrder={item.statusOrder}
            updatedAt={item.updatedAt}
            order_items={item.order_items}
          />
        )}
      />
    </WrapperCatalog>
  );
}
