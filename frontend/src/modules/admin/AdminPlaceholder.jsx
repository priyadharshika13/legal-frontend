import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { useProduct } from '../../core/ProductProvider';

/**
 * Admin module. Product-aware roles: India (Researcher, Lawyer, Reviewer, Admin); Saudi (Researcher, Reviewer, Approver, Admin).
 * Collaboration & review flow mandatory for Saudi institutions.
 */
export default function AdminPlaceholder() {
  const { t } = useTranslation();
  const { config, isSaudi } = useProduct();
  const roles = config?.collaboration?.roles || ['Researcher', 'Reviewer', 'Admin'];
  const reviewRequired = config?.collaboration?.reviewFlowRequired === true;

  return (
    <AppLayout title={t('admin', 'Admin')}>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Admin</div>
        <p style={{ color: '#A0A0A0' }}>
          User and organization management. Roles: {roles.join(', ')}. (Connect to auth-service.)
        </p>
        {reviewRequired && (
          <div style={styles.reviewNote}>
            <strong>{t('collaborationReviewRequired', 'Review flow required')}</strong> — {t('collaborationReviewNote', 'Institution workflow: Researcher → Reviewer → Approver. Comments and version history are mandatory.')}
          </div>
        )}
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t('collaborationWorkflow', 'Collaboration & review flow')}</div>
        <p style={{ color: '#A0A0A0' }}>
          {isSaudi
            ? t('collaborationSaudi', 'Saudi product: Researcher, Reviewer, Approver roles. Comments and version history mandatory for institutional trust.')
            : t('collaborationIndia', 'India product: Researcher, Lawyer, Reviewer, Admin. Optional review flow.')}
        </p>
      </div>
    </AppLayout>
  );
}

const styles = {
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14, marginBottom: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  reviewNote: { marginTop: 12, padding: 12, borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5C76A', fontSize: 13 },
};
