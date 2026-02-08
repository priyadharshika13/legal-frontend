import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { Disclaimer } from '../../shared/ui';
import { CaseIntakeForm } from '../../pages/CaseIntake/CaseIntake';

/**
 * Case intake (enhanced). Uses existing form with disclaimer.
 */
export default function CaseCreate() {
  const { t } = useTranslation();
  return (
    <AppLayout title={t('caseIntakeTitle')}>
      <Disclaimer compact />
      <CaseIntakeForm />
    </AppLayout>
  );
}
