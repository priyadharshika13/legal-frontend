import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { useProduct } from '../../core/ProductProvider';
import { MOCK_PRECEDENTS_INDIA, MOCK_PRECEDENTS_SAUDI } from './mockCase';

/**
 * Related judgments / precedent references. India: precedent-heavy. Saudi: statute/regulation references; precedent secondary. No outcome prediction.
 */
export default function PrecedentLinks() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isSaudi } = useProduct();
  const precedents = isSaudi ? MOCK_PRECEDENTS_SAUDI : MOCK_PRECEDENTS_INDIA;

  return (
    <AppLayout title={t('casePrecedents', 'Related judgments')}>
      <Disclaimer compact variant="caseAnalysis" />
      <div style={{ marginBottom: 14 }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/cases/${caseId}`)}>{t('back', 'Back')}</button>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>{isSaudi ? t('casePrecedentsSaudi', 'Regulation & statute references') : t('casePrecedents', 'Related judgments')}</div>
        <p style={styles.neutral}>
          {isSaudi
            ? t('casePrecedentsIntroSaudi', 'Regulation and statute references for research only. No legal advice. Human verification required.')
            : t('casePrecedentsIntro', 'Precedent references for research. This does not constitute legal advice. Human verification required.')}
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          {precedents.map((p) => (
            <div key={p.id} style={styles.item}>
              <div style={styles.citation}>{p.citation}</div>
              <div style={styles.meta}>{p.court} · {p.year}</div>
              <div style={styles.relevance}>{p.relevance}</div>
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
  citation: { fontWeight: 800, color: '#F5C76A', marginBottom: 6 },
  meta: { fontSize: 12, color: '#A0A0A0', marginBottom: 6 },
  relevance: { fontSize: 13, color: '#F5F5F5', lineHeight: 1.5 },
  backBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', cursor: 'pointer', fontWeight: 800 },
};
