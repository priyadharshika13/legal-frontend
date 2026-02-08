import { api } from './client';

/**
 * Backend: GET /laws/search?q=&act_id=&limit=&offset=
 * Response: { total, acts: ActOut[], sections: SectionOut[] }
 * Use for listing acts (q empty) or searching acts/sections.
 */
export const searchLawsApi = (params = {}) => {
  const { q = '', act_id = 0, limit = 20, offset = 0 } = params;
  return api.get('/laws/search', { params: { q, act_id, limit, offset } });
};

/**
 * Backend: GET /laws/acts/:id
 */
export const getActApi = (actId) => api.get(`/laws/acts/${actId}`);

/**
 * Backend: GET /laws/sections/:id
 */
export const getSectionApi = (sectionId) => api.get(`/laws/sections/${sectionId}`);

/**
 * Backend: POST /laws/acts
 * Payload: ActCreate (act_name, short_title?, year?, jurisdiction?, summary?, source_url?, tags?, is_active)
 */
export const createActApi = (payload) => api.post('/laws/acts', payload);

/**
 * Backend: POST /laws/sections
 * Payload: SectionCreate (act_id, section_number, heading?, text?, punishment?, bailable?, cognizable?, compoundable?, keywords?, effective_date?)
 */
export const createSectionApi = (payload) => api.post('/laws/sections', payload);
