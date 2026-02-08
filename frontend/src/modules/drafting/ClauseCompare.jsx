import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';

/**
 * Compare two clauses. Reference-only; no recommendations.
 */
export default function ClauseCompare() {
  const { t } = useTranslation();
  const [clauseA, setClauseA] = useState('');
  const [clauseB, setClauseB] = useState('');

  return (
    <AppLayout title={t('draftClauseCompare', 'Compare clauses')}>
      <Disclaimer compact />
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('draftClauseCompare', 'Compare two clauses')}</div>
        <p style={styles.refOnly}>{t('draftRefOnly', 'Reference-only. No validation of legality.')}</p>
        <div style={styles.twoCol}>
          <div>
            <label style={styles.label}>Clause A</label>
            <textarea
              rows={8}
              style={styles.textarea}
              value={clauseA}
              onChange={(e) => setClauseA(e.target.value)}
              placeholder="Paste first clause..."
            />
          </div>
          <div>
            <label style={styles.label}>Clause B</label>
            <textarea
              rows={8}
              style={styles.textarea}
              value={clauseB}
              onChange={(e) => setClauseB(e.target.value)}
              placeholder="Paste second clause..."
            />
          </div>
        </div>
        <p style={{ color: '#A0A0A0', fontSize: 12, marginTop: 12 }}>
          Use AI-assisted &quot;Compare&quot; button (when connected) to view differences. Human verification required.
        </p>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  refOnly: { color: '#A0A0A0', fontSize: 12, marginBottom: 12 },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  label: { display: 'block', fontSize: 12, color: '#A0A0A0', marginBottom: 6 },
  textarea: { width: '100%', padding: '12px 12px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5F5F5', outline: 'none', resize: 'vertical' },
};
