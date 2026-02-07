import React from 'react';
import i18n from '../core/i18n';

export default function LangToggle() {
  const toggle = () => i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en');

  return (
    <button
      onClick={toggle}
      style={{
        padding: '8px 12px',
        borderRadius: 999,
        border: '1px solid #2a2b33',
        background: '#111218',
        color: '#A0A0A0',
        cursor: 'pointer',
      }}
    >
      {i18n.language.toUpperCase()}
    </button>
  );
}
