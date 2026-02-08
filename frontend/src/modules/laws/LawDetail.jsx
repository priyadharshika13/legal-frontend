import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { getActApi, searchLawsApi } from '../../services/api/laws';

export default function LawDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language?.startsWith('ar');

  const [act, setAct] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    Promise.all([
      getActApi(id).then((r) => r.data),
      searchLawsApi({ act_id: Number(id), limit: 100, offset: 0 }).then((r) => r.data),
    ])
      .then(([actData, searchData]) => {
        if (cancelled) return;
        setAct(actData);
        setSections(searchData?.sections || []);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.detail || e?.message || 'Failed to load act');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  if (loading && !act) {
    return (
      <AppLayout title={t('lawsTitle', 'Laws')}>
        <div style={{ color: '#A0A0A0' }}>Loading...</div>
        <button type="button" style={styles.backBtn} onClick={() => navigate('/laws')}>{t('back', 'Back')}</button>
      </AppLayout>
    );
  }

  if (error || !act) {
    return (
      <AppLayout title={t('lawsTitle', 'Laws')}>
        <div style={{ color: '#ffb3b3' }}>{error || t('lawsNotFound', 'Law not found.')}</div>
        <button type="button" style={styles.backBtn} onClick={() => navigate('/laws')}>{t('back', 'Back')}</button>
      </AppLayout>
    );
  }

  const title = act.act_name || act.short_title || String(id);

  return (
    <AppLayout title={title}>
      <div style={{ marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate('/laws')}>{t('back', 'Back')}</button>
        <span style={styles.meta}>{act.short_title || ''} · {act.year || '—'} · {act.jurisdiction || '—'}</span>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('lawOverview', 'Overview')}</div>
        <div style={{ color: '#F5F5F5', lineHeight: 1.6 }}>
          <p><strong>{t('lawsTitle', 'Laws')}:</strong> {act.act_name}</p>
          {act.short_title ? <p><strong>Short title:</strong> {act.short_title}</p> : null}
          {act.summary ? <p><strong>Summary:</strong> {act.summary}</p> : null}
          {act.source_url ? <p><a href={act.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#F5C76A' }}>Source</a></p> : null}
        </div>
        <Disclaimer compact />
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('lawArticleList', 'Sections')} ({sections.length})</div>
        {sections.length === 0 ? (
          <div style={{ color: '#A0A0A0' }}>No sections for this act.</div>
        ) : (
          <div style={{ display: 'grid', gap: 8 }}>
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                style={styles.articleRow}
                onClick={() => navigate(`/laws/${id}/article/${sec.section_number}`)}
              >
                <span style={styles.articleNum}>§ {sec.section_number}</span>
                <span style={{ color: '#A0A0A0', fontSize: 13 }}>{(sec.heading || sec.text || '')?.slice(0, 80)}{(sec.heading || sec.text || '').length > 80 ? '…' : ''}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14, marginTop: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  backBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', cursor: 'pointer', fontWeight: 800 },
  meta: { color: '#A0A0A0', fontSize: 13 },
  linkBtn: { marginTop: 10, padding: '8px 12px', borderRadius: 10, border: '1px solid #2a2b33', background: 'transparent', color: '#F5C76A', cursor: 'pointer', fontSize: 13 },
  articleRow: { display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', cursor: 'pointer', textAlign: 'left', width: '100%' },
  articleNum: { fontWeight: 900, color: '#F5C76A', minWidth: 80 },
};
