import { api } from './client';

/**
 * Backend: GET /judgments?q=&court=&year=&jurisdiction=&limit=&offset=
 * Response: { total, results: JudgmentOut[] }
 */
export const listJudgmentsApi = (params = {}) => {
  const { q = '', court = '', year, jurisdiction, limit = 20, offset = 0 } = params;
  return api.get('/judgments', {
    params: { q, court, year, jurisdiction, limit, offset },
  });
};

/**
 * Backend: GET /judgments/:id
 */
export const getJudgmentApi = (id) => api.get(`/judgments/${id}`);

/**
 * Backend: POST /judgments
 * Payload: JudgmentCreate (title, citation?, court?, decision_date?, year?, summary?, full_text?, acts_sections_involved?, legal_issues?, ratio_decidendi?, key_observations?, citations?, jurisdiction?, tags?, source_url?)
 */
export const createJudgmentApi = (payload) => api.post('/judgments', payload);
