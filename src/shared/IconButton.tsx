'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  /** Accessible name; icon-only buttons have no visible text. */
  label: string;
  children: ReactNode;
};

/** Shared look of square icon controls (buttons and links). */
export const iconButtonStyles = css`
  position: relative;
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  inline-size: 44px;
  block-size: 44px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const StyledIconButton = styled.button`
  ${iconButtonStyles}
`;

/** Square button that shows only an icon. */
export function IconButton({ label, type = 'button', children, ...rest }: IconButtonProps) {
  return (
    <StyledIconButton type={type} aria-label={label} title={label} {...rest}>
      {children}
    </StyledIconButton>
  );
}
