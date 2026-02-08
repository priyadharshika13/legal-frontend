import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { MOCK_LAWS, MOCK_VERSIONS, MOCK_DIFF } from './mockLaws';

/**
 * "What changed" — compare two law versions. Added clauses, removed clauses, modified obligations.
 * No AI — diff engine only.
 */
export default function LawDiff() {
  const { id, versionA, versionB } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language?.startsWith('ar');

  const law = MOCK_LAWS.find((l) => l.id === id);
  const versions = MOCK_VERSIONS[id] || [];
  const diffKey = versionA && versionB ? `${versionA}_${versionB}` : null;
  const diff = (MOCK_DIFF[id] || {})[diffKey] || {
    added_clauses: [],
    removed_clauses: [],
    modified_obligations: [],
  };

  if (!law) {
    return (
      <AppLayout title={t('lawsTitle', 'Laws')}>
        <div style={{ color: '#A0A0A0' }}>{t('lawsNotFound', 'Law not found.')}</div>
        <button type="button" style={styles.backBtn} onClick={() => navigate('/laws')}>{t('back', 'Back')}</button>
      </AppLayout>
    );
  }

  const title = isRtl && law.titleAr ? law.titleAr : law.titleEn;

  return (
    <AppLayout title={t('lawDiffTitle', 'What changed')}>
      <div style={{ marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/laws/${id}/amendments`)}>{t('back', 'Back')}</button>
        <span style={styles.meta}>{title} · {versionA} → {versionB}</span>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('lawDiffTitle', 'What changed')}</div>
        <p style={styles.refNote}>{t('lawDiffNote', 'Structural diff only. No AI.')}</p>

        {diff.added_clauses?.length > 0 && (
          <section style={styles.section}>
            <div style={styles.sectionLabel}>{t('lawDiffAdded', 'Added clauses')}</div>
            <ul style={styles.list}>
              {diff.added_clauses.map((num) => (
                <li key={num} style={styles.added}>Article {num}</li>
              ))}
            </ul>
          </section>
        )}

        {diff.removed_clauses?.length > 0 && (
          <section style={styles.section}>
            <div style={styles.sectionLabel}>{t('lawDiffRemoved', 'Removed clauses')}</div>
            <ul style={styles.list}>
              {diff.removed_clauses.map((num) => (
                <li key={num} style={styles.removed}>Article {num}</li>
              ))}
            </ul>
          </section>
        )}

        {diff.modified_obligations?.length > 0 && (
          <section style={styles.section}>
            <div style={styles.sectionLabel}>{t('lawDiffModified', 'Modified obligations')}</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {diff.modified_obligations.map((m, idx) => (
                <div key={idx} style={styles.modItem}>
                  <div style={styles.articleNum}>{t('lawArticle', 'Article')} {m.article_number}</div>
                  {m.old_obligation && (
                    <div style={styles.oldBlock}>
                      <span style={styles.oldLabel}>Before</span>
                      <div style={styles.oldText}>{m.old_obligation}</div>
                    </div>
                  )}
                  {m.new_obligation && (
                    <div style={styles.newBlock}>
                      <span style={styles.newLabel}>After</span>
                      <div style={styles.newText}>{m.new_obligation}</div>
                    </div>
                  )}
                  {m.old_exception != null || m.new_exception != null ? (
                    <div style={styles.exceptionRow}>
                      {m.old_exception && <span style={styles.oldText}>Exception (before): {m.old_exception}</span>}
                      {m.new_exception && <span style={styles.newText}>Exception (after): {m.new_exception}</span>}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {diff.added_clauses?.length === 0 && diff.removed_clauses?.length === 0 && diff.modified_obligations?.length === 0 && (
          <div style={{ color: '#A0A0A0' }}>{t('lawDiffNoChanges', 'No structural changes between these versions.')}</div>
        )}
        <Disclaimer compact />
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('lawVersions', 'Versions')}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {versions.map((v) => (
            <button
              key={v.version_id}
              type="button"
              style={styles.versionBtn}
              onClick={() => {
                if (versionA && !versionB) navigate(`/laws/${id}/diff/${versionA}/${v.version_id}`);
                else navigate(`/laws/${id}/diff/${v.version_id}/v2`);
              }}
            >
              {v.version_id}: {v.label}
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14, marginBottom: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  refNote: { color: '#A0A0A0', fontSize: 12, marginBottom: 14 },
  section: { marginTop: 14 },
  sectionLabel: { fontSize: 12, color: '#A0A0A0', fontWeight: 800, marginBottom: 8 },
  list: { margin: 0, paddingLeft: 20 },
  added: { color: '#7dd87d', marginBottom: 4 },
  removed: { color: '#e07070', marginBottom: 4 },
  modItem: { padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507' },
  articleNum: { fontWeight: 900, color: '#F5C76A', marginBottom: 8 },
  oldBlock: { marginBottom: 8 },
  oldLabel: { fontSize: 11, color: '#A0A0A0', marginRight: 8 },
  oldText: { color: '#e07070', fontSize: 13, marginTop: 4 },
  newBlock: { marginBottom: 4 },
  newLabel: { fontSize: 11, color: '#A0A0A0', marginRight: 8 },
  newText: { color: '#7dd87d', fontSize: 13, marginTop: 4 },
  exceptionRow: { display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8, fontSize: 12 },
  versionBtn: { padding: '8px 12px', borderRadius: 10, border: '1px solid #2a2b33', background: '#050507', color: '#F5C76A', cursor: 'pointer', fontSize: 12 },
  backBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', cursor: 'pointer', fontWeight: 800 },
  meta: { color: '#A0A0A0', fontSize: 13 },
};
