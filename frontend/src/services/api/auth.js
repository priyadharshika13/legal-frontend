import { api } from './client';

export async function loginApi({ tenantCode, email, password }) {
  return api.post(
    '/api/auth/login/',
    { tenantCode, email, password },
    { headers: { 'X-Tenant': tenantCode } }
  );
}

export async function meApi() {
  return api.get('/auth/me');
}
export async function logoutApi() {
  return api.post('/auth/logout');
}



export async function registerApi({ tenantCode, email, password, full_name, role }) {
  return api.post(
    '/auth/register',
    { email, password, full_name, role },
    { headers: { 'X-Tenant': tenantCode } }
  );
}

