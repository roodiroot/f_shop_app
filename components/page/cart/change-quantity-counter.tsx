import ChooseQuantity from "@/components/general/choose-quantity";

type ChangeQuantityCounterProps = {
  variantId: string;
  quantity: number;
  stock: number;
  updateItemQuantity?: (documentId: string, quantity: number) => void;
};

export default function ChangeQuantityCounter({
  variantId,
  quantity,
  stock,
  updateItemQuantity,
}: ChangeQuantityCounterProps) {
  const handleChangeQuantity = (next: number) => {
    updateItemQuantity && updateItemQuantity(variantId, next);
  };

  return (
    <ChooseQuantity
      max={stock}
      count={quantity}
      onChangeQuantity={handleChangeQuantity}
    />
  );
}
