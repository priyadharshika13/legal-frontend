import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProduct } from '../../core/ProductProvider';

/**
 * Citation display. India: HIGH priority (law + case citation, footnotes). Saudi: reference-only.
 */
export default function CitationBlock({ type = 'law', citation, footnote }) {
  const { t } = useTranslation();
  const { config } = useProduct();
  const citationConfig = config?.citation || {};
  const priority = citationConfig.priority || 'reference-only';
  const showLaw = citationConfig.lawCitation !== false;
  const showCase = citationConfig.caseCitation !== false;
  const showFootnotes = citationConfig.footnotes !== false;

  const isIndia = config?.productId === 'india';
  const label = isIndia ? t('citationAcademic', 'Citation (for reference)') : t('citationReference', 'Reference only');

  if (type === 'law' && !showLaw) return null;
  if (type === 'case' && !showCase) return null;
  if (footnote && !showFootnotes) return null;

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 10,
        border: '1px solid #2a2b33',
        background: '#050507',
        fontSize: 12,
        color: '#A0A0A0',
      }}
    >
      <div style={{ fontWeight: 800, color: '#F5C76A', marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#F5F5F5', fontFamily: 'monospace' }}>{citation}</div>
      {footnote && <div style={{ marginTop: 6, fontSize: 11 }}>{footnote}</div>}
    </div>
  );
}
