import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { useProduct } from '../../core/ProductProvider';
import { MOCK_ISSUES_INDIA, MOCK_ISSUES_SAUDI } from './mockCase';

/**
 * Identified legal issues. Product-specific: India (precedent/case-law) vs Saudi (statute-focused, conservative). No outcome prediction.
 */
export default function CaseIssues() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isSaudi } = useProduct();
  const issues = isSaudi ? MOCK_ISSUES_SAUDI : MOCK_ISSUES_INDIA;

  return (
    <AppLayout title={t('caseIssues', 'Legal issues')}>
      <Disclaimer compact variant="caseAnalysis" />
      <div style={{ marginBottom: 14 }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/cases/${caseId}`)}>{t('back', 'Back')}</button>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('caseIssuesIdentified', 'Identified legal issues')}</div>
        <p style={styles.neutral}>
          {isSaudi
            ? t('caseIssuesIntroSaudi', 'Statute and regulation focused. This does not constitute legal advice. Human verification required.')
            : t('caseIssuesIntro', 'Commonly examined factors include the following. This does not constitute legal advice. Human verification required.')}
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          {issues.map((issue) => (
            <div key={issue.id} style={styles.item}>
              <div style={styles.itemTitle}>{issue.title}</div>
              <div style={styles.itemDesc}>{issue.description}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  neutral: { color: '#A0A0A0', fontSize: 13, marginBottom: 14 },
  item: { padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507' },
  itemTitle: { fontWeight: 800, color: '#F5F5F5', marginBottom: 6 },
  itemDesc: { fontSize: 13, color: '#A0A0A0', lineHeight: 1.5 },
  backBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', cursor: 'pointer', fontWeight: 800 },
};
