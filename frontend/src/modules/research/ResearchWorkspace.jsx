import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';

/**
 * Research workspace: notes per law, notes per case, highlights, saved comparisons, personal folders.
 * No AI decisions. Pure research support.
 */
const MOCK_FOLDERS = [
  { id: 'f1', name: 'Contract research', count: 5 },
  { id: 'f2', name: 'Labour law', count: 3 },
];
const MOCK_NOTES = [
  { id: 'n1', type: 'law', ref: 'in-act-1', title: 'Indian Contract Act - Art. 10', snippet: 'Competence and consent...', updated: '2024-01-15' },
  { id: 'n2', type: 'case', ref: 'case-1', title: 'Case-1: limitation', snippet: 'Date of cause of action...', updated: '2024-01-14' },
];
const MOCK_HIGHLIGHTS = [
  { id: 'h1', text: 'Courts have considered documentary evidence...', source: 'ABC v. State', lawId: null },
];
const MOCK_SAVED_COMPARISONS = [
  { id: 'c1', label: 'Art. 10 v1 vs v2', left: 'Indian Contract Act §10 (old)', right: 'Indian Contract Act §10 (amended)' },
];

export default function ResearchWorkspace() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('folders');

  return (
    <AppLayout title={t('researchWorkspace', 'Research workspace')}>
      <Disclaimer compact />
      <div style={styles.tabs}>
        {['folders', 'notes', 'highlights', 'comparisons'].map((tab) => (
          <button
            key={tab}
            type="button"
            style={{ ...styles.tab, ...(activeTab === tab ? styles.tabActive : {}) }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'folders' && t('researchFolders', 'Folders')}
            {tab === 'notes' && t('researchNotes', 'Notes')}
            {tab === 'highlights' && t('researchHighlights', 'Highlights')}
            {tab === 'comparisons' && t('researchSavedComparisons', 'Saved comparisons')}
          </button>
        ))}
      </div>
      <div style={styles.card}>
        {activeTab === 'folders' && (
          <>
            <div style={styles.cardTitle}>{t('researchFolders', 'Personal research folders')}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {MOCK_FOLDERS.map((f) => (
                <div key={f.id} style={styles.row}>
                  <span style={{ fontWeight: 800 }}>{f.name}</span>
                  <span style={{ color: '#A0A0A0', fontSize: 12 }}>{f.count} items</span>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === 'notes' && (
          <>
            <div style={styles.cardTitle}>{t('researchNotes', 'Notes (per law / per case)')}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {MOCK_NOTES.map((n) => (
                <div key={n.id} style={styles.row}>
                  <div style={{ fontWeight: 800 }}>{n.title}</div>
                  <div style={{ fontSize: 13, color: '#A0A0A0' }}>{n.snippet}</div>
                  <div style={{ fontSize: 12, color: '#A0A0A0' }}>{n.updated}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === 'highlights' && (
          <>
            <div style={styles.cardTitle}>{t('researchHighlights', 'Highlights')}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {MOCK_HIGHLIGHTS.map((h) => (
                <div key={h.id} style={styles.highlightRow}>
                  <blockquote style={styles.blockquote}>{h.text}</blockquote>
                  <div style={{ fontSize: 12, color: '#A0A0A0' }}>{h.source}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === 'comparisons' && (
          <>
            <div style={styles.cardTitle}>{t('researchSavedComparisons', 'Saved comparisons')}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {MOCK_SAVED_COMPARISONS.map((c) => (
                <div key={c.id} style={styles.row}>
                  <div style={{ fontWeight: 800 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: '#A0A0A0' }}>{c.left} ↔ {c.right}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}

const styles = {
  tabs: { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  tab: { padding: '10px 14px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#A0A0A0', fontWeight: 800, cursor: 'pointer' },
  tabActive: { borderColor: '#F5C76A', color: '#F5C76A', background: '#111218' },
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  row: { padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507' },
  highlightRow: { padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507' },
  blockquote: { margin: 0, borderLeft: '3px solid #F5C76A', paddingLeft: 12, color: '#F5F5F5', fontStyle: 'italic' },
};
