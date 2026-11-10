'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';

import { useCategoryLabel } from '@/shared/useCategoryLabel';

type CategoryMenuProps = {
  categories: readonly string[];
  /** Called with a category slug, or `null` for "all categories". */
  onSelect: (category: string | null) => void;
};

const Wrapper = styled.div`
  position: relative;
`;

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-block-size: 44px;
  padding-inline: 10px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const Chevron = styled(ChevronDown)<{ $open: boolean }>`
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.15s ease;
`;

const Panel = styled.ul`
  position: absolute;
  inset-block-start: calc(100% + 6px);
  inset-inline-start: 0;
  z-index: 30;
  min-inline-size: 200px;
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.overlay};
`;

const Item = styled.button`
  inline-size: 100%;
  min-block-size: 40px;
  padding-inline: 12px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  text-align: start;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

/** Desktop dropdown that filters the product list by category. */
export function CategoryMenu({ categories, onSelect }: CategoryMenuProps) {
  const t = useTranslations('header');
  const getCategoryLabel = useCategoryLabel();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (category: string | null) => {
    setIsOpen(false);
    onSelect(category);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Trigger
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {t('categories')}
        <Chevron size={16} $open={isOpen} aria-hidden="true" />
      </Trigger>

      {isOpen && (
        <Panel id={panelId}>
          <li>
            <Item type="button" onClick={() => handleSelect(null)}>
              {t('allCategories')}
            </Item>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Item type="button" onClick={() => handleSelect(category)}>
                {getCategoryLabel(category)}
              </Item>
            </li>
          ))}
        </Panel>
      )}
    </Wrapper>
  );
}
