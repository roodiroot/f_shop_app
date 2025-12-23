export const getPriceFormat = (price?: number) => {
  return new Intl.NumberFormat("ru-Ru", {
    style: "currency",
    maximumFractionDigits: 0,
    currency: "RUB",
  }).format(price || 0);
};
