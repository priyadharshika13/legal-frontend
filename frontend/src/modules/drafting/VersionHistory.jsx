import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { MOCK_VERSIONS } from './mockDrafting';

/**
 * Track draft changes (version history).
 */
export default function VersionHistory() {
  const { t } = useTranslation();

  return (
    <AppLayout title={t('draftVersionHistory', 'Version history')}>
      <Disclaimer compact />
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('draftVersionHistory', 'Draft versions')}</div>
        <div style={{ display: 'grid', gap: 10 }}>
          {MOCK_VERSIONS.map((v) => (
            <div key={v.id} style={styles.row}>
              <span style={styles.version}>v{v.version}</span>
              <span style={{ color: '#F5F5F5', fontWeight: 800 }}>{v.label}</span>
              <span style={{ color: '#A0A0A0', fontSize: 12 }}>{new Date(v.createdAt).toLocaleString()}</span>
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
  row: { display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507' },
  version: { fontWeight: 900, color: '#F5C76A', minWidth: 36 },
};
