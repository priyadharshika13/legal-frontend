import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangToggle from '../components/LangToggle';
import { clearAuth, getAuth } from '../store/auth';

export default function Sidebar() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const auth = getAuth();

  const logout = () => {
    clearAuth();
    nav('/login');
  };

  return (
    <aside style={styles.aside}>
      <div style={styles.brandRow}>
        <div style={styles.logo}>⚖️</div>
        <div>
          <div style={styles.title}>{t('appName')}</div>
          <div style={styles.sub}>{t('tagline')}</div>
        </div>
      </div>

      <div style={styles.userBox}>
        <div style={{ fontWeight: 800, color: '#F5F5F5' }}>
          {auth?.user?.name || 'User'}
        </div>
        <div style={{ color: '#A0A0A0', fontSize: 12 }}>
          Tenant: {auth?.tenantCode || '-'}
        </div>
      </div>

      <nav style={styles.nav}>
        <NavItem to="/dashboard" label={t('navDashboard')} />
        <NavItem to="/case-intake" label={t('navCaseIntake')} />
        <NavItem to="/draft" label={t('navDraft')} />
        <NavItem to="/judgments" label={t('navJudgments')} />
      </nav>

      <div style={styles.bottom}>
        <LangToggle />
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </div>
    </aside>
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
        background: isActive ? '#050507' : '#111218',
      })}
    >
      {label}
    </NavLink>
  );
}

const styles = {
  aside: {
    width: 280,
    background: '#111218',
    borderRight: '1px solid #2a2b33',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    minHeight: '100vh',
    position: 'sticky',
    top: 0,
  },
  brandRow: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'grid',
    placeItems: 'center',
    background: '#050507',
    border: '1px solid #f5c76a55',
  },
  title: { fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', fontSize: 13, color: '#F5F5F5' },
  sub: { color: '#A0A0A0', fontSize: 11 },

  userBox: {
    border: '1px solid #2a2b33',
    background: '#050507',
    borderRadius: 16,
    padding: 12,
  },

  nav: { display: 'grid', gap: 10, marginTop: 6 },
  link: {
    padding: '10px 12px',
    borderRadius: 14,
    border: '1px solid #2a2b33',
    textDecoration: 'none',
    fontWeight: 800,
    fontSize: 13,
  },

  bottom: { marginTop: 'auto', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' },
  logoutBtn: {
    padding: '10px 12px',
    borderRadius: 999,
    border: '1px solid #2a2b33',
    background: '#050507',
    color: '#A0A0A0',
    fontWeight: 800,
    cursor: 'pointer',
  },
};
