'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styled from 'styled-components';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Id of the element that names the dialog. */
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

const StyledDialog = styled.dialog`
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.overlay};

  &::backdrop {
    background: ${({ theme }) => theme.colors.overlay};
  }
`;

/**
 * Thin wrapper over the native `<dialog>`, which provides focus trapping, Escape
 * handling and the backdrop. Style it with `styled(Dialog)`. Children mount only while open.
 */
export function Dialog({ isOpen, onClose, labelledBy, className, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <StyledDialog
      ref={dialogRef}
      className={className}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {isOpen && children}
    </StyledDialog>
  );
}
