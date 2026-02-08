import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { searchLawsApi } from '../../services/api/laws';

export default function LawList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [acts, setActs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isRtl = i18n.language?.startsWith('ar');

  const loadLaws = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await searchLawsApi({ q, act_id: 0, limit: 50, offset: 0 });
      const data = res.data || {};
      setActs(data.acts || []);
    } catch (e) {
      setError(e?.response?.data?.detail || e?.message || 'Failed to load laws');
      setActs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLaws();
  }, []);

  const onSearch = () => loadLaws();

  const filtered = jurisdiction
    ? acts.filter((a) => (a.jurisdiction || '').toUpperCase() === jurisdiction.toUpperCase())
    : acts;

  return (
    <AppLayout title={t('lawsTitle', 'Laws')}>
      <div style={{ ...styles.card, marginBottom: 14 }}>
        <div style={styles.cardTitle}>{t('lawsFilter', 'Filter')}</div>
        <div style={styles.filters}>
          <input
            style={styles.input}
            placeholder={t('searchKeyword')}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
          <select
            style={styles.input}
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            aria-label="Jurisdiction"
          >
            <option value="">{t('lawsAllJurisdictions', 'All jurisdictions')}</option>
            <option value="IN">{t('lawsIndia', 'India')}</option>
            <option value="SA">{t('lawsSaudi', 'Saudi Arabia')}</option>
          </select>
          <button type="button" style={styles.primary} onClick={onSearch} disabled={loading}>
            {loading ? '...' : t('search')}
          </button>
        </div>
      </div>

      {error ? <div style={styles.err}>{error}</div> : null}

      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('lawsList', 'Laws')} (Acts)</div>
        {loading && acts.length === 0 ? (
          <div style={{ color: '#A0A0A0' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ color: '#A0A0A0' }}>{t('lawsNoResults', 'No laws match. Try a different search or add acts via API.')}</div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {filtered.map((act) => (
              <button
                key={act.id}
                type="button"
                style={styles.row}
                onClick={() => navigate(`/laws/${act.id}`)}
              >
                <div style={{ flex: 1, textAlign: isRtl ? 'right' : 'left' }}>
                  <div style={{ fontWeight: 900, color: '#F5F5F5' }}>{act.act_name}</div>
                  <div style={{ fontSize: 12, color: '#A0A0A0', marginTop: 4 }}>
                    {act.short_title || ''} {act.year ? ` · ${act.year}` : ''}
                  </div>
                </div>
                <span style={styles.badge}>{act.jurisdiction || '—'}</span>
              </button>
            ))}
          </div>
        )}
        <Disclaimer compact />
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  filters: { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' },
  input: { padding: '10px 12px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5F5F5', minWidth: 160 },
  primary: { padding: '10px 16px', borderRadius: 999, background: '#F5C76A', color: '#111', border: 'none', fontWeight: 900, cursor: 'pointer' },
  row: { display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, border: '1px solid #2a2b33', background: '#050507', cursor: 'pointer', textAlign: 'left', width: '100%' },
  badge: { padding: '6px 10px', borderRadius: 999, background: '#2a2b33', color: '#A0A0A0', fontSize: 12 },
  err: { background: '#2a1212', border: '1px solid #ff4d4d66', color: '#ffb3b3', padding: 10, borderRadius: 12, marginBottom: 14, fontSize: 13 },
};
