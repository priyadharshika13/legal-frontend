import React from 'react';
import { useTranslation } from 'react-i18next';
import { DISCLAIMER_AI_LABEL } from '../utils/constants';

/**
 * Display block for AI-assisted research output only.
 * No free-text chatbot. No predictive language.
 */
export default function AiResearchBlock({ children, title }) {
  const { t } = useTranslation();
  const label = title || t('aiResearchLabel', DISCLAIMER_AI_LABEL);

  return (
    <div
      style={{
        border: '1px solid #2a2b33',
        borderRadius: 14,
        background: '#111218',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 14px',
          background: '#050507',
          borderBottom: '1px solid #2a2b33',
          color: '#F5C76A',
          fontWeight: 800,
          fontSize: 13,
        }}
      >
        {label}
      </div>
      <div style={{ padding: 14 }}>{children}</div>
      <div
        style={{
          padding: '8px 14px',
          borderTop: '1px solid #2a2b33',
          background: '#050507',
          color: '#808080',
          fontSize: 11,
        }}
      >
        {t('legalResearchDisclaimer', 'Legal research assistance only. No legal advice. Human verification required.')}
      </div>
    </div>
  );
}
