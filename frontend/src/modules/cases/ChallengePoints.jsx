import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { useProduct } from '../../core/ProductProvider';
import { MOCK_CHALLENGE_POINTS_INDIA, MOCK_CHALLENGE_POINTS_SAUDI } from './mockCase';

/**
 * Challenging / risk indicators (neutral). India: case-law language. Saudi: statute-focused, conservative. No probabilities or outcome prediction.
 */
export default function ChallengePoints() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isSaudi } = useProduct();
  const points = isSaudi ? MOCK_CHALLENGE_POINTS_SAUDI : MOCK_CHALLENGE_POINTS_INDIA;

  return (
    <AppLayout title={t('caseChallenges', 'Challenge indicators')}>
      <Disclaimer compact variant="caseAnalysis" />
      <div style={{ marginBottom: 14 }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/cases/${caseId}`)}>{t('back', 'Back')}</button>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('caseChallenges', 'Challenge indicators')}</div>
        <p style={styles.neutral}>
          {isSaudi
            ? t('caseChallengesIntroSaudi', 'Regulatory and statutory factors may be examined. No outcome prediction. Human verification required.')
            : t('caseChallengesIntro', 'Commonly examined factors and risk indicators. This does not constitute legal advice. Human verification required.')}
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
