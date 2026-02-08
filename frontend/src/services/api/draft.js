import { api } from './client';

/**
 * POST /drafts/writ
 * Backend: WritDraftRequest — court, jurisdiction ("226"|"32"), petitioner?, respondent?, facts (min 20), reliefs[], opponent_points?, previous_judgments[], language ("en"|"ta")
 */
export const generateWritDraftApi = (payload) => api.post('/drafts/writ', payload);

/**
 * POST /drafts/counter
 * Backend: CounterDraftRequest — court, jurisdiction, petitioner, respondent, deponent_name?, petition_summary, facts_from_respondent, preliminary_objections[], para_wise_reply?, previous_judgments?, annexures?, language
 */
export const generateCounterDraftApi = (payload) => api.post('/drafts/counter', payload);

/**
 * POST /drafts/legal-notice
 * Backend: LegalNoticeRequest — matter_type, sender_name, sender_address, sender_advocate_name?, sender_advocate_enrolment?, receiver_name, receiver_address, facts, demands[], timeline_dates?, documents?, notice_period_days, language, tone
 */
export const generateLegalNoticeDraftApi = (payload) => api.post('/drafts/legal-notice', payload);

/**
 * POST /drafts/reply-notice
 * Backend: ReplyNoticeRequest — sender_*, notice_sender_*, notice_date?, notice_subject?, allegations_summary, reply_facts, admissions_if_any?, denials[], documents[], stance, language, tone
 */
export const generateReplyNoticeDraftApi = (payload) => api.post('/drafts/reply-notice', payload);

/**
 * POST /drafts/rejoinder
 * Backend: RejoinderRequest — court, jurisdiction, petitioner, respondent, writ_summary, counter_summary, points_to_rebut[], additional_facts?, additional_documents[], prayer_for_interim?, language
 */
export const generateRejoinderDraftApi = (payload) => api.post('/drafts/rejoinder', payload);
