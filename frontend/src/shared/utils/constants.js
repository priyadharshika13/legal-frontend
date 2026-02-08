/**
 * Platform-wide legal disclaimers (non-negotiable).
 * Display on case, drafting, and research views.
 */
export const DISCLAIMER_PLATFORM =
  'This platform provides legal research assistance only. It does not constitute legal advice. AI outputs require human verification.';

export const DISCLAIMER_AI_LABEL = 'AI-assisted legal research notes (for reference only)';

/**
 * Shown when an action is not allowed under the tenant's legal framework.
 * Jurisdiction is tenant-controlled; never auto-decided by user location.
 */
export const JURISDICTION_RESTRICTION_MESSAGE =
  'This action is not available for your organisation\'s legal framework. Jurisdiction is set by your tenant and cannot be changed here.';

/**
 * Shown when API returns 403 (e.g. wrong tenant / ownership).
 * Frontend must never accept tenant_id from user input; only from /auth/me.
 */
export const ACCESS_RESTRICTED_MESSAGE = 'Access restricted to your organization.';
