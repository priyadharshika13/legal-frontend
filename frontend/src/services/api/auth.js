import { api } from './client';

// Backend: POST /auth/login (or /api/auth/login depending on main.py mount). X-Tenant required.
export async function loginApi({ tenantCode, email, password }) {
  return api.post('/auth/login', { email, password }, { headers: { 'X-Tenant': tenantCode } });
}

// Backend: GET /auth/me. Requires Bearer + X-Tenant (from api client interceptor).
export async function meApi() {
  return api.get('/auth/me');
}

// No backend logout; client clears token.
export async function logoutApi() {
  return Promise.resolve();
}

// Backend: POST /auth/register. Body: email, password, full_name?, role. X-Tenant required.
export async function registerApi({ tenantCode, email, password, full_name, role }) {
  return api.post(
    '/auth/register',
    { email, password, full_name: full_name ?? null, role: role ?? 'lawyer' },
    { headers: { 'X-Tenant': tenantCode } }
  );
}

