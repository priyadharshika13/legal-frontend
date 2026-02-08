/**
 * Product-level configuration. Two products: India Legal Intelligence, Saudi Legal & Regulatory Intelligence.
 * Platform behaviour (disclaimer, AI features, case analysis emphasis, citation, collaboration) switches by active product.
 */
import indiaConfig from './india.json';
import saudiConfig from './saudi.json';

export const PRODUCT_IDS = { INDIA: 'india', SAUDI: 'saudi' };

const configs = {
  [PRODUCT_IDS.INDIA]: indiaConfig,
  [PRODUCT_IDS.SAUDI]: saudiConfig,
};

export function getProductConfig(productId) {
  const id = productId && configs[productId] ? productId : PRODUCT_IDS.INDIA;
  return configs[id] || indiaConfig;
}

export function getProductList() {
  return [
    { id: PRODUCT_IDS.INDIA, name: indiaConfig.nameShort, jurisdiction: indiaConfig.jurisdiction },
    { id: PRODUCT_IDS.SAUDI, name: saudiConfig.nameShort, jurisdiction: saudiConfig.jurisdiction },
  ];
}

export default configs;
