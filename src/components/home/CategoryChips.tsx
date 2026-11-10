'use client';

import { Gem, LayoutGrid, Monitor, Shirt, Tag, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { useCategoryLabel } from '@/shared/useCategoryLabel';
import { ProductCategory } from '@/types/enums';

type CategoryChipsProps = {
  categories: readonly string[];
  /** Selected slug, or `null` when every category is shown. */
  selected: string | null;
  onSelect: (category: string | null) => void;
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  [ProductCategory.Electronics]: Monitor,
  [ProductCategory.Jewelery]: Gem,
  [ProductCategory.MensClothing]: Shirt,
  [ProductCategory.WomensClothing]: Shirt,
};

/* Scrolls sideways on small screens instead of wrapping into many rows. */
const List = styled.ul`
  display: flex;
  gap: 10px;
  margin-inline: -16px;
  padding-block: 4px;
  padding-inline: 16px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.media.tablet} {
    flex-wrap: wrap;
    justify-content: center;
    margin-inline: 0;
    padding-inline: 0;
    overflow-x: visible;
  }
`;

const Chip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-block-size: 44px;
  padding-inline: 18px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.background : theme.colors.text)};
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

/** Selectable category pills above the product list. */
export function CategoryChips({ categories, selected, onSelect }: CategoryChipsProps) {
  const t = useTranslations('categories');
  const getCategoryLabel = useCategoryLabel();

  return (
    <nav aria-label={t('label')}>
      <List>
        <li>
          <Chip
            type="button"
            $active={selected === null}
            aria-pressed={selected === null}
            onClick={() => onSelect(null)}
          >
            <LayoutGrid size={18} aria-hidden="true" />
            {t('all')}
          </Chip>
        </li>
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category] ?? Tag;
          const isActive = category === selected;

          return (
            <li key={category}>
              <Chip
                type="button"
                $active={isActive}
                aria-pressed={isActive}
                onClick={() => onSelect(category)}
              >
                <Icon size={18} aria-hidden="true" />
                {getCategoryLabel(category)}
              </Chip>
            </li>
          );
        })}
      </List>
    </nav>
  );
}
