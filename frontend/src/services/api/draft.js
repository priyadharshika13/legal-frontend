import { api } from './client';
const http = api;

/**
 * Calls POST /drafts/writ
 * Backend expects:
 * { court, jurisdiction, petitioner, respondent, facts, reliefs, previous_judgments, opponent_points, language }
 */
export const generateWritDraftApi = (payload) => {
  return http.post("/drafts/writ", payload);
};

/**
 * Calls POST /drafts/counter
 * Backend expects:
 * { case_id, points }
 */
export const generateCounterDraftApi = (payload) => {
  return http.post("/drafts/counter", payload);
};

/**
 * Calls POST /drafts/legal-notice
 * Backend expects:
 * { recipient, facts, requests, language }
 */
export const generateLegalNoticeDraftApi = (payload) => {
  return http.post("/drafts/legal-notice", payload);
};

export default {
  generateWritDraftApi,
  generateCounterDraftApi,
  generateLegalNoticeDraftApi,
};