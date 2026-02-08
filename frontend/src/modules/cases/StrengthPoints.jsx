import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { useProduct } from '../../core/ProductProvider';
import { MOCK_STRENGTH_POINTS_INDIA, MOCK_STRENGTH_POINTS_SAUDI } from './mockCase';

/**
 * Strength indicators (neutral). India: precedent/case-law emphasis. Saudi: statute-focused, conservative. NEVER win/lose/likely outcome.
 */
export default function StrengthPoints() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isSaudi } = useProduct();
  const points = isSaudi ? MOCK_STRENGTH_POINTS_SAUDI : MOCK_STRENGTH_POINTS_INDIA;

  return (
    <AppLayout title={t('caseStrengths', 'Strength indicators')}>
      <Disclaimer compact variant="caseAnalysis" />
      <div style={{ marginBottom: 14 }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/cases/${caseId}`)}>{t('back', 'Back')}</button>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('caseStrengths', 'Strength indicators')}</div>
        <p style={styles.neutral}>
          {isSaudi
            ? t('caseStrengthsIntroSaudi', 'Relevant regulations and statutory factors are commonly examined. This does not constitute legal advice.')
            : t('caseStrengthsIntro', 'Judicial trends indicate the following factors are commonly examined. This does not constitute legal advice.')}
        </p>
        <ul style={styles.list}>
          {points.map((p) => (
            <li key={p.id} style={styles.li}>{p.text}</li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  neutral: { color: '#A0A0A0', fontSize: 13, marginBottom: 14 },
  list: { margin: 0, paddingLeft: 20 },
  li: { color: '#F5F5F5', marginBottom: 8, lineHeight: 1.5 },
  backBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', cursor: 'pointer', fontWeight: 800 },
};
