/**
 * Mock drafting data: jurisdiction-specific templates, clause library, draft versions.
 * Replace with drafting-service API when connected.
 */

export const MOCK_TEMPLATES = [
  { id: 'sa-contract-1', jurisdiction: 'SA', nameAr: 'عقد عمل', nameEn: 'Employment contract', category: 'Labour' },
  { id: 'sa-commercial-1', jurisdiction: 'SA', nameAr: 'عقد شراكة', nameEn: 'Partnership agreement', category: 'Commercial' },
  { id: 'in-writ-226', jurisdiction: 'IN', nameEn: 'Writ petition (Art. 226)', category: 'Constitutional' },
  { id: 'in-notice', jurisdiction: 'IN', nameEn: 'Legal notice', category: 'Civil' },
];

export const MOCK_CLAUSES = [
  { id: 'c1', jurisdiction: 'IN', title: 'Limitation clause', text: 'Any claim under this agreement shall be barred if not brought within three years from the date of cause of action.' },
  { id: 'c2', jurisdiction: 'SA', title: 'Governing law', text: 'This agreement shall be governed by the laws of the Kingdom of Saudi Arabia.' },
];

export const MOCK_VERSIONS = [
  { id: 'v1', draftId: 'd1', version: 1, createdAt: '2024-01-15T10:00:00Z', label: 'Initial draft' },
  { id: 'v2', draftId: 'd1', version: 2, createdAt: '2024-01-16T14:00:00Z', label: 'After client review' },
];
