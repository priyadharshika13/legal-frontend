import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProductConfig, PRODUCT_IDS } from '../config/productConfig';
import { getActiveProductId, setActiveProductId as persistProductId } from '../store/product';
import { getAuth, saveAuth } from '../store/auth';
import { meApi } from '../services/api/auth';
import i18n from './i18n';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [productIdState, setProductIdState] = useState(getActiveProductId);
  const [, setMeFetched] = useState(false);

  const auth = getAuth();
  const tenantProduct = auth?.tenantProduct === 'india' || auth?.tenantProduct === 'saudi' ? auth.tenantProduct : null;
  const productId = tenantProduct || productIdState;
  const tenantControlled = !!tenantProduct;

  useEffect(() => {
    if (!auth?.token) return;
    if (auth.tenantProduct) return;
    meApi()
      .then((r) => {
        const product = r.data?.product;
        if (product === 'india' || product === 'saudi') {
          saveAuth({ ...getAuth(), tenantProduct: product });
          setMeFetched(true);
        }
      })
      .catch(() => {});
  }, [auth?.token, auth?.tenantProduct]);

  const config = useMemo(() => getProductConfig(productId), [productId]);

  useEffect(() => {
    document.documentElement.dir = config.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = config.defaultLanguage || 'en';
  }, [config]);

  const setProductId = useCallback((id) => {
    if (id !== 'india' && id !== 'saudi') return;
    if (getAuth()?.token) return;
    persistProductId(id);
    setProductIdState(id);
    const nextConfig = getProductConfig(id);
    const lang = nextConfig.defaultLanguage || 'en';
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.dir = nextConfig.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  const value = useMemo(
    () => ({
      productId,
      config,
      setProductId,
      isIndia: productId === PRODUCT_IDS.INDIA,
      isSaudi: productId === PRODUCT_IDS.SAUDI,
      tenantControlled,
    }),
    [productId, config, setProductId, tenantControlled]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProduct must be used within ProductProvider');
  return ctx;
}
