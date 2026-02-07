import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangToggle from './LangToggle';

export default function TopNav() {
  const { t } = useTranslation();

  return (
    <div style={styles.wrap}>
      <div style={styles.brand}>
        <div style={styles.logo}>⚖️</div>
        <div>
          <div style={styles.title}>{t('appName')}</div>
          <div style={styles.sub}>{t('tagline')}</div>
        </div>
      </div>

      <div style={styles.links}>
        <NavItem to="/dashboard" label={t('navDashboard')} />
        <NavItem to="/case-intake" label={t('navCaseIntake')} />
        <NavItem to="/draft" label={t('navDraft')} />
        <NavItem to="/judgments" label={t('navJudgments')} />
      </div>

      <LangToggle />
    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.link,
        borderColor: isActive ? '#F5C76A' : '#2a2b33',
        color: isActive ? '#F5C76A' : '#A0A0A0',
      })}
    >
      {label}
    </NavLink>
  );
}

const styles = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '14px 18px',
    border: '1px solid #2a2b33',
    borderRadius: 18,
    background: '#111218',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    display: 'grid',
    placeItems: 'center',
    background: '#050507',
    border: '1px solid #f5c76a55',
  },
  title: { fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', fontSize: 13, color: '#F5F5F5' },
  sub: { color: '#A0A0A0', fontSize: 11 },
  links: { display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', flex: 1 },
  link: {
    padding: '8px 12px',
    borderRadius: 999,
    border: '1px solid #2a2b33',
    background: '#050507',
    textDecoration: 'none',
    fontSize: 12,
    fontWeight: 700,
  },
};
