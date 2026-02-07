import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangToggle from '../../components/LangToggle';
import { registerApi } from '../../services/api/auth';
import { saveAuth } from '../../store/auth';

export default function Register() {
  const { t } = useTranslation();
  const nav = useNavigate();

  const [tenantCode, setTenantCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('CLIENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    if (!tenantCode || !fullName || !email || !password) {
      setErr(t('fillAllFields'));
      return;
    }

    try {
      setLoading(true);

      const res = await registerApi({
        tenantCode,
        email,
        password,
        full_name: fullName,
        role,
      });

      const token = res.data?.access_token;
      if (!token) throw new Error('No access_token received');

      // store token + tenant in localStorage (same structure used by axios client)
      saveAuth({
        token,
        tenantCode,
        user: { name: fullName, role, email },
      });

      nav('/dashboard');
    } catch (e2) {
      setErr(e2?.response?.data?.detail || e2?.message || t('registerFailed'));
    } finally {
      setLoading(false);
    }
  };

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

      <div style={styles.card}>
        <h2 style={{ marginTop: 0 }}>{t('register')}</h2>

        {err ? <div style={styles.err}>{err}</div> : null}

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <input
            placeholder={t('tenantCode')}
            value={tenantCode}
            onChange={(e) => setTenantCode(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder={t('fullName')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
            <option value="CLIENT">{t('roleClient')}</option>
            <option value="LAWYER">{t('roleLawyer')}</option>
            <option value="ADMIN">{t('roleAdmin')}</option>
          </select>

          <input
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder={t('password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.primary} disabled={loading}>
            {loading ? t('working') : t('createAccount')}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={{ color: '#A0A0A0' }}>{t('alreadyHaveAccount')}</span>
          <Link to="/login" style={styles.link}>{t('signIn')}</Link>
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
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
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

  card: {
    maxWidth: 460,
    margin: '70px auto 0',
    background: '#111218',
    border: '1px solid #2a2b33',
    borderRadius: 18,
    padding: 18,
  },
  input: {
    width: '100%',
    padding: '12px 12px',
    borderRadius: 12,
    border: '1px solid #2a2b33',
    background: '#050507',
    color: '#F5F5F5',
    outline: 'none',
  },
  primary: {
    padding: '12px 18px',
    borderRadius: 999,
    background: '#F5C76A',
    color: '#111',
    border: 'none',
    fontWeight: 900,
    cursor: 'pointer',
    marginTop: 6,
  },
  footer: {
    marginTop: 14,
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
  },
  link: { color: '#F5C76A', fontWeight: 900, textDecoration: 'none' },
  err: {
    background: '#2a1212',
    border: '1px solid #ff4d4d66',
    color: '#ffb3b3',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 13,
  },
};
