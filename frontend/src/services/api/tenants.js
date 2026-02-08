import { api } from './client';

/**
 * Create tenant (organization). Product is mandatory and immutable.
 * Backend: POST /tenants/create?name=&slug=&product=
 * product: "india" | "saudi"
 */
export function createTenantApi({ name, slug, product }) {
  return api.post(
    '/tenants/create',
    null,
    { params: { name, slug, product: product === 'india' ? 'india' : 'saudi' } }
  );
}
