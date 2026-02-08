import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import { getAuth } from '../../store/auth';
import { listCasesApi } from '../../services/api/cases';

export default function Dashboard() {
  const { t } = useTranslation();
  const auth = getAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listCasesApi(10)
      .then((res) => setCases(res.data || []))
      .catch((e) => setError(e?.response?.data?.detail || e?.message || 'Failed to load cases'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout title={t('dashboard')}>
      <div style={styles.card}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>
          {t('welcome')}, {auth?.user?.name || auth?.user?.email || 'User'}
        </div>
        <div style={{ color: '#A0A0A0', marginTop: 8 }}>
          Quick links: <Link to="/case-intake" style={styles.link}>Case intake</Link>
          {' · '}<Link to="/draft" style={styles.link}>Draft</Link>
          {' · '}<Link to="/judgments" style={styles.link}>Judgments</Link>
          {' · '}<Link to="/laws" style={styles.link}>Laws</Link>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Recent cases</div>
        {error ? <div style={styles.err}>{error}</div> : null}
        {loading ? <div style={{ color: '#A0A0A0' }}>Loading...</div> : cases.length === 0 ? (
          <div style={{ color: '#A0A0A0' }}>No cases yet. <Link to="/case-intake" style={styles.link}>Create one</Link>.</div>
        ) : (
          <div style={{ display: 'grid', gap: 8 }}>
            {cases.map((c) => (
              <Link key={c.id} to={`/cases/${c.id}`} style={styles.caseRow}>
                <span style={{ fontWeight: 800 }}>{c.client_name}</span>
                <span style={{ color: '#A0A0A0', fontSize: 13 }}>{c.case_type} · {c.status || 'intake'}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 18, marginTop: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  link: { color: '#F5C76A', textDecoration: 'none', fontWeight: 800 },
  err: { color: '#ffb3b3', fontSize: 13, marginBottom: 8 },
  caseRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5F5F5', textDecoration: 'none' },
};
