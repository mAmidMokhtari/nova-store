'use client';

import { Compass } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MessagePage, MessagePageLink } from '@/components/layout/MessagePage';
import { ROUTES } from '@/utils/routes';

/** Localized 404 page. */
export default function NotFound() {
  const t = useTranslations('notFound');
  const tMetadata = useTranslations('metadata');

  return (
    <>
      {/* React hoists <title> into <head>; not-found files cannot export metadata here. */}
      <title>{`${tMetadata('notFoundTitle')} | ${tMetadata('siteName')}`}</title>
      <MessagePage
        icon={<Compass size={30} aria-hidden="true" />}
        title={t('title')}
        description={t('description')}
        action={
          <MessagePageLink href={ROUTES.home} $variant="primary">
            {t('back')}
          </MessagePageLink>
        }
      />
    </>
  );
}
