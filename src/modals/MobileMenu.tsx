'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import styled from 'styled-components';

import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { Dialog } from '@/shared/Dialog';
import { IconButton } from '@/shared/IconButton';
import { useCategoryLabel } from '@/shared/useCategoryLabel';
import { Link } from '@/utils/navigation';
import { PRODUCTS_ANCHOR, ROUTES } from '@/utils/routes';

type MobileMenuProps = {
  isOpen: boolean;
  categories: readonly string[];
  onClose: () => void;
  /** Called with a category slug, or `null` for "all categories". */
  onSelectCategory: (category: string | null) => void;
};

const Drawer = styled(Dialog)`
  inset-block: 0;
  inset-inline-start: 0;
  inset-inline-end: auto;
  inline-size: min(320px, 86vw);
  block-size: 100dvh;
  max-block-size: none;
  margin: 0;
  border-block: 0;
  border-inline-start: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  block-size: 100%;
  padding: 16px;
  overflow-y: auto;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 800;
`;

const SectionTitle = styled.h3`
  margin-block-end: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 600;
`;

const itemStyles = `
  display: flex;
  align-items: center;
  inline-size: 100%;
  min-block-size: 44px;
  padding-inline: 12px;
  border: 0;
  background: transparent;
  font-weight: 600;
  text-align: start;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  ${itemStyles}
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const CategoryButton = styled.button`
  ${itemStyles}
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const Bottom = styled.div`
  margin-block-start: auto;
`;

/** Slide-in navigation for small screens: links, categories and the language switch. */
export function MobileMenu({ isOpen, categories, onClose, onSelectCategory }: MobileMenuProps) {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const getCategoryLabel = useCategoryLabel();
  const titleId = useId();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} labelledBy={titleId}>
      <Content>
        <Top>
          <Title id={titleId}>{t('menu')}</Title>
          <IconButton label={tCommon('close')} onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </IconButton>
        </Top>

        <nav aria-label={t('mainNav')}>
          <ul>
            <li>
              <NavLink href={ROUTES.home} onClick={onClose}>
                {t('home')}
              </NavLink>
            </li>
            <li>
              <NavLink href={PRODUCTS_ANCHOR} onClick={onClose}>
                {t('products')}
              </NavLink>
            </li>
          </ul>
        </nav>

        {categories.length > 0 && (
          <section>
            <SectionTitle>{t('categories')}</SectionTitle>
            <ul>
              <li>
                <CategoryButton type="button" onClick={() => onSelectCategory(null)}>
                  {t('allCategories')}
                </CategoryButton>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <CategoryButton type="button" onClick={() => onSelectCategory(category)}>
                    {getCategoryLabel(category)}
                  </CategoryButton>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Bottom>
          <SectionTitle>{t('language')}</SectionTitle>
          <LocaleSwitch />
        </Bottom>
      </Content>
    </Drawer>
  );
}
