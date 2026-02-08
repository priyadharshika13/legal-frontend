/**
 * Active product (India vs Saudi). Persisted so UX and backend can switch behaviour.
 */
const KEY = 'ai_legal_product';

const DEFAULT_PRODUCT_ID = 'saudi';

export function getActiveProductId() {
  try {
    const stored = localStorage.getItem(KEY);
    return stored === 'saudi' || stored === 'india' ? stored : DEFAULT_PRODUCT_ID;
  } catch {
    return DEFAULT_PRODUCT_ID;
  }
}

export function setActiveProductId(productId) {
  if (productId === 'india' || productId === 'saudi') {
    localStorage.setItem(KEY, productId);
    return true;
  }
  return false;
}
