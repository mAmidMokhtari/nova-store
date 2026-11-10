'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styled from 'styled-components';

import { MobileMenu } from '@/modals/MobileMenu';
import { Container } from '@/shared/Container';
import { IconButton } from '@/shared/IconButton';
import { Logo } from '@/shared/Logo';
import { Link, useRouter } from '@/utils/navigation';
import { PRODUCTS_ANCHOR, ROUTES } from '@/utils/routes';
import { useCatalogStore } from '@/zustand/catalog.store';

import { CartLink } from './CartLink';
import { CategoryMenu } from './CategoryMenu';
import { HeaderSearch } from './HeaderSearch';
import { LocaleSwitch } from './LocaleSwitch';
import { ThemeToggle } from './ThemeToggle';

type HeaderProps = {
  /** Category slugs for the menus; empty when the API could not be reached. */
  categories: readonly string[];
};

const Bar = styled.header`
  position: sticky;
  inset-block-start: 0;
  z-index: 20;
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

/* Mobile: two rows (controls, then search). Desktop: one row. */
const Inner = styled(Container)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'menu logo actions'
    'search search search';
  align-items: center;
  column-gap: 8px;
  row-gap: 10px;
  padding-block: 10px;

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: auto auto minmax(0, 1fr) auto;
    grid-template-areas: 'logo nav search actions';
    column-gap: 24px;
    min-block-size: ${({ theme }) => theme.layout.headerHeight};
  }
`;

const MenuSlot = styled.div`
  grid-area: menu;

  ${({ theme }) => theme.media.desktop} {
    display: none;
  }
`;

const LogoLink = styled(Link)`
  grid-area: logo;
  display: inline-flex;
  justify-self: start;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const DesktopNav = styled.nav`
  grid-area: nav;
  display: none;

  ${({ theme }) => theme.media.desktop} {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-block-size: 44px;
  padding-inline: 10px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const SearchSlot = styled.div`
  grid-area: search;

  ${({ theme }) => theme.media.desktop} {
    justify-self: center;
    inline-size: min(100%, 420px);
  }
`;

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DesktopOnly = styled.div`
  display: none;

  ${({ theme }) => theme.media.desktop} {
    display: block;
    margin-inline-end: 6px;
  }
`;

/** Sticky store header: logo, navigation, search, language, theme and cart. */
export function Header({ categories }: HeaderProps) {
  const t = useTranslations('header');
  const router = useRouter();
  const setCategory = useCatalogStore((state) => state.setCategory);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectCategory = (category: string | null) => {
    setCategory(category);
    setIsMenuOpen(false);
    router.push(PRODUCTS_ANCHOR);
  };

  return (
    <Bar>
      <Inner>
        <MenuSlot>
          <IconButton
            label={t('openMenu')}
            aria-haspopup="dialog"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={22} aria-hidden="true" />
          </IconButton>
        </MenuSlot>

        <LogoLink href={ROUTES.home} aria-label={t('home')}>
          <Logo />
        </LogoLink>

        <DesktopNav aria-label={t('mainNav')}>
          <NavList>
            <li>
              <NavLink href={ROUTES.home}>{t('home')}</NavLink>
            </li>
            <li>
              <NavLink href={PRODUCTS_ANCHOR}>{t('products')}</NavLink>
            </li>
            {categories.length > 0 && (
              <li>
                <CategoryMenu categories={categories} onSelect={handleSelectCategory} />
              </li>
            )}
          </NavList>
        </DesktopNav>

        <SearchSlot>
          <HeaderSearch />
        </SearchSlot>

        <Actions>
          <DesktopOnly>
            <LocaleSwitch />
          </DesktopOnly>
          <ThemeToggle />
          <CartLink />
        </Actions>
      </Inner>

      <MobileMenu
        isOpen={isMenuOpen}
        categories={categories}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={handleSelectCategory}
      />
    </Bar>
  );
}
