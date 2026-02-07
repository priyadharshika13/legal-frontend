import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { getAuth } from '../../store/auth';

export default function Dashboard() {
  const { t } = useTranslation();
  const auth = getAuth();

  return (
    <AppLayout title={t('dashboard')}>
      <div style={styles.card}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>
          {t('welcome')}, {auth?.user?.name || 'User'}
        </div>
        <div style={{ color: '#A0A0A0', marginTop: 8 }}>
          Next: Connect case intake → upload → draft generator → judgments citations.
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 18 },
};
