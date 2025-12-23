import CartItem from "@/components/page/cart/cart-item";
import SummerySection from "@/components/page/cart/summery-section";
import EmptyPlaceholder from "@/components/ui/empty-placeholder";
import WrapperList from "@/components/ui/wrapper-list";
import { useCart } from "@/hooks/use-cart";
import cn from "clsx";

import { View } from "react-native";

export default function Cart() {
  const { items, removeFromCart, updateItemQuantity } = useCart();
  const totalSumm = items.reduce((acc, i) => i.price * i.quantity + acc, 0);

  return (
    <>
      <WrapperList
        headerSown
        headerTitle="Корзина"
        className={cn(items.length <= 0 && "items-center justify-center")}
      >
        {items.length <= 0 ? (
          <EmptyPlaceholder title="Ваша корзина пока пуста" />
        ) : (
          <View className="pb-4">
            {items.map((i, index) => (
              <CartItem
                key={i.variantId}
                index={index}
                variantId={i.variantId}
                slug={i.slug}
                imageUrl={i.imageUrl}
                name={i.name}
                quantity={i.quantity}
                price={i.price}
                stock={i.stock}
                color={i.color}
                size={i.size}
                updateItemQuantity={updateItemQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </View>
        )}
      </WrapperList>
      <SummerySection totalSumm={totalSumm} isCartNo={!items.length} />
    </>
  );
}
