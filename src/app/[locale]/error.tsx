'use client';

import { RotateCw, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MessagePage } from '@/components/layout/MessagePage';
import { Button } from '@/shared/Button';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Error boundary of a locale: keeps the header and footer and offers a retry. */
export default function ErrorPage({ reset }: ErrorPageProps) {
  const t = useTranslations('error');
  const tCommon = useTranslations('common');

  return (
    <MessagePage
      tone="danger"
      icon={<TriangleAlert size={30} aria-hidden="true" />}
      title={t('title')}
      description={t('description')}
      action={
        <Button icon={<RotateCw size={16} aria-hidden="true" />} onClick={reset}>
          {tCommon('retry')}
        </Button>
      }
    />
  );
}
