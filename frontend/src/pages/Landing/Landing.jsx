import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangToggle from '../../components/LangToggle';

export default function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src="/ai_legal_logo.png" alt="" style={styles.logoImg} />
          <div>
            <div style={styles.brandName}>{t('appName')}</div>
            <div style={styles.brandTagline}>{t('tagline')}</div>
          </div>
        </div>
        <LangToggle />
      </header>

      <main>
        <section style={styles.hero}>
          <div style={styles.heroBadge}>Enterprise · Compliance-ready</div>
          <h1 style={styles.heroTitle}>{t('landingHeroTitle')}</h1>
          <p style={styles.heroSub}>{t('landingHeroSub')}</p>
          <div style={styles.actions}>
            <button style={styles.primary} onClick={() => navigate('/login')}>
              {t('landingCtaGetStarted')}
            </button>
            <button style={styles.secondary} onClick={() => navigate('/create-tenant')}>
              {t('landingCtaOrganization')}
            </button>
            <button style={styles.tertiary} onClick={() => navigate('/login')}>
              {t('landingCtaLogin')}
            </button>
          </div>
        </section>

        <section style={styles.sections}>
          <div style={styles.card}>
            <div style={styles.cardAccent} />
            <h2 style={styles.cardHead}>{t('landingEnterpriseHead')}</h2>
            <p style={styles.cardBody}>{t('landingEnterpriseBody')}</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardAccent} />
            <h2 style={styles.cardHead}>{t('landingJurisdictionHead')}</h2>
            <p style={styles.cardBody}>{t('landingJurisdictionBody')}</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardAccent} />
            <h2 style={styles.cardHead}>{t('landingPrivacyHead')}</h2>
            <p style={styles.cardBody}>{t('landingPrivacyBody')}</p>
          </div>
        </section>

        <footer style={styles.footer}>
          <p style={styles.footerText}>{t('landingCtaAudience')}</p>
        </footer>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0a0a0c 0%, #0d0d10 30%, #08080a 100%)',
    color: '#e8e8ec',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '0 24px 48px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    maxWidth: 1100,
    margin: '0 auto',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 12 },
  logoImg: { width: 40, height: 40, objectFit: 'contain', borderRadius: 8 },
  brandName: { fontWeight: 700, letterSpacing: '0.02em', fontSize: 15, color: '#e8e8ec' },
  brandTagline: { color: '#6b6b78', fontSize: 12, marginTop: 2 },
  hero: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '72px 0 64px',
    textAlign: 'center',
  },
  heroBadge: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#b8a84a',
    marginBottom: 20,
    padding: '6px 12px',
    border: '1px solid rgba(197, 177, 89, 0.35)',
    borderRadius: 6,
  },
  heroTitle: {
    fontSize: 'clamp(28px, 4vw, 38px)',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: '#f2f2f6',
    margin: '0 0 16px',
  },
  heroSub: {
    fontSize: 17,
    lineHeight: 1.55,
    color: '#9a9aa6',
    maxWidth: 560,
    margin: '0 auto 32px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  primary: {
    padding: '14px 24px',
    borderRadius: 8,
    background: '#c5b159',
    color: '#0a0a0c',
    border: 'none',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    letterSpacing: '0.02em',
  },
  secondary: {
    padding: '14px 24px',
    borderRadius: 8,
    background: 'transparent',
    color: '#e8e8ec',
    border: '1px solid #2e2e36',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    letterSpacing: '0.02em',
  },
  tertiary: {
    padding: '14px 24px',
    borderRadius: 8,
    background: 'transparent',
    color: '#9a9aa6',
    border: 'none',
    fontWeight: 500,
    fontSize: 14,
    cursor: 'pointer',
  },
  sections: {
    maxWidth: 1000,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
    padding: '24px 0 56px',
  },
  card: {
    position: 'relative',
    padding: '24px 20px',
    background: 'rgba(18, 18, 22, 0.8)',
    border: '1px solid #25252d',
    borderRadius: 12,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: 24,
    height: 2,
    background: 'linear-gradient(90deg, #c5b159 0%, transparent 100%)',
    borderRadius: 1,
  },
  cardHead: {
    fontSize: 16,
    fontWeight: 600,
    color: '#f2f2f6',
    margin: '14px 0 8px',
    letterSpacing: '-0.01em',
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#9a9aa6',
    margin: 0,
  },
  footer: {
    maxWidth: 560,
    margin: '0 auto',
    padding: '40px 0 24px',
    textAlign: 'center',
    borderTop: '1px solid #25252d',
  },
  footerText: {
    fontSize: 13,
    color: '#6b6b78',
    margin: '24px 0 0',
    lineHeight: 1.5,
  },
};
