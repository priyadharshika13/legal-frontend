import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { listJudgmentsApi } from '../../services/api/judgments';

export default function Judgments() {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [court, setCourt] = useState('');
  const [year, setYear] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const onSearch = async (pageOffset = 0) => {
    setError('');
    setLoading(true);
    try {
      const res = await listJudgmentsApi({
        q: keyword,
        court,
        year: year ? parseInt(year, 10) : undefined,
        jurisdiction: jurisdiction || undefined,
        limit,
        offset: pageOffset,
      });
      const data = res.data || {};
      setResults(data.results || []);
      setTotal(data.total ?? 0);
      setOffset(pageOffset);
    } catch (e) {
      const msg = e?.response?.data?.detail || e?.message || 'Search failed';
      setError(msg);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => onSearch(offset + limit);

  return (
    <AppLayout title={t('judgmentsTitle')}>
      <div style={styles.card}>
        <div style={styles.row}>
          <input style={{ ...styles.input, flex: 2 }} placeholder={t('searchKeyword')} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <input style={{ ...styles.input, flex: 1 }} placeholder={t('filterCourt')} value={court} onChange={(e) => setCourt(e.target.value)} />
          <input style={{ ...styles.input, flex: 1 }} placeholder={t('filterYear')} value={year} onChange={(e) => setYear(e.target.value)} />
          <input style={{ ...styles.input, flex: 1 }} placeholder="Jurisdiction (e.g. IN)" value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} />
          <button style={styles.primary} onClick={() => onSearch(0)} disabled={loading}>{loading ? '...' : t('search')}</button>
        </div>
      </div>

      {error ? <div style={styles.err}>{error}</div> : null}

      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('results')} {total > 0 ? `(${total})` : ''}</div>

        {loading && results.length === 0 ? (
          <div style={{ color: '#A0A0A0' }}>Loading...</div>
        ) : results.length === 0 ? (
          <div style={{ color: '#A0A0A0' }}>No results. Try a different search or add judgments via API.</div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: 10 }}>
              {results.map((r) => (
                <div key={r.id} style={styles.resultItem}>
                  <div style={{ fontWeight: 900 }}>{r.title}</div>
                  <div style={{ color: '#A0A0A0', fontSize: 12, marginTop: 4 }}>{r.court || '—'} {r.year ? ` · ${r.year}` : ''}</div>
                  {r.summary ? <div style={{ fontSize: 13, marginTop: 6, color: '#ddd' }}>{r.summary.slice(0, 200)}{r.summary.length > 200 ? '…' : ''}</div> : null}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    {(r.tags || []).map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
            {offset + results.length < total ? (
              <button type="button" style={styles.loadMore} onClick={loadMore} disabled={loading}>Load more</button>
            ) : null}
          </>
        )}
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14, marginBottom: 14 },
  row: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  input: { padding: '12px 12px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5F5F5', outline: 'none', minWidth: 120 },
  primary: { padding: '12px 18px', borderRadius: 999, background: '#F5C76A', color: '#111', border: 'none', fontWeight: 900, cursor: 'pointer' },
  resultItem: { padding: 12, borderRadius: 14, border: '1px solid #2a2b33', background: '#050507' },
  tag: { padding: '6px 10px', borderRadius: 999, border: '1px solid #2a2b33', background: '#111218', color: '#A0A0A0', fontSize: 12 },
  err: { background: '#2a1212', border: '1px solid #ff4d4d66', color: '#ffb3b3', padding: 10, borderRadius: 12, marginBottom: 14, fontSize: 13 },
  loadMore: { marginTop: 14, padding: '10px 16px', borderRadius: 999, border: '1px solid #2a2b33', background: '#050507', color: '#F5C76A', cursor: 'pointer', fontWeight: 800 },
};
