import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { MOCK_TEMPLATES } from './mockDrafting';

/**
 * Jurisdiction-specific templates. Reference-only; no validation of legality.
 */
export default function Templates() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [jurisdiction, setJurisdiction] = useState('');
  const isRtl = i18n.language?.startsWith('ar');

  const filtered = jurisdiction
    ? MOCK_TEMPLATES.filter((tpl) => tpl.jurisdiction === jurisdiction)
    : MOCK_TEMPLATES;

  const name = (tpl) => (isRtl && tpl.nameAr ? tpl.nameAr : tpl.nameEn);

  return (
    <AppLayout title={t('draftTemplates', 'Templates')}>
      <Disclaimer compact />
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('draftTemplates', 'Templates')}</div>
        <p style={styles.refOnly}>{t('draftRefOnly', 'Template-based only. No validation of legality. No recommendations.')}</p>
        <select
          style={styles.input}
          value={jurisdiction}
          onChange={(e) => setJurisdiction(e.target.value)}
        >
          <option value="">{t('lawsAllJurisdictions', 'All jurisdictions')}</option>
          <option value="SA">{t('lawsSaudi', 'Saudi Arabia')}</option>
          <option value="IN">{t('lawsIndia', 'India')}</option>
        </select>
        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
          {filtered.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              style={styles.row}
              onClick={() => navigate(`/draft?template=${tpl.id}`)}
            >
              <span style={{ fontWeight: 800, color: '#F5F5F5' }}>{name(tpl)}</span>
              <span style={styles.badge}>{tpl.jurisdiction === 'SA' ? t('lawsSaudi', 'Saudi Arabia') : t('lawsIndia', 'India')}</span>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  refOnly: { color: '#A0A0A0', fontSize: 12, marginBottom: 12 },
  input: { padding: '10px 12px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5F5F5', minWidth: 200 },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', cursor: 'pointer', textAlign: 'left', width: '100%' },
  badge: { padding: '6px 10px', borderRadius: 999, background: '#2a2b33', color: '#A0A0A0', fontSize: 12 },
};
