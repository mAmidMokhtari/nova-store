'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.accentStrong};
    color: ${({ theme }) => theme.colors.onAccent};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accentStrongHover};
    }
  `,
  secondary: css`
    border-color: ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceMuted};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textMuted};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceMuted};
      color: ${({ theme }) => theme.colors.text};
    }
  `,
  danger: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.danger};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.dangerSoft};
    }
  `,
};

/** Shared look of buttons and button-like links. Touch target is at least 44px tall. */
export const buttonStyles = css<{ $variant: ButtonVariant; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-block-size: 44px;
  padding-block: 8px;
  padding-inline: 20px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  inline-size: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button<{ $variant: ButtonVariant; $fullWidth?: boolean }>`
  ${buttonStyles}
`;

/** App button with optional leading icon. */
export function Button({
  variant = 'primary',
  icon,
  fullWidth = false,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton type={type} $variant={variant} $fullWidth={fullWidth} {...rest}>
      {icon}
      {children}
    </StyledButton>
  );
}
