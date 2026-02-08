import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangToggle from '../../components/LangToggle';
import { createTenantApi } from '../../services/api/tenants';

// Optional UX hint only. Jurisdiction is never auto-decided; user must choose explicitly.
function getRegionSuggestion() {
  if (typeof navigator === 'undefined') return null;
  const lang = (navigator.language || '').toLowerCase();
  if (lang.startsWith('ar')) return 'Suggested for your browser region: Saudi Legal. You can choose any framework below.';
  return null;
}

export default function CreateTenant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const regionSuggestion = useMemo(getRegionSuggestion, []);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');

    if (!trimmedName || !trimmedSlug) {
      setError('Organization name and tenant code are required.');
      return;
    }
    if (!product) {
      setError('Please choose a legal framework. This cannot be changed later.');
      return;
    }

    setLoading(true);
    try {
      const res = await createTenantApi({
        name: trimmedName,
        slug: trimmedSlug,
        product: product === 'india' ? 'india' : 'saudi',
      });
      setSuccess({
        slug: trimmedSlug,
        product: res.data?.product || product,
        jurisdiction: res.data?.jurisdiction || (product === 'saudi' ? 'SA' : 'IN'),
      });
    } catch (e) {
      setError(
        e?.response?.data?.detail ||
          e?.response?.data?.message ||
          e?.message ||
          'Failed to create organization'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <div style={styles.brand}>
            <img src="/ai_legal_logo.png" alt="Logo" style={styles.logoImg} />
            <div>
              <div style={styles.title}>{t('appName')}</div>
              <div style={styles.sub}>{t('tagline')}</div>
            </div>
          </div>
          <LangToggle />
        </div>
        <div style={styles.card}>
          <h2 style={{ marginTop: 0, color: '#4ade80' }}>Organization created</h2>
          <p style={{ color: '#A0A0A0', marginBottom: 14 }}>
            Tenant code: <strong style={{ color: '#F5C76A' }}>{success.slug}</strong>
            <br />
            Legal framework: <strong>{success.product === 'saudi' ? 'Saudi Legal' : 'India Legal'}</strong> ({success.jurisdiction})
          </p>
          <p style={{ color: '#A0A0A0', fontSize: 13 }}>
            This legal framework is stored at tenant level and cannot be changed later. Share the tenant code with your team; users must use it when registering or logging in.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button style={styles.primary} onClick={() => navigate('/register')}>
              Register first user
            </button>
            <Link to="/login" style={styles.link}>
              Go to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.brand}>
          <img src="/ai_legal_logo.png" alt="Logo" style={styles.logoImg} />
          <div>
            <div style={styles.title}>{t('appName')}</div>
            <div style={styles.sub}>{t('tagline')}</div>
          </div>
        </div>
        <LangToggle />
      </div>

      <div style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Create organization</h2>
        <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 18 }}>
          Choose your legal framework. This is set once at tenant level and cannot be changed later. All users in this organization will use the same framework.
        </p>
        {regionSuggestion ? (
          <p style={styles.regionHint}>
            {regionSuggestion}
          </p>
        ) : null}
        {error ? <div style={styles.err}>{error}</div> : null}

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 14 }}>
          <div>
            <label style={styles.label}>Organization name</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme Law Firm"
            />
          </div>

          <div>
            <label style={styles.label}>Tenant code (for login)</label>
            <input
              style={styles.input}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. acme-law"
            />
            <div style={{ fontSize: 11, color: '#808080', marginTop: 4 }}>
              Users will enter this when logging in or registering.
            </div>
          </div>

          <div>
            <label style={styles.label}>Choose legal framework (mandatory)</label>
            <div style={styles.productRow}>
              <label style={styles.radio}>
                <input
                  type="radio"
                  name="product"
                  value="saudi"
                  checked={product === 'saudi'}
                  onChange={() => setProduct('saudi')}
                />
                <span>Saudi Legal (Kingdom of Saudi Arabia)</span>
              </label>
              <label style={styles.radio}>
                <input
                  type="radio"
                  name="product"
                  value="india"
                  checked={product === 'india'}
                  onChange={() => setProduct('india')}
                />
                <span>India Legal (India)</span>
              </label>
            </div>
            <div style={{ fontSize: 11, color: '#808080', marginTop: 6 }}>
              One tenant = one product. All users in this organization will use this legal framework.
            </div>
          </div>

          <button type="submit" style={styles.primary} disabled={loading}>
            {loading ? 'Creating…' : 'Create organization'}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={{ color: '#A0A0A0' }}>Already have a tenant code?</span>
          <Link to="/login" style={styles.link}>
            Log in
          </Link>
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
  logoImg: { width: 40, height: 40, objectFit: 'contain', borderRadius: 20 },
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
    maxWidth: 480,
    margin: '40px auto 0',
    background: '#111218',
    border: '1px solid #2a2b33',
    borderRadius: 18,
    padding: 24,
  },
  regionHint: { fontSize: 12, color: '#F5C76A', marginBottom: 12, fontStyle: 'italic' },
  label: { display: 'block', fontSize: 12, color: '#A0A0A0', marginBottom: 6, fontWeight: 800 },
  input: {
    width: '100%',
    padding: '12px 12px',
    borderRadius: 12,
    border: '1px solid #2a2b33',
    background: '#050507',
    color: '#F5F5F5',
    outline: 'none',
  },
  productRow: { display: 'flex', flexDirection: 'column', gap: 10 },
  radio: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 },
  primary: {
    padding: '12px 18px',
    borderRadius: 999,
    background: '#F5C76A',
    color: '#111',
    border: 'none',
    fontWeight: 900,
    cursor: 'pointer',
    marginTop: 8,
  },
  footer: { marginTop: 18, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', fontSize: 13 },
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
