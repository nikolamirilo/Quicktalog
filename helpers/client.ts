export function formatPrice(price) {
  if (!price.includes(".")) return price
  return price.split(".")[0]
}

const now = new Date();
export const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
export const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);