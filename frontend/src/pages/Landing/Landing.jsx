import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangToggle from '../../components/LangToggle';

export default function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>⚖️</div>
          <div>
            <div style={styles.title}>{t('appName')}</div>
            <div style={styles.sub}>{t('tagline')}</div>
          </div>
        </div>
        <LangToggle />
      </div>

      <div style={styles.center}>
        <div style={styles.orbit}>
          <div style={styles.inner}>
            <div style={{ fontSize: 56 }}>👼⚖️</div>
            <div style={styles.angelTitle}>JUSTICE ANGEL</div>
            <div style={styles.angelSub}>LAW · ETHICS · BALANCE</div>
          </div>
        </div>

        <h1 style={styles.h1}>{t('landingTitle')}</h1>
        <p style={styles.p}>{t('landingSub')}</p>

        <div style={styles.actions}>
          <button style={styles.primary} onClick={() => navigate('/Dashboard')}>
            {t('getStarted')}
          </button>
          <button style={styles.secondary} onClick={() => navigate('/login')}>
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top, #1f1f25 0%, #050507 55%)',
    color: '#F5F5F5',
    padding: 24,
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'grid',
    placeItems: 'center',
    background: '#111218',
    border: '1px solid #f5c76a55',
  },
  title: { fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14 },
  sub: { color: '#A0A0A0', fontSize: 12 },
  center: {
    maxWidth: 760,
    margin: '70px auto 0',
    textAlign: 'center',
  },
  orbit: {
    width: 280,
    height: 280,
    borderRadius: 999,
    margin: '0 auto 22px',
    background: '#111218',
    border: '1px solid #f5c76a88',
    display: 'grid',
    placeItems: 'center',
  },
  inner: {
    width: 220,
    height: 220,
    borderRadius: 999,
    border: '1px solid #F5C76A',
    background: '#050507',
    display: 'grid',
    placeItems: 'center',
  },
  angelTitle: { color: '#F5C76A', fontWeight: 800, letterSpacing: 3, fontSize: 13 },
  angelSub: { color: '#A0A0A0', fontSize: 11, letterSpacing: 2, marginTop: 6 },
  h1: { fontSize: 28, margin: '10px 0' },
  p: { color: '#A0A0A0', lineHeight: 1.6, margin: '0 auto', maxWidth: 520 },
  actions: { display: 'flex', justifyContent: 'center', gap: 10, marginTop: 18, flexWrap: 'wrap' },
  primary: {
    padding: '12px 18px',
    borderRadius: 999,
    background: '#F5C76A',
    color: '#111',
    border: 'none',
    fontWeight: 800,
    cursor: 'pointer',
  },
  secondary: {
    padding: '12px 18px',
    borderRadius: 999,
    background: '#111218',
    color: '#F5F5F5',
    border: '1px solid #2a2b33',
    fontWeight: 700,
    cursor: 'pointer',
  },
};
