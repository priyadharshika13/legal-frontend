import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { MOCK_LAWS, MOCK_AMENDMENTS } from './mockLaws';

/**
 * Version history and "what changed" for a law.
 */
export default function AmendmentTimeline() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language?.startsWith('ar');

  const law = MOCK_LAWS.find((l) => l.id === id);
  const amendments = MOCK_AMENDMENTS.filter((a) => a.lawId === id);

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
    <AppLayout title={t('lawAmendmentTimeline', 'Amendment timeline')}>
      <div style={{ marginBottom: 14 }}>
        <button type="button" style={styles.backBtn} onClick={() => navigate(`/laws/${id}`)}>{t('back', 'Back')}</button>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>{title}</div>
        <div style={styles.timeline}>
          {amendments.length === 0 ? (
            <div style={{ color: '#A0A0A0' }}>{t('lawNoAmendments', 'No amendments on record.')}</div>
          ) : (
            amendments.map((am) => (
              <div key={am.id} style={styles.timelineItem}>
                <div style={styles.date}>{am.date}</div>
                <div style={styles.desc}>{isRtl && am.descriptionAr ? am.descriptionAr : am.descriptionEn}</div>
                {am.articleNumbers?.length > 0 && (
                  <div style={styles.articles}>
                    {t('lawArticlesAffected', 'Articles affected')}: {am.articleNumbers.join(', ')}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div style={{ marginTop: 14 }}>
          <button type="button" style={styles.diffBtn} onClick={() => navigate(`/laws/${id}/diff/v1/v2`)}>
            {t('lawCompareVersions', 'Compare versions (What changed)')}
          </button>
        </div>
        <Disclaimer compact />
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 14, color: '#F5C76A', letterSpacing: 0.4 },
  timeline: { display: 'flex', flexDirection: 'column', gap: 12 },
  timelineItem: { padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507' },
  date: { fontSize: 12, color: '#A0A0A0', marginBottom: 6 },
  desc: { color: '#F5F5F5', fontWeight: 600 },
  articles: { fontSize: 12, color: '#A0A0A0', marginTop: 6 },
  backBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', cursor: 'pointer', fontWeight: 800 },
  diffBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: 'transparent', color: '#F5C76A', cursor: 'pointer', fontWeight: 800, fontSize: 13 },
};
