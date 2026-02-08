import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { getActApi, searchLawsApi } from '../../services/api/laws';

/**
 * Single section view. Backend SectionOut: section_number, heading, text, punishment, bailable, cognizable, compoundable.
 */
export default function ArticleView() {
  const { id, number } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language?.startsWith('ar');

  const [act, setAct] = useState(null);
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || number === undefined) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    Promise.all([
      getActApi(id).then((r) => r.data),
      searchLawsApi({ act_id: Number(id), limit: 200, offset: 0 }).then((r) => r.data),
    ])
      .then(([actData, searchData]) => {
        if (cancelled) return;
        setAct(actData);
        const sec = (searchData?.sections || []).find((s) => String(s.section_number) === String(number));
        setSection(sec || null);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.detail || e?.message || 'Failed to load');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, number]);

  if (loading && !section) {
    return (
      <AppLayout title={t('lawsTitle', 'Laws')}>
        <div style={{ color: '#A0A0A0' }}>Loading...</div>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/laws/${id}`)}>{t('back', 'Back')}</button>
      </AppLayout>
    );
  }

  if (error || !act || !section) {
    return (
      <AppLayout title={t('lawsTitle', 'Laws')}>
        <div style={{ color: '#ffb3b3' }}>{error || t('lawsNotFound', 'Article not found.')}</div>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/laws/${id}`)}>{t('back', 'Back')}</button>
      </AppLayout>
    );
  }

  const title = act.act_name || act.short_title || id;

  return (
    <AppLayout title={`${title} — ${t('lawArticle', 'Section')} ${section.section_number}`}>
      <div style={{ marginBottom: 14 }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/laws/${id}`)}>{t('back', 'Back')}</button>
      </div>

      <div style={{ ...styles.card, direction: isRtl ? 'rtl' : 'ltr' }} dir={isRtl ? 'rtl' : 'ltr'}>
        <div style={styles.articleNumber}>{t('lawArticle', 'Section')} {section.section_number}</div>

        {section.heading && (
          <section style={styles.section}>
            <div style={styles.sectionLabel}>Heading</div>
            <div style={styles.sectionText}>{section.heading}</div>
          </section>
        )}
        {section.text && (
          <section style={styles.section}>
            <div style={styles.sectionLabel}>Text</div>
            <div style={styles.sectionText}>{section.text}</div>
          </section>
        )}
        {section.punishment && (
          <section style={styles.section}>
            <div style={styles.sectionLabel}>{t('lawPenalty', 'Penalty')}</div>
            <div style={styles.sectionText}>{section.punishment}</div>
          </section>
        )}
        {(section.bailable || section.cognizable || section.compoundable) && (
          <section style={styles.section}>
            <div style={styles.sectionLabel}>Classification</div>
            <div style={styles.sectionText}>
              {[section.bailable && 'Bailable', section.cognizable && 'Cognizable', section.compoundable && 'Compoundable'].filter(Boolean).join(' · ')}
            </div>
          </section>
        )}
        {section.keywords?.length ? (
          <section style={styles.section}>
            <div style={styles.sectionLabel}>Keywords</div>
            <div style={{ color: '#A0A0A0', fontSize: 13 }}>{section.keywords.join(', ')}</div>
          </section>
        ) : null}
        <p style={styles.disclaimer}>{t('legalResearchDisclaimer', 'Legal research assistance only. No legal advice. Human verification required.')}</p>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 18 },
  articleNumber: { fontWeight: 900, fontSize: 18, color: '#F5C76A', marginBottom: 16, letterSpacing: 0.5 },
  section: { marginTop: 14 },
  sectionLabel: { fontSize: 12, color: '#A0A0A0', fontWeight: 800, marginBottom: 6 },
  sectionText: { color: '#F5F5F5', lineHeight: 1.6 },
  disclaimer: { marginTop: 18, fontSize: 11, color: '#808080' },
  backBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', cursor: 'pointer', fontWeight: 800 },
};
