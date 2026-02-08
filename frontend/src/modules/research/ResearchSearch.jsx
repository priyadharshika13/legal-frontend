import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { AiResearchBlock } from '../../shared/ui';

/**
 * Research / precedent search. AI-ready UI: Summarize, Compare, Highlight Changes only.
 * NO free-text chatbot. NO predictive language.
 */
export default function ResearchSearch() {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [court, setCourt] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [aiNotes, setAiNotes] = useState('');
  const [aiBusy, setAiBusy] = useState(false);

  const onSearch = () => {
    const demo = [
      { id: 1, title: 'ABC vs State (2023)', court: 'Madras HC', tags: ['IPC 420', 'Bail'] },
      { id: 2, title: 'XYZ vs Union of India (2021)', court: 'Supreme Court', tags: ['Writ', 'Article 226'] },
    ];
    setResults(demo.filter((r) => r.title.toLowerCase().includes((keyword || '').toLowerCase())));
    setAiNotes('');
  };

  const onSummarize = () => {
    setAiBusy(true);
    setAiNotes('AI-assisted summarization will appear here when the AI research service is connected. This does not constitute legal advice. Human verification required.');
    setTimeout(() => setAiBusy(false), 800);
  };

  const onCompare = () => {
    setAiBusy(true);
    setAiNotes('AI-assisted comparison will appear here when connected. Reference only. Human verification required.');
    setTimeout(() => setAiBusy(false), 800);
  };

  const onHighlightChanges = () => {
    setAiBusy(true);
    setAiNotes('AI-assisted amendment highlighting will appear here when connected. Reference only. Human verification required.');
    setTimeout(() => setAiBusy(false), 800);
  };

  return (
    <AppLayout title={t('judgmentsTitle')}>
      <Disclaimer compact />
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('judgmentsTitle')}</div>
        <div style={styles.row}>
          <input style={{ ...styles.input, flex: 2 }} placeholder={t('searchKeyword')} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <input style={{ ...styles.input, flex: 1 }} placeholder={t('filterCourt')} value={court} onChange={(e) => setCourt(e.target.value)} />
          <input style={{ ...styles.input, flex: 1 }} placeholder={t('filterYear')} value={year} onChange={(e) => setYear(e.target.value)} />
          <button style={styles.primary} onClick={onSearch}>{t('search')}</button>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('results')}</div>
        {results.length === 0 ? (
          <div style={{ color: '#A0A0A0' }}>No results (demo). Try keyword: &quot;ABC&quot;</div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {results.map((r) => (
              <div key={r.id} style={styles.resultItem}>
                <div style={{ fontWeight: 900 }}>{r.title}</div>
                <div style={{ color: '#A0A0A0', fontSize: 12, marginTop: 4 }}>{r.court}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  {r.tags.map((tag) => (
                    <span key={tag} style={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>AI-assisted actions (reference only)</div>
        <p style={{ color: '#A0A0A0', fontSize: 12, marginBottom: 12 }}>
          Controlled actions only. No free-text chat. No outcome prediction.
        </p>
        <div style={styles.aiButtons}>
          <button style={styles.aiBtn} onClick={onSummarize} disabled={aiBusy}>Summarize</button>
          <button style={styles.aiBtn} onClick={onCompare} disabled={aiBusy}>Compare</button>
          <button style={styles.aiBtn} onClick={onHighlightChanges} disabled={aiBusy}>Highlight Changes</button>
        </div>
        {aiNotes ? (
          <div style={{ marginTop: 14 }}>
            <AiResearchBlock>{aiNotes}</AiResearchBlock>
          </div>
        ) : null}
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14, marginBottom: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  row: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' },
  input: { padding: '12px 12px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5F5F5', outline: 'none', minWidth: 220 },
  primary: { padding: '12px 18px', borderRadius: 999, background: '#F5C76A', color: '#111', border: 'none', fontWeight: 900, cursor: 'pointer' },
  resultItem: { padding: 12, borderRadius: 14, border: '1px solid #2a2b33', background: '#050507' },
  tag: { padding: '6px 10px', borderRadius: 999, border: '1px solid #2a2b33', background: '#111218', color: '#A0A0A0', fontSize: 12 },
  aiButtons: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  aiBtn: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5C76A', fontWeight: 800, cursor: 'pointer' },
};
