import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { getCaseApi } from '../../services/api/cases';

/**
 * Case facts summary from backend CaseOut.
 */
export default function CaseOverview() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(!!caseId);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!caseId) return;
    getCaseApi(caseId)
      .then((res) => setCaseData(res.data))
      .catch((e) => setError(e?.response?.data?.detail || e?.message || 'Failed to load case'))
      .finally(() => setLoading(false));
  }, [caseId]);

  if (!caseId) {
    return (
      <AppLayout title={t('caseOverview', 'Case Overview')}>
        <Disclaimer />
        <div style={{ color: '#A0A0A0' }}>{t('caseNotFound', 'Case not found.')}</div>
        <button type="button" style={styles.backBtn} onClick={() => navigate('/dashboard')}>{t('back', 'Back')}</button>
      </AppLayout>
    );
  }

  if (loading) {
    return (
      <AppLayout title={t('caseOverview', 'Case Overview')}>
        <div style={{ color: '#A0A0A0' }}>Loading...</div>
        <button type="button" style={styles.backBtn} onClick={() => navigate('/dashboard')}>{t('back', 'Back')}</button>
      </AppLayout>
    );
  }

  if (error || !caseData) {
    return (
      <AppLayout title={t('caseOverview', 'Case Overview')}>
        <div style={{ color: '#ffb3b3' }}>{error || t('caseNotFound', 'Case not found.')}</div>
        <button type="button" style={styles.backBtn} onClick={() => navigate('/dashboard')}>{t('back', 'Back')}</button>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={t('caseOverview', 'Case Overview')}>
      <Disclaimer compact />
      <div style={{ marginBottom: 14 }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate('/dashboard')}>{t('back', 'Back')}</button>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('caseFactsSummary', 'Facts summary')}</div>
        <div style={styles.meta}>
          <span><strong>{t('clientName')}:</strong> {caseData.client_name}</span>
          <span><strong>{t('court')}:</strong> {caseData.court || '—'}</span>
          <span><strong>{t('caseType')}:</strong> {caseData.case_type}</span>
          <span><strong>Status:</strong> {caseData.status || 'intake'}</span>
        </div>
        <div style={styles.summary}>{caseData.summary || caseData.ai_case_one_liner || '—'}</div>
        {caseData.ai_next_steps ? <div style={{ marginTop: 12, color: '#A0A0A0', fontSize: 13 }}><strong>AI next steps:</strong> {caseData.ai_next_steps}</div> : null}
        {caseData.ai_possible_laws ? <div style={{ marginTop: 8, color: '#A0A0A0', fontSize: 13 }}><strong>Possible laws:</strong> {caseData.ai_possible_laws}</div> : null}
      </div>
      <div style={styles.navRow}>
        <button type="button" style={styles.linkBtn} onClick={() => navigate(`/cases/${caseId}/issues`)}>
          {t('caseIssues', 'Legal issues')}
        </button>
        <button type="button" style={styles.linkBtn} onClick={() => navigate(`/cases/${caseId}/strengths`)}>
          {t('caseStrengths', 'Strength indicators')}
        </button>
        <button type="button" style={styles.linkBtn} onClick={() => navigate(`/cases/${caseId}/challenges`)}>
          {t('caseChallenges', 'Challenge indicators')}
        </button>
        <button type="button" style={styles.linkBtn} onClick={() => navigate(`/cases/${caseId}/precedents`)}>
          {t('casePrecedents', 'Related judgments')}
        </button>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  meta: { display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 13, color: '#A0A0A0', marginBottom: 12 },
  summary: { color: '#F5F5F5', lineHeight: 1.6 },
  navRow: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  linkBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5C76A', cursor: 'pointer', fontWeight: 800 },
  backBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', cursor: 'pointer', fontWeight: 800 },
};
