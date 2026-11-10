'use client';

import { useId } from 'react';
import styled from 'styled-components';

import { Button } from '@/shared/Button';
import { Dialog } from '@/shared/Dialog';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Panel = styled(Dialog)`
  inline-size: min(420px, calc(100vw - 32px));
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const Content = styled.div`
  display: grid;
  gap: 8px;
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 800;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-block-start: 16px;
`;

/** Asks the visitor to confirm a destructive action. */
export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const titleId = useId();

  return (
    <Panel isOpen={isOpen} onClose={onCancel} labelledBy={titleId}>
      <Content>
        <Title id={titleId}>{title}</Title>
        <Description>{description}</Description>
        <Actions>
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </Actions>
      </Content>
    </Panel>
  );
}
