import React, { useEffect } from 'react';
import i18n from '../core/i18n';

const LANGUAGES = ['en', 'ar', 'ta'];

export default function LangToggle() {
  const current = i18n.language?.startsWith('ar') ? 'ar' : i18n.language?.startsWith('ta') ? 'ta' : 'en';

  const cycle = () => {
    const idx = LANGUAGES.indexOf(current);
    const next = LANGUAGES[(idx + 1) % LANGUAGES.length];
    i18n.changeLanguage(next);
  };

  useEffect(() => {
    document.documentElement.lang = current;
    document.documentElement.dir = current === 'ar' ? 'rtl' : 'ltr';
  }, [current]);

  return (
    <button
      type="button"
      onClick={cycle}
      style={{
        padding: '8px 12px',
        borderRadius: 999,
        border: '1px solid #2a2b33',
        background: '#111218',
        color: '#A0A0A0',
        cursor: 'pointer',
      }}
    >
      {current === 'ar' ? 'ع' : current === 'ta' ? 'TA' : 'EN'}
    </button>
  );
}
