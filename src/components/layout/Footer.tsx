'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { InstagramIcon, LinkedInIcon, TelegramIcon, XIcon } from '@/assets/Icons/SocialIcons';
import { Container } from '@/shared/Container';
import { Logo } from '@/shared/Logo';
import { formatNumber } from '@/utils/formatters';
import { Link } from '@/utils/navigation';
import { PRODUCTS_ANCHOR, ROUTES } from '@/utils/routes';

type FooterProps = {
  /** Rendered on the server so the HTML does not depend on the visitor's clock. */
  year: number;
};

/** The challenge allows these links to be display-only; they have no destination page. */
const PLACEHOLDER_HREF = '#';

const HELP_KEYS = ['shipping', 'returns', 'payment', 'faq'] as const;

const SOCIAL_LINKS: readonly {
  key: 'telegram' | 'instagram' | 'linkedin' | 'x';
  icon: ReactNode;
}[] = [
  { key: 'telegram', icon: <TelegramIcon /> },
  { key: 'instagram', icon: <InstagramIcon /> },
  { key: 'linkedin', icon: <LinkedInIcon /> },
  { key: 'x', icon: <XIcon /> },
];

const Wrapper = styled.footer`
  margin-block-start: auto;
  background: ${({ theme }) => theme.colors.footer};
  color: ${({ theme }) => theme.colors.footerText};
`;

const Grid = styled(Container)`
  display: grid;
  gap: 28px;
  padding-block: 36px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
`;

const Tagline = styled.p`
  margin-block-start: 10px;
  font-size: 14px;
`;

const ColumnTitle = styled.h2`
  margin-block-end: 10px;
  color: ${({ theme }) => theme.colors.footerHeading};
  font-size: 15px;
  font-weight: 700;
`;

const LinkList = styled.ul`
  display: grid;
  gap: 4px;
  font-size: 14px;

  a {
    display: inline-flex;
    align-items: center;
    min-block-size: 32px;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.footerHeading};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const SocialList = styled.ul`
  display: flex;
  gap: 8px;
`;

const SocialLink = styled.a`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;

  &:hover {
    color: ${({ theme }) => theme.colors.footerHeading};
    border-color: currentColor;
  }
`;

const Bottom = styled.div`
  border-block-start: 1px solid rgba(255, 255, 255, 0.12);
`;

const Rights = styled(Container)`
  padding-block: 16px;
  font-size: 13px;
`;

/** Store footer: brand, help links, useful links and social profiles. */
export function Footer({ year }: FooterProps) {
  const t = useTranslations('footer');
  const tHeader = useTranslations('header');
  const locale = useLocale();

  return (
    <Wrapper>
      <Grid>
        <div>
          <Logo inverted />
          <Tagline>{t('tagline')}</Tagline>
        </div>

        <nav aria-label={t('helpTitle')}>
          <ColumnTitle>{t('helpTitle')}</ColumnTitle>
          <LinkList>
            {HELP_KEYS.map((key) => (
              <li key={key}>
                <a href={PLACEHOLDER_HREF}>{t(`help.${key}`)}</a>
              </li>
            ))}
          </LinkList>
        </nav>

        <nav aria-label={t('linksTitle')}>
          <ColumnTitle>{t('linksTitle')}</ColumnTitle>
          <LinkList>
            <li>
              <Link href={ROUTES.home}>{tHeader('home')}</Link>
            </li>
            <li>
              <Link href={PRODUCTS_ANCHOR}>{tHeader('products')}</Link>
            </li>
            <li>
              <a href={PLACEHOLDER_HREF}>{t('links.about')}</a>
            </li>
            <li>
              <a href={PLACEHOLDER_HREF}>{t('links.contact')}</a>
            </li>
          </LinkList>
        </nav>

        <div>
          <ColumnTitle>{t('socialTitle')}</ColumnTitle>
          <SocialList>
            {SOCIAL_LINKS.map(({ key, icon }) => (
              <li key={key}>
                <SocialLink href={PLACEHOLDER_HREF} aria-label={t(`social.${key}`)}>
                  {icon}
                </SocialLink>
              </li>
            ))}
          </SocialList>
        </div>
      </Grid>

      <Bottom>
        <Rights as="p">
          {t('rights', { year: formatNumber(year, locale, { useGrouping: false }) })}
        </Rights>
      </Bottom>
    </Wrapper>
  );
}
