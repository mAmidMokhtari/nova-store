'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';

import { HeroArt } from '@/assets/Images/HeroArt';
import { buttonStyles, type ButtonVariant } from '@/shared/Button';
import { Direction } from '@/types/enums';
import { getDirection } from '@/utils/formatters';
import { PRODUCTS_SECTION_ID } from '@/utils/routes';

const Banner = styled.section`
  display: grid;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  padding: 24px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr 1fr;
    padding: 32px 40px;
  }

  ${({ theme }) => theme.media.desktop} {
    padding: 40px 64px;
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: clamp(26px, 4.2vw, 42px);
  font-weight: 800;
  line-height: 1.3;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(15px, 1.6vw, 18px);
`;

const Cta = styled.a<{ $variant: ButtonVariant }>`
  ${buttonStyles}
  margin-block-start: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const Art = styled(HeroArt)`
  inline-size: 100%;
  max-inline-size: 460px;
  block-size: auto;
  justify-self: center;
`;

/** Landing banner with the store slogan and a jump link to the products. */
export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const Arrow = getDirection(locale) === Direction.Rtl ? ArrowLeft : ArrowRight;

  return (
    <Banner>
      <Copy>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
        <Cta href={`#${PRODUCTS_SECTION_ID}`} $variant="primary">
          {t('cta')}
          <Arrow size={18} aria-hidden="true" />
        </Cta>
      </Copy>
      <Art />
    </Banner>
  );
}
