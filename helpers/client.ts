export function formatPrice(price) {
  if (!price.includes(".")) return price
  return price.split(".")[0]
}
