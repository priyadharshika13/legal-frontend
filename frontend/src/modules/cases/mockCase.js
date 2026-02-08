/**
 * Mock case data for Case Overview, Issues, Strength/Challenge points, Precedents.
 * Product-specific: India (case-law heavy, precedent emphasized) vs Saudi (statute-focused, conservative).
 * Replace with case-analysis-service API when connected.
 */

export const MOCK_CASE_OVERVIEW = {
  id: 'case-1',
  clientName: 'Sample Client',
  court: 'High Court',
  district: 'Sample District',
  caseType: 'Civil',
  summary: 'Brief facts summary for research purposes. Courts have considered similar factual patterns in past decisions.',
  jurisdiction: 'IN',
};

/** India: case-law heavy, precedent reasoning emphasized. */
export const MOCK_ISSUES_INDIA = [
  { id: 1, title: 'Applicability of limitation period', description: 'Commonly examined factors include date of cause of action and filing date. Judicial trends indicate courts examine these factors.' },
  { id: 2, title: 'Jurisdiction of court', description: 'Judicial trends indicate courts examine territorial and subject-matter jurisdiction. Precedent is commonly cited.' },
];

/** Saudi: statute & regulation focused, conservative tone. */
export const MOCK_ISSUES_SAUDI = [
  { id: 1, title: 'Applicability of relevant regulations', description: 'The applicable regulations and their effective dates are commonly examined. Human verification required.' },
  { id: 2, title: 'Competent authority and jurisdiction', description: 'Statute and regulation define competent authority. Reference only; no legal advice.' },
];

export const MOCK_ISSUES = MOCK_ISSUES_INDIA;

export const MOCK_STRENGTH_POINTS_INDIA = [
  { id: 1, text: 'Courts have considered documentary evidence as a factor in similar matters.' },
  { id: 2, text: 'Judicial trends indicate that timely filing is commonly examined.' },
  { id: 3, text: 'Precedent reasoning is often applied in comparable cases.' },
];

export const MOCK_STRENGTH_POINTS_SAUDI = [
  { id: 1, text: 'Relevant regulations and statutory requirements may be examined.' },
  { id: 2, text: 'Documentation and compliance with applicable regulations are commonly considered.' },
];

export const MOCK_STRENGTH_POINTS = MOCK_STRENGTH_POINTS_INDIA;

export const MOCK_CHALLENGE_POINTS_INDIA = [
  { id: 1, text: 'Challenging aspects may include opposing party arguments; courts examine both sides.' },
  { id: 2, text: 'Risk indicators: limitation and jurisdiction are commonly contested.' },
];

export const MOCK_CHALLENGE_POINTS_SAUDI = [
  { id: 1, text: 'Opposing arguments and regulatory interpretation may be examined. Human verification required.' },
  { id: 2, text: 'Statutory and regulatory compliance are commonly examined. No outcome prediction.' },
];

export const MOCK_CHALLENGE_POINTS = MOCK_CHALLENGE_POINTS_INDIA;

/** India: precedent-heavy. */
export const MOCK_PRECEDENTS_INDIA = [
  { id: 1, citation: 'ABC v. State (2023) 5 SCC 100', court: 'Supreme Court', year: 2023, relevance: 'Similar factual matrix; courts have considered limitation.' },
  { id: 2, citation: 'XYZ v. Union of India (2021) 2 HC 45', court: 'High Court', year: 2021, relevance: 'Jurisdiction and cause of action examined.' },
  { id: 3, citation: 'PQR v. State (2022) 3 SCC 200', court: 'Supreme Court', year: 2022, relevance: 'Precedent reasoning applied to similar issues.' },
];

/** Saudi: statute/regulation references; precedent secondary. */
export const MOCK_PRECEDENTS_SAUDI = [
  { id: 1, citation: 'Regulation reference: Commercial Regulations, Art. 12', court: 'N/A', year: 2022, relevance: 'Relevant regulatory provision. Reference only.' },
];

export const MOCK_PRECEDENTS = MOCK_PRECEDENTS_INDIA;
