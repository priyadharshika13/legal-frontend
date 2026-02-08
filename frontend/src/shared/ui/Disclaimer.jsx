import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProduct } from '../../core/ProductProvider';
import { DISCLAIMER_PLATFORM } from '../utils/constants';

/**
 * Product-aware disclaimer. Uses India or Saudi config text based on active product.
 */
export default function Disclaimer({ compact = false, variant = 'platform' }) {
  const { t, i18n } = useTranslation();
  const { config } = useProduct();
  const disclaimer = config?.disclaimer || {};
  const langIsEn = (i18n.language || '').startsWith('en');
  let text = t('disclaimerPlatform', DISCLAIMER_PLATFORM);
  if (variant === 'caseAnalysis') {
    text = (langIsEn && disclaimer.caseAnalysisEn) ? disclaimer.caseAnalysisEn : (disclaimer.caseAnalysis || text);
  } else if (variant === 'drafting') {
    text = (langIsEn && disclaimer.draftingEn) ? disclaimer.draftingEn : (disclaimer.drafting || text);
  } else {
    text = (langIsEn && disclaimer.platformEn) ? disclaimer.platformEn : (disclaimer.platform || text);
  }

  return (
    <div
      role="alert"
      aria-label="Legal disclaimer"
      style={{
        padding: compact ? '10px 14px' : 14,
        borderRadius: 12,
        border: '1px solid #2a2b33',
        background: '#050507',
        color: '#A0A0A0',
        fontSize: 12,
        lineHeight: 1.5,
      }}
    >
      {text}
    </div>
  );
}
